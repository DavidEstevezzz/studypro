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
    version: 2,
    domStat,
    wrongIds: [],
    markedIds: [],
    byQuestion: {},
    sessions: [],
  };
}

export function normalizeProgress(progress, domains) {
  const base = emptyProgress(domains);
  if (!progress || typeof progress !== 'object') return base;

  const domStat = { ...base.domStat };
  Object.entries(progress.domStat ?? {}).forEach(([domain, stat]) => {
    domStat[domain] = {
      seen: Number(stat?.seen ?? 0),
      ok: Number(stat?.ok ?? 0),
    };
  });

  return {
    ...base,
    ...progress,
    version: 2,
    domStat,
    wrongIds: uniqueIds(progress.wrongIds),
    markedIds: uniqueIds(progress.markedIds),
    byQuestion: progress.byQuestion ?? {},
    sessions: Array.isArray(progress.sessions) ? progress.sessions : [],
  };
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
