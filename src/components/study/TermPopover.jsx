import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { renderInline } from '../../study/markdown';

// Definición flotante de un término del glosario dentro del temario.
export default function TermPopover({ entry, rect, onClose, onOpenGlossary }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: rect.bottom + 8, left: rect.left, ready: false });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const margin = 12;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const below = rect.bottom + 8 + h < window.innerHeight - margin || rect.top < h + 20;
    const top = below ? rect.bottom + 8 : rect.top - h - 8;
    const left = Math.min(Math.max(margin, rect.left + rect.width / 2 - w / 2), window.innerWidth - w - margin);
    setPos({ top, left, ready: true, below });
  }, [rect]);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current?.contains(e.target) || e.target.closest?.('.gl-term')) return;
      onClose();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`term-pop ${pos.ready ? 'ready' : ''} ${pos.below ? 'below' : 'above'}`}
      style={{ top: pos.top, left: pos.left }}
      role="dialog"
      aria-label={`Definición de ${entry.term}`}
    >
      <div className="term-pop-head">
        <strong>{entry.term}</strong>
        {entry.objectives.map((o) => (
          <span key={o} className="obj-tag">
            {o}
          </span>
        ))}
      </div>
      {entry.es && <div className="term-es">{entry.es}</div>}
      <p dangerouslySetInnerHTML={{ __html: renderInline(entry.definition) }} />
      <button className="term-pop-link" onClick={onOpenGlossary}>
        Abrir en el glosario →
      </button>
    </div>
  );
}
