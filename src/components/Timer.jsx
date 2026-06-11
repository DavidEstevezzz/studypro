import { useEffect, useState } from 'react';

export default function Timer({ seconds, onExpire }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left, onExpire]);

  const m = Math.floor(left / 60);
  const s = left % 60;
  const danger = left < 300;
  return (
    <span className={`timer ${danger ? 'danger' : ''}`}>
      {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}
