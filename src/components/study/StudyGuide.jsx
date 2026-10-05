import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import Reader from './Reader';
import Glossary from './Glossary';
import Flashcards from './Flashcards';
import { glossaryIndex, parseGlossary, parseSelfTest, splitSections } from '../../study/parse';
import { guideState } from '../../study/storage';
import { guideKey } from '../../study/registry';

const TABS = [
  { id: 'reader', label: 'Temario', icon: 'book' },
  { id: 'glossary', label: 'Glosario', icon: 'list' },
  { id: 'cards', label: 'Repaso', icon: 'cards' },
];

export default function StudyGuide({ cert, guides, study, onStudy, onBack, onPractice }) {
  const [guideId, setGuideId] = useState(() => {
    const withLast = guides.find((g) => study.guides[guideKey(cert.id, g.id)]?.last);
    return (withLast ?? guides[0]).id;
  });
  const guide = guides.find((g) => g.id === guideId) ?? guides[0];
  const key = guideKey(cert.id, guide.id);
  const gState = guideState(study, key);

  const [docs, setDocs] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [tab, setTab] = useState(gState.last?.tab ?? 'reader');
  const [nav, setNav] = useState({
    section: gState.last?.section ?? null,
    anchor: gState.last?.anchor ?? null,
  });
  const [glossaryFocus, setGlossaryFocus] = useState(null);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    let alive = true;
    setDocs(null);
    setLoadError(null);
    guide
      .load()
      .then((d) => alive && setDocs(d))
      .catch(() => alive && setLoadError('No se pudo cargar el material de estudio.'));
    return () => {
      alive = false;
    };
  }, [guide]);

  const parsed = useMemo(() => {
    if (!docs) return null;
    const sections = splitSections(docs.syllabus);
    const entries = parseGlossary(docs.glossary);
    return {
      sections,
      entries,
      index: glossaryIndex(entries),
      cards: parseSelfTest(docs.syllabus),
    };
  }, [docs]);

  // Tema de lectura: se aplica a toda la página mientras se estudia.
  const { prefs } = study;
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.studyTheme = prefs.theme;
    return () => {
      delete root.dataset.studyTheme;
    };
  }, [prefs.theme]);

  function updateGuide(patch) {
    const current = guideState(study, key);
    const next = typeof patch === 'function' ? patch(current) : { ...current, ...patch };
    onStudy({ ...study, guides: { ...study.guides, [key]: next } });
  }

  function setPrefs(patch) {
    onStudy({ ...study, prefs: { ...prefs, ...patch } });
  }

  function remember(last) {
    updateGuide((g) => ({ ...g, last: { ...g.last, ...last } }));
  }

  function goTab(next) {
    setTab(next);
    remember({ tab: next });
    window.scrollTo({ top: 0 });
  }

  function openSection(section, anchor = null) {
    setNav({ section, anchor });
    setTab('reader');
    remember({ tab: 'reader', section, anchor });
  }

  function openTerm(entryId) {
    setGlossaryFocus((f) => ({ id: entryId, seq: (f?.seq ?? 0) + 1 }));
    goTab('glossary');
  }

  const sectionForObjective = (objective) =>
    parsed?.sections.find((s) => s.short === objective)?.id ?? null;

  const prefsRef = useRef(null);
  useEffect(() => {
    if (!showPrefs) return;
    const close = (e) => {
      if (e.key === 'Escape' || (e.type === 'pointerdown' && !prefsRef.current?.contains(e.target)))
        setShowPrefs(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [showPrefs]);

  return (
    <div
      className={`study font-${prefs.font} width-${prefs.width}`}
      style={{ '--study-size': `${prefs.size}px` }}
    >
      <div className="study-bar">
        <button className="study-back" onClick={onBack} aria-label="Volver al inicio">
          <Icon name="back" />
          <span>Inicio</span>
        </button>

        <nav className="study-tabs" aria-label="Secciones del material">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'on' : ''}
              aria-current={tab === t.id ? 'page' : undefined}
              onClick={() => goTab(t.id)}
            >
              <Icon name={t.icon} size={16} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="study-prefs" ref={prefsRef}>
          <button
            className={`study-icon-btn ${showPrefs ? 'on' : ''}`}
            onClick={() => setShowPrefs((s) => !s)}
            aria-expanded={showPrefs}
            aria-label="Ajustes de lectura"
            title="Ajustes de lectura"
          >
            <Icon name="type" />
          </button>
          {showPrefs && (
            <div className="prefs-panel" role="dialog" aria-label="Ajustes de lectura">
              <PrefRow label="Tema">
                {[
                  ['light', 'Claro'],
                  ['sepia', 'Sepia'],
                  ['dark', 'Oscuro'],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    className={`swatch swatch-${v} ${prefs.theme === v ? 'on' : ''}`}
                    onClick={() => setPrefs({ theme: v })}
                  >
                    {l}
                  </button>
                ))}
              </PrefRow>
              <PrefRow label="Letra">
                {[
                  ['sans', 'Sans'],
                  ['serif', 'Serif'],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    className={`seg font-sample-${v} ${prefs.font === v ? 'on' : ''}`}
                    onClick={() => setPrefs({ font: v })}
                  >
                    {l}
                  </button>
                ))}
              </PrefRow>
              <PrefRow label="Tamaño">
                <button
                  className="seg"
                  onClick={() => setPrefs({ size: Math.max(14, prefs.size - 1) })}
                  disabled={prefs.size <= 14}
                  aria-label="Reducir texto"
                >
                  A−
                </button>
                <span className="seg-value">{prefs.size}px</span>
                <button
                  className="seg"
                  onClick={() => setPrefs({ size: Math.min(22, prefs.size + 1) })}
                  disabled={prefs.size >= 22}
                  aria-label="Aumentar texto"
                >
                  A+
                </button>
              </PrefRow>
              <PrefRow label="Ancho">
                {[
                  ['normal', 'Cómodo'],
                  ['wide', 'Amplio'],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    className={`seg ${prefs.width === v ? 'on' : ''}`}
                    onClick={() => setPrefs({ width: v })}
                  >
                    {l}
                  </button>
                ))}
              </PrefRow>
            </div>
          )}
        </div>
      </div>

      {guides.length > 1 && (
        <div className="chip-row study-guides">
          {guides.map((g) => (
            <button
              key={g.id}
              className={`chip ${g.id === guide.id ? 'on' : ''}`}
              onClick={() => {
                setGuideId(g.id);
                setNav({ section: null, anchor: null });
              }}
            >
              {g.label} · {g.weight}%
            </button>
          ))}
        </div>
      )}

      {loadError && <p className="note" role="alert">{loadError}</p>}
      {!parsed && !loadError && <p className="note">Cargando material de estudio…</p>}

      {parsed && tab === 'reader' && (
        <Reader
          guide={guide}
          sections={parsed.sections}
          index={parsed.index}
          read={gState.read}
          nav={nav}
          onNavigate={openSection}
          onToggleRead={(id) =>
            updateGuide((g) => {
              const read = { ...g.read };
              if (read[id]) delete read[id];
              else read[id] = Date.now();
              return { ...g, read };
            })
          }
          onAnchor={(anchor) => remember({ anchor })}
          onOpenTerm={openTerm}
          onOpenTab={goTab}
          onPractice={() => onPractice(guide.domain)}
        />
      )}

      {parsed && tab === 'glossary' && (
        <Glossary
          entries={parsed.entries}
          objectives={guide.objectives}
          starred={gState.starred}
          focus={glossaryFocus}
          onToggleStar={(id) =>
            updateGuide((g) => ({
              ...g,
              starred: g.starred.includes(id) ? g.starred.filter((s) => s !== id) : [...g.starred, id],
            }))
          }
          onObjective={(o) => {
            const s = sectionForObjective(o);
            if (s) openSection(s);
          }}
        />
      )}

      {parsed && tab === 'cards' && (
        <Flashcards
          cards={parsed.cards}
          objectives={guide.objectives}
          state={gState.cards}
          onGrade={(n, known) =>
            updateGuide((g) => ({
              ...g,
              cards: {
                ...g.cards,
                [n]: { known, at: Date.now(), misses: (g.cards[n]?.misses ?? 0) + (known ? 0 : 1) },
              },
            }))
          }
          onReset={() => updateGuide({ cards: {} })}
          onObjective={(o) => {
            const s = sectionForObjective(o);
            if (s) openSection(s);
          }}
          onPractice={() => onPractice(guide.domain)}
        />
      )}
    </div>
  );
}

function PrefRow({ label, children }) {
  return (
    <div className="pref-row">
      <span>{label}</span>
      <div className="pref-options">{children}</div>
    </div>
  );
}
