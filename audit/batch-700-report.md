# Batch 700 — 2026-09-23

100 siguientes pendientes: IDs seleccionados entre 1121 y 1273. Lista exacta en `batch-700-ids.json`; no es un intervalo consecutivo.

## Resultado

31 conservadas con ajustes de explicación/referencia, 15 corregidas y 54 archivadas. No se añaden preguntas. Estado: 722 contrastadas, 91 pendientes, 455 apartadas y 214 archivadas. Siguiente pendiente: 1274.

## Criterios y cambios

Fuentes oficiales agrupadas por tema. Cambios mínimos; alternativas reales y cercanas en las reformulaciones. Cada ID tiene un motivo específico. Ejemplos: 1155 sustituye propiedades de usuario inventadas por materiales criptográficos reales; 1165 compara columnas METADATA hermanas; 1187 distingue las tres acciones de resource monitor; 1241 compara interfaces Python reales. 1197 exige evidencia de spilling antes de recomendar más memoria. 1219 y 1271 distinguen auto-fulfillment de replicación manual porque ambas pueden servir datos entre regiones.

Se archivan 52 redundancias y 2 casos editoriales: SnowCD fuera de soporte (1135) e identificación genérica de interfaz (1264). Las referencias a preguntas anteriores señalan cobertura temática, no una auditoría adicional de todos sus distractores.

Las explicaciones actualizadas no modifican enunciados, opciones, claves ni revisiones. Solo las 15 correcciones reciben contentRevision del batch700. Comparación con el banco anterior: sin cambios fuera de los 100 IDs y todos los destinos de duplicados contrastados. Se conserva el original y el historial de progreso. Una única ejecución de la suite de auditoría; sin compilación ni navegador.

La revisión completa de pendientes y apartadas sigue sin terminar. El número contrastado no garantiza cobertura exhaustiva del temario.

## Decisiones

| ID | Decisión | Motivo | Fuente |
|---|---|---|---|
| 1121 | archivar | Repite propiedad inicial del objeto; 1050 aplica la distinción entre creador y propietario del esquema. Cubierto por 1050; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1122 | conservar_revisada | Enterprise se confirma en la matriz oficial; se diferencia Access History de Query History sin cambiar la pregunta. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1123 | corregir | Gestionar billing no identifica un rol único sin ámbito: ORGADMIN y roles delegados también pueden intervenir. Se acota al rol administrativo de cuenta. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1124 | archivar | Repite la identidad de un file URL y mezcla directory table con tipos de URL. Cubierto por 657; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url) |
| 1127 | archivar | Repite SINGLE=TRUE con opciones FILES=SINGLE inventadas. Cubierto por 1100; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 1128 | archivar | Substring también está soportado; la clave de dos respuestas no es única y prometer mejora significativa es excesivo. Cubierto por 221; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1129 | conservar_revisada | Merge es el operador DML; se comprueba contra los otros tres operadores reales del perfil. | [Oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1131 | corregir | El original hacía mutuamente excluyentes conceptos compatibles: muestras por fracción o tamaño también pueden variar. Se comparan variantes válidas de una misma muestra por bloques. | [Oficial](https://docs.snowflake.com/en/sql-reference/constructs/sample) |
| 1132 | conservar_revisada | La clave distingue comprobar tipo de extraer, convertir o modificar; se enlaza la familia oficial de predicados sin cambiar contenido. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions-semistructured) |
| 1133 | archivar | Repite RESULT_SCAN e incluye DESCRIBE_RESULTS, que no es la función documentada. Cubierto por 878; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/result_scan) |
| 1134 | archivar | Repite acciones de resource monitors con distractores de asignar almacenamiento o modificar consultas ajenos a su función. Cubierto por 298; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 1135 | archivar | SnowCD ha llegado a End of Life; se aplica el mismo criterio de 1045. La documentación remite a snow connection test de Snowflake CLI. | [Oficial](https://docs.snowflake.com/en/user-guide/snowcd) |
| 1138 | conservar_revisada | DAC y RBAC siguen siendo correctos entre las opciones; se actualiza la explicación para no excluir el actual UBAC. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1139 | conservar_revisada | La etiqueta no impone permisos por sí sola; se corrige esa posible lectura sin cambiar Object tagging como respuesta. | [Oficial](https://docs.snowflake.com/en/user-guide/object-tagging/introduction) |
| 1140 | conservar_revisada | Se conserva Standard y se distingue replicación de bases de failover y replicación de otros objetos. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1141 | archivar | Repite COPY con OBJECT_CONSTRUCT e incluye EXPORT como supuesto comando. Cubierto por 517; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1143 | conservar_revisada | APPLY es la respuesta del objeto policy; se añaden los requisitos del objeto destino y la distinción frente al privilegio global. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
| 1144 | archivar | Repite grants para compartir tablas e incluye privilegios que no pertenecen a esos objetos. Cubierto por 453; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1145 | archivar | Repite diagnóstico de memoria en Query Profile; el perfil no determina cuotas ni autoescala. Cubierto por 974; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1147 | archivar | Repite Data Exchange como grupo de miembros invitados. Cubierto por 1032; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-exchange) |
| 1149 | corregir | La explicación debe distinguir UPDATE de sus registros DELETE/INSERT. Se sustituye UPSERT, que no es un comando Snowflake, por MERGE. | [Oficial](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 1151 | archivar | Repite precedencia de opciones del COPY frente a stage y tabla. Cubierto por 665; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-load-prepare) |
| 1152 | conservar_revisada | SnowSQL sigue identificando el cliente solicitado; se actualiza su carácter legacy y el estado de SnowCD sin reiniciar contenido. | [Oficial](https://docs.snowflake.com/en/user-guide/snowsql) |
| 1153 | conservar_revisada | Se distingue contener el handler JavaScript de invocar un procedimiento desde una task; se mantienen las dos respuestas. | [Oficial](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) |
| 1154 | archivar | Repite la edición mínima para seguridad de columnas. Cubierto por 138; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1155 | corregir | RSA_P8_KEY, ENCRYPTED_KEY y RSA_PRIVATE_KEY eran propiedades inventadas. Se comparan cuatro materiales criptográficos reales de la misma configuración. | [Oficial](https://docs.snowflake.com/en/user-guide/key-pair-auth) |
| 1156 | archivar | UDTFs también pueden compartirse bajo condiciones; elige dos sin acotar y repite objetos compartibles. Cubierto por 487; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1157 | archivar | Repite configuración automática de warehouse con cache size y storage size que no son sus propiedades configurables. Cubierto por 996; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 1159 | archivar | Repite OBJECT_CONSTRUCT para preparar JSON y atribuye a la función toda la descarga. Cubierto por 517; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 1160 | archivar | Repite accesos y modificaciones en ACCESS_HISTORY; la versión conservada incorpora linaje. Cubierto por 956; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 1161 | archivar | Repite COPY INTO para descarga a stage. Cubierto por 395; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 1165 | corregir | SHOW FILE FORMATS no era una columna de metadatos y SELECT sin FROM era incompleto. Se comparan cuatro columnas hermanas reales. | [Oficial](https://docs.snowflake.com/en/user-guide/querying-metadata) |
| 1166 | archivar | Repite Search Optimization para point lookups. Cubierto por 221; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1168 | archivar | Repite MANAGE GRANTS y propietario del esquema en managed access. Cubierto por 3063; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1169 | conservar_revisada | Tasks es correcto; se precisa que el orden corresponde al grafo de dependencias y el horario a su raíz. | [Oficial](https://docs.snowflake.com/en/user-guide/tasks-intro) |
| 1170 | conservar_revisada | Se confirma REMOVE y se distingue eliminar archivos del stage de eliminar objetos o filas de tablas. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/remove) |
| 1172 | archivar | Repite scale-out por concurrencia sin aportar escenario nuevo. Cubierto por 597; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 1173 | corregir | External tokenization y tag-based masking eran ambas respuestas válidas. Se pregunta por la integración con el servicio externo y se usan cuatro mecanismos reales de gobierno. | [Oficial](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 1174 | conservar_revisada | Se verifica la precedencia usuario/cuenta y se evita describirla como una unión de listas de IP. | [Oficial](https://docs.snowflake.com/en/user-guide/network-policies) |
| 1175 | archivar | External table también persiste sin Fail-safe; la versión conservada especifica almacenamiento nativo reconstruible. Cubierto por 555; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/tables-temp-transient) |
| 1176 | conservar_revisada | Listing es correcto; se precisa la oferta a consumidores seleccionados frente a publicación pública. | [Oficial](https://docs.snowflake.com/en/collaboration/collaboration-listings-about) |
| 1178 | corregir | Faltaba cerrar el prefijo de directorio y anclar la extensión; además COPY carga, no mueve archivos. Se conservan cuatro sentencias válidas con estructura equivalente. | [Oficial](https://docs.snowflake.com/en/user-guide/data-load-considerations-stage) |
| 1179 | corregir | Limitar slowdowns también podía sugerir aceleración. Se acota a límites de tiempo de ejecución y cola, manteniendo los cinco parámetros reales. | [Oficial](https://docs.snowflake.com/en/sql-reference/parameters) |
| 1180 | archivar | Repite muestreo fijo de diez filas e incluye FETCH 10 incompleto. Cubierto por 905; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/constructs/sample) |
| 1181 | archivar | Repite expansión relacional con FLATTEN. Cubierto por 89; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/flatten) |
| 1182 | conservar_revisada | Se confirma la decisión por beneficio y se añade la excepción de clones para evitar prometer mantenimiento inmediato siempre. | [Oficial](https://docs.snowflake.com/en/user-guide/tables-auto-reclustering) |
| 1183 | archivar | Tables también pueden consumir mantenimiento automático; la versión conservada acota resultados almacenados. Cubierto por 943; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 1185 | corregir | Proteger privacidad también podía describir permisos de schemas, stages y tags. Se pregunta por el modificador SECURE para mantener inequívocas las dos respuestas. | [Oficial](https://docs.snowflake.com/en/user-guide/views-secure) |
| 1186 | archivar | Pruning de columnas y micro-particiones son técnicas compatibles; las alternativas se solapan y el tema ya está cubierto. Cubierto por 915; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 1187 | corregir | NOTIFY_USERS era una propiedad, no una acción de trigger. Se comparan las tres acciones documentadas y se diferencia suspensión inmediata de suspensión con finalización. | [Oficial](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 1188 | archivar | Repite USERADMIN como rol dedicado a usuarios. Cubierto por 4; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1189 | conservar_revisada | La vista es correcta; se explicita el campo de duración y se evita presentarla como monitor instantáneo de consultas activas. | [Oficial](https://docs.snowflake.com/en/sql-reference/account-usage/query_history) |
| 1190 | archivar | Repite compute pagado por el consumidor de un share con cuenta propia. Cubierto por 3050; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1191 | conservar_revisada | Enterprise se confirma con la matriz de ediciones; se limita el beneficio a consultas elegibles. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1196 | archivar | Spilling también puede deberse a un plan ineficiente, no solo al tamaño; ya se cubren las métricas que lo identifican. Cubierto por 974; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1197 | corregir | Remote Disk IO no demuestra por sí solo derrame: también puede corresponder a lecturas remotas normales. Se añade la evidencia de spilling por falta de memoria. | [Oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1199 | archivar | Repite GET desde stages internos y mezcla tipos de stage con tablas. Cubierto por 645; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/get) |
| 1200 | archivar | La protección genérica de PII también incluye MFA y cifrado; la versión conservada evalúa masking con un mecanismo concreto. Cubierto por 1068; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 1202 | conservar_revisada | Se distingue un rol personalizado de roles del sistema; no se presupone que cualquier usuario tenga autorización para eliminarlo. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 1204 | archivar | Los períodos genéricos y de inactividad se solapan; la automatización ya está cubierta sin afirmar ahorro óptimo universal. Cubierto por 996; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 1205 | archivar | Repite Fail-safe como último recurso de recuperación. Cubierto por 166; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 1206 | archivar | Repite colas por falta de capacidad; el caso conservado aporta evidencia de queued load. Cubierto por 580; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/warehouse_load_history) |
| 1207 | archivar | Pruning y search access path no son explicaciones excluyentes; la versión conservada precisa el mecanismo. Cubierto por 832; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 1208 | conservar_revisada | Se aclara qué significa metadata expirada y se diferencia cargar estado desconocido de forzar recarga de todos los archivos. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 1210 | conservar_revisada | Se comprueban las cinco capacidades en la matriz oficial; disponible en Standard no equivale a uso sin costes. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1211 | conservar_revisada | La función prefirmada es correcta; se añade caducidad y la diferencia entre permisos del creador y autenticación del destinatario. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/get_presigned_url) |
| 1212 | conservar_revisada | La clave es válida; se explica NONE frente a los literales de texto y se menciona la doble comilla sin añadir opciones. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 1215 | archivar | Object también puede ser un valor escalar; se mezclan categorías de retorno y tipos. 916 distingue scalar/table y 646 el retorno tabular. Cubierto por 916; original conservado. | [Oficial](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) |
| 1216 | archivar | Repite SELECT frente a DML sobre datos de solo lectura. Cubierto por 866; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 1219 | corregir | Replicación y listing podían resolver el requisito original. Se añade entrega automática sin gestionar réplicas manualmente y se conservan los mecanismos reales. | [Oficial](https://docs.snowflake.com/en/collaboration/provider-listings-auto-fulfillment-setup) |
| 1221 | archivar | Repite UNDROP dentro de retención como restauración directa. Cubierto por 233; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/data-time-travel) |
| 1224 | conservar_revisada | El significado del indicador es correcto; se evita equiparar toda lectura remota con spilling. | [Oficial](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 1225 | archivar | Repite Snowpark-optimized para cargas de alta memoria. Cubierto por 1117; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-snowpark-optimized) |
| 1227 | archivar | Repite COPY GRANTS y exclusión de OWNERSHIP en clones. Cubierto por 504; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/create-clone) |
| 1228 | archivar | Mezcla ubicación física remota con caché lógica; 172 ya distingue los resultados persistidos. Cubierto por 172; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/querying-persisted-results) |
| 1230 | conservar_revisada | El umbral es correcto; se precisa que se factura el exceso y que el ajuste se calcula por día, no por consulta. | [Oficial](https://docs.snowflake.com/en/user-guide/cost-understanding-compute) |
| 1231 | archivar | Repite finalidad de masking con alternativas que mezclan cifrado y filtrado de filas. Cubierto por 1068; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 1232 | corregir | Optimizar rendimiento era demasiado amplio para descartar caché de metadatos. Se acota a resultados precomputados y se comparan cuatro objetos tabulares reales. | [Oficial](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 1233 | conservar_revisada | Se verifica BINARY/VARCHAR y se distingue su función de los tres tipos compuestos ofrecidos. | [Oficial](https://docs.snowflake.com/en/sql-reference/data-types-unsupported) |
| 1237 | conservar_revisada | Se confirma control de acceso a objetos en Standard; no se confunde con políticas o gestión externa de claves. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1239 | conservar_revisada | Las dos conversiones son correctas; la nota aclara que son reglas generales, no exclusivas de COPY de descarga. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/to_boolean) |
| 1241 | corregir | Los distractores incluían drivers inexistentes. Se comparan cuatro interfaces Python reales y cercanas para distinguir DB-API de ORM, DataFrame y gestión de recursos. | [Oficial](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector) |
| 1242 | conservar_revisada | Se confirma el inicio de la sentencia como instante de snapshot, distinguiéndolo de la sesión y la finalización. | [Oficial](https://docs.snowflake.com/en/user-guide/object-clone) |
| 1244 | archivar | Repite POLICY_REFERENCES para políticas asignadas. Cubierto por 368; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/account-usage/policy_references) |
| 1245 | archivar | CREATE puede consumir el stream mediante CTAS; falta precisar la transacción. 181 enumera operaciones y commit. Cubierto por 181; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 1246 | archivar | Repite gestión de metadatos en cloud services. Cubierto por 1003; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 1247 | conservar_revisada | La conexión privada es correcta; se distingue de VPN y de sharing y se añaden dependencias de proveedor y edición. | [Oficial](https://docs.snowflake.com/en/user-guide/admin-security-privatelink) |
| 1250 | archivar | La recomendación genérica omite contexto y los índices existen para hybrid tables; 850 exige diagnóstico de carga. Cubierto por 850; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 1252 | archivar | Repite edición mínima Standard para compartir. Cubierto por 86; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1257 | archivar | Repite COPY INTO location para descarga a stage externo. Cubierto por 725; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 1260 | archivar | Repite Enterprise para masking de columnas. Cubierto por 138; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 1261 | archivar | Repite COPY_HISTORY y lo llama comando en lugar de función/vista. Cubierto por 1060; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/copy_history) |
| 1263 | archivar | Repite file URL y mezcla HTTPS, que es protocolo, con las categorías de URL. Cubierto por 657; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url) |
| 1264 | archivar | Identificación genérica de interfaz: administrar y monitorizar también se puede hacer con SQL. No aporta un escenario inequívoco y se retira conforme al criterio de preguntas de interfaz. | Criterio editorial |
| 1266 | conservar_revisada | Se conserva la recomendación y se matiza el equilibrio entre mantenimiento y beneficio, sin convertirlo en prohibición absoluta. | [Oficial](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 1269 | conservar_revisada | Se confirma el bloqueo de nuevas consultas para la sesión activa; se distingue del cierre de sesión y de esperar al token. | [Oficial](https://docs.snowflake.com/en/user-guide/network-policies) |
| 1270 | archivar | Repite el nivel Account de ALLOW_CLIENT_MFA_CACHING. Cubierto por 852; original conservado. | [Oficial](https://docs.snowflake.com/en/sql-reference/parameters) |
| 1271 | corregir | Auto-fulfillment y replicación eran válidos. Se concreta el flujo de réplica gestionada por el proveedor sin auto-fulfillment. | [Oficial](https://docs.snowflake.com/en/user-guide/account-replication-intro) |
| 1272 | archivar | Repite tamaño y tiempo sin fijar tipo, generación y clusters; la versión conservada sí lo acota. Cubierto por 317; original conservado. | [Oficial](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 1273 | conservar_revisada | Se comprueba MONITOR para estadísticas y se separa de ejecutar, modificar y controlar el warehouse. | [Oficial](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
