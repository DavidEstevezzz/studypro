// Lógica pura del material de estudio: trocea el temario por objetivos,
// convierte el glosario en entradas y el test rápido en tarjetas.
// Sin dependencias del navegador para poder probarla con node --test.

// Slug al estilo GitHub para que los enlaces #ancla del Markdown funcionen
// igual en GitHub y en la app.
export function createSlugger() {
  const seen = new Map();
  return (text) => {
    const base = plainText(text)
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s/g, '-');
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}

export function plainText(md) {
  return md
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '');
}

function stripCodeFences(lines) {
  let inFence = false;
  return lines.map((line) => {
    if (/^```/.test(line)) inFence = !inFence;
    return inFence || /^```/.test(line) ? null : line;
  });
}

// Divide el temario por encabezados de nivel 2. Lo anterior al primero es la
// introducción. Cada sección conoce los anclas de sus encabezados para poder
// resolver enlaces internos entre secciones.
export function splitSections(md) {
  const lines = md.split('\n');
  const visible = stripCodeFences(lines);
  const slug = createSlugger();
  const sections = [];
  let current = { id: 'intro', title: 'Introducción', short: 'Intro', lines: [], anchors: [], headings: [] };

  lines.forEach((line, i) => {
    const m = visible[i] !== null && /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) {
      const depth = m[1].length;
      const text = m[2].trim();
      const id = slug(text);
      if (depth === 2) {
        sections.push(current);
        const short = /^(\d+\.\d+)\b/.exec(text)?.[1] ?? null;
        current = { id, title: plainText(text), short, lines: [], anchors: [], headings: [] };
      } else if (depth === 3) {
        current.headings.push({ id, title: plainText(text) });
      }
      if (depth === 1) return;
      current.anchors.push(id);
    }
    current.lines.push(line);
  });
  sections.push(current);

  return sections
    .map(({ lines: ls, ...s }) => ({ ...s, md: ls.join('\n').trim().replace(/(\n+-{3,})+$/, '').trim() }))
    .filter((s) => s.md.length > 0);
}

const OBJECTIVE = /^\d+\.\d+$/;

// Formato de cada entrada del glosario:
//   - **Term** — *traducción* · 1.3 — Definición
//   - **Term** · 1.3/1.6 — Definición
export function parseGlossary(md) {
  const entries = [];
  let letter = null;
  for (const line of md.split('\n')) {
    const h = /^##\s+(.+)$/.exec(line);
    if (h) {
      letter = h[1].trim();
      continue;
    }
    const m = /^-\s+\*\*(.+?)\*\*\s*(.*)$/.exec(line);
    if (!m || !letter) continue;
    let rest = m[2];
    let es = null;
    const esMatch = /^—\s*\*([^*]+)\*\s*/.exec(rest);
    if (esMatch) {
      es = esMatch[1].trim();
      rest = rest.slice(esMatch[0].length);
    }
    let objectives = [];
    let note = null;
    const objMatch = /^(.*?)·\s*(\d+\.\d+(?:\s*\/\s*\d+\.\d+)*)\s+—\s*/.exec(rest);
    if (objMatch) {
      note = objMatch[1].replace(/⚠️/g, '').trim() || null;
      objectives = objMatch[2].split('/').map((o) => o.trim()).filter((o) => OBJECTIVE.test(o));
      rest = rest.slice(objMatch[0].length);
    } else {
      rest = rest.replace(/^—\s*/, '');
    }
    const term = m[1].trim();
    entries.push({
      id: createSlugger()(term),
      letter,
      term,
      note,
      es,
      objectives,
      definition: rest.trim(),
      volatile: /⚠️/.test(line),
    });
  }
  return entries;
}

// Claves de búsqueda de un término: el término completo y sus variantes
// sin paréntesis («Auto-resume (AUTO_RESUME)» → «auto-resume», «auto_resume»).
export function termKeys(term) {
  const clean = (s) => plainText(s).replace(/⚠️/g, '').trim().toLowerCase();
  const keys = new Set([clean(term)]);
  const paren = /^(.*?)\s*\(([^)]+)\)\s*(.*)$/.exec(term);
  if (paren) {
    keys.add(clean(`${paren[1]} ${paren[3]}`));
    keys.add(clean(paren[2]));
  }
  for (const part of term.split(/\s+\/\s+/)) keys.add(clean(part));
  return [...keys].filter((k) => k.length > 1);
}

export function glossaryIndex(entries) {
  const index = new Map();
  for (const e of entries) for (const k of termKeys(e.note ? `${e.term} ${e.note}` : e.term)) if (!index.has(k)) index.set(k, e);
  return index;
}

// Normaliza el texto de un <strong> del temario para buscarlo en el índice.
export function lookupKey(text) {
  return text.replace(/⚠️/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

// Tarjetas a partir de la tabla «| # | Obj. | Question | Answer |».
export function parseSelfTest(md) {
  const cards = [];
  for (const line of md.split('\n')) {
    const m = /^\|\s*(\d+)\s*\|\s*(\d+\.\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/.exec(line);
    if (m) cards.push({ n: Number(m[1]), objective: m[2], q: m[3], a: m[4] });
  }
  return cards;
}

export function matchesQuery(entry, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [entry.term, entry.es ?? '', entry.definition]
    .some((s) => plainText(s).toLowerCase().includes(q));
}
