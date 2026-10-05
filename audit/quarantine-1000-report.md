# Segunda tanda del bloque apartado (IDs 3–462) — 2026-09-23

Cien preguntas apartadas, elegidas por orden de ID entre las 360 que quedaban tras la tanda 900. Los IDs están congelados en [quarantine-1000-ids.json](quarantine-1000-ids.json) y las decisiones aplicadas en [quarantine-1000-decisions.json](quarantine-1000-decisions.json). Se añade además una errata sobre una pregunta que ya estaba contrastada, registrada aparte en [errata-decisions.json](errata-decisions.json).

## Resultado

| Decisión | Preguntas |
|---|---|
| Conservadas tras contrastar | 33 |
| Corregidas | 13 |
| Archivadas | 53 |
| Siguen apartadas | 1 |

Estado del banco tras la tanda: **868 contrastadas**, 0 pendientes, **261 apartadas** y **353 archivadas**. Las 13 corregidas reciben la revisión `cof-c03-2026-09-23-q1000`; las revisiones anteriores no se tocan, así que solo se reinicia el dominio de esas 13.

Este bloque es el más antiguo del banco y arrastra el estilo de volcado de examen: enunciados de verdadero/falso, cifras sueltas y muchas repeticiones del mismo hecho. De ahí que el porcentaje archivado sea alto. Cada archivado cita la pregunta contrastada que ya evalúa ese hecho, o el motivo documental por el que la clave no se sostiene.

## Claves incorrectas o insostenibles

| ID | Problema | Corrección |
|---|---|---|
| 38 | Daba «aproximadamente 16 MB» como tamaño de una micro-partición. La documentación dice entre 50 MB y 500 MB **sin comprimir**; 16 MB es el tamaño comprimido típico, que no es lo que se pregunta. | Opción sustituida por el rango documentado. |
| 75 | Excluía Java de los lenguajes de UDF. Java es lenguaje de handler admitido (junto a JavaScript, Python, Scala y SQL), así que la clave enseñaba lo contrario de la documentación. | Nuevo juego de opciones con Ruby y C# como distractores. |
| 262 | Daba VARIANT por no admitido en la clasificación de datos. La documentación solo excluye BINARY, DECFLOAT, GEOGRAPHY, UUID y VECTOR, de modo que había dos respuestas correctas. | Reformulada a dos respuestas: FLOAT y VARCHAR. |
| 348 | La clave marcaba `STRIP_OUTER_ARRAY`, que es una opción de **carga**, y la explicación describía dos opciones distintas de las marcadas. | Clave corregida a `OBJECT_CONSTRUCT` y `SINGLE = TRUE` con el máximo de 5 GB. |
| 435 | Proponía `UNDROP TABLE` tras sustituir un esquema por un clon. Las tablas desaparecieron **con el esquema**, y `UNDROP` falla si ya existe un objeto con ese nombre. | Clave corregida: renombrar el clon y ejecutar `UNDROP SCHEMA`. La respuesta ya figuraba entre los distractores. |
| 157, 199, 249, 67 | Daban por documentado que `MIN`, `COUNT(1)` o los metadatos de micro-partición resuelven una consulta sin warehouse. La página de warehouses dice literalmente que los warehouses son necesarios para las consultas y para todo DML, y no documenta esa excepción. | El 157 se reformula con DDL como única operación sin cómputo; los otros tres se archivan. |
| 428 | De respuesta única, descartaba la auditoría de escrituras, que la sección *Benefits* de ACCESS_HISTORY sí enumera. | Convertida en dos respuestas alineadas con esa sección. |
| 91 | Verdadero/falso que daba por bueno que AWS PrivateLink por sí solo conecta un centro de datos propio. La documentación exige combinarlo con AWS Direct Connect. | Reformulada como escenario de conectividad privada. |

## Ambigüedades y datos caducados

- **421** (apartada desde la tanda 900) se rescata: mezclaba quién crea los roles personalizados con quién los hereda. Ahora cada opción enuncia una recomendación concreta: los crea USERADMIN o un rol con `CREATE ROLE`, y la jerarquía se concede a SYSADMIN.
- **278** afirmaba que Snowflake se despliega en al menos tres zonas de disponibilidad. Las páginas actuales de plataformas y regiones no lo dicen, así que se retira esa opción y la pregunta pasa a dos respuestas comprobables.
- **456** preguntaba por el valor por defecto «en la interfaz web». Se reformula sobre el valor documentado de `AUTO_SUSPEND`, 600 segundos.
- **268** pedía «qué esquema» en singular mientras la clave marcaba dos. Corregido el enunciado sin tocar la respuesta.
- **31** usaba «Premier», que no es una edición de Snowflake. Sustituida por VPS, que obliga a razonar cuál es la edición **mínima**.
- **207** y **154** describen el Marketplace con la terminología anterior de listings: hoy son gratuito, de prueba limitada y de pago.
- **173** parte de un error de tamaño máximo de 16 MB que ya no se reproduce con los límites actuales de VARIANT.
- **15** y **43** dependen de que Snowflake no sirva cargas transaccionales ni tenga índices, algo que dejó de ser general con las tablas híbridas.

## Errata sobre una pregunta ya contrastada

El **ID 487**, validado en la tanda 300, queda archivado. Su distractor «vista estándar no segura» dejó de ser falso: con `SECURE_OBJECTS_ONLY = FALSE` se puede conceder `SELECT` sobre vistas no seguras a un share. Ese matiz ya lo evalúa el ID 781 y el resto de la pregunta duplica el ID 373, así que reformularla habría repetido un hecho cubierto por dos preguntas mejores. Se aplica desde `review-errata.mjs`, con estado previo `verified`, sin tocar el original ni las revisiones de otras preguntas.

## Criterio de archivado

Se archiva cuando el mismo hecho, con la misma respuesta, ya lo evalúa una pregunta contrastada (se cita su ID), cuando la documentación actual no sostiene la clave, o cuando el enunciado depende de una interfaz o una terminología que ya cambió. En la duda se conserva. Los 53 archivados de esta tanda se reparten así: 38 por duplicar material ya contrastado y 15 por clave insostenible, ambigüedad o dato obsoleto.

Los grupos más repetidos eran la caché de resultados (IDs 40, 54, 244 y 276, ya cubiertos por 293, 316 y 579), el tamaño de fichero recomendado al cargar (155, 232, 277, 385 y 339, cubiertos por el 189) y los objetos compartibles (306, 314, 321 y 372, cubiertos por 228, 344, 373, 593, 1072 y 1271).

## Sigue apartada

**ID 235**, sobre la edición mínima para una integración SCIM. La documentación actual de SCIM no declara edición mínima y la tabla de ediciones no menciona SCIM, mientras que la autenticación federada y el SSO figuran en todas. No se fuerza la validación: hace falta una fuente oficial que lo resuelva.

## Comprobaciones

- `npm run audit` regenera el banco desde `audit/original/snowpro-core.json`, que no se modifica.
- `npm test`: 19 pruebas en verde, incluidas las nuevas de esta tanda y de las erratas.
- 13 fuentes nuevas registradas en `audit/sources.json` (270 entradas), todas con estado 200 en la fecha de la revisión.
- Las preguntas archivadas y apartadas conservan su contenido original en el banco y en el registro; no se eliminan.

Quedan **261 apartadas**. Esto no acredita cobertura exhaustiva del temario ni valida el banco completo.
