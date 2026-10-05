import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '../Icon';
import { renderInline } from '../../study/markdown';

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SCOPES = [
  { id: 'pending', label: 'Pendientes', hint: 'Sin ver o falladas' },
  { id: 'missed', label: 'Falladas', hint: 'Las que no sabías' },
  { id: 'all', label: 'Todas', hint: 'El mazo completo' },
];

function buildDeck(cards, state, { objective, scope, random }) {
  const pick = cards.filter((c) => {
    if (objective !== 'all' && c.objective !== objective) return false;
    const s = state[c.n];
    if (scope === 'pending') return !s?.known;
    if (scope === 'missed') return s && !s.known;
    return true;
  });
  return (random ? shuffle(pick) : pick).map((c) => c.n);
}

export default function Flashcards({ cards, objectives, state, onGrade, onReset, onObjective, onPractice }) {
  const byN = useMemo(() => new Map(cards.map((c) => [c.n, c])), [cards]);
  const [opts, setOpts] = useState(() => ({
    objective: 'all',
    scope: cards.some((c) => !state[c.n]?.known) ? 'pending' : 'all',
    random: false,
  }));
  const [deck, setDeck] = useState(() => buildDeck(cards, state, opts));
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [run, setRun] = useState({ known: 0, unknown: 0, missed: [] });

  const restart = useCallback(
    (nextOpts, nextState = state) => {
      // Sin foco en el botón pulsado, Espacio vuelve a girar la tarjeta.
      document.activeElement?.blur?.();
      setOpts(nextOpts);
      setDeck(buildDeck(cards, nextState, nextOpts));
      setPos(0);
      setRevealed(false);
      setRun({ known: 0, unknown: 0, missed: [] });
    },
    [cards, state]
  );

  const card = byN.get(deck[pos]);
  const done = pos >= deck.length;

  const grade = useCallback(
    (known) => {
      if (!card || !revealed) return;
      onGrade(card.n, known);
      setRun((r) => ({
        known: r.known + (known ? 1 : 0),
        unknown: r.unknown + (known ? 0 : 1),
        missed: known ? r.missed : [...r.missed, card.n],
      }));
      setRevealed(false);
      setPos((p) => p + 1);
    },
    [card, revealed, onGrade]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || done) return;
      const t = e.target;
      if (t.closest?.('input, textarea, select, [contenteditable]')) return;
      if (!revealed && (e.key === ' ' || e.key === 'Enter')) {
        // Los botones del propio mazo conservan su comportamiento; fuera de
        // él (p. ej. la pestaña recién pulsada) Espacio gira la tarjeta.
        if (t.closest?.('.cards-view button')) return;
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && (e.key === '1' || e.key === 'ArrowLeft')) grade(false);
      else if (revealed && (e.key === '2' || e.key === 'ArrowRight')) grade(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, revealed, grade]);

  const totals = useMemo(() => {
    let known = 0;
    let missed = 0;
    for (const c of cards) {
      const s = state[c.n];
      if (s?.known) known++;
      else if (s) missed++;
    }
    return { known, missed, fresh: cards.length - known - missed };
  }, [cards, state]);

  const pct = (n) => `${(n / cards.length) * 100}%`;

  return (
    <div className="cards-view">
      <header className="gl-head">
        <div className="eyebrow">Repaso activo</div>
        <h1>Tarjetas de repaso</h1>
        <p className="gl-lede">
          Intenta responder en voz alta antes de girar la tarjeta. Sé honesto al puntuar: las que
          no sepas volverán en «Pendientes» hasta que las domines.
        </p>
      </header>

      <section className="deck-stats" aria-label="Progreso de las tarjetas">
        <div className="deck-meter">
          <span className="m-known" style={{ width: pct(totals.known) }} />
          <span className="m-missed" style={{ width: pct(totals.missed) }} />
        </div>
        <div className="deck-legend">
          <span>
            <i className="dot dot-known" /> <b>{totals.known}</b> dominadas
          </span>
          <span>
            <i className="dot dot-missed" /> <b>{totals.missed}</b> por repasar
          </span>
          <span>
            <i className="dot dot-fresh" /> <b>{totals.fresh}</b> sin ver
          </span>
        </div>
      </section>

      <div className="deck-controls">
        <div className="seg-group" role="group" aria-label="Qué tarjetas">
          {SCOPES.map((s) => (
            <button
              key={s.id}
              className={opts.scope === s.id ? 'on' : ''}
              title={s.hint}
              onClick={() => restart({ ...opts, scope: s.id })}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="chip-row" role="group" aria-label="Filtrar por objetivo">
          <button
            className={`chip ${opts.objective === 'all' ? 'on' : ''}`}
            onClick={() => restart({ ...opts, objective: 'all' })}
          >
            Todos
          </button>
          {Object.entries(objectives).map(([o, label]) => (
            <button
              key={o}
              className={`chip ${opts.objective === o ? 'on' : ''}`}
              title={label}
              onClick={() => restart({ ...opts, objective: opts.objective === o ? 'all' : o })}
            >
              {o}
            </button>
          ))}
          <button
            className={`chip ${opts.random ? 'on' : ''}`}
            onClick={() => restart({ ...opts, random: !opts.random })}
            aria-pressed={opts.random}
          >
            <Icon name="shuffle" size={14} /> Aleatorio
          </button>
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="deck-empty">
          <b>No hay tarjetas con este filtro.</b>
          <p>
            {opts.scope === 'missed'
              ? 'No tienes tarjetas falladas aquí. ¡Bien!'
              : 'Ya dominas todas las de esta selección.'}
          </p>
          <button className="btn btn-ghost" onClick={() => restart({ ...opts, scope: 'all' })}>
            Ver todas
          </button>
        </div>
      ) : done ? (
        <div className="deck-done">
          <div className="deck-done-score">
            <strong>{run.known}</strong>
            <span>/ {deck.length}</span>
          </div>
          <b>Mazo terminado</b>
          <p>
            {run.unknown === 0
              ? 'Las has sabido todas. Pasa a practicar preguntas tipo examen.'
              : `${run.unknown} para repasar. Vuelve a ellas ahora, mientras están frescas.`}
          </p>
          <div className="row deck-actions">
            {run.missed.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDeck(opts.random ? shuffle(run.missed) : run.missed);
                  setPos(0);
                  setRevealed(false);
                  setRun({ known: 0, unknown: 0, missed: [] });
                }}
              >
                <Icon name="rotate" size={16} />
                &nbsp;Repasar las {run.missed.length} falladas
              </button>
            )}
            <button className="btn btn-ghost" onClick={() => restart(opts)}>
              Empezar de nuevo
            </button>
            <button className="btn btn-ghost" onClick={onPractice}>
              Practicar preguntas
            </button>
          </div>
        </div>
      ) : (
        <div className="deck-stage">
          <div className="deck-pos">
            <span>
              Tarjeta {pos + 1} de {deck.length}
            </span>
            <div className="deck-pos-bar">
              <span style={{ width: `${(pos / deck.length) * 100}%` }} />
            </div>
          </div>

          <div
            key={card.n}
            className={`flip ${revealed ? 'flipped' : ''}`}
            onClick={() => !revealed && setRevealed(true)}
            role="button"
            tabIndex={-1}
            aria-label={revealed ? 'Respuesta visible' : 'Mostrar respuesta'}
          >
            <div className="flip-inner">
              <div className="face front" aria-hidden={revealed}>
                <div className="face-tag">
                  <span>#{card.n}</span>
                  <span className="obj-tag">{card.objective}</span>
                  {state[card.n] && !state[card.n].known && <span className="face-missed">Fallada antes</span>}
                </div>
                <p className="face-q" dangerouslySetInnerHTML={{ __html: renderInline(card.q) }} />
                <span className="face-hint">Toca o pulsa Espacio para girar</span>
              </div>
              <div className="face back" aria-hidden={!revealed}>
                <div className="face-tag">
                  <span>#{card.n}</span>
                  <span className="obj-tag">{card.objective}</span>
                </div>
                <p className="face-q small" dangerouslySetInnerHTML={{ __html: renderInline(card.q) }} />
                <p className="face-a" dangerouslySetInnerHTML={{ __html: renderInline(card.a) }} />
                <button
                  className="face-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    onObjective(card.objective);
                  }}
                >
                  Repasar {card.objective} · {objectives[card.objective]} en el temario →
                </button>
              </div>
            </div>
          </div>

          {!revealed ? (
            <button className="btn btn-primary deck-reveal" onClick={() => setRevealed(true)}>
              Mostrar respuesta <kbd>Espacio</kbd>
            </button>
          ) : (
            <div className="deck-grade">
              <button className="grade grade-no" onClick={() => grade(false)}>
                <Icon name="close" size={18} />
                <span>No lo sabía</span>
                <kbd>1</kbd>
              </button>
              <button className="grade grade-yes" onClick={() => grade(true)}>
                <Icon name="check" size={18} />
                <span>Lo sabía</span>
                <kbd>2</kbd>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="deck-foot">
        <button
          className="link-btn"
          onClick={() => {
            if (!confirm('¿Borrar el progreso de las tarjetas de este dominio?')) return;
            onReset();
            restart({ ...opts, scope: 'all' }, {});
          }}
        >
          Reiniciar progreso de tarjetas
        </button>
      </div>
    </div>
  );
}
