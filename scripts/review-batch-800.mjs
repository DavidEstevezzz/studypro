// Final batch of pending questions: the remaining 91 (IDs 1274-2057), frozen in audit/batch-800-ids.json.
// Every decision carries its own reason. Keeping a question also updates its explanation (English) and reference.
export const batch800 = [];
function keep(i, objective, path, e, reason) {
  batch800.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,decision:'conservar_revisada',reason});
}
function fix(i, objective, path, q, o, c, e, reason) {
  batch800.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,decision:'corregir',reason});
}
function archive(i,reason){batch800.push({i,decision:'archivar',reason});}

// --- Bloque 1: banco original (IDs 1274-1351) ---
keep(1274,'4.1','user-guide/views-materialized',
 'When the optimizer chooses a materialized view, Snowflake documents that the view appears in the EXPLAIN plan and in the Query Profile, so EXPLAIN shows whether the view was used. SHOW lists objects, DESCRIBE returns the structure of a single object and USE only changes the session context.',
 'Clave confirmada: la página de vistas materializadas cita EXPLAIN y Query Profile para comprobar su uso; explicación traducida al inglés.');
keep(1275,'2.3','user-guide/warehouses-overview',
 'Warehouse compute is billed per second with a 60-second minimum each time the warehouse starts. The first run of 90 seconds is billed as 90 seconds, and the second run of 30 seconds is billed at the 60-second minimum, giving 150 seconds in total.',
 'Cálculo comprobado con la regla de facturación por segundo y mínimo de 60 segundos por arranque; explicación en inglés.');
keep(1283,'4.1','sql-reference/account-usage/query_history',
 'The QUERY_HISTORY view exposes PARTITIONS_SCANNED and PARTITIONS_TOTAL; comparing them shows how much of the table the query had to read. Execution, compilation and total elapsed times measure duration, not pruning.',
 'Columnas comprobadas en la vista ACCOUNT_USAGE.QUERY_HISTORY; explicación en inglés.');
keep(1291,'3.1','sql-reference/sql/copy-into-table',
 'COPY skips files whose load status is unknown, which happens when the staged file and the initial load are both older than 64 days. LOAD_UNCERTAIN_FILES = TRUE loads exactly those files, and FORCE = TRUE reloads files regardless of their recorded status, which can duplicate data. Re-staging files or truncating the target table does not change that load metadata.',
 'Comprobadas ambas opciones y la ventana de 64 días de los metadatos de carga; explicación en inglés.');
keep(1292,'3.3','sql-reference/external-functions-introduction',
 'External functions call code that is developed, maintained and executed outside Snowflake, normally reached through an API integration, so they are the documented way to use a third-party service from SQL. Built-in functions run inside Snowflake, there are no "process functions", and an API gateway can be part of the remote setup but is not the Snowflake object involved.',
 'Definición contrastada; se aclara que la puerta de enlace pertenece al servicio remoto y no es el objeto de Snowflake.');
keep(1293,'1.1','user-guide/intro-key-concepts',
 'Snowflake keeps data in a central repository accessible from all compute nodes and processes queries with independent compute clusters, which is why its architecture is described as multi-cluster, shared data. It is a SQL platform, not NoSQL, and compute is neither single-node nor centralized.',
 'Terminología contrastada con la arquitectura documentada; explicación en inglés.');
keep(1307,'4.4','sql-reference/functions/split_to_table',
 'SPLIT_TO_TABLE is a table function, so the documented call is SELECT * FROM TABLE(SPLIT_TO_TABLE(\'a.b.c\', \'.\')). The correlated form uses LATERAL over a source table. Snowflake has no DUAL table, and the function cannot be used as a plain scalar expression.',
 'Sintaxis contrastada con los ejemplos oficiales, incluida la variante LATERAL; explicación en inglés.');
keep(1308,'4.4','sql-reference/functions/parse_json',
 'PARSE_JSON(NULL) returns SQL NULL because the input is SQL NULL. PARSE_JSON(\'null\') returns a VARIANT holding a JSON null, which is not SQL NULL, and the array and object examples also return JSON null values inside a VARIANT.',
 'Contrastado con la nota de la función sobre NULL frente a \'null\'; explicación resumida en inglés.');
keep(1309,'2.2','user-guide/security-encryption-manage',
 'Periodic rekeying requires Enterprise Edition or higher. When enabled, Snowflake creates a new key and re-encrypts the data once the retired key is more than one year old. Key rotation happens on every edition, and Business Critical adds further controls such as Tri-Secret Secure.',
 'Edición y comportamiento contrastados con la página de gestión de claves; explicación en inglés.');
keep(1310,'3.1','sql-reference/sql/create-stage',
 'A file format can be set in the stage definition with FILE_FORMAT and in the COPY INTO <location> statement, where it takes precedence. PUT and GET transfer files between a client and a stage without parsing them, and a pipe only loads data, so it plays no part in an unload.',
 'Comprobado FILE_FORMAT en CREATE STAGE y en COPY INTO <location>; explicación en inglés.');
keep(1311,'4.1','user-guide/ui-snowsight-activity',
 'Pruning efficiency is read in the TableScan operator by comparing its Partitions scanned and Partitions total statistics. ExternalScan reads from an external source, InternalObject represents access to an internal data object such as an Information Schema table, and Generator produces rows; none of them reports pruning of a table.',
 'Operador y estadísticas contrastados con la referencia de Query Profile; corregida la explicación, que descartaba InternalObject como operador inexistente.');
keep(1316,'1.3','developer-guide/stored-procedure/stored-procedures-overview',
 'A stored procedure adds procedural code and can dynamically create and execute database operations, so it can run both DDL and DML. UDFs and UDTFs compute values or rows for a query and cannot perform those operations, and an external function only calls code that runs outside Snowflake.',
 'Contrastado con la descripción oficial de los procedimientos almacenados; explicación en inglés.');
keep(1321,'2.1','user-guide/admin-security-fed-auth-overview',
 'With federated authentication an external identity provider authenticates the user while Snowflake acts as the service provider, which is what lets one set of credentials sign in to several services. Key pairs are a different authentication method, a user name and password in a header is basic authentication, and Duo powers Snowflake built-in MFA rather than SSO.',
 'Definición contrastada y referencia corregida a la página de autenticación federada y SSO; explicación en inglés.');
keep(1326,'5.2','user-guide/data-sharing-reader-create',
 'A reader account can query what its provider shares, including selecting from secure views and calling secure UDFs in the share. Its users cannot run the DML allowed in a full account, such as inserting, updating, deleting or loading data, because the imported database is read-only.',
 'Contrastado con la página de cuentas de lectura; referencia corregida (la anterior ya no existe) y explicación en inglés.');
keep(1328,'1.4','user-guide/warehouses-multicluster',
 'When a multi-cluster warehouse is resized, the new size applies to all its clusters, including those already running and any started afterwards. Resizing does not change the scaling policy, the minimum and maximum cluster counts or auto-suspend.',
 'Comportamiento contrastado literalmente con la documentación de warehouses multiclúster; explicación en inglés.');
keep(1329,'3.1','sql-reference/sql/copy-into-location',
 'INCLUDE_QUERY_ID = TRUE adds a universally unique identifier, the query ID of the COPY statement, to the names of the unloaded files, which keeps concurrent unloads from overwriting each other. SINGLE controls whether one file is produced, HEADER writes column names and VALIDATION_MODE validates instead of unloading.',
 'Opción y su efecto contrastados en COPY INTO <location>; explicación en inglés.');
keep(1330,'1.5','user-guide/cost-understanding-data-storage',
 'A permanent table stores its data and a materialized view stores its precomputed result, so both add to storage costs. A standard view only stores its definition, the query result cache is managed by the service, and an external table keeps its data in external cloud storage.',
 'Contrastado con la página de costes de almacenamiento y con la de vistas materializadas; explicación en inglés.');
keep(1331,'2.1','user-guide/security-access-control-overview',
 'Snowflake combines discretionary access control, where each object has an owner that can grant access to it, with role-based access control, where privileges are granted to roles. MAC and RuBAC are not the models the documentation describes.',
 'Definición literal de DAC en la página de control de acceso; explicación en inglés.');
keep(1332,'1.4','user-guide/warehouses-multicluster',
 'The Standard scaling policy prevents or minimizes queuing by favoring the start of additional clusters over conserving credits. Economy waits so that running clusters stay busy, while Auto-scale and Maximized are operating modes rather than policies.',
 'Política contrastada con la redacción oficial; explicación en inglés.');
keep(1341,'4.4','user-guide/querying-semistructured',
 'In a path expression the column name is case-insensitive, but the element names after the colon are case-sensitive. src:customer.email and SRC:customer.email therefore address the same elements, while paths written with different letter case in the element names address different fields.',
 'Regla de mayúsculas contrastada; se conserva la clave ya corregida y se traduce la explicación al inglés.');
keep(1344,'2.3','sql-reference/info-schema/table_storage_metrics',
 'TABLE_STORAGE_METRICS reports the bytes owned by and billed to each table (ACTIVE_BYTES, TIME_TRAVEL_BYTES, FAILSAFE_BYTES) plus RETAINED_FOR_CLONE_BYTES, the deleted bytes still kept because clones reference them, and identifies clone families with CLONE_GROUP_ID. The other views aggregate storage by database, by stage or for the whole account.',
 'Columnas de almacenamiento propio y retenido por clones contrastadas; explicación en inglés.');
keep(1347,'2.3','user-guide/security-access-control-privileges',
 'MONITOR USAGE is a global privilege that lets a role monitor account-level usage and historical information for databases and warehouses, which is how a role other than ACCOUNTADMIN can review usage and billing history. OPERATE, OWNERSHIP and USAGE apply to specific objects.',
 'Privilegio global contrastado en la tabla de privilegios; explicación en inglés.');
keep(1348,'3.2','user-guide/streams-intro',
 'Streams can be created on standard tables and on views, including secure views; dynamic tables, Snowflake-managed Iceberg tables and directory tables are also supported. For a stream on a view, change tracking must be enabled on the view and its underlying tables. Databases, schemas and pipes are not stream sources.',
 'Objetos admitidos contrastados con la lista oficial; añadida la condición de change tracking para vistas; explicación en inglés.');
keep(1350,'4.2','user-guide/query-acceleration-service',
 'The query acceleration service offloads parts of the work of outlier queries, such as large scans with selective filters, to shared compute provided by the service. It requires Enterprise Edition or higher and is enabled per warehouse. Multi-cluster warehouses address concurrency and search optimization targets selective lookups.',
 'Definición contrastada y añadido el requisito de edición; explicación en inglés.');

// --- Bloque 2: contenido nuevo del C03 (Cortex, Iceberg, Git, Notebooks) ---
keep(2001,'1.6','sql-reference/functions/ai_complete',
 'AI_COMPLETE generates a completion from text or an image with a selected model and is documented as the function to use for most generative AI tasks. It is the updated version of COMPLETE, whose legacy surface Snowflake plans to retire by the end of 2026. AI_CLASSIFY, AI_SENTIMENT and AI_EXTRACT are task-specific functions.',
 'Función y relación con COMPLETE contrastadas con su página; explicación traducida al inglés.');
keep(2003,'1.6','user-guide/snowflake-cortex/aisql',
 'AI_CLASSIFY classifies text or images into user-defined categories. AI_TRANSLATE translates, AI_SIMILARITY compares two inputs through their embeddings and AI_FILTER returns true or false so rows can be filtered.',
 'Descripción contrastada con la lista de funciones AISQL; explicación en inglés.');
keep(2004,'1.6','user-guide/snowflake-cortex/aisql',
 'AI_REDACT removes personally identifiable information from text. AI_EXTRACT pulls structured information out of text, AI_FILTER returns a boolean and AI_SENTIMENT scores sentiment.',
 'Descripción contrastada con la lista de funciones AISQL; explicación en inglés.');
keep(2005,'1.6','sql-reference/functions/ai_transcribe',
 'AI_TRANSCRIBE transcribes audio and video files stored in a stage and can return the text together with timestamps and speaker information. AI_PARSE_DOCUMENT works on documents, AI_EXTRACT pulls fields out of text and AI_COMPLETE is the general completion function.',
 'Función contrastada con su página de referencia; explicación en inglés.');
keep(2006,'1.6','sql-reference/functions/ai_parse_document',
 'AI_PARSE_DOCUMENT extracts text with OCR mode, or text plus layout information with LAYOUT mode, from documents held in an internal or external stage. AI_TRANSCRIBE handles audio and video, AI_EMBED produces vectors and AI_FILTER returns a boolean.',
 'Modos OCR y LAYOUT contrastados con su página de referencia; explicación en inglés.');
keep(2007,'1.6','user-guide/snowflake-cortex/aisql',
 'AI_EMBED generates an embedding vector for text or image input, which can then be used for similarity search, clustering and classification. AI_COMPLETE generates text, AI_AGG aggregates a text column with a prompt and AI_CLASSIFY assigns categories.',
 'Descripción contrastada con la lista de funciones AISQL; explicación en inglés.');
keep(2008,'1.6','user-guide/snowflake-cortex/vector-embeddings',
 'VECTOR_COSINE_SIMILARITY compares two vectors and is the usual way to measure semantic similarity between embeddings produced by AI_EMBED. The other options compare text strings character by character rather than vectors.',
 'Función de similitud contrastada con la página de embeddings; explicación en inglés y sin afirmar que los distractores no existan.');
keep(2009,'4.4','user-guide/snowflake-cortex/vector-embeddings',
 'The VECTOR data type stores embeddings natively, so similarity search runs inside Snowflake without a separate vector store. VARIANT holds semi-structured data, ARRAY holds lists of values and BINARY holds byte strings.',
 'Tipo de datos contrastado con la página de embeddings; explicación en inglés.');
keep(2010,'1.6','sql-reference/functions/ai_summarize_agg',
 'AI_SUMMARIZE_AGG is an aggregate function that summarizes a text column across many rows and is not subject to the context window limit of a single call. AI_COMPLETE works row by row and AI_SENTIMENT scores sentiment.',
 'Función de agregación contrastada con su página; explicación en inglés.');
keep(2015,'1.6','user-guide/snowflake-cortex/aisql',
 'AI_COUNT_TOKENS returns the number of tokens of an input for a given model or Cortex function, which helps keep a call within the model limit. TO_FILE builds a file reference, PROMPT builds prompt objects and AI_EMBED produces vectors.',
 'Función auxiliar contrastada con la lista de funciones AISQL; explicación en inglés.');
keep(2016,'1.6','user-guide/snowflake-cortex/aisql',
 'TO_FILE creates a reference to a file in an internal or external stage so it can be passed to AI_COMPLETE and other functions that accept files. PROMPT builds prompt objects, AI_COUNT_TOKENS counts tokens and AI_EMBED produces vectors.',
 'Función auxiliar contrastada con la lista de funciones AISQL; explicación en inglés.');
keep(2019,'1.6','sql-reference/functions/ai_complete-single-string',
 'With a single string input the call is AI_COMPLETE(<model>, <prompt>), so the first argument names the model and the second carries the prompt. The warehouse, the output column and a stage location are not arguments of the function.',
 'Orden de argumentos contrastado con la sintaxis de entrada de texto; explicación en inglés.');
keep(2020,'1.6','user-guide/snowflake-cortex/aisql',
 'Cortex AI SQL functions are optimized for throughput and batch processing over many rows. For interactive use cases where latency matters, Snowflake recommends the REST API, available for completion, embedding and agent applications.',
 'Recomendación contrastada con la nota sobre throughput y latencia; explicación en inglés.');
keep(2021,'1.6','user-guide/snowflake-cortex/aisql',
 'AI_SIMILARITY calculates the embedding similarity between two inputs, text or images, without you generating and comparing the vectors yourself. AI_FILTER returns a boolean, AI_CLASSIFY assigns categories and AI_AGG aggregates a column with a prompt.',
 'Función contrastada con la lista de funciones AISQL; referencia ajustada a esa página y explicación en inglés.');
keep(2023,'1.5','sql-reference/sql/create-iceberg-table',
 'In the syntax for a table that uses Snowflake as the Iceberg catalog the parameter is CATALOG = \'SNOWFLAKE\'. Values that point to an external catalog, to object storage or to a REST catalog describe externally managed tables, which also need a catalog integration.',
 'Parámetro contrastado con la sintaxis de CREATE ICEBERG TABLE; explicación en inglés.');
keep(2024,'3.3','user-guide/tables-iceberg-configure-catalog-integration',
 'A catalog integration is required whenever Snowflake is not the catalog: an external catalog such as AWS Glue, a table created from files in object storage, Snowflake Open Catalog, or an Iceberg REST catalog. A Snowflake-managed table only needs an external volume, and a standard permanent table needs neither.',
 'Escenarios contrastados con la lista oficial de casos que exigen catalog integration; explicación en inglés.');
keep(2025,'1.5','user-guide/tables-iceberg-configure-external-volume',
 'A single external volume can support one or more Iceberg tables. You can use one volume for all of them, or several volumes when you want data and metadata in separate locations.',
 'Afirmación contrastada literalmente con la página de external volumes; explicación en inglés.');
keep(2027,'3.2','user-guide/tables-iceberg-load',
 'Snowflake-managed Iceberg tables can be loaded with COPY INTO <table> and with Snowpipe, and Snowpipe Streaming is supported as well. SHOW and DESCRIBE only return metadata.',
 'Métodos de carga contrastados con la página de carga de tablas Iceberg; referencia actualizada a esa página y explicación en inglés.');
keep(2028,'1.5','user-guide/tables-iceberg-configure-external-volume',
 'Once a default external volume is set at the account, database or schema level, an Iceberg table created there can omit EXTERNAL_VOLUME and uses that default. Setting a default does not change which catalog manages the table.',
 'Comportamiento del volumen predeterminado contrastado con el ejemplo oficial; explicación en inglés.');
keep(2030,'1.5','user-guide/tables-iceberg-manage',
 'Snowflake documents converting an Iceberg table that uses an external catalog into a table that uses Snowflake as the Iceberg catalog, which gives it full read and write support.',
 'Conversión contrastada con la página de gestión de tablas Iceberg; explicación en inglés.');
keep(2032,'3.3','sql-reference/sql/alter-git-repository',
 'ALTER GIT REPOSITORY <name> FETCH updates the repository clone in Snowflake with the branches, tags and commits of the remote, and prunes what no longer exists there. The other statements are not valid syntax.',
 'Comando contrastado con la documentación de operaciones Git; explicación en inglés.');
keep(2034,'3.3','sql-reference/sql/create-git-repository',
 'API_INTEGRATION names the API integration used for the connection, which must have API_PROVIDER = git_https_api and lists the secrets and URL prefixes that are allowed. GIT_CREDENTIALS points to the secret with the credentials and ORIGIN is the remote repository URL.',
 'Parámetros contrastados con CREATE GIT REPOSITORY; explicación en inglés.');
keep(2036,'3.3','sql-reference/sql/create-git-repository',
 'Snowflake recommends using a personal access token as the PASSWORD value of the secret instead of an account password. The API integration name and the warehouse have nothing to do with the secret.',
 'Buena práctica contrastada literalmente en CREATE GIT REPOSITORY; explicación en inglés.');
keep(2039,'3.3','developer-guide/git/git-operations',
 'A repository clone is accessed like a stage, so LIST (or its LS alias) over @<repo>/branches/<branch> lists its files. SHOW GIT BRANCHES lists branches and DESCRIBE GIT REPOSITORY describes the object.',
 'Sintaxis contrastada con los ejemplos de operaciones Git; explicación en inglés.');
keep(2040,'3.3','developer-guide/git/git-operations',
 'SHOW GIT BRANCHES IN <repo> lists the branches fetched from the remote repository. LIST returns files of the clone and DESCRIBE GIT REPOSITORY returns the properties of the object.',
 'Comando contrastado con la documentación de operaciones Git; explicación en inglés.');
keep(2041,'3.3','sql-reference/sql/create-api-integration',
 'API_ALLOWED_PREFIXES limits the HTTPS endpoints the integration may reach, for example the repository URL. ALLOWED_AUTHENTICATION_SECRETS lists the secrets that may be used with it, API_PROVIDER must be git_https_api for Git, and ENABLED turns the integration on or off.',
 'Parámetro contrastado con CREATE API INTEGRATION; explicación en inglés.');
keep(2042,'1.3','sql-reference/sql/execute-immediate-from',
 'EXECUTE IMMEDIATE FROM runs a script held on a stage or in a Git repository clone. Adding a USING clause with at least one template variable renders the file as a Jinja2 template, so the same script can target different environments.',
 'Cláusula USING y plantillas Jinja2 contrastadas con la referencia del comando; explicación en inglés.');
keep(2044,'1.6','sql-reference/sql/create-notebook',
 'CREATE NOTEBOOK takes the stage location of the file in FROM and the notebook file name in MAIN_FILE, and a Git repository clone is addressed like a stage, so @<repo>/branches/<branch>/<path> is a valid source. The other statements are not Snowflake commands.',
 'Sintaxis contrastada con CREATE NOTEBOOK; explicación en inglés.');
keep(2045,'1.6','user-guide/ui-snowsight/notebooks',
 'Notebook cells run SQL and Python against Snowflake compute, work with the Snowpark API, can call Cortex AI functions and integrate with a Git repository for version control. They do not connect to on-premise Hadoop clusters. Snowflake is moving this experience to Notebooks in Workspaces, so check the current page before relying on interface details.',
 'Integraciones contrastadas con la página de Notebooks; se advierte del traslado a Notebooks in Workspaces, que la documentación marca como sustituto.');
keep(2057,'1.6','developer-guide/snowflake-ml/overview',
 'Snowflake ML covers developing, training and deploying machine learning models inside Snowflake, including feature and model management. It has nothing to do with sharing reader accounts, suspending warehouses or replacing role-based access control.',
 'Alcance contrastado con la página de Snowflake ML; explicación en inglés.');

// --- Correcciones ---
fix(1277,'2.3','sql-reference/account-usage/table_storage_metrics',
 'By default, which role can query SNOWFLAKE.ACCOUNT_USAGE.TABLE_STORAGE_METRICS to review table-level storage?',
 ['ACCOUNTADMIN','SECURITYADMIN','SYSADMIN','USERADMIN'],[0],
 'The SNOWFLAKE database is visible to every user, but access to its schemas must be granted: by default only ACCOUNTADMIN can query the Account Usage views, and that role can grant IMPORTED PRIVILEGES on the SNOWFLAKE database to other roles. The Information Schema view of the same name behaves differently, showing the tables the active role has privileges on.',
 'El original citaba la vista de INFORMATION_SCHEMA, cuya visibilidad depende de los privilegios sobre los objetos, mientras que la regla del rol por defecto es de ACCOUNT_USAGE. Acotado a esa vista.');
fix(1287,'4.1','user-guide/ui-snowsight-activity',
 'If a query is being used to unload a 1 TB table into a stage, which DML operator will be shown in the Query Profile?',
 ['INSERT','UNLOAD','COPY','UPDATE'],[1],
 'The documented DML operator for a COPY statement that exports data from a table into a file in a stage is Unload, whose attribute is the stage location. A load with COPY INTO <table> appears as the Insert operator instead, and there is no COPY operator in Query Profile.',
 'Clave incorrecta: el operador documentado para la descarga es Unload. La explicación anterior negaba que UNLOAD existiera como operador.');
fix(1301,'4.2','user-guide/tables-clustering-keys',
 'Which metric shows how well a large table is clustered and whether it might benefit from reclustering?',
 ['Clustering depth','The clustering key definition','The total number of micro-partitions','The total number of rows'],[0],
 'Clustering depth measures the average overlap of micro-partitions for a set of columns: the larger the depth, the less clustered the table. SYSTEM$CLUSTERING_DEPTH and SYSTEM$CLUSTERING_INFORMATION return it. A clustering key is the definition rather than a measurement, and counts of partitions or rows say nothing about how the data is organized.',
 'El original la llamaba «query metric» cuando es una métrica de la tabla; acotado el enunciado y ajustadas las opciones al vocabulario documentado.');
fix(1302,'4.4','sql-reference/functions/strip_null_value',
 'Which function converts a JSON null value stored in a VARIANT into a SQL NULL value?',
 ['STRIP_OUTER_ARRAY','STRIP_NULL_VALUE','FLATTEN','PARSE_JSON'],[1],
 'STRIP_NULL_VALUE converts a JSON null to SQL NULL and passes any other VARIANT value through unchanged. STRIP_OUTER_ARRAY is a file format option that removes the outer array when loading, FLATTEN expands compound values into rows and PARSE_JSON turns text into a VARIANT. Do not confuse the function with the STRIP_NULL_VALUES file format option applied at load time.',
 'El enunciado situaba la función en la carga, donde actúa la opción de formato STRIP_NULL_VALUES; acotado a la función sobre VARIANT y corregido el distractor mal escrito.');
fix(2050,'1.6','user-guide/snowflake-cortex/aisql',
 'Which statement describes the task-specific Cortex AISQL functions, such as translation, sentiment or summarization?',
 ['They are managed SQL functions that run Snowflake-hosted models, so these tasks need no prompt design or model infrastructure',
  'They require an API integration with an external model provider before they can be called',
  'They only accept numeric input columns',
  'They must be executed from a Snowpark Container Services compute pool'],[0],
 'Task-specific AISQL functions are called from SQL and run models hosted by Snowflake, so common tasks such as translation, sentiment or summarization need no prompt engineering or infrastructure of your own. They do not depend on an external provider integration, they work on text and images rather than numbers only, and they do not require a container compute pool.',
 'Distractores de relleno («solo columnas numéricas», «sustituyen al comando COPY») sustituidos por confusiones plausibles: proveedor externo, integración API y cómputo en contenedores.');

// --- Archivadas ---
archive(1282,'Repite la identificación de la tabla de directorio como objeto para procesar archivos de un stage, ya contrastada en IDs 744 y 757.');
archive(1284,'Repite la cuenta de lectura para consumidores sin cuenta de Snowflake, ya contrastada en IDs 468, 531 y 533.');
archive(1288,'Repite los niveles a los que se aplican las políticas de red (usuario y cuenta), ya contrastados en ID 401.');
archive(1290,'Repite el muestreo de tamaño fijo con ROWS frente a los porcentajes de SYSTEM y BERNOULLI, ya contrastado en ID 905.');
archive(1298,'Presenta SAMPLE como si fuera una función y usa distractores inexistentes (AVERAGE, MEDIAN o RANDOM con ROWS); el muestreo ya se evalúa en IDs 610 y 905.');
archive(1299,'Repite el etiquetado de objetos para seguir datos sensibles, ya contrastado en ID 715.');
archive(1305,'Repite ACCESS_HISTORY como registro de lecturas y escrituras sobre una tabla, ya contrastado en IDs 738 y 785.');
archive(1306,'Repite el formato de archivo con nombre para descargas periódicas, ya contrastado en ID 180.');
archive(1312,'Repite los metadatos de micro-partición (valores distintos y rango por columna), ya contrastados en ID 753.');
archive(1315,'Repite MAX_CLUSTER_COUNT como escalado horizontal, ya contrastado en IDs 137 y 457.');
archive(1317,'Repite el consumo de créditos por el mantenimiento de una vista materializada, ya contrastado en IDs 229 y 943.');
archive(1320,'Ambigua con la documentación vigente: además de las vistas seguras se pueden compartir vistas materializadas seguras y UDF seguras. Los objetos compartibles ya se evalúan en IDs 222, 373 y 593.');
archive(1323,'Repite «partitions scanned» como indicador de pruning, ya contrastado en IDs 393 y 443.');
archive(1324,'Repite el alcance de la URL prefirmada (cualquiera con la URL accede mientras viva el token), ya contrastado en ID 388.');
archive(1327,'Repite la inmutabilidad de las micro-particiones, ya contrastada en ID 116.');
archive(1334,'Repite la autenticación por par de claves para cuentas de servicio, ya contrastada en ID 3015.');
archive(1336,'Repite RESULT_SCAN para recuperar la salida de un comando anterior, ya contrastado en ID 878.');
archive(1337,'Repite OBJECT_CONSTRUCT junto a COPY INTO para descargar a JSON, ya contrastado en ID 517.');
archive(1338,'Repite que en un esquema de acceso gestionado el propietario pierde las decisiones de concesión, ya contrastado en IDs 564 y 3063.');
archive(1339,'Repite COPY INTO <location> como comando de descarga, ya contrastado en ID 584.');
archive(1340,'Repite Snowpipe como carga en cuanto los archivos están disponibles, ya contrastado en IDs 197 y 3009.');
archive(1342,'Repite el privilegio MONITOR para ver un resource monitor, ya contrastado en ID 465.');
archive(1351,'Repite la alerta como objeto de esquema que evalúa una condición y actúa periódicamente, ya contrastado en ID 3036.');
archive(2012,'Repite la identificación de Cortex Search como servicio de búsqueda sobre datos no estructurados, ya contrastada en ID 3027.');
archive(2013,'Repite Cortex Analyst como conversión de lenguaje natural a SQL, ya contrastado en ID 3028.');
archive(2014,'La documentación marca TRY_COMPLETE como función heredada que se retirará a finales de 2026 y recomienda AI_COMPLETE para usos nuevos.');
archive(2043,'Repite los lenguajes de las celdas de Notebooks (SQL y Python), ya contrastados en ID 3031.');
archive(2048,'Repite el caso de uso de Cortex Search para aplicaciones RAG, ya contrastado en ID 3027.');
archive(2049,'Repite Cortex Analyst para preguntar en lenguaje natural sobre datos bien modelados, ya contrastado en ID 3028.');
archive(2054,'Repite el posicionamiento de Snowflake Notebooks como interfaz interactiva por celdas, ya contrastado en ID 3031.');
archive(2055,'Repite la definición de Snowpark, ya cubierta por los IDs 653 (lenguajes) y 3032 (ejecución junto a los datos).');
archive(2056,'Repite Streamlit in Snowflake como forma de crear aplicaciones de datos en Python dentro de la plataforma, ya contrastado en ID 3030.');
