import { useEffect, useState } from 'react';

const base = import.meta.env.BASE_URL;

export function useCatalog() {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${base}data/catalog.json`)
      .then((r) => r.json())
      .then(setCatalog)
      .catch(() => setError('No se pudo cargar el catálogo.'));
  }, []);
  return { catalog, error };
}

export function useQuestions(cert) {
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!cert) return;
    setQuestions(null);
    fetch(`${base}data/${cert.file}`)
      .then((r) => r.json())
      .then(setQuestions)
      .catch(() => setError('No se pudieron cargar las preguntas.'));
  }, [cert]);
  return { questions, error };
}
