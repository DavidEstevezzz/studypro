// La "firma" de la plataforma: el progreso por dominio dibujado como
// estratos apilados, evocando las micro-particiones de Snowflake.

export default function Strata({ domains, domStat }) {
  return (
    <div className="strata">
      {domains.map((d) => {
        const st = domStat[d] || { seen: 0, ok: 0 };
        const pct = st.seen ? Math.round((st.ok / st.seen) * 100) : 0;
        return (
          <div className="stratum" key={d}>
            <span className="stratum-label" title={d}>
              {d}
            </span>
            <div className="stratum-track">
              <i style={{ width: `${pct}%` }} />
            </div>
            <span className="stratum-pct">
              {st.seen ? `${pct}% · ${st.seen}` : '—'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
