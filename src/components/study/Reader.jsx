import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import TermPopover from './TermPopover';
import { renderSection } from '../../study/markdown';
import { lookupKey, plainText } from '../../study/parse';

const SELFTEST = /^rapid-fire/;

function splitNumber(title) {
  const m = /^(\d+(?:\.\d+)+)\s+(.*)$/.exec(title);
  return m ? { num: m[1], text: m[2] } : { num: null, text: title };
}

function sectionLabel(s) {
  if (s.id === 'intro') return { num: '·', text: 'Introducción', eyebrow: 'Introducción' };
  if (SELFTEST.test(s.id)) return { num: '?', text: 'Autoevaluación rápida', eyebrow: 'Autoevaluación' };
  const { num, text } = splitNumber(s.title);
  return { num: num ?? '·', text, eyebrow: num ? `Objetivo ${num}` : 'Sección' };
}

export default function Reader({
  guide,
  sections,
  index,
  read,
  nav,
  onNavigate,
  onToggleRead,
  onAnchor,
  onOpenTerm,
  onOpenTab,
  onPractice,
}) {
  const pos = Math.max(0, sections.findIndex((s) => s.id === nav.section));
  const section = sections[pos];
  const prev = sections[pos - 1];
  const next = sections[pos + 1];
  const label = sectionLabel(section);
  const isSelfTest = SELFTEST.test(section.id);

  const html = useMemo(() => {
    const hasHead = section.id !== 'intro';
    const md = hasHead ? section.md.replace(/^##[^\n]*\n?/, '') : section.md;
    return renderSection(md, hasHead ? section.anchors.slice(1) : section.anchors);
  }, [section]);

  const minutes = useMemo(
    () => Math.max(1, Math.round(plainText(section.md).split(/\s+/).length / 200)),
    [section]
  );

  const articleRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(null);
  const [popover, setPopover] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  // El HTML se inyecta a mano (no con dangerouslySetInnerHTML) para que los
  // re-renders del scroll no reescriban el DOM decorado. Después se marcan
  // como consultables los términos del glosario en negrita o como código.
  useLayoutEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    root.innerHTML = html;
    root.querySelectorAll('strong, :not(pre) > code').forEach((el) => {
      if (el.closest('.gl-term') || el.closest('a')) return;
      const entry = index.get(lookupKey(el.textContent));
      if (!entry) return;
      el.classList.add('gl-term');
      el.dataset.term = lookupKey(el.textContent);
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${el.textContent}: ver definición`);
    });
  }, [html, index]);

  // Al cambiar de sección: ir al ancla pedida o al principio.
  useEffect(() => {
    setPopover(null);
    setTocOpen(false);
    setRevealAll(false);
    const target = nav.anchor && nav.anchor !== section.id && document.getElementById(nav.anchor);
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo({ top: 0 });
  }, [section.id, nav]);

  // Progreso de lectura y apartado activo (scroll-spy).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = articleRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1);
      let current = null;
      root.querySelectorAll('h3[id]').forEach((h) => {
        if (h.getBoundingClientRect().top < 140) current = h.id;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      setPopover(null);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [html]);

  // Guarda el apartado activo para retomar la lectura más tarde.
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onAnchor(active), 800);
    return () => clearTimeout(t);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback(
    (s) => {
      if (s) onNavigate(s.id);
    },
    [onNavigate]
  );

  // Atajos: ← → para cambiar de sección, M para marcar como estudiada.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowLeft') go(prev);
      else if (e.key === 'ArrowRight') go(next);
      else if (e.key === 'm' || e.key === 'M') onToggleRead(section.id);
      else if (e.key === 'Escape') {
        setPopover(null);
        setTocOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, prev, next, section.id, onToggleRead]);

  function findSection(anchor) {
    return sections.find((s) => s.id === anchor || s.anchors.includes(anchor));
  }

  function jump(anchor) {
    const target = findSection(anchor);
    if (!target) return;
    if (target.id === section.id) {
      const el = document.getElementById(anchor);
      if (el && anchor !== section.id) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      setTocOpen(false);
    } else onNavigate(target.id, anchor);
  }

  function openTerm(el) {
    const entry = index.get(el.dataset.term);
    if (!entry) return;
    const r = el.getBoundingClientRect();
    setPopover((p) => (p?.el === el ? null : { el, entry, rect: r }));
  }

  function onArticleClick(e) {
    const link = e.target.closest('a[href]');
    if (link) {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        jump(decodeURIComponent(href.slice(1)));
      } else if (/glossary\.md$/.test(href)) {
        e.preventDefault();
        onOpenTab('glossary');
      } else if (/syllabus\.md$/.test(href)) {
        e.preventDefault();
        onNavigate(sections[0].id);
      }
      return;
    }
    const term = e.target.closest('.gl-term');
    if (term) {
      e.stopPropagation();
      openTerm(term);
      return;
    }
    if (isSelfTest) {
      const row = e.target.closest('tbody tr');
      if (row) row.classList.toggle('shown');
    }
  }

  function onArticleKey(e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('gl-term')) {
      e.preventDefault();
      openTerm(e.target);
    }
  }

  const readCount = sections.filter((s) => read[s.id]).length;
  const isRead = Boolean(read[section.id]);

  return (
    <div className="reader">
      <div className="read-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <aside className={`toc ${tocOpen ? 'open' : ''}`} aria-label="Índice del temario">
        <div className="toc-inner">
          <div className="toc-head">
            <div className="toc-top">
              <span className="eyebrow">
                {guide.label} · {guide.weight}%
              </span>
              <button className="toc-close" onClick={() => setTocOpen(false)} aria-label="Cerrar índice">
                <Icon name="close" size={16} />
              </button>
            </div>
            <strong>{guide.title}</strong>
            <div className="toc-meter" aria-label={`${readCount} de ${sections.length} secciones estudiadas`}>
              <span style={{ width: `${(readCount / sections.length) * 100}%` }} />
            </div>
            <small>
              {readCount} de {sections.length} secciones estudiadas
            </small>
          </div>

          <ol className="toc-list">
            {sections.map((s) => {
              const l = sectionLabel(s);
              const current = s.id === section.id;
              return (
                <li key={s.id} className={`${current ? 'current' : ''} ${read[s.id] ? 'done' : ''}`}>
                  <button onClick={() => (current ? jump(s.id) : onNavigate(s.id))}>
                    <span className="toc-num">{read[s.id] ? <Icon name="check" size={14} /> : l.num}</span>
                    <span className="toc-title">{l.text}</span>
                  </button>
                  {current && s.headings.length > 0 && (
                    <ul className="toc-sub">
                      {s.headings.map((h) => {
                        const { num, text } = splitNumber(h.title);
                        return (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              className={`${active === h.id ? 'on' : ''} ${/^Exam traps/i.test(text) ? 'trap' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                jump(h.id);
                              }}
                            >
                              {num && <span className="toc-subnum">{num}</span>}
                              {text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>

          <button className="toc-practice" onClick={onPractice}>
            <Icon name="zap" size={16} />
            Practicar preguntas
          </button>
          <p className="toc-keys">
            <kbd>←</kbd> <kbd>→</kbd> sección · <kbd>M</kbd> marcar estudiada
          </p>
        </div>
      </aside>
      {tocOpen && <div className="toc-scrim" onClick={() => setTocOpen(false)} />}

      <main className="doc">
        <button className="toc-toggle" onClick={() => setTocOpen(true)}>
          <Icon name="list" size={16} />
          <span>Índice</span>
          <span className="toc-toggle-where">
            {label.num !== '·' && label.num !== '?' ? `${label.num} · ` : ''}
            {label.text}
          </span>
        </button>

        <header className="doc-head" id={section.id}>
          <div className="eyebrow">
            {guide.label} · {label.eyebrow}
          </div>
          <h1>{label.text}</h1>
          <div className="doc-meta">
            <span>{minutes} min de lectura</span>
            {section.headings.length > 0 && <span>{section.headings.length} apartados</span>}
            {isRead && <span className="doc-done">✓ Estudiada</span>}
          </div>
        </header>

        {isSelfTest && (
          <div className="selftest-bar">
            <p>Pulsa una fila para ver su respuesta. Intenta responder antes de mirar.</p>
            <div className="row">
              <button className="btn btn-ghost" onClick={() => setRevealAll((v) => !v)}>
                {revealAll ? 'Ocultar respuestas' : 'Mostrar todas'}
              </button>
              <button className="btn btn-primary" onClick={() => onOpenTab('cards')}>
                <Icon name="cards" size={16} />
                &nbsp;Repasar como tarjetas
              </button>
            </div>
          </div>
        )}

        <article
          ref={articleRef}
          className={`prose ${isSelfTest ? 'selftest' : ''} ${revealAll ? 'reveal-all' : ''}`}
          onClick={onArticleClick}
          onKeyDown={onArticleKey}
        />

        <div className="doc-foot">
          <button className={`read-toggle ${isRead ? 'on' : ''}`} onClick={() => onToggleRead(section.id)}>
            <span className="read-check">
              <Icon name="check" size={18} />
            </span>
            <span>
              <b>{isRead ? 'Sección estudiada' : 'Marcar como estudiada'}</b>
              <small>
                {isRead ? 'Pulsa para desmarcarla' : 'Cuando puedas explicarla sin mirar, márcala'}
              </small>
            </span>
          </button>

          <nav className="doc-pager" aria-label="Navegación entre secciones">
            {prev ? (
              <button className="pager prev" onClick={() => go(prev)}>
                <small>
                  <Icon name="left" size={14} /> Anterior
                </small>
                <b>{sectionLabel(prev).text}</b>
              </button>
            ) : (
              <span />
            )}
            {next ? (
              <button className="pager next" onClick={() => go(next)}>
                <small>
                  Siguiente <Icon name="right" size={14} />
                </small>
                <b>{sectionLabel(next).text}</b>
              </button>
            ) : (
              <button className="pager next" onClick={() => onOpenTab('cards')}>
                <small>
                  Para terminar <Icon name="right" size={14} />
                </small>
                <b>Repaso con tarjetas</b>
              </button>
            )}
          </nav>
        </div>
      </main>

      {popover && (
        <TermPopover
          entry={popover.entry}
          rect={popover.rect}
          onClose={() => setPopover(null)}
          onOpenGlossary={() => onOpenTerm(popover.entry.id)}
        />
      )}
    </div>
  );
}
