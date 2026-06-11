import { useState, useEffect, useRef } from 'react';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import { isCorrect } from '../lib/quiz';

export default function Session({
  pool,
  progress,
  mode,
  examSeconds,
  onRecord,
  onMark,
  onFinish,
}) {
  const exam = mode === 'exam';
  const [idx, setIdx] = useState(0);

  // Tiempo por pregunta: se acumula al salir de cada una.
  const qStartRef = useRef(0);
  const timesRef = useRef(pool.map(() => 0));
  const startedAtRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    startedAtRef.current = now;
    qStartRef.current = now;
  }, []);

  function flushTime(forIdx) {
    timesRef.current[forIdx] += (Date.now() - qStartRef.current) / 1000;
    qStartRef.current = Date.now();
  }

  return exam ? (
    <ExamSession
      pool={pool}
      progress={progress}
      examSeconds={examSeconds}
      idx={idx}
      setIdx={setIdx}
      flushTime={flushTime}
      timesRef={timesRef}
      startedAtRef={startedAtRef}
      onMark={onMark}
      onFinish={onFinish}
    />
  ) : (
    <PracticeSession
      pool={pool}
      progress={progress}
      idx={idx}
      setIdx={setIdx}
      flushTime={flushTime}
      timesRef={timesRef}
      startedAtRef={startedAtRef}
      onRecord={onRecord}
      onMark={onMark}
      onFinish={onFinish}
    />
  );
}

// Modo práctica: feedback inmediato tras cada pregunta (como antes).
function PracticeSession({
  pool,
  progress,
  idx,
  setIdx,
  flushTime,
  timesRef,
  startedAtRef,
  onRecord,
  onMark,
  onFinish,
}) {
  const [ok, setOk] = useState(0);
  const [answers, setAnswers] = useState([]);

  const q = pool[idx];

  function handleAnswered(correct, picked) {
    flushTime(idx);
    const entry = {
      id: q.i,
      d: q.d,
      ok: correct,
      picked,
      correct: q.c,
      question: q.q,
      options: q.o,
      explanation: q.e,
      ref: q.r,
      seconds: timesRef.current[idx],
    };
    setOk((v) => v + (correct ? 1 : 0));
    setAnswers((a) => [...a, entry]);
    onRecord(q, correct);
  }

  function finish(currentAnswers, currentOk) {
    onFinish({
      answers: currentAnswers,
      ok: currentOk,
      total: currentAnswers.length,
      durationMs: Date.now() - startedAtRef.current,
    });
  }

  function next() {
    if (idx === pool.length - 1) {
      finish(answers, ok);
    } else {
      // El tiempo de respuesta ya se volcó en handleAnswered; esto solo
      // descarta el rato leyendo la explicación y arranca el cronómetro
      // de la siguiente pregunta.
      flushTime(idx);
      timesRef.current[idx + 1] = 0;
      setIdx((i) => i + 1);
    }
  }

  return (
    <div className="session">
      <div className="session-bar">
        <span className="progress">
          Pregunta {idx + 1} de {pool.length}
        </span>
        <span className="progress">
          Acierto: <b>{ok}/{answers.length}</b>
        </span>
      </div>

      <QuestionCard
        question={q}
        progress={progress}
        onAnswered={handleAnswered}
        onMark={onMark}
        onNext={next}
        isLast={idx === pool.length - 1}
      />

      <button
        className="btn btn-ghost end-btn"
        onClick={() => {
          if (!confirm('¿Terminar la sesion ahora?')) return;
          finish(answers, ok);
        }}
      >
        Terminar ahora
      </button>
    </div>
  );
}

// Modo examen: sin feedback ni acierto en vivo, navegación libre,
// señalar preguntas para revisar y corrección completa al final
// (las no respondidas cuentan como fallo, como en el examen real).
function ExamSession({
  pool,
  progress,
  examSeconds,
  idx,
  setIdx,
  flushTime,
  timesRef,
  startedAtRef,
  onMark,
  onFinish,
}) {
  const [responses, setResponses] = useState(() => pool.map(() => []));
  const [flagged, setFlagged] = useState(() => new Set());
  const [elapsed, setElapsed] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const answeredCount = responses.filter((r) => r.length > 0).length;
  const secondsLeft = examSeconds - elapsed;

  // Ritmo: cuántas preguntas deberías llevar respondidas a este minuto.
  const expected = Math.min(
    pool.length,
    Math.floor(elapsed / (examSeconds / pool.length))
  );
  const paceDiff = answeredCount - expected;

  function finishExam(auto = false) {
    if (finishedRef.current) return;
    if (!auto) {
      const left = pool.length - answeredCount;
      const msg = left
        ? `Te quedan ${left} preguntas sin responder y contaran como fallo. ¿Corregir ya?`
        : '¿Corregir el examen?';
      if (!confirm(msg)) return;
    }
    finishedRef.current = true;
    flushTime(idx);

    const answers = pool.map((q, i) => ({
      id: q.i,
      d: q.d,
      ok: responses[i].length > 0 && isCorrect(q, responses[i]),
      picked: responses[i],
      correct: q.c,
      question: q.q,
      options: q.o,
      explanation: q.e,
      ref: q.r,
      seconds: timesRef.current[i],
    }));

    onFinish({
      answers,
      ok: answers.filter((a) => a.ok).length,
      total: pool.length,
      durationMs: Date.now() - startedAtRef.current,
    });
  }

  useEffect(() => {
    if (secondsLeft <= 0) finishExam(true);
  });

  function goTo(i) {
    if (i < 0 || i >= pool.length) return;
    flushTime(idx);
    setIdx(i);
  }

  function pick(selection) {
    setResponses((prev) => {
      const next = [...prev];
      next[idx] = selection;
      return next;
    });
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  const q = pool[idx];

  return (
    <div className="session">
      <div className="session-bar">
        <span className="progress">
          Pregunta {idx + 1} de {pool.length} · {answeredCount} respondidas
        </span>
        <Timer secondsLeft={secondsLeft} />
        <span
          className={`pace ${paceDiff < 0 ? 'behind' : 'ahead'}`}
          title="Respondidas frente al ritmo necesario para acabar a tiempo"
        >
          Ritmo {paceDiff >= 0 ? `+${paceDiff}` : paceDiff}
        </span>
      </div>

      <QuestionCard
        question={q}
        progress={progress}
        onMark={onMark}
        exam
        examPicked={responses[idx]}
        onPick={pick}
      />

      <div className="exam-nav">
        <button
          className="btn btn-ghost"
          disabled={idx === 0}
          onClick={() => goTo(idx - 1)}
        >
          ← Anterior
        </button>
        <button
          className={`btn btn-ghost flag-btn ${flagged.has(idx) ? 'on' : ''}`}
          onClick={toggleFlag}
        >
          {flagged.has(idx) ? 'Señalada ⚑' : 'Señalar para revisar'}
        </button>
        <button
          className="btn btn-primary"
          disabled={idx === pool.length - 1}
          onClick={() => goTo(idx + 1)}
        >
          Siguiente →
        </button>
      </div>

      <div className="card palette-card">
        <div className="eyebrow mb">Mapa del examen</div>
        <div className="palette">
          {pool.map((_, i) => {
            let cls = 'pq';
            if (responses[i].length) cls += ' answered';
            if (flagged.has(i)) cls += ' flagged';
            if (i === idx) cls += ' current';
            return (
              <button key={i} className={cls} onClick={() => goTo(i)}>
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="palette-legend">
          <span><i className="pq-dot answered" /> respondida</span>
          <span><i className="pq-dot flagged" /> señalada</span>
          <span><i className="pq-dot" /> pendiente</span>
        </div>
      </div>

      <button className="btn btn-ghost end-btn" onClick={() => finishExam()}>
        Corregir examen
      </button>
    </div>
  );
}
