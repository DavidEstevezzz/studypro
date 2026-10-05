import { Marked } from 'marked';
import { createSlugger } from './parse';

const VOLATILE = '<span class="volatile" title="Dato que cambia a menudo: compruébalo en la documentación vigente">⚠️</span>';

// Renderiza una sección del temario. Los ids de encabezado vienen de
// splitSections (calculados sobre el documento entero), así que los enlaces
// internos coinciden aunque cada sección se pinte por separado.
export function renderSection(md, anchors = []) {
  const slug = createSlugger();
  let next = 0;
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const id = anchors[next++] ?? slug(html);
        const trap = /Exam traps/i.test(html) ? ' class="traps-head"' : '';
        return `<h${depth} id="${id}"${trap}>${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:/i.test(href);
        const t = title ? ` title="${title}"` : '';
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noreferrer">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  return decorate(marked.parse(md));
}

export function renderInline(md) {
  return decorate(new Marked({ gfm: true }).parseInline(md));
}

function decorate(html) {
  return html
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/⚠️/g, VOLATILE)
    .replace(/❌/g, '<span class="mark-no" aria-label="Incorrecto">✕</span>')
    .replace(/✅/g, '<span class="mark-yes" aria-label="Correcto">✓</span>');
}
