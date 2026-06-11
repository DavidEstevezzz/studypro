// Tendencia de las últimas sesiones: barras con el % de acierto,
// destacando los simulacros, con la línea del umbral de aprobado.
const MAX_BARS = 20;

export default function Trend({ sessions, passThreshold }) {
  const data = [...sessions]
    .slice(0, MAX_BARS)
    .reverse()
    .map((s) => ({
      pct: s.total ? Math.round((s.ok / s.total) * 100) : 0,
      exam: s.mode === 'exam',
      total: s.total,
      ok: s.ok,
      date: new Date(s.finishedAt ?? s.startedAt),
    }));

  if (!data.length) return null;

  const W = 600;
  const H = 150;
  const PAD_TOP = 8;
  const plotH = H - PAD_TOP;
  const gap = 4;
  const barW = Math.min(40, (W - gap * (data.length - 1)) / data.length);
  const yFor = (pct) => PAD_TOP + plotH * (1 - pct / 100);

  return (
    <div className="trend">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Evolucion del acierto por sesion"
      >
        {[25, 50, 100].map((g) => (
          <line
            key={g}
            className="trend-grid"
            x1="0"
            x2={W}
            y1={yFor(g)}
            y2={yFor(g)}
          />
        ))}
        <line
          className="trend-threshold"
          x1="0"
          x2={W}
          y1={yFor(passThreshold)}
          y2={yFor(passThreshold)}
        />
        {data.map((s, i) => (
          <rect
            key={i}
            className={`trend-bar ${s.exam ? 'exam' : ''} ${
              s.pct >= passThreshold ? 'pass' : ''
            }`}
            x={i * (barW + gap)}
            y={yFor(s.pct)}
            width={barW}
            height={Math.max(3, plotH * (s.pct / 100))}
            rx="2"
          >
            <title>
              {`${s.exam ? 'Simulacro' : 'Practica'} · ${s.pct}% (${s.ok}/${s.total}) · ${s.date.toLocaleDateString()}`}
            </title>
          </rect>
        ))}
      </svg>
      <div className="trend-legend">
        <span><i className="trend-dot exam" /> simulacro</span>
        <span><i className="trend-dot" /> practica</span>
        <span><i className="trend-line" /> umbral {passThreshold}%</span>
      </div>
    </div>
  );
}
