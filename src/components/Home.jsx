import { useState } from 'react';
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

  const ov = overall(progress);
  const wrongN = progress.wrongIds.length;

  return (
    <div className="home">
      <header className="masthead">
        <div className="eyebrow">{cert.provider} · entrenamiento</div>
        <h1>{cert.name}</h1>
        <p className="lede">{cert.blurb}</p>
      </header>

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

      <div className="card">
        <Strata domains={domains} domStat={progress.domStat} />
        <p className="note">
          {ov.seen
            ? `Llevas ${ov.seen} respuestas · ${ov.pct}% de acierto global. ${
                ov.pct >= cert.passThreshold
                  ? 'Estás en zona de aprobado.'
                  : `Apunta a ≥${cert.passThreshold}% sostenido antes de examinarte.`
              }`
            : 'Aún no has practicado. Empieza por un simulacro o una sesión rápida.'}
        </p>
      </div>

      <div className="card">
        <div className="eyebrow mb">Elige modo</div>
        <div className="modes">
          <button className="mode" onClick={() => onStart('exam')}>
            <b>Simulacro · {cert.examQuestions} preg</b>
            <small>
              {cert.examMinutes} min cronometrados, como el examen real.
            </small>
          </button>
          <button className="mode" onClick={() => onStart('quick')}>
            <b>Sesión rápida · 25 preg</b>
            <small>Sin cronómetro. Feedback tras cada respuesta.</small>
          </button>
          <button
            className="mode"
            onClick={() => (wrongN ? onStart('wrong') : null)}
            disabled={!wrongN}
          >
            <b>Repasar fallos</b>
            <small>
              {wrongN
                ? `${wrongN} preguntas pendientes de repaso.`
                : 'Aún no tienes fallos guardados.'}
            </small>
          </button>
          <button className="mode" onClick={() => setShowDom((s) => !s)}>
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
