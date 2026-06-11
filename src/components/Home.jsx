import { useEffect, useState } from 'react';
import Strata from './Strata';
import { REVIEW_PASSES_REQUIRED, overall } from '../lib/quiz';

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
  const markedN = progress.markedIds.length;
  const byQuestion = progress.byQuestion ?? {};
  const totalQuestions = questions.length;
  const uniqueSeen = Object.keys(byQuestion).length;
  const masteredN = Object.values(byQuestion).filter((q) => q.mastered).length;
  const practicedPct = totalQuestions
    ? Math.min(100, Math.round((uniqueSeen / totalQuestions) * 100))
    : 0;
  const masteredPct = totalQuestions
    ? Math.min(100, Math.round((masteredN / totalQuestions) * 100))
    : 0;
  const weakDomains = domains.filter((d) => {
    const st = progress.domStat[d];
    if (!st?.seen) return false;
    return Math.round((st.ok / st.seen) * 100) < cert.passThreshold;
  }).length;
  const readiness = Math.max(
    0,
    Math.min(
      100,
      Math.round(ov.pct * 0.55 + practicedPct * 0.25 + masteredPct * 0.2)
    )
  );

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
          <span>Preparacion</span>
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
              ? `${uniqueSeen} preguntas vistas · ${ov.pct}% acierto`
              : 'Primera sesion pendiente'}
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
          <span>Vistas</span>
          <strong>{practicedPct}%</strong>
          <small>{uniqueSeen} unicas</small>
        </div>
        <div className={`metric-card ${wrongN ? 'attention' : ''}`}>
          <span>Errores activos</span>
          <strong>{wrongN}</strong>
          <small>{REVIEW_PASSES_REQUIRED} aciertos para liberar</small>
        </div>
        <div className={`metric-card ${markedN ? 'attention' : ''}`}>
          <span>Marcadas</span>
          <strong>{markedN}</strong>
          <small>dudas personales</small>
        </div>
        <div className={`metric-card ${weakDomains ? 'warning' : ''}`}>
          <span>Dominios flojos</span>
          <strong>{weakDomains}</strong>
          <small>por debajo de {cert.passThreshold}%</small>
        </div>
        <div className="metric-card">
          <span>Dominadas</span>
          <strong>{masteredN}</strong>
          <small>racha de 3 aciertos</small>
        </div>
      </section>

      <div className="card progress-card">
        <div className="section-head">
          <div>
            <div className="eyebrow mb">Mapa de dominio</div>
            <h2>Tu avance por area</h2>
          </div>
          <span className="threshold">Objetivo {cert.passThreshold}%</span>
        </div>
        <Strata domains={domains} domStat={progress.domStat} />
        <p className="note">
          {ov.seen
            ? `Llevas ${ov.seen} respuestas · ${ov.pct}% de acierto global. ${
                ov.pct >= cert.passThreshold
                  ? 'Estas en zona de aprobado.'
                  : `Apunta a >=${cert.passThreshold}% sostenido antes de examinarte.`
              }`
            : 'Aun no has practicado. Empieza por el plan de hoy o una sesion rapida.'}
        </p>
      </div>

      <div className="card">
        <div className="section-head">
          <div>
            <div className="eyebrow mb">Elige modo</div>
            <h2>Entrena segun tu objetivo</h2>
          </div>
        </div>
        <div className="modes">
          <button className="mode smart-mode" onClick={() => onStart('smart')}>
            <span className="mode-icon">★</span>
            <b>Plan de hoy · 30 preg</b>
            <small>Mezcla errores, dudas, dominios flojos y preguntas nuevas.</small>
          </button>
          <button className="mode" onClick={() => onStart('exam')}>
            <span className="mode-icon">100</span>
            <b>Simulacro · {cert.examQuestions} preg</b>
            <small>
              {cert.examMinutes} min cronometrados, como el examen real.
            </small>
          </button>
          <button className="mode" onClick={() => onStart('quick')}>
            <span className="mode-icon">25</span>
            <b>Sesion rapida · 25 preg</b>
            <small>Sin cronometro. Feedback tras cada respuesta.</small>
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
                ? `${wrongN} preguntas necesitan ${REVIEW_PASSES_REQUIRED} aciertos.`
                : 'Aun no tienes fallos guardados.'}
            </small>
          </button>
          <button
            className="mode marked-mode"
            onClick={() => (markedN ? onStart('marked') : null)}
            disabled={!markedN}
          >
            <span className="mode-icon">?</span>
            <b>Marcadas / dudosas</b>
            <small>
              {markedN
                ? `${markedN} preguntas guardadas para revisar.`
                : 'Marca dudas durante una sesion.'}
            </small>
          </button>
          <button className="mode" onClick={() => setShowDom((s) => !s)}>
            <span className="mode-icon">D</span>
            <b>Por dominio</b>
            <small>Enfocate en un area concreta del temario.</small>
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
          copia de seguridad o llevarlo a otro equipo.
        </p>
      </div>
    </div>
  );
}
