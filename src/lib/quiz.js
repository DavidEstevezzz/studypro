// Lógica pura de las sesiones de estudio: nada de UI aquí.

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleChoices(question) {
  const correct = new Set(question.c);
  const choices = shuffle(
    question.o.map((text, originalIndex) => ({
      text,
      originalIndex,
    }))
  );

  return {
    ...question,
    o: choices.map((choice) => choice.text),
    c: choices.flatMap((choice, index) =>
      correct.has(choice.originalIndex) ? [index] : []
    ),
  };
}

export function domainsOf(questions) {
  return [...new Set(questions.map((q) => q.d))];
}

export function buildPool(mode, questions, opts = {}) {
  let pool;

  switch (mode) {
    case 'exam':
      pool = shuffle(questions).slice(0, opts.count ?? 100);
      break;
    case 'quick':
      pool = shuffle(questions).slice(0, opts.count ?? 25);
      break;
    case 'wrong': {
      const set = new Set(opts.wrongIds ?? []);
      pool = shuffle(questions.filter((q) => set.has(q.i)));
      break;
    }
    case 'domain':
      pool = shuffle(questions.filter((q) => q.d === opts.domain)).slice(
        0,
        opts.count ?? 30
      );
      break;
    default:
      pool = shuffle(questions).slice(0, 25);
  }

  return pool.map(shuffleChoices);
}

export function isCorrect(question, picked) {
  const correct = question.c;
  return (
    correct.length === picked.length &&
    correct.every((c) => picked.includes(c))
  );
}

export function applyAnswer(progress, question, ok) {
  const domStat = { ...progress.domStat };
  const d = question.d;
  domStat[d] = {
    seen: (domStat[d]?.seen ?? 0) + 1,
    ok: (domStat[d]?.ok ?? 0) + (ok ? 1 : 0),
  };
  let wrongIds = [...progress.wrongIds];
  const idx = wrongIds.indexOf(question.i);
  if (!ok && idx < 0) wrongIds.push(question.i);
  if (ok && idx >= 0) wrongIds.splice(idx, 1);
  return { ...progress, domStat, wrongIds };
}

export function overall(progress) {
  let seen = 0;
  let ok = 0;
  Object.values(progress.domStat).forEach((s) => {
    seen += s.seen;
    ok += s.ok;
  });
  return { seen, ok, pct: seen ? Math.round((ok / seen) * 100) : 0 };
}
