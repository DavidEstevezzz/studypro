// Progreso y preferencias del material de estudio, en localStorage.
// Todo acceso va protegido: en modo privado o con el almacenamiento
// bloqueado la app sigue funcionando sin guardar.

const KEY = 'studypro.study.v1';

export const DEFAULT_PREFS = { theme: 'light', font: 'sans', size: 17, width: 'normal' };

export function emptyGuideState() {
  return { read: {}, last: null, cards: {}, starred: [] };
}

export function loadStudy() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    return {
      prefs: { ...DEFAULT_PREFS, ...(raw?.prefs ?? {}) },
      guides: raw?.guides ?? {},
    };
  } catch {
    return { prefs: { ...DEFAULT_PREFS }, guides: {} };
  }
}

export function saveStudy(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Sin almacenamiento disponible: el progreso dura lo que la pestaña.
  }
}

export function guideState(state, key) {
  return { ...emptyGuideState(), ...(state.guides[key] ?? {}) };
}

export function guideSummary(state, key, sectionCount, cardCount) {
  const g = guideState(state, key);
  const read = Object.keys(g.read).length;
  const known = Object.values(g.cards).filter((c) => c.known).length;
  return { read, sectionCount, known, cardCount, last: g.last };
}
