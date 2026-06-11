import { useEffect, useState } from 'react';
import Strata from './Strata';
import { overall } from '../lib/quiz';

export default function Home({
  catalog,
  cert,
  onSelectCert,
  questions,
  domains,
  progress,
  onStart,
  onReset,
  onExport,
  onImport,
}) {
  const [domain, setDomain] = useState(domains[0] ?? '');
  const [domCount, setDomCount] = useState(20);
  const [showDom, setShowDom] = useState(false);

  useEffect(() => {
    setDomain(domains[0] ?? '');
  }, [domains]);

  const ov = overall(progress);
  const wrongN = progress.wrongIds.length;
  const totalQuestions = questions.length;
  const practicedPct = totalQuestions
    ? Math.min(100, Math.round((ov.seen / totalQuestions) * 100))
    : 0;
  const weakDomains = domains.filter((d) => {
    const st = progress.domStat[d];
    if (!st?.seen) return false;
    return Math.round((st.ok / st.seen) * 100) < cert.passThreshold;
  }).length;
  const readiness = ov.seen ? ov.pct : 0;

  return (
    <div className="home">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow">{cert.provider} · entrenamiento</div>
          <h1>{cert.name}</h1>
          <p className="lede">{cert.blurb}</p>

          {catalog.length > 1 && (
            <div className="cert-switch">
              {catalog.map((c) => (
                <button
                  key={c.id}
                  className={`pill ${c.id === cert.id ? 'on' : ''}`}
                  onClick={() => onSelectCert(c)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="readiness-card">
          <span>Preparación</span>
          <strong>{readiness}%</strong>
          <div
            className="readiness-meter"
            style={{ '--value': `${readiness}%` }}
            aria-hidden="true"
          >
            <i />
          </div>
          <small>
            {ov.seen
              ? `${ov.seen} respuestas registradas`
              : 'Primera sesión pendiente'}
          </small>
        </div>
      </section>

      <section className="metric-grid" aria-label="Resumen de progreso">
        <div className="metric-card">
          <span>Banco</span>
          <strong>{totalQuestions}</strong>
          <small>preguntas</small>
        </div>
        <div className="metric-card">
          <span>Visto</span>
          <strong>{practicedPct}%</strong>
          <small>del banco</small>
        </div>
        <div className={`metric-card ${wrongN ? 'attention' : ''}`}>
          <span>Errores</span>
          <strong>{wrongN}</strong>
          <small>para repasar</small>
        </div>
        <div className={`metric-card ${weakDomains ? 'warning' : ''}`}>
          <span>Dominios flojos</span>
          <strong>{weakDomains}</strong>
          <small>por debajo de {cert.passThreshold}%</small>
        </div>
      </section>

      <div className="card progress-card">
        <div className="section-head">
          <div>
            <div className="eyebrow mb">Mapa de dominio</div>
            <h2>Tu avance por área</h2>
          </div>
          <span className="threshold">Objetivo {cert.passThreshold}%</span>
        </div>
        <Strata domains={domains} domStat={progress.domStat} />
        <p className="note">
          {ov.seen
            ? `Llevas ${ov.seen} respuestas · ${ov.pct}% de acierto global. ${
                ov.pct >= cert.passThreshold
                  ? 'Estás en zona de aprobado.'
                  : `Apunta a >=${cert.passThreshold}% sostenido antes de examinarte.`
              }`
            : 'Aún no has practicado. Empieza por un simulacro o una sesión rápida.'}
        </p>
      </div>

      <div className="card">
        <div className="section-head">
          <div>
            <div className="eyebrow mb">Elige modo</div>
            <h2>Entrena según tu objetivo</h2>
          </div>
        </div>
        <div className="modes">
          <button className="mode" onClick={() => onStart('exam')}>
            <span className="mode-icon">100</span>
            <b>Simulacro · {cert.examQuestions} preg</b>
            <small>
              {cert.examMinutes} min cronometrados, como el examen real.
            </small>
          </button>
          <button className="mode" onClick={() => onStart('quick')}>
            <span className="mode-icon">25</span>
            <b>Sesión rápida · 25 preg</b>
            <small>Sin cronómetro. Feedback tras cada respuesta.</small>
          </button>
          <button
            className="mode error-mode"
            onClick={() => (wrongN ? onStart('wrong') : null)}
            disabled={!wrongN}
          >
            <span className="mode-icon">!</span>
            <b>Test de errores</b>
            <small>
              {wrongN
                ? `${wrongN} preguntas pendientes de repaso.`
                : 'Aún no tienes fallos guardados.'}
            </small>
          </button>
          <button className="mode" onClick={() => setShowDom((s) => !s)}>
            <span className="mode-icon">D</span>
            <b>Por dominio</b>
            <small>Enfócate en un área concreta del temario.</small>
          </button>
        </div>

        {showDom && (
          <div className="dompick">
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={domCount}
              onChange={(e) => setDomCount(+e.target.value)}
            >
              <option value={20}>20 preg</option>
              <option value={40}>40 preg</option>
              <option value={60}>60 preg</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={() => onStart('domain', { domain, count: domCount })}
            >
              Empezar
            </button>
          </div>
        )}

        <div className="divider" />
        <div className="row wrap">
          <button className="btn btn-ghost" onClick={onExport}>
            Exportar progreso
          </button>
          <label className="btn btn-ghost file-label">
            Importar progreso
            <input
              type="file"
              accept="application/json"
              onChange={onImport}
              hidden
            />
          </label>
          <button className="btn btn-ghost danger-text" onClick={onReset}>
            Reiniciar
          </button>
        </div>
        <p className="note">
          Tu progreso se guarda en este navegador. Usa exportar para tener una
          copia de seguridad o llevarlo a otro equipo. Las explicaciones pueden
          tener algún error puntual: ante la duda, abre el enlace a la
          documentación oficial.
        </p>
      </div>
    </div>
  );
}
