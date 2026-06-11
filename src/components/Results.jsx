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
  const total = result.total ?? result.answers.length;
  const pct = total ? Math.round((result.ok / total) * 100) : 0;
  const pass = pct >= cert.passThreshold;
  const wrongAnswers = result.answers.filter((a) => !a.ok);
  const unanswered = result.answers.filter((a) => !a.picked?.length).length;

  const minutes = result.durationMs
    ? Math.max(1, Math.round(result.durationMs / 60000))
    : null;
  const timedAnswers = result.answers.filter((a) => a.seconds > 0);
  const avgSeconds = timedAnswers.length
    ? Math.round(
        timedAnswers.reduce((s, a) => s + a.seconds, 0) / timedAnswers.length
      )
    : null;

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
          {result.ok} de {total} correctas
          {unanswered > 0 && ` (${unanswered} sin responder, cuentan como fallo)`}
          . {verdict}
        </p>
        {(minutes !== null || avgSeconds !== null) && (
          <p className="time-note">
            {minutes !== null && `${minutes} min en total`}
            {minutes !== null && avgSeconds !== null && ' · '}
            {avgSeconds !== null && `${avgSeconds} s por pregunta de media`}
            {mode === 'exam' &&
              avgSeconds !== null &&
              ` (el examen real da ~${Math.round((cert.examMinutes * 60) / cert.examQuestions)} s)`}
          </p>
        )}
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
        <span className="review-status">
          {answer.ok ? 'OK' : answer.picked?.length ? 'Fallo' : 'En blanco'}
        </span>
        <span>
          {answer.question}
          {answer.seconds > 0 && (
            <small className="review-time"> · {Math.round(answer.seconds)} s</small>
          )}
        </span>
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
