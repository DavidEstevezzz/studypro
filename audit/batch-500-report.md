# Quinta tanda: 100 preguntas pendientes — 2026-09-23

Selección: las primeras 100 pendientes tras el batch 400 completado externamente, por ID ascendente. IDs entre 816 y 977, no todos los números consecutivos; selección exacta en `batch-500-ids.json`.

## Resultado

- 36 conservadas con explicación revisada y fuente oficial.
- 24 corregidas o reformuladas para resolver errores y ambigüedades.
- 40 archivadas: 39 redundantes y 1 sobre tipos de gráficos de la interfaz (867).
- Ninguna pregunta del lote queda pendiente. El original permanece intacto.

Banco resultante: 624 contrastadas, 291 pendientes, 454 apartadas y 113 archivadas; total 1482. Las contrastadas incluyen 70 preguntas nuevas y 181 corregidas acumuladas. Las apartadas requieren otra revisión: no se afirma que todas sean incorrectas.

## Cambios destacados

- 903: la retención heredada y las excepciones explícitas hacían verdaderas dos opciones; se reformula como selección de dos respuestas.
- 859: se distingue consultar el historial de acceder a resultados mediante RESULT_SCAN; ACCOUNTADMIN no permite leer los resultados manuales de otro usuario.
- 941: se especifican edición Enterprise y tabla permanente para aplicar el mínimo de retención del ejemplo.
- 929: se elimina la ambigüedad entre rutas válidas de herencia de etiquetas.
- 832: se repara el enunciado y se precisa el mecanismo de search access path.
- 966: OBJECT_CONSTRUCT(*) construye un objeto por fila; no agrega todas las filas en un único valor.
- 971: se acota la regla de mayúsculas a identificadores SQL sin comillas y nombres de elementos JSON.

## Método y comprobaciones

Revisión editorial del enunciado, opciones y clave, apoyada en documentación oficial de Snowflake. Se conserva lo válido, se reformula lo ambiguo y se archivan redundancias indicando la pregunta de referencia. El banco continúa en inglés. No se utilizan filtraciones de examen.

Las fuentes de cada pregunta están en las decisiones y el registro; `sources.json` registra las consultas. Una respuesta HTTP correcta por sí sola no acredita exactitud: la comprobación estructural complementa la revisión del contenido. Las fuentes ya consultadas conservan su fecha de consulta; las consultadas de nuevo se fechan 2026-09-23.

Generación del banco completada y 13 pruebas de auditoría superadas: selección de lotes, conservación del original, claves, cuotas del simulacro y migración del progreso. Los 39 destinos de duplicados quedan contrastados. No se han repetido pruebas de navegador ni compilación de la aplicación.

Se preservan fechas y revisiones de lotes anteriores. Solo las 24 preguntas corregidas reciben la revisión de contenido del batch 500. Próximo lote: primeras 100 preguntas con estado `pending` ordenadas por ID en el banco actualizado; no calcularlo como rango numérico consecutivo.

## Decisiones por ID

| ID | Decisión | Referencia / motivo |
|---|---|---|
| 816 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/tables-temp-transient) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 818 | archivar | Duplicado de 280 |
| 822 | archivar | Duplicado de 792 |
| 823 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/querying-semistructured) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 824 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/parse_json) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 825 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 827 | archivar | Duplicado de 230 |
| 830 | archivar | Duplicado de 266 |
| 831 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/query-acceleration-service) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 832 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/search-optimization-service) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 833 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 836 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/unstructured-intro) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 837 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/constructs/sample) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 841 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 842 | archivar | Duplicado de 4 |
| 843 | archivar | Duplicado de 584 |
| 845 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/warehouses-tasks) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 846 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/validate) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 848 | archivar | Duplicado de 44 |
| 849 | archivar | Duplicado de 26 |
| 850 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/warehouses-considerations) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 851 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 852 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/parameters) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 853 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 855 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/network-policies) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 856 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 857 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/current_task_graphs) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 858 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/views-materialized) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 859 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/result_scan) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 861 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 862 | archivar | Duplicado de 623 |
| 863 | archivar | Duplicado de 107 |
| 865 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/resource-monitors) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 866 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 867 | archivar | Memorización de tipos de gráficos de Snowsight, dependiente de interfaz; se mantiene el criterio aplicado a IDs 442 y 742 y se conserva el original. |
| 870 | archivar | Duplicado de 792 |
| 872 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/search-optimization/join-queries) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 873 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 875 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 876 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 878 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/result_scan) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 882 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 883 | archivar | Duplicado de 597 |
| 884 | archivar | Duplicado de 858 |
| 885 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/network-policies) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 887 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 889 | archivar | Duplicado de 289 |
| 890 | archivar | Duplicado de 161 |
| 894 | archivar | Duplicado de 600 |
| 899 | archivar | Duplicado de 678 |
| 900 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/tables-temp-transient) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 901 | archivar | Duplicado de 465 |
| 903 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/data-time-travel) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 904 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/developer-guide/snowpark/index) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 905 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/constructs/sample) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 906 | archivar | Duplicado de 555 |
| 908 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 909 | archivar | Duplicado de 640 |
| 912 | archivar | Duplicado de 451 |
| 913 | archivar | Duplicado de 624 |
| 915 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 916 | corregir | [Fuente oficial](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 917 | archivar | Duplicado de 161 |
| 919 | archivar | Duplicado de 8 |
| 920 | archivar | Duplicado de 452 |
| 922 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-cache) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 925 | archivar | Duplicado de 509 |
| 926 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/create-security-integration-saml2) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 928 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/revoke-role) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 929 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/object-tagging/introduction) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 930 | archivar | Duplicado de 573 |
| 932 | archivar | Duplicado de 729 |
| 933 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/info-schema/table_storage_metrics) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 936 | archivar | Duplicado de 555 |
| 938 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/data-load-overview) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 939 | archivar | Duplicado de 148 |
| 940 | archivar | Duplicado de 640 |
| 941 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/parameters) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 942 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 943 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/views-materialized) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 945 | archivar | Duplicado de 451 |
| 946 | archivar | Duplicado de 809 |
| 948 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 952 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 953 | archivar | Duplicado de 182 |
| 955 | archivar | Duplicado de 612 |
| 956 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 957 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/network-policies) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 959 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/show-file-formats) — Enunciado, opciones y clave contrastados; explicación revisada. |
| 961 | archivar | Duplicado de 692 |
| 963 | archivar | Duplicado de 47 |
| 966 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/functions/object_construct) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 967 | archivar | Duplicado de 182 |
| 968 | archivar | Duplicado de 457 |
| 969 | corregir | [Fuente oficial](https://docs.snowflake.com/en/sql-reference/sql/get) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 971 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/querying-semistructured) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 972 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 973 | corregir | [Fuente oficial](https://docs.snowflake.com/en/collaboration/consumer-becoming) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 974 | corregir | [Fuente oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) — Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas. |
| 977 | conservar_revisada | [Fuente oficial](https://docs.snowflake.com/en/user-guide/organizations) — Enunciado, opciones y clave contrastados; explicación revisada. |
