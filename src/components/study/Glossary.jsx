import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import { renderInline } from '../../study/markdown';
import { matchesQuery } from '../../study/parse';

function Highlight({ text, query }) {
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
}

export default function Glossary({ entries, objectives, starred, focus, onToggleStar, onObjective }) {
  const [query, setQuery] = useState('');
  const [objective, setObjective] = useState('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [flash, setFlash] = useState(null);
  const inputRef = useRef(null);

  const starredSet = useMemo(() => new Set(starred), [starred]);
  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          matchesQuery(e, query) &&
          (objective === 'all' || e.objectives.includes(objective)) &&
          (!onlyStarred || starredSet.has(e.id))
      ),
    [entries, query, objective, onlyStarred, starredSet]
  );

  const groups = useMemo(() => {
    const map = new Map();
    for (const e of filtered) {
      if (!map.has(e.letter)) map.set(e.letter, []);
      map.get(e.letter).push(e);
    }
    return [...map.entries()];
  }, [filtered]);

  const allLetters = useMemo(() => [...new Set(entries.map((e) => e.letter))], [entries]);
  const presentLetters = new Set(groups.map(([l]) => l));

  // Llegar desde el temario a un término concreto.
  useEffect(() => {
    if (!focus) return;
    setQuery('');
    setObjective('all');
    setOnlyStarred(false);
    setFlash(focus.id);
    requestAnimationFrame(() =>
      document.getElementById(`term-${focus.id}`)?.scrollIntoView({ block: 'center' })
    );
    const t = setTimeout(() => setFlash(null), 2200);
    return () => clearTimeout(t);
  }, [focus]);

  // «/» enfoca el buscador; Escape lo limpia.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const objectiveCounts = useMemo(() => {
    const counts = {};
    for (const e of entries) for (const o of e.objectives) counts[o] = (counts[o] ?? 0) + 1;
    return counts;
  }, [entries]);

  return (
    <div className="glossary">
      <header className="gl-head">
        <div>
          <div className="eyebrow">Glosario</div>
          <h1>Palabras clave del examen</h1>
          <p className="gl-lede">
            {entries.length} términos en inglés, tal y como aparecen en las preguntas. Marca con
            la estrella los que te cuesten y repásalos aparte.
          </p>
        </div>
      </header>

      <div className="gl-tools">
        <label className="gl-search">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder="Buscar término, traducción o definición…"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            aria-label="Buscar en el glosario"
          />
          <kbd>/</kbd>
        </label>

        <div className="chip-row" role="group" aria-label="Filtrar por objetivo">
          <button className={`chip ${objective === 'all' ? 'on' : ''}`} onClick={() => setObjective('all')}>
            Todos
          </button>
          {Object.entries(objectives).map(([o, label]) => (
            <button
              key={o}
              className={`chip ${objective === o ? 'on' : ''}`}
              onClick={() => setObjective(objective === o ? 'all' : o)}
              title={label}
            >
              {o}
              <span className="chip-count">{objectiveCounts[o] ?? 0}</span>
            </button>
          ))}
          <button
            className={`chip chip-star ${onlyStarred ? 'on' : ''}`}
            onClick={() => setOnlyStarred((v) => !v)}
            disabled={!starred.length && !onlyStarred}
          >
            <Icon name="star" size={14} fill={onlyStarred ? 'currentColor' : 'none'} />
            Difíciles
            <span className="chip-count">{starred.length}</span>
          </button>
        </div>

        <nav className="letter-bar" aria-label="Saltar a letra">
          {allLetters.map((l) => (
            <button
              key={l}
              disabled={!presentLetters.has(l)}
              onClick={() =>
                document.getElementById(`gl-${l}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
              }
            >
              {l}
            </button>
          ))}
        </nav>
      </div>

      <p className="gl-count" aria-live="polite">
        {filtered.length === entries.length
          ? `${entries.length} términos`
          : `${filtered.length} de ${entries.length} términos`}
        {objective !== 'all' && ` · ${objective} ${objectives[objective]}`}
      </p>

      {groups.length === 0 && (
        <div className="gl-empty">
          <p>No hay términos que coincidan.</p>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setQuery('');
              setObjective('all');
              setOnlyStarred(false);
            }}
          >
            Quitar filtros
          </button>
        </div>
      )}

      {groups.map(([letter, items]) => (
        <section key={letter} className="gl-group" id={`gl-${letter}`}>
          <h2 className="gl-letter">{letter}</h2>
          <div className="gl-items">
            {items.map((e) => (
              <article
                key={e.id}
                id={`term-${e.id}`}
                className={`term ${flash === e.id ? 'flash' : ''} ${starredSet.has(e.id) ? 'starred' : ''}`}
              >
                <div className="term-top">
                  <h3>
                    <Highlight text={e.term} query={query} />
                    {e.note && <span className="term-note"> {e.note}</span>}
                    {e.volatile && (
                      <span className="volatile" title="Dato que cambia a menudo: compruébalo en la documentación vigente">
                        ⚠️
                      </span>
                    )}
                  </h3>
                  <button
                    className={`star-btn ${starredSet.has(e.id) ? 'on' : ''}`}
                    onClick={() => onToggleStar(e.id)}
                    aria-pressed={starredSet.has(e.id)}
                    aria-label={starredSet.has(e.id) ? 'Quitar de difíciles' : 'Marcar como difícil'}
                    title={starredSet.has(e.id) ? 'Quitar de difíciles' : 'Marcar como difícil'}
                  >
                    <Icon name="star" size={18} fill={starredSet.has(e.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                {e.es && (
                  <div className="term-es">
                    <span>ES</span>
                    <Highlight text={e.es} query={query} />
                  </div>
                )}
                <p className="term-def" dangerouslySetInnerHTML={{ __html: renderInline(e.definition) }} />
                <div className="term-objs">
                  {e.objectives.map((o) => (
                    <button key={o} className="obj-tag" onClick={() => onObjective(o)} title={`Ir al temario: ${objectives[o] ?? o}`}>
                      {o} · {objectives[o] ?? 'Temario'}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
