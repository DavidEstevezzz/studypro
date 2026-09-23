# Batch 600 — 2026-09-23

Revisadas las 100 siguientes pendientes después del batch 500: IDs seleccionados entre 978 y 1120, no un rango consecutivo. Lista exacta: `batch-600-ids.json`.

## Resultado

- 28 conservadas: cambios de explicación, referencia y clasificación; sin modificar enunciado, opciones, clave ni revisión de contenido.
- 24 corregidas: cambios específicos de contenido, con revisión batch600.
- 47 archivadas: 43 redundancias con referencia a una pregunta contrastada, 3 preguntas de identificación de interfaz y 1 sobre SnowCD, actualmente End of Life.
- 1 apartada (1056): dos respuestas se solapan; queda fuera de práctica y simulacros sin alterar su revisión de contenido.

Estado acumulado: 676 contrastadas, 191 pendientes, 455 apartadas y 160 archivadas. Las contrastadas incluyen 70 nuevas y 205 corregidas acumuladas. Próxima tanda: primeras 100 pendientes desde ID 1121.

## Método aplicado

Documentación oficial de Snowflake, con consultas agrupadas por tema. En las reformulaciones se priorizan alternativas reales de la misma familia: funciones de comparación de cadenas (991), privilegios de warehouse (1046), opciones JSON (1054), opciones COPY (1100 y 1114), tipos de integración (1104). Se conservan las opciones cuando basta con precisar el escenario, por ejemplo privilegio de un rol no propietario de una tarea (1091).

Cada decisión incluye un motivo propio. Archivar una redundancia no constituye una nueva revisión de todos los distractores de la pregunta anterior que la cubre. No se han modificado preguntas de otras tandas, incluidas 878 y 943.

## Cambios destacados

- 995: BREAK no es la única salida de un LOOP; RETURN puede salir del bloque.
- 1005: REFERENCE_USAGE corresponde a las bases adicionales de la vista compartida, no a la que contiene la vista.
- 1045: se archiva SnowCD porque su página anuncia End of Life y remite a Snowflake CLI.
- 1087: la clave antigua excluía materialized views y external tables. Se reemplaza por un caso concreto de masking sobre VALUE y columnas virtuales de una external table.
- 1090: la clave original omitía Python y Java; se archiva por duplicación del tema UDF.
- 1091: OPERATE y OWNERSHIP permiten suspender/reanudar; se especifica un rol no propietario.
- 1093: la explicación negaba el efecto de Capacity/On Demand; se distingue tarifa por TB de volumen almacenado.
- 1115: los internal named stages pueden incluirse en la clonación de un contenedor; se acota a clonación individual.

## Validación y progreso

14 pruebas de auditoría superadas. Comparación con el banco previo: ningún cambio fuera de estos 100 IDs; en las 76 decisiones que no reformulan contenido se conservan q/o/c/n y contentRevision. Solo las 24 correcciones nuevas requieren reiniciar el estado de dominio de esa pregunta en la migración de progreso; el historial se conserva. Todos los destinos de duplicados siguen contrastados y hay 100 motivos distintos. No se han ejecutado compilaciones ni pruebas de navegador.

El original sigue intacto. La revisión de las 191 pendientes y 455 apartadas no está completada; estos totales no acreditan exactitud ni cobertura exhaustiva de todo el banco.

## Registro por pregunta

| ID | Decisión | Motivo | Referencia |
|---|---|---|---|
| 978 | conservar_revisada | La clave OPERATE es válida; la explicación confundía abortar consultas con pausarlas. Solo se corrigen nota y referencia. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
| 979 | corregir | Se llamaba comando a la función y se hablaba de un objeto ya parseado. Se precisa la validación de texto con diagnóstico; se conservan las funciones hermanas. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/check_xml) |
| 982 | archivar | Renombrar o recrear para compartir son distractores artificiosos; se repite el requisito de grants al share. Cubierto por la pregunta contrastada 453; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 983 | conservar_revisada | OPERATE confirma la clave; se sustituye el enlace genérico de pipelines por el catálogo de privilegios sin cambiar la pregunta. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
| 984 | conservar_revisada | CREATE y ALTER son correctos; la explicación precisa sus formas TABLE, manteniendo enunciado, opciones y clave. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 986 | corregir | RETURN_-1_ROWS no es un modo documentado y la fuente era de descarga. Se usan los tres modos documentados de validación de carga. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 987 | archivar | Repite PUT para cargar archivos al stage; CREATE STREAM no es una operación cercana de transferencia. Cubierto por la pregunta contrastada 454; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 989 | archivar | Memoriza un catálogo cambiante de gráficos de Snowsight; se mantiene el criterio de 867 y se conserva el original fuera de simulacros. | Criterio editorial de interfaz |
| 990 | conservar_revisada | Account es correcto; faltaba la exclusión de tablas temporales/transient y la referencia apuntaba a CREATE TABLE. | [Documentación](https://docs.snowflake.com/en/sql-reference/parameters) |
| 991 | corregir | APPROXIMATE_SIMILARITY no era el nombre documentado y MINHASH_COMBINE manipula estados MinHash. Se sustituyen por funciones reales de comparación de cadenas. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions-string) |
| 992 | conservar_revisada | Se confirma Access History; se distinguen auditoría, clasificación, protección y dependencias, añadiendo límites de cobertura. | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 994 | conservar_revisada | La clave y los comandos son correctos; se matiza la visibilidad por permisos y se cita el comando específico. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/show-network-policies) |
| 995 | corregir | BREAK no es la única salida: RETURN también puede terminar el bloque. Se pregunta por la ausencia de condición propia, conservando los cuatro constructos. | [Documentación](https://docs.snowflake.com/en/developer-guide/snowflake-scripting/loops) |
| 996 | conservar_revisada | La automatización es una medida válida; se elimina la impresión de ahorro garantizado y se explica el efecto de reinicios frecuentes. | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 998 | archivar | Repite el efecto de redimensionar un warehouse suspendido. Cubierto por la pregunta contrastada 845; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 1000 | archivar | Repite la finalidad de auditoría de ACCESS_HISTORY sin nuevo escenario. Cubierto por la pregunta contrastada 591; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 1001 | archivar | Repite el coste de Fail-safe comparándolo con controles de seguridad ajenos a retención. Cubierto por la pregunta contrastada 791; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage) |
| 1003 | corregir | Se llamaba función a un servicio y se mezclaban mecanismos de almacenamiento. Se comparan responsabilidades reales de la misma capa. | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 1005 | corregir | No se distinguía la base de la vista de las bases adicionales. Se acota a estas últimas y se conservan los privilegios originales. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-multiple-db) |
| 1006 | archivar | Repite OBJECT_CONSTRUCT e incluye OBJECT_AS, que no es la función documentada. Cubierto por la pregunta contrastada 517; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1007 | conservar_revisada | Database role es correcto; se explica por qué un account role personalizado no se vuelve compartible y se añade el límite entre bases. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-gs) |
| 1009 | conservar_revisada | La combinación indicada es un efecto potencial documentado; se aclara la comparación entre cadenas en VARIANT y columnas tipadas. | [Documentación](https://docs.snowflake.com/en/user-guide/semistructured-considerations) |
| 1010 | conservar_revisada | Se contrastan ambas vistas con el inventario oficial del esquema y se sustituye la explicación genérica. | [Documentación](https://docs.snowflake.com/en/sql-reference/data-sharing-usage) |
| 1012 | archivar | Repite la definición de share; Sequence no es una confusión cercana de compartición. Cubierto por la pregunta contrastada 222; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1014 | archivar | Repite BUILD_STAGE_FILE_URL como URL persistente. Cubierto por la pregunta contrastada 657; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url) |
| 1015 | conservar_revisada | La clave es una recomendación; la nota precisa las excepciones de número de columnas, delimitadores y compresión sin reescribir opciones. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 1017 | archivar | Repite Partitions scanned/total; Bytes scanned también refleja efectos de pruning con este enunciado amplio. Cubierto por la pregunta contrastada 861; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1018 | corregir | JOIN y ALTER eran operaciones válidas. Se limita el enunciado a combinar filas en una consulta, conservando las opciones. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-external-intro) |
| 1019 | archivar | Repite acceso prefirmado sin autenticación e incluye Staged URL como categoría no documentada. Cubierto por la pregunta contrastada 388; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/unstructured-intro) |
| 1020 | conservar_revisada | VALIDATE es correcto; se añaden restricciones omitidas y se diferencia su diagnóstico del historial general de consultas. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/validate) |
| 1022 | archivar | USERADMIN y SECURITYADMIN pueden crear usuarios por herencia; la versión conservada pregunta por el rol dedicado. Cubierto por la pregunta contrastada 4; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1023 | archivar | La detección de presión de memoria está cubierta; los joins se cubren en 505 y Full index scans no encaja en el escenario. Cubierto por la pregunta contrastada 974; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1024 | corregir | Mover automáticamente objetos al proveedor era un distractor artificial. Se comparan cuatro comandos DDL reales relacionados con el escenario. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/drop-managed-account) |
| 1025 | conservar_revisada | Recorrer el objeto no elimina claves repetidas por sí solo: se añade SELECT DISTINCT a la explicación sin modificar contenido evaluado. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/flatten) |
| 1026 | archivar | Repite separar warehouses de carga y consulta; la versión conservada presenta un conflicto concreto. Cubierto por la pregunta contrastada 472; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 1027 | archivar | Repite streams como seguimiento de DML. Cubierto por la pregunta contrastada 612; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 1029 | archivar | Mezcla entrega de datos con APIs y funciones; direct sharing está cubierto aquí y listings en 228. Cubierto por la pregunta contrastada 453; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1031 | conservar_revisada | Se conserva la opción espacial, acotando la explicación a predicados GEOGRAPHY admitidos y no a cualquier función geográfica. | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization/geospatial-queries) |
| 1032 | conservar_revisada | El rasgo decisivo son los miembros invitados; se corrige la referencia y se distingue el hub privado de Marketplace y sharing. | [Documentación](https://docs.snowflake.com/en/user-guide/data-exchange) |
| 1033 | archivar | Repite PARSE_JSON para convertir texto a VARIANT. Cubierto por la pregunta contrastada 177; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/parse_json) |
| 1035 | archivar | Repite métricas de pruning con la misma ambigüedad de Bytes scanned. Cubierto por la pregunta contrastada 861; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1036 | archivar | Memoriza una etiqueta visual del perfil; la interpretación de operadores está cubierta en 972 y se prioriza sobre nombres de interfaz. | Criterio editorial de interfaz |
| 1038 | conservar_revisada | Se precisa la diferencia con la opción plural de carga, manteniendo la conversión y la clave correctas. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/strip_null_value) |
| 1040 | archivar | Repite la micro-partición automática sin escenario adicional. Cubierto por la pregunta contrastada 463; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 1041 | archivar | Repite search access path; Equality searches no es una estructura de datos. Cubierto por la pregunta contrastada 832; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1042 | conservar_revisada | La asociación Duo/MFA sigue siendo válida; se actualiza la explicación para no presentar Duo como único mecanismo. | [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 1044 | conservar_revisada | Se comprueba el nivel de las cinco entidades y se explica esquema frente a cuenta sin alterar opciones. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1045 | archivar | SnowCD ha llegado a End of Life según su documentación; se archiva la recomendación de esta herramienta. Snowflake remite ahora a snow connection test de Snowflake CLI. | [Documentación](https://docs.snowflake.com/en/user-guide/snowcd) |
| 1046 | corregir | Se mezclaban privilegios de listings y auditoría. Se usan combinaciones cercanas de cuatro privilegios del mismo objeto. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
| 1048 | archivar | Repite el lookup selectivo para Search Optimization. Cubierto por la pregunta contrastada 221; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1050 | corregir | Object owner era tautológico y podía coincidir con el rol del usuario. Un caso concreto distingue propiedad de autoridad para conceder permisos. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1052 | archivar | Reconstruir datos no distingue temporal de transient sin exigir persistencia entre sesiones; la versión conservada sí lo exige. Cubierto por la pregunta contrastada 555; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-temp-transient) |
| 1053 | archivar | Repite OBJECT_CONSTRUCT atribuyéndole toda la descarga que realiza COPY. Cubierto por la pregunta contrastada 517; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1054 | corregir | Se comparaban efectos poco concretos. Se usan cuatro opciones reales del mismo formato JSON con STRIP_OUTER_ARRAY como confusión cercana. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 1056 | apartar | Organizar archivos por rutas y mejorar cargas son efectos documentados de la misma práctica; las opciones 0 y 3 se solapan. Se aparta para un futuro escenario específico sin alterar contenido ni progreso. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-stage) |
| 1058 | archivar | Tamaño o número de clusters pueden reducir colas; la versión conservada distingue scale-out. Cubierto por la pregunta contrastada 833; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 1059 | archivar | Repite dos formulaciones del escalado independiente de compute/storage. Cubierto por la pregunta contrastada 430; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 1060 | conservar_revisada | Se distingue estado y primer error de carga frente a todos los errores con VALIDATE; se conserva la pregunta. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/copy_history) |
| 1061 | archivar | Repite transformaciones COPY y llama funciones a JOIN/GROUP BY. Cubierto por la pregunta contrastada 685; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-transform) |
| 1063 | archivar | Repite el mínimo de retención; la versión conservada lo aplica en un cálculo y 990 cubre su nivel. Cubierto por la pregunta contrastada 941; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/parameters) |
| 1065 | archivar | Los distractores atribuyen hardware y autoescalado al perfil; el diagnóstico está cubierto con estadísticas concretas. Cubierto por la pregunta contrastada 972; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1066 | conservar_revisada | Se contrastan los cuatro constructos con las restricciones específicas de COPY; CAST sigue siendo la única opción válida. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-transform) |
| 1067 | archivar | Repite ACCESS_HISTORY para accesos sin el detalle de linaje de la versión conservada. Cubierto por la pregunta contrastada 956; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 1068 | corregir | Enmascarar texto o una columna también podía ser cierto. Se pregunta por la aportación de argumentos adicionales y se contrasta con mecanismos reales de gobierno. | [Documentación](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 1069 | conservar_revisada | 61 + 60 = 121 es correcto; se precisa que el mínimo se aplica en cada arranque y no a la suma. | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-compute) |
| 1070 | archivar | Repite descarga JSON con OBJECT_CONSTRUCT y mezcla LATERAL con funciones. Cubierto por la pregunta contrastada 517; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1071 | archivar | Repite metadatos de directory tables y mezcla privilegios con contenido almacenado. Cubierto por la pregunta contrastada 757; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables) |
| 1072 | corregir | La clave omitía transient. Se elimina UDTF por no ser tipo de tabla y se piden las tres respuestas válidas. | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1073 | archivar | Repite TABLE_STORAGE_METRICS para tablas eliminadas. Cubierto por la pregunta contrastada 8; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/table_storage_metrics) |
| 1074 | conservar_revisada | Se confirma GRANT ROLE a otro rol y se aclara la confusión entre propiedad del rol e herencia de privilegios. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1075 | corregir | SELECT también permite ver archivos mediante directory tables. Se pregunta por los dos alias de listado para mantener inequívocas LIST y LS. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/list) |
| 1076 | corregir | Internal stage englobaba las dos respuestas. Se reemplazan categorías solapadas por cuatro tipos concretos. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage) |
| 1077 | archivar | Repite BUILD_STAGE_FILE_URL sin distinguir claramente scoped URLs, también alojadas en Snowflake. Cubierto por la pregunta contrastada 657; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url) |
| 1079 | archivar | CREATE PIPE no basta para carga inmediata: falta la activación/notificación que explicita la versión conservada. Cubierto por la pregunta contrastada 334; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto) |
| 1083 | archivar | Repite pruning ineficiente y joins que multiplican filas. Cubierto por la pregunta contrastada 505; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1084 | conservar_revisada | CONNECT BY es correcto entre las opciones; se evita presentarlo como única forma de recursión. | [Documentación](https://docs.snowflake.com/en/sql-reference/constructs/connect-by) |
| 1085 | corregir | Se mezclaba un parámetro de collation con tipos de esquema. Se comparan cuatro CREATE SCHEMA válidos que distinguen gobierno y retención. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-schema) |
| 1087 | corregir | La clave original excluía materialized views y external tables. En lugar de elegir cuatro de cinco casi por descarte, se evalúa el caso VALUE/columna virtual con cuatro objetos reales de la documentación. | [Documentación](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 1088 | conservar_revisada | La opción de compartir es correcta; se aclara que no concede automáticamente acceso a datos, manteniendo el contenido evaluado. | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-dashboards) |
| 1090 | archivar | La clave de dos lenguajes omite Python y Java, también válidos; se archiva la repetición de familias UDF. Cubierto por la pregunta contrastada 578; original conservado. | [Documentación](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) |
| 1091 | corregir | OPERATE y OWNERSHIP eran válidos. Se especifica un rol no propietario conservando todas las opciones. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-task) |
| 1092 | conservar_revisada | La capa sobre el stage es correcta; se precisa que no tiene privilegios propios ni almacena copias de archivos. | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables) |
| 1093 | corregir | La explicación negaba el efecto de Capacity/On Demand. Se distingue tarifa de volumen, se sustituye cloud platform por warehouse size y se corrige la clave. | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage) |
| 1094 | conservar_revisada | Se verifica GOVERNANCE_VIEWER contra sus tres roles hermanos y se aclara que son database roles de SNOWFLAKE. | [Documentación](https://docs.snowflake.com/en/sql-reference/snowflake-db-roles) |
| 1095 | conservar_revisada | La profundidad es un indicador válido, no una medición directa de duración; se matiza la cardinalidad y el uso de columnas de filtro frente a proyección. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) |
| 1097 | archivar | Pocas filas no descarta otras optimizaciones; la pregunta conservada especifica lookup selectivo. Cubierto por la pregunta contrastada 221; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1099 | archivar | Repite construcción de objetos por fila para descargar JSON. Cubierto por la pregunta contrastada 517; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1100 | corregir | MAX_FILE_SIZE=0 no era un ajuste válido y se llamaba comando a una opción. Se comparan cuatro opciones reales de descarga. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 1101 | archivar | Repite FLATTEN como expansión relacional; TABLE no es una función hermana equivalente. Cubierto por la pregunta contrastada 89; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/flatten) |
| 1103 | archivar | Repite siete días de Fail-safe y la explicación asignaba erróneamente un día a transient. Cubierto por la pregunta contrastada 624; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 1104 | corregir | External integration era impreciso y el supuesto mecanismo de SnowSQL no era válido. Se usan cuatro tipos reales de integración. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-integration) |
| 1108 | archivar | Repite ACCOUNTADMIN para crear resource monitors. Cubierto por la pregunta contrastada 865; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 1111 | archivar | El enunciado genérico de lenguaje también abarca SQL y otras superficies. Además, Provider Studio sí existe: la explicación lo negaba erróneamente. Se archiva esta identificación de interfaz. | Criterio editorial de interfaz |
| 1113 | archivar | La última opción solapa vagamente acelerar acceso con pruning; el uso de metadatos ya está cubierto. Cubierto por la pregunta contrastada 915; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 1114 | corregir | DROP no era una opción de COPY y se explicaban incorrectamente FORCE y LOAD_UNCERTAIN_FILES. Se usan opciones reales del mismo comando. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 1115 | corregir | La explicación omitía INCLUDE INTERNAL STAGES. Se acota a clonación individual, conservando opciones y clave y explicando la excepción de contenedores. | [Documentación](https://docs.snowflake.com/en/user-guide/object-clone) |
| 1116 | corregir | El procesamiento de datos no estructurados admite más mecanismos actuales. Se acota a API integration y se comparan cuatro tipos de función reales. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-external-function) |
| 1117 | conservar_revisada | Se confirma la recomendación por memoria y se evita prometer ventaja automática para cualquier trabajo Snowpark. | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized) |
| 1118 | archivar | Repite STRIP_OUTER_ARRAY con distractores ajenos a lectura JSON. Cubierto por la pregunta contrastada 335; original conservado. | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 1120 | archivar | Los securable objects también forman jerarquías; la versión conservada pregunta por herencia de roles directamente. Cubierto por la pregunta contrastada 851; original conservado. | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
