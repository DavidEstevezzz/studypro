# Revisión de las siguientes 100 pendientes

Selección: primeras 100 con estado pendiente por ID antes de la tanda, del ID 1 al 204 (no son 100 IDs consecutivos). Lista congelada en next-100-ids.json.

**58 conservadas, 35 corregidas/reformuladas y 7 archivadas.** Las explicaciones de las conservadas también se han sustituido por notas contrastadas. Ninguna pregunta de esta tanda queda pendiente.

Banco resultante: 318 contrastadas, 691 pendientes, 454 apartadas y 19 archivadas. El original permanece intacto.

## Cambios destacados

- ID 4: distingue USERADMIN, dedicado a usuarios/roles, de SECURITYADMIN y ACCOUNTADMIN.
- IDs 9 y 17: separan tamaño, concurrencia y condiciones del coste/rendimiento.
- IDs 24 y 115: acotan Fail-safe a los objetos elegibles y lo separan de Time Travel.
- IDs 89 y 144: eliminan alternativas que podían solaparse por soporte de datos estructurados o semiestructurados.
- ID 165: GET se refiere a stages internos.
- ID 191: 16 MB es el valor predeterminado de MAX_FILE_SIZE, no el tamaño garantizado de cada fichero.
- ID 200: los 14 días corresponden al historial del pipe; otras vistas tienen retenciones distintas.

## Decisiones por ID

| ID | Decisión | Motivo / referencia |
|---|---|---|
| 1 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 4 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 5 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 7 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets) |
| 9 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 10 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 11 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 13 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/object-clone) |
| 17 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 18 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 19 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 20 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage) |
| 22 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 24 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 25 | Archivar | Trivia histÃ³rica sobre el origen del producto; la arquitectura actual ya se evalÃºa en preguntas mÃ¡s Ãºtiles. |
| 26 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 27 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 29 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 30 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-manage) |
| 33 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 34 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/developer-guide/jdbc/jdbc) |
| 35 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 37 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 39 | Archivar | La unicidad global de identificadores y su uso con soporte no evalÃºa una habilidad prioritaria del temario; se conserva el original sin afirmar que la clave sea falsa. |
| 42 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 46 | Archivar | NavegaciÃ³n de la interfaz clÃ¡sica: las opciones no representan una pregunta estable sobre Snowsight actual. |
| 48 | Archivar | Cadencia operativa de releases e interfaz de mantenimiento: retirar de evaluaciÃ³n para evitar memorizar detalles cambiantes ajenos a las habilidades principales. |
| 49 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/object-clone) |
| 52 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/network-policies) |
| 53 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 55 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/drop-role) |
| 56 | Archivar | UbicaciÃ³n histÃ³rica de descargas en la interfaz clÃ¡sica; sustituida en la selecciÃ³n por preguntas de herramientas y conectividad. |
| 57 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/merge) |
| 62 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 69 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 74 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-pipe) |
| 76 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 77 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-overview) |
| 79 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 84 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 86 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 87 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets) |
| 88 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/querying-stage) |
| 89 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/functions/flatten) |
| 93 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 94 | Archivar | Repite la afirmaciÃ³n histÃ³rica de diseÃ±o cloud-native; el objetivo de arquitectura se cubre con preguntas funcionales. |
| 95 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 97 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 100 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-time-travel) |
| 101 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 102 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 106 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage) |
| 107 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 108 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview) |
| 111 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 112 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 115 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 116 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 117 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 119 | Archivar | ComparaciÃ³n vaga de tiempos de aprovisionamiento sin condiciÃ³n medible; no aporta una decisiÃ³n prÃ¡ctica y no garantiza comportamiento. |
| 120 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/tasks-intro) |
| 121 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/stage_storage_usage_history) |
| 122 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 123 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 126 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare) |
| 127 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 128 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-configure) |
| 131 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 134 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview) |
| 135 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare) |
| 138 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 141 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 143 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory) |
| 144 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 145 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-transform) |
| 146 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse) |
| 148 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 156 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/security-column-ext-token-intro) |
| 159 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 161 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 165 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/get) |
| 168 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 172 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/querying-persisted-results) |
| 174 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights) |
| 176 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 179 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 180 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 181 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 182 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/remove) |
| 183 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/intro-cloud-platforms) |
| 186 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 187 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/explain) |
| 188 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 189 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare) |
| 191 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 193 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 200 | Corregir/reformular | Reformulado para corregir ambigÃ¼edad, alcance o terminologÃ­a; clave y explicaciÃ³n contrastadas. [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 201 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 202 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 204 | Conservar | Enunciado, todas las opciones y clave contrastados; explicaciÃ³n actualizada. [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-worksheets) |

Las versiones antes/después están en review-ledger.json y las referencias consultadas en sources.json. Archivar no equivale a demostrar que una afirmación sea falsa: también se retiran trivia, redundancias y preguntas de navegación histórica.

Validación: original intacto, cobertura exacta de los 100 IDs, claves y referencias coherentes, cuotas de simulacro y conservación de revisiones anteriores. No se han repetido las pruebas de navegador ni ejecutado consultas en una cuenta Snowflake.
