// Persistencia local del progreso, separada por certificación.
// No requiere backend: cada usuario guarda su avance en su propio navegador.

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
  return { domStat, wrongIds: [], sessions: [] };
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
