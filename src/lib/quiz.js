// Lógica pura de las sesiones de estudio: nada de UI aquí.

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function domainsOf(questions) {
  return [...new Set(questions.map((q) => q.d))];
}

// Construye el pool de preguntas para un modo dado.
export function buildPool(mode, questions, opts = {}) {
  switch (mode) {
    case 'exam':
      return shuffle(questions).slice(0, opts.count ?? 100);
    case 'quick':
      return shuffle(questions).slice(0, opts.count ?? 25);
    case 'wrong': {
      const set = new Set(opts.wrongIds ?? []);
      return shuffle(questions.filter((q) => set.has(q.i)));
    }
    case 'domain':
      return shuffle(questions.filter((q) => q.d === opts.domain)).slice(
        0,
        opts.count ?? 30
      );
    default:
      return shuffle(questions).slice(0, 25);
  }
}

// ¿Es correcta la selección frente a la respuesta esperada?
export function isCorrect(question, picked) {
  const correct = question.c;
  return (
    correct.length === picked.length &&
    correct.every((c) => picked.includes(c))
  );
}

// Aplica el resultado de una respuesta al estado de progreso (inmutable).
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
  let seen = 0,
    ok = 0;
  Object.values(progress.domStat).forEach((s) => {
    seen += s.seen;
    ok += s.ok;
  });
  return { seen, ok, pct: seen ? Math.round((ok / seen) * 100) : 0 };
}
