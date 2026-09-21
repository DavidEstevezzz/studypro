// Local progress, scoped by certification. No backend required.

const KEY = (certId) => `studypro:${certId}`;

export function loadProgress(certId) {
  try {
    const raw = localStorage.getItem(KEY(certId));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProgress(certId, state) {
  try {
    localStorage.setItem(KEY(certId), JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress(certId) {
  try {
    localStorage.removeItem(KEY(certId));
  } catch {
    /* ignore */
  }
}

export function emptyProgress(domains) {
  const domStat = {};
  domains.forEach((d) => (domStat[d] = { seen: 0, ok: 0 }));
  return {
    version: 3,
    domStat,
    wrongIds: [],
    markedIds: [],
    byQuestion: {},
    sessions: [],
  };
}

export function normalizeProgress(progress, domains, questions = [], bankVersion) {
  const base = emptyProgress(domains);
  if (!progress || typeof progress !== 'object') return { ...base, bankVersion };

  const domStat = { ...base.domStat };
  Object.entries(progress.domStat ?? {}).forEach(([domain, stat]) => {
    domStat[domain] = {
      seen: Number(stat?.seen ?? 0),
      ok: Number(stat?.ok ?? 0),
    };
  });

  const normalized = {
    ...base,
    ...progress,
    version: 3,
    domStat,
    wrongIds: uniqueIds(progress.wrongIds),
    markedIds: uniqueIds(progress.markedIds),
    byQuestion: progress.byQuestion ?? {},
    sessions: Array.isArray(progress.sessions) ? progress.sessions : [],
  };
  if (!bankVersion || !questions.length || progress.bankVersion === bankVersion) return normalized;

  // Preserve legacy summaries and all question histories, even for withdrawn IDs.
  const byQuestion = structuredClone(normalized.byQuestion);
  const questionMap = new Map(questions.map((q) => [String(q.i), q]));
  const migratedDomStat = { ...base.domStat };
  for (const [id, stat] of Object.entries(byQuestion)) {
    const question = questionMap.get(id);
    if (!question) continue;
    stat.domain = question.d;
    const domain = migratedDomStat[question.d] ?? { seen: 0, ok: 0 };
    migratedDomStat[question.d] = {
      seen: domain.seen + Number(stat.seen ?? 0),
      ok: domain.ok + Number(stat.ok ?? 0),
    };
    if (question.contentRevision && stat.contentRevision !== question.contentRevision) {
      stat.previousMastery = { streak: stat.streak, mastered: stat.mastered, srsLevel: stat.srsLevel };
      Object.assign(stat, { streak: 0, mastered: false, srsLevel: 0, due: 0, reviewPasses: [], contentRevision: question.contentRevision });
    }
  }
  return { ...normalized, version: 3, bankVersion, byQuestion, domStat: migratedDomStat,
    legacyDomStat: normalized.legacyDomStat ?? normalized.domStat };
}

export function backupBeforeMigration(certId, progress, bankVersion) {
  if (!progress || !bankVersion || progress.bankVersion === bankVersion) return;
  const key = `studypro:backup:${certId}:${bankVersion}`;
  try {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // In-memory migration also retains old summaries and question histories.
  }
}

export function exportAll() {
  const dump = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('studypro:')) dump[k] = localStorage.getItem(k);
  }
  return JSON.stringify({ app: 'studypro', version: 1, data: dump }, null, 2);
}

export function importAll(jsonString) {
  const parsed = JSON.parse(jsonString);
  if (parsed.app !== 'studypro') throw new Error('Archivo no reconocido');
  Object.entries(parsed.data).forEach(([k, v]) => localStorage.setItem(k, v));
}

function uniqueIds(ids) {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.map(Number).filter(Number.isFinite))];
}
