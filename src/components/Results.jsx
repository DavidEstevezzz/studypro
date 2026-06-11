import Strata from './Strata';

export default function Results({
  result,
  mode,
  cert,
  domains,
  domStat,
  onHome,
  onReview,
  hasWrong,
}) {
  const done = result.answers.length;
  const pct = done ? Math.round((result.ok / done) * 100) : 0;
  const pass = pct >= cert.passThreshold;

  const byDom = {};
  result.answers.forEach((a) => {
    byDom[a.d] = byDom[a.d] || { s: 0, o: 0 };
    byDom[a.d].s++;
    if (a.ok) byDom[a.d].o++;
  });

  const verdict =
    mode === 'exam'
      ? pass
        ? 'Aprobarías. Mantén este nivel en varios simulacros antes del examen real.'
        : 'Por debajo del umbral. Repasa los dominios flojos y vuelve a intentarlo.'
      : pass
        ? 'Buen nivel en esta sesión.'
        : 'Sigue practicando este bloque.';

  return (
    <div className="results">
      <div className="card center result-hero">
        <div className="eyebrow">Resultado de la sesión</div>
        <div className={`score-big ${pass ? 'pass' : 'fail'}`}>{pct}%</div>
        <p className="verdict">
          {result.ok} de {done} correctas. {verdict}
        </p>
      </div>

      <div className="card">
        <div className="eyebrow mb">Desglose por dominio</div>
        {Object.entries(byDom).map(([d, v]) => {
          const p = Math.round((v.o / v.s) * 100);
          return (
            <div className="statline" key={d}>
              <span>{d}</span>
              <span className={p >= cert.passThreshold ? 'good' : 'warn'}>
                {v.o}/{v.s} · {p}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="eyebrow mb">Tu dominio global (acumulado)</div>
        <Strata domains={domains} domStat={domStat} />
      </div>

      <div className="row">
        <button className="btn btn-primary" onClick={onHome}>
          Volver al inicio
        </button>
        {hasWrong && (
          <button className="btn btn-ghost" onClick={onReview}>
            Repasar los fallos
          </button>
        )}
      </div>
    </div>
  );
}
