// Display puro: la cuenta atrás la lleva Session, que necesita el
// tiempo transcurrido para calcular el ritmo del simulacro.
export default function Timer({ secondsLeft }) {
  const left = Math.max(0, secondsLeft);
  const m = Math.floor(left / 60);
  const s = left % 60;
  const danger = left < 300;
  return (
    <span className={`timer ${danger ? 'danger' : ''}`}>
      {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}
