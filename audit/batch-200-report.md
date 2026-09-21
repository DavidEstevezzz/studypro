# Segunda tanda de 100 pendientes

Primeras 100 pendientes por orden de ID después de la tanda anterior: IDs seleccionados entre 205 y 451. Lista congelada en batch-200-ids.json.

**53 conservadas con explicación revisada, 44 corregidas o reformuladas y 3 archivadas.** Ninguna de estas 100 queda pendiente.

Resultado acumulado: 415 contrastadas, 591 pendientes, 454 apartadas y 22 archivadas. El original y las revisiones previas se conservan.

## Hallazgos concretos

- ID 298: faltaba la acción de suspensión inmediata en la clave correcta.
- ID 357: sustituida la antigua regla de 2–3 comprobaciones por el comportamiento actual de reducción de clústeres.
- ID 210: el formato de dos respuestas excluía otra alternativa verdadera; se aclara la replicación física de clones.
- ID 295: distingue tipos geoespaciales dedicados de contenedores capaces de guardar GeoJSON.
- ID 423: usa RETURN_10_ROWS como valor real, en lugar del marcador de sintaxis RETURN_N_ROWS.
- ID 450: actualizada a la vista ACCOUNT_USAGE; la función antigua figura como generalmente obsoleta en la documentación.
- IDs 382 y 418: redundantes con preguntas ya contrastadas. ID 442: trivia de gráficos de una interfaz cambiante.

## Decisiones por pregunta

| ID | Decisión | Referencia o motivo |
|---|---|---|
| 205 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-table) |
| 206 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 209 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 210 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/account-replication-considerations) |
| 211 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-overview) |
| 212 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 214 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 215 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 222 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 225 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 228 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/collaboration/collaboration-listings-about) |
| 229 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 230 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 231 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-clone) |
| 236 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-temp-transient) |
| 237 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 238 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 240 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/external-functions-introduction) |
| 241 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 245 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tasks-intro) |
| 246 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 252 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 255 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-table) |
| 257 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 258 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 261 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 265 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory) |
| 266 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-time-travel) |
| 267 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare) |
| 275 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 280 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-configure) |
| 282 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory) |
| 283 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 284 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 287 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering) |
| 289 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 290 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/account-replication-intro) |
| 293 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/querying-persisted-results) |
| 295 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-geospatial) |
| 296 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 298 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 300 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-time-travel) |
| 302 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 304 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/current_client) |
| 305 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 307 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/session-variables) |
| 310 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 311 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/get_ddl) |
| 322 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-exchange) |
| 326 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-transfer) |
| 327 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering) |
| 334 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto) |
| 340 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/info-schema/views) |
| 342 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/show-grants) |
| 344 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 346 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-load) |
| 347 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse) |
| 349 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/querying-persisted-results) |
| 351 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 353 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache) |
| 355 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/external-functions-introduction) |
| 356 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 357 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 358 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/account-replication-intro) |
| 359 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tasks-intro) |
| 366 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies) |
| 368 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references) |
| 369 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables) |
| 371 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 373 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 376 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-pipe) |
| 378 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 379 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 381 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 382 | Archivar | Repite la responsabilidad de ejecución de warehouses ya corregida en el ID 261; se conserva el original. |
| 386 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 388 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/unstructured-intro) |
| 389 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/query_history) |
| 401 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies) |
| 404 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 407 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/parameters) |
| 414 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 416 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowcd) |
| 418 | Archivar | Repite los métodos de gestión de shares ya contrastados en el ID 131, sin aportar un escenario nuevo. |
| 419 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 420 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 423 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 427 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/list) |
| 429 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 431 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) |
| 433 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 436 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-overview) |
| 437 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 438 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/developer-guide/snowflake-scripting/blocks) |
| 442 | Archivar | Trivia sobre tipos de gráficos de una interfaz cambiante; se retira del simulacro y se conserva el original. |
| 443 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 444 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 446 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets) |
| 450 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/warehouse_metering_history) |
| 451 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |

Texto revisado y explicaciones en batch-200-decisions.json; versiones originales y finales en review-ledger.json. Fuentes consultadas en sources.json.

Validación breve: 100 decisiones únicas aplicadas, claves y fuentes consistentes, original intacto, cuotas del simulacro y revisiones previas conservadas. Ocho pruebas pasan. No se han repetido navegador ni compilación, ni ejecutado consultas en una cuenta Snowflake.
