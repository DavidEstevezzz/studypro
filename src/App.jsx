import { useEffect, useMemo, useState } from 'react';
import { useCatalog, useQuestions } from './hooks/useData';
import {
  loadProgress,
  saveProgress,
  resetProgress,
  emptyProgress,
  exportAll,
  importAll,
} from './lib/storage';
import { buildPool, domainsOf, applyAnswer } from './lib/quiz';
import Home from './components/Home';
import Session from './components/Session';
import Results from './components/Results';

export default function App() {
  const { catalog, error: catErr } = useCatalog();
  const [cert, setCert] = useState(null);
  const { questions, error: qErr } = useQuestions(cert);

  const [view, setView] = useState('home');
  const [progress, setProgress] = useState(null);
  const [session, setSession] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (catalog && !cert) setCert(catalog[0]);
  }, [catalog, cert]);

  const domains = useMemo(
    () => (questions ? domainsOf(questions) : []),
    [questions]
  );

  useEffect(() => {
    if (!cert || !questions) return;
    const saved = loadProgress(cert.id);
    setProgress(saved ?? emptyProgress(domains));
    setView('home');
  }, [cert, questions]); // eslint-disable-line react-hooks/exhaustive-deps

  function persist(next) {
    setProgress(next);
    saveProgress(cert.id, next);
  }

  function start(mode, opts = {}) {
    const pool = buildPool(mode, questions, {
      ...opts,
      wrongIds: progress.wrongIds,
    });
    if (!pool.length) return;
    setSession({ mode, pool });
    setView('session');
  }

  function record(question, ok) {
    persist(applyAnswer(progress, question, ok));
  }

  function finish(res) {
    setResult({ ...res, mode: session.mode });
    setView('results');
  }

  function doReset() {
    if (!confirm('¿Borrar todo el progreso de esta certificación?')) return;
    resetProgress(cert.id);
    setProgress(emptyProgress(domains));
    setView('home');
  }

  function doExport() {
    const blob = new Blob([exportAll()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studypro-progreso.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function doImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importAll(reader.result);
        const saved = loadProgress(cert.id);
        setProgress(saved ?? emptyProgress(domains));
        alert('Progreso importado correctamente.');
      } catch {
        alert('No se pudo importar: archivo no válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  if (catErr) return <Shell><p className="note">{catErr}</p></Shell>;
  if (!catalog || !cert || !questions || !progress)
    return (
      <Shell>
        <p className="note">Cargando banco de preguntas…</p>
      </Shell>
    );
  if (qErr) return <Shell><p className="note">{qErr}</p></Shell>;

  return (
    <Shell>
      {view === 'home' && (
        <Home
          catalog={catalog}
          cert={cert}
          onSelectCert={setCert}
          questions={questions}
          domains={domains}
          progress={progress}
          onStart={start}
          onReset={doReset}
          onExport={doExport}
          onImport={doImport}
        />
      )}
      {view === 'session' && (
        <Session
          pool={session.pool}
          timed={session.mode === 'exam'}
          examSeconds={cert.examMinutes * 60}
          onRecord={record}
          onFinish={finish}
        />
      )}
      {view === 'results' && (
        <Results
          result={result}
          mode={result.mode}
          cert={cert}
          domains={domains}
          domStat={progress.domStat}
          hasWrong={progress.wrongIds.length > 0}
          onHome={() => setView('home')}
          onReview={() => start('wrong')}
        />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="wrap">
      {children}
      <footer className="foot-note">
        StudyPro · banco de práctica con explicaciones. No afiliado a los
        proveedores de certificación.
      </footer>
    </div>
  );
}
