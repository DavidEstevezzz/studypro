import { useState, useCallback } from 'react';
import QuestionCard from './QuestionCard';
import Timer from './Timer';

export default function Session({ pool, timed, examSeconds, onRecord, onFinish }) {
  const [idx, setIdx] = useState(0);
  const [ok, setOk] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [expired, setExpired] = useState(false);

  const q = pool[idx];

  const handleAnswered = useCallback(
    (correct) => {
      setOk((v) => v + (correct ? 1 : 0));
      setAnswers((a) => [...a, { id: q.i, d: q.d, ok: correct }]);
      onRecord(q, correct);
    },
    [q, onRecord]
  );

  function next() {
    if (idx === pool.length - 1) {
      onFinish({ answers: [...answers], ok });
    } else {
      setIdx((i) => i + 1);
    }
  }

  const handleExpire = useCallback(() => {
    if (!expired) {
      setExpired(true);
      onFinish({ answers: [...answers], ok });
    }
  }, [expired, answers, ok, onFinish]);

  return (
    <div className="session">
      <div className="session-bar">
        <span className="progress">
          Pregunta {idx + 1} de {pool.length}
        </span>
        {timed && <Timer seconds={examSeconds} onExpire={handleExpire} />}
        <span className="progress">
          Acierto: <b>{ok}/{idx + (answers.length > idx ? 1 : 0)}</b>
        </span>
      </div>

      <QuestionCard
        question={q}
        onAnswered={handleAnswered}
        onNext={next}
        isLast={idx === pool.length - 1}
      />

      <button className="btn btn-ghost end-btn" onClick={() => onFinish({ answers, ok })}>
        Terminar ahora
      </button>
    </div>
  );
}
