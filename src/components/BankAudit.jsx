export default function BankAudit({ questions, cert, includePending, onIncludePending }) {
  if (!cert.bankVersion) return null;
  const counts = {};
  questions.forEach((q) => { const s = q.review?.status ?? 'pending'; counts[s] = (counts[s] ?? 0) + 1; });
  return (
    <section className="card" aria-label="Estado del banco">
      <div className="section-head">
        <div><div className="eyebrow mb">Revisión · {new Date((cert.reviewDate ?? '2026-09-21') + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</div><h2>Qué estás practicando</h2></div>
        <span className="threshold">Preguntas en inglés</span>
      </div>
      <p>{counts.verified ?? 0} preguntas contrastadas con documentación, incluidas {questions.filter(q => q.origin === 'original-practice-2026').length} nuevas.</p>
      <p className="note">
        Quedan {counts.pending ?? 0} pendientes de validación, {counts.quarantine ?? 0} apartadas para revisión y {counts.archived ?? 0} archivadas.
        Una pregunta apartada no implica necesariamente que sea incorrecta. El material original se conserva.
      </p>
      <label className="audit-choice">
        <input type="checkbox" checked={includePending} onChange={e => onIncludePending(e.target.checked)} />
        Incluir preguntas pendientes en la práctica adicional
      </label>
      <p className="note">Los simulacros siempre usan solo preguntas contrastadas. Las respuestas de la práctica adicional pueden contener errores.</p>
      <details>
        <summary>Cobertura y pesos del simulacro</summary>
        <div className="audit-table-wrap">
          <table className="audit-table">
            <thead><tr><th>Dominio</th><th>Peso</th><th>Contrastadas</th></tr></thead>
            <tbody>{Object.entries(cert.domainWeights).map(([domain, weight]) => (
              <tr key={domain}><td>{domain}</td><td>{weight}%</td><td>{questions.filter(q => q.d === domain && q.review?.status === 'verified').length}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <p className="note">El 31% incluye arquitectura y funcionalidades; no corresponde solo a IA. Tener preguntas en cada dominio no garantiza cubrir todos los subtemas.</p>
        <a className="ref" href={`${import.meta.env.BASE_URL}data/${cert.auditFile}`} download>Descargar mapa por objetivo y resumen de revisión</a>
        <a className="ref" href="https://learn.snowflake.com/en/certifications/snowpro-core-c03/" target="_blank" rel="noopener noreferrer">Guía y detalles oficiales de COF-C03 →</a>
      </details>
    </section>
  );
}
