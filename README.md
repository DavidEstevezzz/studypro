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

## Banco revisado COF-C03

Las preguntas se mantienen en inglés. La práctica predeterminada y los simulacros usan 624 preguntas contrastadas, incluidas 70 nuevas y 181 reformuladas/corregidas. El simulacro distribuye 100 preguntas con pesos 31/20/18/21/10 y 115 minutos. El 31% engloba arquitectura y funcionalidades, no solo IA.

La práctica adicional permite incluir 291 preguntas pendientes con aviso. Otras 454 quedan apartadas para revisión y 113 archivadas; no se eliminan del original. Estos estados no equivalen a afirmar que todas las apartadas sean falsas. La revisión documental del banco completo sigue pendiente.

Consulta el [informe de auditoría](audit/README.md), el [mapa de carencias](audit/coverage-gaps.md) y el [registro de decisiones](audit/review-ledger.csv). El original intacto está en `audit/original/`. Cada pregunta contrastada identifica su objetivo, fecha y fuente. Los enlaces consultados se registran en `audit/sources.json`.

Para actualizar el banco, editar `scripts/reviewed-questions.mjs`, `scripts/new-questions.mjs` o el script de la tanda (`scripts/review-batch-*.mjs`), regenerar y comprobar:

```bash
npm run audit
npm test
npm run lint
npm run build
```

La generación parte siempre del original conservado. El antiguo script de correcciones se bloquea sobre un banco auditado.

## Progreso y resultados

- El progreso se guarda en `localStorage` del navegador de cada usuario.
- Hay exportar/importar progreso (copia de seguridad en JSON).
- La actualización conserva el historial y guarda una copia previa en el navegador. Las preguntas corregidas reinician su dominio/racha, conservando sus aciertos y fallos anteriores.
- Los simulacros antiguos siguen en el historial; solo los de la versión vigente cuentan para el objetivo interno de práctica.
- El 75% es un objetivo de práctica, no una equivalencia de los 750 puntos escalados exigidos en el examen. Repetir preguntas puede inflar el porcentaje por memorización.

Última tanda: [quinta tanda de 100 preguntas revisadas](audit/batch-500-report.md), con decisiones y referencias por ID.
