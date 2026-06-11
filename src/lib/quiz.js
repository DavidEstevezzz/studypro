export const REVIEW_PASSES_REQUIRED = 2;

const DAY = 24 * 60 * 60 * 1000;

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
    originalChoices: question.o,
    originalCorrect: question.c,
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
    case 'marked': {
      const set = new Set(opts.markedIds ?? []);
      pool = shuffle(questions.filter((q) => set.has(q.i)));
      break;
    }
    case 'smart':
      pool = buildSmartPool(questions, opts.progress, opts.count ?? 30);
      break;
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

export function applyAnswer(progress, question, ok, opts = {}) {
  const now = opts.now ?? Date.now();
  const sessionId = opts.sessionId ?? `session-${now}`;
  const id = String(question.i);

  const domStat = { ...progress.domStat };
  const d = question.d;
  domStat[d] = {
    seen: (domStat[d]?.seen ?? 0) + 1,
    ok: (domStat[d]?.ok ?? 0) + (ok ? 1 : 0),
  };

  const byQuestion = { ...(progress.byQuestion ?? {}) };
  const prev = byQuestion[id] ?? {
    id: question.i,
    domain: d,
    seen: 0,
    ok: 0,
    wrong: 0,
    streak: 0,
    reviewPasses: [],
  };

  const wasInReview = (progress.wrongIds ?? []).includes(question.i);
  const reviewPasses = Array.isArray(prev.reviewPasses)
    ? [...prev.reviewPasses]
    : [];

  if (!ok) {
    reviewPasses.length = 0;
  } else if (wasInReview && !reviewPasses.includes(sessionId)) {
    reviewPasses.push(sessionId);
  }

  byQuestion[id] = {
    ...prev,
    id: question.i,
    domain: d,
    seen: prev.seen + 1,
    ok: prev.ok + (ok ? 1 : 0),
    wrong: prev.wrong + (ok ? 0 : 1),
    streak: ok ? prev.streak + 1 : 0,
    lastSeen: now,
    lastSessionId: sessionId,
    lastOk: ok ? now : prev.lastOk,
    lastWrong: ok ? prev.lastWrong : now,
    reviewPasses,
    mastered: ok && prev.streak + 1 >= 3 && reviewPasses.length === 0,
  };

  let wrongIds = [...(progress.wrongIds ?? [])];
  const idx = wrongIds.indexOf(question.i);
  if (!ok && idx < 0) wrongIds.push(question.i);
  if (ok && idx >= 0 && reviewPasses.length >= REVIEW_PASSES_REQUIRED) {
    wrongIds.splice(idx, 1);
  }

  return { ...progress, domStat, byQuestion, wrongIds };
}

export function toggleMarked(progress, questionId) {
  const id = Number(questionId);
  const markedIds = [...(progress.markedIds ?? [])];
  const idx = markedIds.indexOf(id);
  if (idx >= 0) markedIds.splice(idx, 1);
  else markedIds.push(id);
  return { ...progress, markedIds };
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

export function getQuestionStats(progress, questionId) {
  return progress.byQuestion?.[String(questionId)] ?? null;
}

export function isMarked(progress, questionId) {
  return (progress.markedIds ?? []).includes(Number(questionId));
}

function buildSmartPool(questions, progress, count) {
  if (!progress) return shuffle(questions).slice(0, count);

  const wrongSet = new Set(progress.wrongIds ?? []);
  const markedSet = new Set(progress.markedIds ?? []);
  const now = Date.now();

  const scored = questions.map((q) => {
    const st = getQuestionStats(progress, q.i);
    const domain = progress.domStat?.[q.d];
    const domainPct = domain?.seen ? Math.round((domain.ok / domain.seen) * 100) : null;
    const daysSinceSeen = st?.lastSeen ? (now - st.lastSeen) / DAY : Infinity;

    let score = Math.random();
    if (wrongSet.has(q.i)) score += 100;
    if (markedSet.has(q.i)) score += 70;
    if (!st?.seen) score += 45;
    if (domainPct !== null && domainPct < 75) score += 35;
    if (st?.seen && st.streak < 2) score += 25;
    if (daysSinceSeen > 14) score += 22;
    else if (daysSinceSeen > 7) score += 12;
    if (q.p) score += 8;
    if (q.lvl === 'core') score += 5;

    return { q, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.q);
}
