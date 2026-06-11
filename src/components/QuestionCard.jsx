import { useState, useEffect } from 'react';

export default function QuestionCard({ question, onAnswered, onNext, isLast }) {
  const [picked, setPicked] = useState([]);
  const [checked, setChecked] = useState(false);
  const multi = question.n > 1;

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
    onAnswered(ok);
  }

  const lvl = question.lvl;
  const ref = question.r ? question.r.split(',')[0].trim() : null;

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
      </div>

      <p className="qtext">{question.q}</p>
      {multi && (
        <p className="hint">
          Selecciona {question.n}
          {question.p ? ' (respuestas muy parecidas, fíjate bien)' : ''}
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
        <div className="expl">
          {question.e || '(sin explicación)'}
          {ref && (
            <a className="ref" href={ref} target="_blank" rel="noopener noreferrer">
              Documentación oficial →
            </a>
          )}
        </div>
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
