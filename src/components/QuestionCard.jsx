import { useState, useEffect } from 'react';
import { getQuestionStats, isMarked } from '../lib/quiz';

export default function QuestionCard({
  question,
  progress,
  onAnswered,
  onMark,
  onNext,
  isLast,
}) {
  const [picked, setPicked] = useState([]);
  const [checked, setChecked] = useState(false);
  const multi = question.n > 1;
  const marked = progress ? isMarked(progress, question.i) : false;
  const stats = progress ? getQuestionStats(progress, question.i) : null;

  useEffect(() => {
    setPicked([]);
    setChecked(false);
  }, [question]);

  function toggle(i) {
    if (checked) return;
    if (multi) {
      setPicked((p) =>
        p.includes(i)
          ? p.filter((x) => x !== i)
          : p.length < question.n
            ? [...p, i]
            : p
      );
    } else {
      setPicked([i]);
    }
  }

  function check() {
    const correct = question.c;
    const ok =
      correct.length === picked.length &&
      correct.every((c) => picked.includes(c));
    setChecked(true);
    onAnswered(ok, picked);
  }

  const lvl = question.lvl;
  const ref = question.r ? question.r.split(',')[0].trim() : null;
  const correctText = question.c
    .map((i) => `${String.fromCharCode(65 + i)}. ${question.o[i]}`)
    .join(' / ');

  return (
    <div className="card question-card">
      <div className="qmeta">
        <span>
          <span className="dom-tag">{question.d}</span>{' '}
          {lvl && (
            <span className={`lvl lvl-${lvl}`}>
              {lvl === 'core' ? 'core · cae seguro' : 'extra · bueno saberlo'}
            </span>
          )}
        </span>
        <button
          className={`mark-btn ${marked ? 'on' : ''}`}
          onClick={() => onMark(question.i)}
          type="button"
        >
          {marked ? 'Marcada' : 'Marcar duda'}
        </button>
      </div>

      {stats && (
        <div className="qhistory">
          Vista {stats.seen} veces · {stats.ok}/{stats.seen} aciertos · racha{' '}
          {stats.streak}
        </div>
      )}

      <p className="qtext">{question.q}</p>
      {multi && (
        <p className="hint">
          Selecciona {question.n}
          {question.p ? ' (respuestas muy parecidas, fijate bien)' : ''}
        </p>
      )}

      <div className="opts">
        {question.o.map((opt, i) => {
          let cls = 'opt';
          if (checked) {
            if (question.c.includes(i)) cls += ' correct';
            else if (picked.includes(i)) cls += ' wrong';
          } else if (picked.includes(i)) {
            cls += ' sel';
          }
          return (
            <button key={i} className={cls} onClick={() => toggle(i)}>
              <span className="mk">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {checked && (
        <>
          <div className="answer-summary">
            <b>Respuesta correcta</b>
            <span>{correctText}</span>
          </div>
          <div className="expl">
            {question.e || '(sin explicacion)'}
            {ref && (
              <a className="ref" href={ref} target="_blank" rel="noopener noreferrer">
                Documentacion oficial →
              </a>
            )}
          </div>
        </>
      )}

      <div className="card-foot">
        {!checked ? (
          <button
            className="btn btn-ghost"
            disabled={picked.length === 0}
            onClick={check}
          >
            Comprobar
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onNext}>
            {isLast ? 'Terminar' : 'Siguiente'}
          </button>
        )}
      </div>
    </div>
  );
}
