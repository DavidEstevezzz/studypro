# Última tanda: las 91 pendientes restantes

Tras la séptima tanda quedaban 91 preguntas con `review.status === 'pending'` (IDs 1274 a 2057). Se revisaron todas, así que el banco ya no tiene pendientes. La lista está congelada en batch-800-ids.json.

**54 conservadas con explicación revisada, 5 corregidas o reformuladas y 32 archivadas.** Ninguna queda pendiente ni apartada.

Banco resultante: 781 contrastadas, 0 pendientes, 455 apartadas y 246 archivadas. En total, 225 preguntas originales corregidas o reformuladas. Versión del banco: `cof-c03-2026-09-23-batch800`; solo las 5 corregidas aquí reciben esa `contentRevision`.

La tanda tiene dos bloques muy distintos: 51 preguntas del banco antiguo (IDs 1274-1351), con explicaciones en español, y 40 sobre contenido nuevo del C03 (IDs 2001-2057): Cortex AISQL, Iceberg, integración con Git y Notebooks. Todas las explicaciones quedan en inglés con referencia oficial.

## Errores encontrados

- **ID 1287 (clave incorrecta).** Preguntaba qué operador DML aparece en Query Profile al descargar una tabla a un stage. La clave era COPY y se daba UNLOAD como distractor, con una explicación que negaba su existencia. La documentación de Query Profile define `Unload` como el operador de una operación COPY que exporta datos de una tabla a un archivo de un stage; una carga con COPY INTO `<table>` aparece como `Insert`. No existe un operador COPY.
- **ID 1277.** Preguntaba qué rol puede ver TABLE_STORAGE_METRICS «por defecto» y citaba la vista de INFORMATION_SCHEMA, cuya visibilidad depende de los privilegios sobre los objetos. La regla del rol por defecto es de ACCOUNT_USAGE: la base SNOWFLAKE se ve, pero el acceso a sus esquemas se concede, y por defecto solo ACCOUNTADMIN consulta esas vistas. Acotada a ACCOUNT_USAGE.
- **ID 1302.** Situaba STRIP_NULL_VALUE «al cargar datos», que es donde actúa la opción de formato STRIP_NULL_VALUES. Acotada a la función sobre un valor VARIANT y corregido un distractor mal escrito.
- **ID 1301.** Llamaba «query metric» a la profundidad de clustering, que es una métrica de la tabla (SYSTEM$CLUSTERING_DEPTH). Reformulada.
- **ID 2050.** Distractores de relleno («solo columnas numéricas», «sustituyen al comando COPY») cambiados por confusiones plausibles: integración con un proveedor externo de modelos y ejecución en un compute pool de contenedores.
- **ID 1311 (solo explicación).** La explicación descartaba `InternalObject` como operador inexistente, cuando sí está documentado (acceso a un objeto interno, por ejemplo una vista del Information Schema). Se corrige la explicación sin tocar enunciado ni opciones, así que la pregunta no cambia de revisión.

## Criterio de archivado

Se archivó cuando la pregunta planteaba **el mismo hecho con la misma respuesta** que una ya contrastada, de modo que acertar una regala la otra. En caso de duda se conservó. Con ese listón salen 32 de 91:

- **28 casi duplicados.** El bloque 1274-1351 repite mucho del banco ya revisado: COPY INTO para descargar (ID 584), OBJECT_CONSTRUCT a JSON (517), RESULT_SCAN (878), Snowpipe (197), cuentas de lectura (468), esquemas de acceso gestionado (3063), URL prefirmadas (388), inmutabilidad de micro-particiones (116) o alertas (3036). En el bloque nuevo se repetían Cortex Search (3027), Cortex Analyst (3028), Notebooks (3031), Snowpark (3032) y Streamlit (3030).
- **ID 1320, ambigua.** Preguntaba qué objeto puede compartirse y daba «vista segura» como única respuesta, pero también se comparten vistas materializadas seguras y UDF seguras. Los objetos compartibles ya se evalúan en 222, 373 y 593.
- **ID 1298, formulación inválida.** Presentaba SAMPLE como una función con distractores inexistentes (AVERAGE, MEDIAN o RANDOM con ROWS).
- **ID 2014, material heredado.** La documentación marca TRY_COMPLETE como función heredada que se retirará a finales de 2026 y recomienda AI_COMPLETE.

## Avisos sobre el contenido nuevo

- **Notebooks.** La documentación actual llama «Legacy Notebooks» a la experiencia clásica y la sustituye por Notebooks in Workspaces, ya en disponibilidad general. La pregunta conservada (ID 2045) lo advierte en su explicación. Conviene revisarla cuando se complete la migración.
- **Cortex AISQL.** El bloque 2001-2021 se contrastó función por función con la página de AISQL y con las referencias individuales: AI_COMPLETE (versión actualizada de COMPLETE), AI_CLASSIFY, AI_REDACT, AI_TRANSCRIBE, AI_PARSE_DOCUMENT, AI_EMBED, AI_SIMILARITY, AI_SUMMARIZE_AGG, AI_COUNT_TOKENS y TO_FILE, además del tipo VECTOR y de la recomendación de usar la REST API cuando importa la latencia.
- **Iceberg y Git.** Verificados `CATALOG = 'SNOWFLAKE'`, los cuatro escenarios que exigen catalog integration, el volumen externo predeterminado, la carga con COPY INTO y Snowpipe, `ALTER GIT REPOSITORY … FETCH`, `SHOW GIT BRANCHES`, `API_ALLOWED_PREFIXES` y la cláusula USING de EXECUTE IMMEDIATE FROM con plantillas Jinja2.

Objetivos de las 59 contrastadas: 1.1 (1), 1.3 (2), 1.4 (2), 1.5 (5), 1.6 (17), 2.1 (2), 2.2 (1), 2.3 (4), 3.1 (3), 3.2 (2), 3.3 (8), 4.1 (4), 4.2 (2), 4.4 (5) y 5.2 (1). La tanda refuerza sobre todo 1.6 y 3.3, que eran los huecos señalados en coverage-gaps.md.

## Cambios en el generador

La comprobación de tamaño de tanda ya no exige 100 preguntas: la lista congelada de IDs define la tanda, porque esta última es de 91. El test equivalente usa la misma regla, y la comprobación de la cola de pendientes ahora acepta que no quede ninguna, exigiendo solo que lo pendiente esté por detrás de la última tanda.

## Registro por pregunta

| ID | Decisión | Referencia o motivo |
|---|---|---|
| 1274 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized). Clave confirmada: la página de vistas materializadas cita EXPLAIN y Query Profile para comprobar su uso; explicación traducida al inglés. |
| 1275 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-overview). Cálculo comprobado con la regla de facturación por segundo y mínimo de 60 segundos por arranque; explicación en inglés. |
| 1277 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/table_storage_metrics). El original citaba la vista de INFORMATION_SCHEMA, cuya visibilidad depende de los privilegios sobre los objetos, mientras que la regla del rol por defecto es de ACCOUNT_USAGE. Acotado a esa vista. |
| 1282 | Archivar | Repite la identificación de la tabla de directorio como objeto para procesar archivos de un stage, ya contrastada en IDs 744 y 757. |
| 1283 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/query_history). Columnas comprobadas en la vista ACCOUNT_USAGE.QUERY_HISTORY; explicación en inglés. |
| 1284 | Archivar | Repite la cuenta de lectura para consumidores sin cuenta de Snowflake, ya contrastada en IDs 468, 531 y 533. |
| 1287 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity). Clave incorrecta: el operador documentado para la descarga es Unload. La explicación anterior negaba que UNLOAD existiera como operador. |
| 1288 | Archivar | Repite los niveles a los que se aplican las políticas de red (usuario y cuenta), ya contrastados en ID 401. |
| 1290 | Archivar | Repite el muestreo de tamaño fijo con ROWS frente a los porcentajes de SYSTEM y BERNOULLI, ya contrastado en ID 905. |
| 1291 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table). Comprobadas ambas opciones y la ventana de 64 días de los metadatos de carga; explicación en inglés. |
| 1292 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/external-functions-introduction). Definición contrastada; se aclara que la puerta de enlace pertenece al servicio remoto y no es el objeto de Snowflake. |
| 1293 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts). Terminología contrastada con la arquitectura documentada; explicación en inglés. |
| 1298 | Archivar | Presenta SAMPLE como si fuera una función y usa distractores inexistentes (AVERAGE, MEDIAN o RANDOM con ROWS); el muestreo ya se evalúa en IDs 610 y 905. |
| 1299 | Archivar | Repite el etiquetado de objetos para seguir datos sensibles, ya contrastado en ID 715. |
| 1301 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys). El original la llamaba «query metric» cuando es una métrica de la tabla; acotado el enunciado y ajustadas las opciones al vocabulario documentado. |
| 1302 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/strip_null_value). El enunciado situaba la función en la carga, donde actúa la opción de formato STRIP_NULL_VALUES; acotado a la función sobre VARIANT y corregido el distractor mal escrito. |
| 1305 | Archivar | Repite ACCESS_HISTORY como registro de lecturas y escrituras sobre una tabla, ya contrastado en IDs 738 y 785. |
| 1306 | Archivar | Repite el formato de archivo con nombre para descargas periódicas, ya contrastado en ID 180. |
| 1307 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/split_to_table). Sintaxis contrastada con los ejemplos oficiales, incluida la variante LATERAL; explicación en inglés. |
| 1308 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/parse_json). Contrastado con la nota de la función sobre NULL frente a 'null'; explicación resumida en inglés. |
| 1309 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-encryption-manage). Edición y comportamiento contrastados con la página de gestión de claves; explicación en inglés. |
| 1310 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-stage). Comprobado FILE_FORMAT en CREATE STAGE y en COPY INTO <location>; explicación en inglés. |
| 1311 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity). Operador y estadísticas contrastados con la referencia de Query Profile; corregida la explicación, que descartaba InternalObject como operador inexistente. |
| 1312 | Archivar | Repite los metadatos de micro-partición (valores distintos y rango por columna), ya contrastados en ID 753. |
| 1315 | Archivar | Repite MAX_CLUSTER_COUNT como escalado horizontal, ya contrastado en IDs 137 y 457. |
| 1316 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-overview). Contrastado con la descripción oficial de los procedimientos almacenados; explicación en inglés. |
| 1317 | Archivar | Repite el consumo de créditos por el mantenimiento de una vista materializada, ya contrastado en IDs 229 y 943. |
| 1320 | Archivar | Ambigua con la documentación vigente: además de las vistas seguras se pueden compartir vistas materializadas seguras y UDF seguras. Los objetos compartibles ya se evalúan en IDs 222, 373 y 593. |
| 1321 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview). Definición contrastada y referencia corregida a la página de autenticación federada y SSO; explicación en inglés. |
| 1323 | Archivar | Repite «partitions scanned» como indicador de pruning, ya contrastado en IDs 393 y 443. |
| 1324 | Archivar | Repite el alcance de la URL prefirmada (cualquiera con la URL accede mientras viva el token), ya contrastado en ID 388. |
| 1326 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create). Contrastado con la página de cuentas de lectura; referencia corregida (la anterior ya no existe) y explicación en inglés. |
| 1327 | Archivar | Repite la inmutabilidad de las micro-particiones, ya contrastada en ID 116. |
| 1328 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster). Comportamiento contrastado literalmente con la documentación de warehouses multiclúster; explicación en inglés. |
| 1329 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location). Opción y su efecto contrastados en COPY INTO <location>; explicación en inglés. |
| 1330 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage). Contrastado con la página de costes de almacenamiento y con la de vistas materializadas; explicación en inglés. |
| 1331 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview). Definición literal de DAC en la página de control de acceso; explicación en inglés. |
| 1332 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster). Política contrastada con la redacción oficial; explicación en inglés. |
| 1334 | Archivar | Repite la autenticación por par de claves para cuentas de servicio, ya contrastada en ID 3015. |
| 1336 | Archivar | Repite RESULT_SCAN para recuperar la salida de un comando anterior, ya contrastado en ID 878. |
| 1337 | Archivar | Repite OBJECT_CONSTRUCT junto a COPY INTO para descargar a JSON, ya contrastado en ID 517. |
| 1338 | Archivar | Repite que en un esquema de acceso gestionado el propietario pierde las decisiones de concesión, ya contrastado en IDs 564 y 3063. |
| 1339 | Archivar | Repite COPY INTO <location> como comando de descarga, ya contrastado en ID 584. |
| 1340 | Archivar | Repite Snowpipe como carga en cuanto los archivos están disponibles, ya contrastado en IDs 197 y 3009. |
| 1341 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/querying-semistructured). Regla de mayúsculas contrastada; se conserva la clave ya corregida y se traduce la explicación al inglés. |
| 1342 | Archivar | Repite el privilegio MONITOR para ver un resource monitor, ya contrastado en ID 465. |
| 1344 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/info-schema/table_storage_metrics). Columnas de almacenamiento propio y retenido por clones contrastadas; explicación en inglés. |
| 1347 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges). Privilegio global contrastado en la tabla de privilegios; explicación en inglés. |
| 1348 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/streams-intro). Objetos admitidos contrastados con la lista oficial; añadida la condición de change tracking para vistas; explicación en inglés. |
| 1350 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/query-acceleration-service). Definición contrastada y añadido el requisito de edición; explicación en inglés. |
| 1351 | Archivar | Repite la alerta como objeto de esquema que evalúa una condición y actúa periódicamente, ya contrastado en ID 3036. |
| 2001 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/ai_complete). Función y relación con COMPLETE contrastadas con su página; explicación traducida al inglés. |
| 2003 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Descripción contrastada con la lista de funciones AISQL; explicación en inglés. |
| 2004 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Descripción contrastada con la lista de funciones AISQL; explicación en inglés. |
| 2005 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/ai_transcribe). Función contrastada con su página de referencia; explicación en inglés. |
| 2006 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/ai_parse_document). Modos OCR y LAYOUT contrastados con su página de referencia; explicación en inglés. |
| 2007 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Descripción contrastada con la lista de funciones AISQL; explicación en inglés. |
| 2008 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/vector-embeddings). Función de similitud contrastada con la página de embeddings; explicación en inglés y sin afirmar que los distractores no existan. |
| 2009 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/vector-embeddings). Tipo de datos contrastado con la página de embeddings; explicación en inglés. |
| 2010 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/ai_summarize_agg). Función de agregación contrastada con su página; explicación en inglés. |
| 2012 | Archivar | Repite la identificación de Cortex Search como servicio de búsqueda sobre datos no estructurados, ya contrastada en ID 3027. |
| 2013 | Archivar | Repite Cortex Analyst como conversión de lenguaje natural a SQL, ya contrastado en ID 3028. |
| 2014 | Archivar | La documentación marca TRY_COMPLETE como función heredada que se retirará a finales de 2026 y recomienda AI_COMPLETE para usos nuevos. |
| 2015 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Función auxiliar contrastada con la lista de funciones AISQL; explicación en inglés. |
| 2016 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Función auxiliar contrastada con la lista de funciones AISQL; explicación en inglés. |
| 2019 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/ai_complete-single-string). Orden de argumentos contrastado con la sintaxis de entrada de texto; explicación en inglés. |
| 2020 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Recomendación contrastada con la nota sobre throughput y latencia; explicación en inglés. |
| 2021 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Función contrastada con la lista de funciones AISQL; referencia ajustada a esa página y explicación en inglés. |
| 2023 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-iceberg-table). Parámetro contrastado con la sintaxis de CREATE ICEBERG TABLE; explicación en inglés. |
| 2024 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration). Escenarios contrastados con la lista oficial de casos que exigen catalog integration; explicación en inglés. |
| 2025 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume). Afirmación contrastada literalmente con la página de external volumes; explicación en inglés. |
| 2027 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-iceberg-load). Métodos de carga contrastados con la página de carga de tablas Iceberg; referencia actualizada a esa página y explicación en inglés. |
| 2028 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume). Comportamiento del volumen predeterminado contrastado con el ejemplo oficial; explicación en inglés. |
| 2030 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-iceberg-manage). Conversión contrastada con la página de gestión de tablas Iceberg; explicación en inglés. |
| 2032 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-git-repository). Comando contrastado con la documentación de operaciones Git; explicación en inglés. |
| 2034 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-git-repository). Parámetros contrastados con CREATE GIT REPOSITORY; explicación en inglés. |
| 2036 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-git-repository). Buena práctica contrastada literalmente en CREATE GIT REPOSITORY; explicación en inglés. |
| 2039 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/git/git-operations). Sintaxis contrastada con los ejemplos de operaciones Git; explicación en inglés. |
| 2040 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/git/git-operations). Comando contrastado con la documentación de operaciones Git; explicación en inglés. |
| 2041 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-api-integration). Parámetro contrastado con CREATE API INTEGRATION; explicación en inglés. |
| 2042 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/execute-immediate-from). Cláusula USING y plantillas Jinja2 contrastadas con la referencia del comando; explicación en inglés. |
| 2043 | Archivar | Repite los lenguajes de las celdas de Notebooks (SQL y Python), ya contrastados en ID 3031. |
| 2044 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-notebook). Sintaxis contrastada con CREATE NOTEBOOK; explicación en inglés. |
| 2045 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight/notebooks). Integraciones contrastadas con la página de Notebooks; se advierte del traslado a Notebooks in Workspaces, que la documentación marca como sustituto. |
| 2048 | Archivar | Repite el caso de uso de Cortex Search para aplicaciones RAG, ya contrastado en ID 3027. |
| 2049 | Archivar | Repite Cortex Analyst para preguntar en lenguaje natural sobre datos bien modelados, ya contrastado en ID 3028. |
| 2050 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql). Distractores de relleno («solo columnas numéricas», «sustituyen al comando COPY») sustituidos por confusiones plausibles: proveedor externo, integración API y cómputo en contenedores. |
| 2054 | Archivar | Repite el posicionamiento de Snowflake Notebooks como interfaz interactiva por celdas, ya contrastado en ID 3031. |
| 2055 | Archivar | Repite la definición de Snowpark, ya cubierta por los IDs 653 (lenguajes) y 3032 (ejecución junto a los datos). |
| 2056 | Archivar | Repite Streamlit in Snowflake como forma de crear aplicaciones de datos en Python dentro de la plataforma, ya contrastado en ID 3030. |
| 2057 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/snowflake-ml/overview). Alcance contrastado con la página de Snowflake ML; explicación en inglés. |

Cambios completos en batch-800-decisions.json. Originales y versiones finales, en review-ledger.json. Fuentes en sources.json (18 referencias nuevas).

## Comprobaciones

`npm run audit` y `npm test` pasan: 16 pruebas. Tras regenerar solo cambiaron las 91 preguntas de la tanda, y solo las 5 corregidas cambiaron de revisión.

Sin pruebas de navegador ni compilación, porque solo cambia contenido. No se ejecutaron consultas en una cuenta real de Snowflake. Los tests comprueban estructura y comportamiento, no la exactitud semántica de las respuestas.

## Qué queda

No quedan pendientes, pero **sí 455 apartadas** que nunca se han validado: se retiraron en el cribado inicial por clave dudosa, imagen ausente, afirmación absoluta o límite que cambia. Son el siguiente bloque de trabajo y el más laborioso, porque cada una exige comprobar la sospecha concreta. Con 781 contrastadas, un simulacro de 100 preguntas repite material a menudo: parte del porcentaje puede venir de la memoria.
