# StudyPro — Trainer de certificaciones

Plataforma de estudio para certificaciones técnicas, construida con Vite + React.
Empieza con SnowPro Core (COF-C03) y está preparada para añadir más.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre la URL que aparece (normalmente http://localhost:5173).

## Compilar para producción / subir a hosting

```bash
npm run build
```

Genera la carpeta `dist/`. Sube su contenido a tu hosting estático (IONOS, etc.).
Recuerda subir también la carpeta `data/` que queda dentro de `dist/`.

## Añadir una nueva certificación (sin tocar código)

1. Crea un JSON de preguntas en `public/data/` (mismo formato que `snowpro-core.json`).
2. Añade una entrada en `public/data/catalog.json` apuntando a ese archivo.
3. Listo: aparece como pestaña en la plataforma.

### Formato de cada pregunta
```json
{
  "i": 1,            // id único
  "q": "enunciado",
  "o": ["opción A", "opción B", "..."],
  "c": [1],          // índices (base 0) de las respuestas correctas
  "n": 1,            // cuántas hay que marcar
  "e": "explicación",
  "r": "url de documentación",
  "d": "Nombre del dominio",
  "lvl": "core"      // opcional: "core" o "extra"
}
```

## Estructura

- `src/lib/` — lógica pura (storage con localStorage, motor de quiz)
- `src/hooks/` — carga de datos
- `src/components/` — UI (Home, Session, QuestionCard, Results, Strata, Timer)
- `public/data/` — catálogo y bancos de preguntas

## Notas

- El progreso se guarda en `localStorage` del navegador de cada usuario.
- Hay exportar/importar progreso (copia de seguridad en JSON).
- Las explicaciones provienen de un banco de práctica y pueden contener
  imprecisiones puntuales; cada pregunta enlaza a la documentación oficial.
