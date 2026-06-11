import Strata from './Strata';

export default function Results({
  result,
  mode,
  cert,
  domains,
  domStat,
  onHome,
  onReview,
  onMarked,
  hasWrong,
  hasMarked,
}) {
  const done = result.answers.length;
  const pct = done ? Math.round((result.ok / done) * 100) : 0;
  const pass = pct >= cert.passThreshold;
  const wrongAnswers = result.answers.filter((a) => !a.ok);

  const byDom = {};
  result.answers.forEach((a) => {
    byDom[a.d] = byDom[a.d] || { s: 0, o: 0 };
    byDom[a.d].s++;
    if (a.ok) byDom[a.d].o++;
  });

  const verdict =
    mode === 'exam'
      ? pass
        ? 'Aprobarias. Manten este nivel en varios simulacros antes del examen real.'
        : 'Por debajo del umbral. Repasa los dominios flojos y vuelve a intentarlo.'
      : pass
        ? 'Buen nivel en esta sesion.'
        : 'Sigue practicando este bloque.';

  return (
    <div className="results">
      <div className="card center result-hero">
        <div className="eyebrow">Resultado de la sesion</div>
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
        <div className="section-head">
          <div>
            <div className="eyebrow mb">Revision guiada</div>
            <h2>
              {wrongAnswers.length
                ? `${wrongAnswers.length} preguntas para mirar con calma`
                : 'Sesion limpia'}
            </h2>
          </div>
        </div>
        <div className="review-list">
          {result.answers.map((answer, index) => (
            <ReviewItem key={`${answer.id}-${index}`} answer={answer} />
          ))}
        </div>
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
            Test de errores
          </button>
        )}
        {hasMarked && (
          <button className="btn btn-ghost" onClick={onMarked}>
            Repasar marcadas
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewItem({ answer }) {
  const pickedText = answer.picked?.length
    ? answer.picked
        .map((i) => `${String.fromCharCode(65 + i)}. ${answer.options[i]}`)
        .join(' / ')
    : 'Sin responder';
  const correctText = answer.correct
    .map((i) => `${String.fromCharCode(65 + i)}. ${answer.options[i]}`)
    .join(' / ');
  const ref = answer.ref ? answer.ref.split(',')[0].trim() : null;

  return (
    <details className={`review-item ${answer.ok ? 'ok' : 'miss'}`}>
      <summary>
        <span className="review-status">{answer.ok ? 'OK' : 'Fallo'}</span>
        <span>{answer.question}</span>
      </summary>
      <div className="review-body">
        <div className="review-line">
          <b>Tu respuesta</b>
          <span>{pickedText}</span>
        </div>
        <div className="review-line">
          <b>Correcta</b>
          <span>{correctText}</span>
        </div>
        <p>{answer.explanation || 'Sin explicacion'}</p>
        {ref && (
          <a className="ref" href={ref} target="_blank" rel="noopener noreferrer">
            Documentacion oficial →
          </a>
        )}
      </div>
    </details>
  );
}
