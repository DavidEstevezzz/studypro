import { useEffect, useMemo, useState } from 'react';
import { useCatalog, useQuestions } from './hooks/useData';
import {
  loadProgress,
  saveProgress,
  resetProgress,
  emptyProgress,
  normalizeProgress,
  exportAll,
  importAll,
} from './lib/storage';
import { buildPool, domainsOf, applyAnswer, toggleMarked } from './lib/quiz';
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
    const saved = normalizeProgress(loadProgress(cert.id), domains);
    setProgress(saved);
    saveProgress(cert.id, saved);
    setView('home');
  }, [cert, questions]); // eslint-disable-line react-hooks/exhaustive-deps

  function persist(next) {
    setProgress(next);
    saveProgress(cert.id, next);
  }

  function start(mode, opts = {}) {
    const sessionId = `${mode}-${Date.now()}`;
    const pool = buildPool(mode, questions, {
      ...opts,
      progress,
      wrongIds: progress.wrongIds,
      markedIds: progress.markedIds,
    });
    if (!pool.length) return;
    setSession({ id: sessionId, mode, pool, startedAt: Date.now() });
    setView('session');
  }

  function record(question, ok) {
    persist(applyAnswer(progress, question, ok, { sessionId: session.id }));
  }

  function markQuestion(questionId) {
    persist(toggleMarked(progress, questionId));
  }

  function finish(res) {
    const finishedAt = Date.now();
    const nextSession = {
      id: session.id,
      mode: session.mode,
      startedAt: session.startedAt,
      finishedAt,
      total: res.answers.length,
      ok: res.ok,
    };
    const nextProgress = {
      ...progress,
      sessions: [nextSession, ...(progress.sessions ?? [])].slice(0, 50),
    };
    persist(nextProgress);
    setResult({ ...res, mode: session.mode, sessionId: session.id });
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
        const saved = normalizeProgress(loadProgress(cert.id), domains);
        setProgress(saved);
        alert('Progreso importado correctamente.');
      } catch {
        alert('No se pudo importar: archivo no válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  if (catErr)
    return (
      <Shell>
        <p className="note">{catErr}</p>
      </Shell>
    );

  if (qErr)
    return (
      <Shell>
        <p className="note">{qErr}</p>
      </Shell>
    );

  if (!catalog || !cert || !questions || !progress)
    return (
      <Shell>
        <p className="note">Cargando banco de preguntas...</p>
      </Shell>
    );

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
          progress={progress}
          timed={session.mode === 'exam'}
          examSeconds={cert.examMinutes * 60}
          onRecord={record}
          onMark={markQuestion}
          onFinish={finish}
        />
      )}
      {view === 'results' && (
        <Results
          result={result}
          mode={result.mode}
          cert={cert}
          domains={domains}
          questions={questions}
          progress={progress}
          domStat={progress.domStat}
          hasWrong={progress.wrongIds.length > 0}
          hasMarked={progress.markedIds.length > 0}
          onHome={() => setView('home')}
          onReview={() => start('wrong')}
          onMarked={() => start('marked')}
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
