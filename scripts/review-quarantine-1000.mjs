// Segunda tanda tomada del grupo apartado: las 100 primeras por ID (3-462).
// IDs congelados en audit/quarantine-1000-ids.json. Decisiones: conservar_revisada, corregir, archivar, apartar.
export const quarantine1000 = [];
function keep(i, objective, path, e, reason) {
  quarantine1000.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,decision:'conservar_revisada',reason});
}
function fix(i, objective, path, q, o, c, e, reason) {
  quarantine1000.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,decision:'corregir',reason});
}
function archive(i,reason){quarantine1000.push({i,decision:'archivar',reason});}
function hold(i,reason){quarantine1000.push({i,decision:'apartar',reason});}

// --- Conservadas: la sospecha del cribado no se confirma ---
keep(21,'1.1','user-guide/intro-key-concepts',
 'Snowflake keeps data in a shared storage layer and processes it in independent virtual warehouses. Storage can therefore grow without adding compute, a warehouse can be resized without touching storage, and several warehouses can read the same data at the same time without competing for resources. Coupled growth is precisely what this architecture avoids.',
 'Los tres beneficios coinciden con la descripción de la arquitectura de tres capas; el distractor es la negación del principio.');
keep(32,'1.5','user-guide/tables-temp-transient',
 'Snowflake tables are permanent, transient or temporary. Permanent tables keep Time Travel plus a seven-day Fail-safe period, transient tables persist until they are dropped but have no Fail-safe, and temporary tables live only for the session that created them. Provisional is not a Snowflake table type.',
 'Los tres tipos figuran en la documentación de tablas temporales y transitorias; el cuarto nombre no existe.');
keep(51,'5.2','user-guide/data-sharing-intro',
 'A share is controlled entirely by the provider account. The consumer gets a read-only database created from the share and can query or join that data, but it cannot grant those objects to a share of its own, so the data cannot be forwarded to a third account.',
 'El control exclusivo del proveedor y el carácter de solo lectura de la base importada figuran en la introducción a Secure Data Sharing.');
keep(60,'1.2','user-guide/ui-snowsight-activity',
 'Query History in Snowsight, reached through Monitoring, covers the last 14 days and cannot retrieve older queries. For a longer window use the ACCOUNT_USAGE.QUERY_HISTORY view, which retains one year of history.',
 'Clave correcta: solo se actualizan explicación y enlace porque la página sitúa ahora Query History en el menú Monitoring. No se reformula el enunciado ni se reinicia el progreso.');
keep(66,'5.1','user-guide/data-time-travel',
 'Time Travel keeps historical versions of databases, schemas and tables, which is why UNDROP and AT | BEFORE work on them. A stage only points to files, so it has no historical versions: dropping an internal stage removes its files and dropping an external stage leaves the files in the cloud bucket.',
 'Objetos cubiertos por Time Travel y comportamiento de los stages al eliminarlos contrastados con la documentación de Time Travel.');
keep(68,'4.4','sql-reference/transactions',
 'The documentation states that INSERT operations are not blocked, and that most INSERT and COPY statements only write new partitions, so they can run in parallel with each other. UPDATE, DELETE and MERGE hold locks that generally prevent them from running in parallel with other UPDATE, DELETE or MERGE statements on the same rows.',
 'La sección Resource locking de Transactions distingue explícitamente INSERT y COPY de UPDATE, DELETE y MERGE.');
keep(80,'1.4','user-guide/warehouses-considerations',
 'The number of queries a warehouse can process concurrently depends on the size and the complexity of each query: larger scans and heavier processing take more of the warehouse resources, so fewer queries fit at once. MAX_CONCURRENCY_LEVEL exists as a parameter, but there is no CONCURRENT_QUERY_LIMIT account parameter, and the client tool issuing the query is irrelevant.',
 'Se reescribe la explicación para eliminar el comentario editorial anterior; la clave coincide con la guía de concurrencia de warehouses.');
keep(104,'4.2','user-guide/tables-clustering-keys',
 'Clustering keys carry maintenance cost, so Snowflake recommends them for very large tables, in the multi-terabyte range, where the pruning gain outweighs the cost of reclustering. Smaller tables rarely benefit enough to justify it.',
 'El umbral multiterabyte figura en las recomendaciones de claves de clustering.');
keep(153,'1.1','user-guide/warehouses-overview',
 'Each virtual warehouse is an independent compute cluster reading from the same shared storage, so one workload does not compete for the resources of another. A zero-copy clone does not follow later changes to its source, releases are not quarterly, one query runs on a single cluster of a multi-cluster warehouse, and Snowflake does not sort DATE columns on ingest.',
 'El aislamiento entre warehouses figura en la visión general de warehouses; los cuatro distractores contradicen comportamientos documentados.');
keep(160,'4.3','user-guide/warehouses-considerations',
 'The warehouse cache lives on the compute resources themselves. Reducing the size of a running warehouse removes resources and drops the cache they held, so part of the cached data is lost, with an effect similar to resuming a suspended warehouse. The cache is not independent of the warehouse size, and no encryption key is involved.',
 'El efecto de reducir el tamaño sobre la caché local figura en las consideraciones de warehouses.');
keep(178,'2.3','user-guide/cost-understanding-compute',
 'Serverless features run on Snowflake-managed compute and are billed per second of use multiplied by the sizing Snowflake chooses for the job, so there is no warehouse size to pick and no per-minute minimum like a user-managed warehouse. There is no SERVERLESS_FEATURES_SIZE parameter, and serverless usage is always billed.',
 'El modelo por segundo y el dimensionado automático figuran en el apartado de créditos de features serverless.');
keep(192,'2.2','user-guide/data-cdp',
 'Continuous Data Protection groups the features that protect data by default: every piece of data is encrypted end to end with no configuration, and Time Travel is active with the default retention period. Masking policies, row access policies and external tokenization only take effect once an administrator creates and assigns them.',
 'La separación entre lo automático y lo que exige configuración figura en la página de Continuous Data Protection.');
keep(196,'2.3','user-guide/data-cdp-storage-costs',
 'Storage fees are incurred for historical data during both the Time Travel and the Fail-safe periods. Deleting or truncating a table starts that clock instead of stopping the charges: the data keeps being billed until it leaves Fail-safe.',
 'La frase inicial de Storage costs for Time Travel and Fail-safe respalda la clave.');
keep(203,'2.3','user-guide/cost-understanding-compute',
 'Cloud services usage is billed only for the part that exceeds 10 percent of the daily virtual warehouse credits. With 50 compute credits the allowance is 5, so 10 cloud services credits are partly billed; with 200 the allowance is 20 and 26 exceeds it. In the other cases, 5 of 8, 9 of 10 and 10 of 12, usage stays inside the allowance.',
 'El umbral diario del 10 % figura en el apartado de créditos de cloud services; los cuatro escenarios se comprueban aritméticamente.');
keep(219,'5.2','user-guide/data-sharing-intro',
 'Any full Snowflake account can act as a provider and as a consumer. No data is copied: the consumer creates a read-only database from the share and pays only for the warehouse compute used to query it, while the storage stays in, and is paid for by, the provider account.',
 'Ambas afirmaciones figuran en la introducción a Secure Data Sharing; los distractores contradicen el modelo de costes.');
keep(224,'4.1','user-guide/ui-query-profile',
 'Bytes scanned and partitions scanned against partitions total show how much data the query really read and how well pruning worked, which is what a clustering key, a better filter or a search access path can improve. Bytes sent over the network and the share read from cache describe the environment rather than a lever you act on directly.',
 'Las estadísticas de escaneo y pruning del Query Profile son las que la documentación asocia a la optimización.');
keep(242,'2.3','user-guide/warehouses-considerations',
 'Billing starts when the warehouse resumes and is charged per second with a minimum of 60 seconds each time. The first query bills 3 minutes plus the 10 idle minutes before auto-suspend, and the second query bills the 60-second minimum although it lasts 10 seconds, which adds up to 14 minutes. The remaining idle time is not billed because the warehouse was already suspended.',
 'Se contrasta con la facturación por segundo con mínimo de 60 segundos y con el efecto del auto-suspend de 10 minutos.');
keep(250,'1.4','user-guide/warehouses-considerations',
 'Resizing does not disturb statements that are already running: when a warehouse is made smaller, the compute resources are removed only once they finish the statements they are executing. Resources added by an increase serve queued and future queries rather than the ones already in flight, and the warehouse is neither suspended nor made to return errors while it is resized.',
 'El comportamiento al reducir el tamaño figura en el apartado Resizing warehouses de las consideraciones de warehouses.');
keep(260,'2.3','sql-reference/info-schema',
 'The account-level views of INFORMATION_SCHEMA include DATABASE_STORAGE_USAGE_HISTORY and STAGE_STORAGE_USAGE_HISTORY, which report storage for databases and for internal stages. Users, resource monitors and pipes appear in other views, none of which reports storage bytes.',
 'Las vistas de almacenamiento del Information Schema se comprueban en su índice de vistas.');
keep(281,'1.1','user-guide/admin-security-privatelink',
 'Private connectivity to the Snowflake service through AWS PrivateLink, Azure Private Link or Google Cloud Private Service Connect appears in the editions table from Business Critical upwards, together with private connectivity to internal stages. Standard and Enterprise do not include it, and Premium is not a Snowflake edition.',
 'La edición mínima se comprueba en la tabla de ediciones; se corrige el enlace, que apuntaba a la página de network policies.');
keep(288,'1.4','user-guide/warehouses-overview',
 'Warehouses are required for queries and for every DML operation. Calling a stored procedure runs statements, and reading a materialized view is a query, so both need a running warehouse. Listing files in a stage, downloading them with GET and altering a table are metadata or DDL operations served by the cloud services layer.',
 'La frase "Warehouses are required for queries, as well as all DML operations" delimita qué operaciones necesitan cómputo.');
keep(292,'1.4','user-guide/warehouses-overview',
 'A warehouse can run statements as soon as its compute resources are provisioned, whether it was just created, resumed from suspension or resized upwards. Provisioning is not partial, there are no administrator time slots, and replication has nothing to do with warehouses.',
 'Se conserva esta versión de la idea por tener distractores razonables; el ID 71 de esta misma tanda se archiva por repetirla.');
keep(297,'2.2','user-guide/security-column-ddm',
 'A masking policy is applied to a column, so it can be set on tables, views and materialized views. Streams, pipes and stored procedures have no columns to mask; protecting what is read through them depends on the policies of the underlying tables.',
 'Los objetos admitidos figuran en Understanding Dynamic Data Masking.');
keep(299,'2.3','sql-reference/sql/create-table',
 'CREATE TABLE ... LIKE copies the structure of the source table, including column definitions and defaults, but not its rows. It is a DDL statement resolved by the cloud services layer, so it needs no running warehouse and adds no storage; only cloud services usage above the daily allowance could be billed.',
 'Se contrasta con CREATE TABLE ... LIKE y con la facturación de cloud services; se matiza que el coste cero no es absoluto.');
keep(333,'3.1','sql-reference/sql/alter-stage',
 'ALTER STAGE and DROP STAGE work on named stages, internal or external. The user stage, written @~, and the table stage, written @%table, are created automatically with the user or the table and cannot be altered or dropped on their own. There is no database stage in Snowflake.',
 'ALTER STAGE documenta que solo modifica stages con nombre, internos o externos.');
keep(337,'4.2','user-guide/tables-clustering-keys',
 'A clustering key should mirror how the table is filtered, so the best candidates are the columns used most often in WHERE predicates and join conditions. Columns with extremely high cardinality, such as a unique identifier or a timestamp down to the second, produce too many distinct values to cluster efficiently, and columns that only appear in the SELECT list do not help pruning.',
 'La selección por predicados y la advertencia sobre cardinalidad muy alta figuran en la guía de claves de clustering.');
keep(338,'4.4','sql-reference/data-types-semistructured',
 'Semi-structured data is held in a VARIANT through two container types: OBJECT for sets of key-value pairs and ARRAY for ordered lists that are accessed by position. STRUCT and CLOB are not Snowflake data types.',
 'Los tipos ARRAY y OBJECT figuran en la documentación de tipos semiestructurados.');
keep(391,'5.2','user-guide/data-sharing-reader-create',
 'A reader account consumes data from the provider that created it and cannot become a provider itself: the documentation lists CREATE SHARE among the commands that cannot be executed there, along with INSERT and CREATE STAGE. Reading metadata with SHOW or DESCRIBE, and managing its own warehouses and roles, is allowed.',
 'La lista de comandos no permitidos en una reader account incluye CREATE SHARE.');
keep(405,'2.2','user-guide/security-column-ddm',
 'Masking policies are separate objects with their own ownership. Unsetting a policy from a column or altering it requires the APPLY MASKING POLICY privilege or ownership of the policy, neither of which comes with owning the table, so the developer keeps seeing masked values. That separation is what prevents a table owner from bypassing governance.',
 'La separación entre propiedad de la tabla y privilegio sobre la política figura en Dynamic Data Masking.');
keep(415,'3.1','user-guide/data-unload-prepare',
 'Unloading supports delimited files such as CSV and TSV and, for semi-structured output, JSON and Parquet. Avro, ORC and XML can be loaded into Snowflake but cannot be produced by COPY INTO location.',
 'La tabla de formatos admitidos al descargar confirma la clave e incluye Parquet, que no figura entre las opciones.');
keep(432,'3.1','sql-reference/sql/copy-into-location',
 'For a CSV or JSON unload the COMPRESSION option defaults to AUTO, which compresses the files with gzip. BZ2, Brotli and Zstandard are valid values that must be requested explicitly, and a Parquet unload uses a different list in which AUTO means Snappy.',
 'Los valores admitidos y el comportamiento de AUTO figuran en las opciones de formato de COPY INTO location.');
keep(449,'4.4','sql-reference/constraints-properties',
 'Snowflake accepts UNIQUE, PRIMARY KEY and FOREIGN KEY as metadata that documents the model and helps tools and the optimizer, but it does not enforce them during DML. NOT NULL is the only constraint actually enforced, so an insert with a null value in that column fails.',
 'La propiedad de no forzadas salvo NOT NULL figura en la documentación de constraints.');
keep(462,'4.4','sql-reference/functions-table',
 'A table function returns a set of rows, with one or more columns, for each input row, so it is used in the FROM clause, usually wrapped in TABLE(). A scalar UDF returns one value per row and belongs in the SELECT list or in a predicate, a stored procedure is invoked with CALL, and a task is a scheduling object.',
 'La definición de table function y su uso en la cláusula FROM se comprueban en la referencia de funciones de tabla.');

// --- Corregidas: clave, alcance o dato desactualizado ---
fix(31,'1.1','user-guide/intro-editions',
 'A customer must store regulated data such as protected health information and needs the compliance features Snowflake documents for it. What is the MINIMUM edition that meets that requirement?',
 ['Standard','Enterprise','Business Critical','Virtual Private Snowflake (VPS)'],[2],
 'Support for regulated data such as PHI, together with Tri-Secret Secure and private connectivity, starts at Business Critical in the editions table. VPS contains everything Business Critical offers but is not the minimum, and Standard and Enterprise do not cover those requirements. A signed business associate agreement is also required before any PHI is stored.',
 'Premier no es una edición de Snowflake; se sustituye por VPS, que obliga a razonar cuál es la edición mínima y no solo cuál es la más protegida.');
fix(38,'1.5','user-guide/tables-clustering-micropartitions',
 'Which statements are true of micro-partitions? (Choose two.)',
 ['Each one holds between 50 MB and 500 MB of uncompressed data','They are stored compressed only if COMPRESS = TRUE is set on the table','They are immutable once written','They are encrypted only in Enterprise edition and above'],[0,2],
 'The documentation defines a micro-partition as a contiguous unit of storage holding between 50 MB and 500 MB of uncompressed data, smaller once stored because Snowflake always compresses it. Micro-partitions are immutable: a DML operation writes new ones instead of editing them. Compression is automatic and encryption applies to every edition.',
 'La opción marcada decía aproximadamente 16 MB, que es el tamaño comprimido habitual pero no el dato documentado; se sustituye por el rango 50-500 MB sin comprimir.');
fix(75,'4.4','developer-guide/udf/udf-overview',
 'Which languages can be used to write the handler of a Snowflake UDF? (Choose three.)',
 ['Java','Ruby','Python','SQL','C#'],[0,2,3],
 'The supported handler languages are Java, JavaScript, Python, Scala and SQL. Java UDFs and UDTFs have been supported for years, so excluding Java is wrong. Ruby and C# are not handler languages, although an application written in them can call a UDF through a driver.',
 'La clave original excluía Java, que sí es un lenguaje de handler admitido: quien estudiara esta pregunta aprendería lo contrario de la documentación.');
fix(91,'3.3','user-guide/admin-security-privatelink',
 'A customer wants traffic from its own data centre to reach Snowflake over private connectivity on AWS, without traversing the public internet. What does Snowflake document for this case?',
 ['AWS PrivateLink on its own already connects an on-premises data centre to Snowflake','AWS Direct Connect is combined with AWS PrivateLink so that physical and virtual environments share a single private network','A network policy listing the data centre IP range provides the private connection','The customer must host a Snowflake deployment inside its own data centre'],[1],
 'PrivateLink creates a private endpoint between a VPC and the Snowflake service. To reach it from a non-hosted data centre the customer adds AWS Direct Connect, a separate AWS service, which is the on-premises-to-VPC connection type Snowflake documents. A network policy filters source IP addresses but leaves the traffic on the public network.',
 'La formulación verdadero/falso daba por buena la idea de que PrivateLink por sí solo llega al centro de datos; la documentación exige combinarlo con Direct Connect.');
fix(157,'1.4','user-guide/warehouses-overview',
 'Which operations require a running virtual warehouse to complete? (Choose three.)',
 ['ALTER TABLE ... ADD COLUMN','COPY INTO a table from a stage','SELECT SUM(order_amount) FROM sales','UPDATE on a table'],[1,2,3],
 'Warehouses are required for queries and for all DML operations, including loading data. COPY INTO loads rows, the aggregate has to scan column values, and UPDATE modifies data. Adding a column is DDL: the cloud services layer changes the metadata with no compute involved.',
 'La opción MIN(columna) daba por documentado que un agregado se resuelve solo con metadatos y sin warehouse, algo que la documentación no dice y que contradice la frase "Warehouses are required for queries".');
fix(262,'2.2','user-guide/governance-classify-concepts',
 'Which data types can Snowflake sensitive data classification process? (Choose two.)',
 ['BINARY','FLOAT','GEOGRAPHY','VARCHAR','UUID'],[1,3],
 'Classification covers every supported data type except BINARY, DECFLOAT, GEOGRAPHY, UUID and VECTOR, so numeric and text columns such as FLOAT and VARCHAR are eligible. Among semi-structured data only JSON is supported, and unstructured content such as long free text is not.',
 'La versión original daba VARIANT por no admitido: la documentación solo excluye BINARY, DECFLOAT, GEOGRAPHY, UUID y VECTOR, de modo que la pregunta tenía dos respuestas correctas entre las opciones.');
fix(268,'2.3','sql-reference/account-usage/resource_monitors',
 'Which schemas of the SNOWFLAKE database expose a RESOURCE_MONITORS view? (Choose two.)',
 ['ACCOUNT_USAGE','READER_ACCOUNT_USAGE','INFORMATION_SCHEMA','WAREHOUSE_USAGE_SCHEMA'],[0,1],
 'The RESOURCE_MONITORS view is documented in SNOWFLAKE.ACCOUNT_USAGE and in SNOWFLAKE.READER_ACCOUNT_USAGE, where it adds a READER_ACCOUNT_NAME column so a provider can monitor each reader account separately. INFORMATION_SCHEMA has no such view and WAREHOUSE_USAGE_SCHEMA does not exist.',
 'El enunciado pedía un esquema en singular mientras la clave marcaba dos opciones; se corrige el enunciado sin alterar la respuesta.');
fix(278,'1.1','user-guide/intro-cloud-platforms',
 'Which statements are true of the cloud infrastructure Snowflake runs on? (Choose two.)',
 ['Snowflake can be installed in a customer private cloud using the customer own servers','All three layers of the architecture, storage, compute and cloud services, are deployed and managed entirely on the selected cloud platform','Snowflake runs completely on public cloud infrastructure as a self-managed service','An account can only ever be hosted on one cloud provider, and an organization cannot use another'],[1,2],
 'Snowflake is delivered as a self-managed service that runs completely on cloud infrastructure: the three layers are deployed and managed on the chosen platform, which can be AWS, Google Cloud or Azure. There is no installable version for a private data centre, and an organization can host different accounts on different platforms and regions.',
 'La opción sobre tres zonas de disponibilidad no está respaldada por las páginas actuales de plataformas y regiones, así que se retira y la pregunta pasa a dos respuestas comprobables.');
fix(348,'3.1','user-guide/data-unload-considerations',
 'Which statements about unloading data from Snowflake are correct? (Choose two.)',
 ['STRIP_OUTER_ARRAY removes the outer array when unloading semi-structured data','OBJECT_CONSTRUCT can turn relational rows into a single VARIANT column that is then unloaded as JSON','SINGLE = TRUE writes one output file, whose size limit can be raised up to the supported maximum of 5 GB','PARSE_JSON must be applied so that structured data is unloaded into a VARIANT'],[1,2],
 'COPY INTO location splits the output into several files by default; SINGLE = TRUE produces a single file, and MAX_FILE_SIZE, 16 MB by default, can be raised to the 5 GB supported by the cloud stages. To unload relational rows as JSON the documented approach is to build a VARIANT with OBJECT_CONSTRUCT in the SELECT. STRIP_OUTER_ARRAY is a loading option, and PARSE_JSON parses a string into a VARIANT rather than preparing an unload.',
 'La clave marcaba STRIP_OUTER_ARRAY, que es una opción de carga, y la explicación describía dos opciones distintas de las marcadas; se corrigen clave y explicación con las dos afirmaciones documentadas.');
fix(421,'2.1','user-guide/security-access-control-considerations',
 'According to Snowflake recommendations for custom roles, which statements are correct? (Choose two.)',
 ['Custom roles are created by USERADMIN or by another role granted the CREATE ROLE privilege','Every custom role must be owned by ACCOUNTADMIN','The hierarchy of custom roles is ultimately granted to SYSADMIN so that it can manage the objects those roles own','Custom roles inherit the privileges of SECURITYADMIN by default'],[0,2],
 'USERADMIN holds the privileges to create and manage users and roles, and Snowflake recommends building a hierarchy of custom roles aligned with business functions whose top role is granted to SYSADMIN, so that warehouse and database operations stay manageable from there. Assigning ownership to ACCOUNTADMIN or inheriting from SECURITYADMIN is not part of the recommendation.',
 'Rescatada de cuarentena: el enunciado preguntaba qué roles se usan para crear roles personalizados y mezclaba quién los crea con quién los hereda. Ahora cada opción enuncia una recomendación concreta.');
fix(428,'2.2','user-guide/access-history',
 'Which benefits does the documentation list for the ACCESS_HISTORY view? (Choose two.)',
 ['Discovering unused data in order to archive or delete it','Identifying the user who performed a write operation on a table or stage, and when it happened','Listing which roles have been granted to a user','Reporting how many connections each network policy has blocked'],[0,1],
 'The Benefits section names data discovery, tracking how sensitive data moves, and compliance auditing, which identifies the user behind a write operation on a table or stage and the moment it occurred. Role grants are queried in GRANTS_TO_USERS, and network policy activity is not part of this view.',
 'Rescatada de cuarentena: la pregunta era de respuesta única y descartaba la auditoría de escrituras, que la documentación sí enumera como beneficio, de modo que había dos opciones válidas.');
fix(435,'5.1','sql-reference/sql/undrop-schema',
 'User A replaced a schema with a clone and the tables User B was working on disappeared. Everything happened inside the Time Travel retention period. How can the previous tables be recovered?',
 ['Run UNDROP TABLE for each table so they are restored into the schema that exists now','Rename the cloned schema and then run UNDROP SCHEMA','Recreate each table with CREATE TABLE AS SELECT','Ask Snowflake Support to recover the data from Fail-safe'],[1],
 'Replacing the schema dropped it together with its tables, so the previous version can only be recovered as a whole with UNDROP SCHEMA. UNDROP returns an error if an object with the same name already exists, which is why the clone has to be renamed first. Fail-safe is not involved while the data is still inside Time Travel, and CREATE TABLE AS SELECT cannot read a version that is no longer reachable.',
 'La clave original, UNDROP TABLE, no es aplicable: las tablas desaparecieron con el esquema y UNDROP falla si ya existe un objeto con ese nombre. La respuesta correcta ya figuraba entre los distractores.');
fix(456,'1.4','sql-reference/sql/create-warehouse',
 'What is the default AUTO_SUSPEND value for a warehouse created with CREATE WAREHOUSE?',
 ['60 seconds','300 seconds','600 seconds','The warehouse never suspends unless a value is set'],[2],
 'AUTO_SUSPEND defaults to 600 seconds, that is ten minutes of inactivity. Setting it to 0 or NULL means the warehouse never suspends, which Snowflake does not recommend unless the workload needs a continuously running warehouse.',
 'El enunciado preguntaba por un valor de la interfaz web, que depende de la UI; se reformula sobre el valor por defecto documentado de AUTO_SUSPEND.');

// --- Apartada: no se fuerza una validación sin fuente ---
hold(235,'La documentación actual de SCIM no declara edición mínima y la tabla de ediciones no menciona SCIM, mientras que la autenticación federada y el SSO figuran en todas las ediciones. No se puede confirmar ni refutar Enterprise sin una fuente oficial, así que se mantiene apartada.');

// --- Archivadas por duplicar material ya contrastado ---
archive(14,'Repite que el resource monitor limita el consumo de créditos, ya contrastado en el ID 289.');
archive(40,'Repite las condiciones de reutilización de resultados persistidos y la ventana de 24 horas, ya contrastadas en los IDs 316 y 579; además una opción está corrompida con caracteres ilegibles.');
archive(54,'Repite la duración de la caché de resultados, ya contrastada en los IDs 316 y 579.');
archive(71,'Duplicado del ID 292 de esta misma tanda, que plantea la misma pregunta con distractores razonables.');
archive(90,'Que COPY INTO necesita un warehouse activo queda cubierto por el ID 157 de esta tanda, reformulado para distinguir DDL de DML.');
archive(92,'Repite que la capa de servicios mantiene los metadatos de particiones y columnas, ya contrastado en el ID 1003; además el enlace apuntaba a la página de PrivateLink.');
archive(110,'Repite que solo se consumen créditos mientras el warehouse está activo, ya contrastado en los IDs 317 y 770.');
archive(113,'Duplicado del ID 415 de esta tanda, con los mismos formatos de descarga y la misma respuesta.');
archive(114,'Repite que se puede compartir con cuentas de lectura además de con clientes de Snowflake, ya contrastado en los IDs 468, 531 y 533.');
archive(125,'Duplicado del ID 449 de esta tanda, que evalúa la misma regla de constraints en formato de opción múltiple.');
archive(132,'Repite que el periodo de Fail-safe no es configurable, ya contrastado en el ID 24.');
archive(142,'Repite el máximo de protección continua de una tabla temporal, ya contrastado en los IDs 208 y 900.');
archive(155,'Repite el tamaño de fichero recomendado al cargar, ya contrastado en el ID 189.');
archive(232,'Repite el tamaño de fichero recomendado al cargar, ya contrastado en el ID 189.');
archive(243,'Repite la vista WAREHOUSE_METERING_HISTORY, ya contrastada en el ID 450, y su segunda opción nombra una pestaña de la interfaz que ya no existe con ese nombre.');
archive(244,'Repite que quitar una columna del SELECT impide reutilizar el resultado persistido, ya contrastado en el ID 293; además cambiar una columna ajena a la consulta también invalidaría la caché, lo que deja la selección ambigua.');
archive(247,'Duplicado del ID 874, contrastado, que además enuncia la política Economy con la condición estimada que emplea la documentación.');
archive(259,'Repite las dos consideraciones de una vista segura, menos optimizaciones internas y definición no visible, ya contrastadas en el ID 586.');
archive(271,'Los objetos protegidos por Fail-safe ya se evalúan en los IDs 65 y 791, y la documentación no atribuye periodo de Fail-safe a las vistas materializadas.');
archive(276,'Repite las condiciones de reutilización de la caché de resultados, ya contrastadas en el ID 316.');
archive(277,'Repite el tamaño de fichero recomendado para Snowpipe, ya contrastado en el ID 189.');
archive(285,'Repite que una profundidad de clustering alta señala la conveniencia de una clave, ya contrastado en los IDs 1095 y 1301.');
archive(306,'Repite que los objetos compartidos quedan accesibles sin copiar datos, ya contrastado en el ID 228.');
archive(314,'Repite los objetos que pueden incluirse en un share, ya contrastado en el ID 373; además la opción de vistas materializadas sin el calificativo de seguras es ambigua.');
archive(315,'Repite el efecto de una clave de clustering sobre la colocación de datos y el pruning, ya contrastado en los IDs 256 y 287.');
archive(321,'Repite los objetos compartibles, ya contrastado en los IDs 344, 593 y 1072.');
archive(324,'Repite qué feature organiza los datos dentro de las micro-particiones, ya contrastado en los IDs 1 y 186.');
archive(328,'Repite cuándo conviene crear una vista materializada, ya contrastado en el ID 540.');
archive(332,'Duplicado del ID 1309, contrastado, sobre la edición mínima para el rekeying periódico.');
archive(343,'Repite que el rekeying periódico está disponible desde Enterprise, ya contrastado en el ID 1309; los demás distractores contienen erratas.');
archive(345,'Duplicado del ID 338 de esta tanda, con los mismos tipos ARRAY y OBJECT.');
archive(372,'Repite que sin auto-fulfillment hay que replicar la base de datos antes de compartirla en otra región, ya contrastado en el ID 1271.');
archive(374,'Repite que Snowpipe es la vía para cargas continuas de poco volumen, ya contrastado en el ID 197.');
archive(383,'Repite que Time Travel sirve para consultar y para restaurar, ya contrastado en el ID 136.');
archive(385,'Repite el tamaño de fichero recomendado para Snowpipe, ya contrastado en el ID 189.');
archive(397,'Duplicado del ID 460, contrastado, sobre la rotación automática de claves a los 30 días.');
archive(411,'Repite que los datos pasan a Fail-safe al terminar la retención, ya contrastado en los IDs 115 y 166.');
archive(448,'Repite las características de las tablas temporales, ya contrastadas en los IDs 900 y 164.');

// --- Archivadas por clave insostenible, ambigüedad o dato obsoleto ---
archive(3,'Verdadero/falso cuya respuesta depende de leer una réplica como la misma base de datos; la replicación entre cuentas ya se evalúa en los IDs 1140 y 290.');
archive(15,'La contraposición OLAP frente a OLTP dejó de ser exacta desde que Snowflake ofrece tablas híbridas para cargas transaccionales, y cargas concurrentes no es un tipo de carga.');
archive(43,'La ausencia de índices dejó de ser general desde que las tablas híbridas los admiten, y el enunciado evalúa una lista de tareas de migración, no un comportamiento documentado.');
archive(67,'Afirma que los metadatos de micro-partición permiten completar operaciones sin cómputo; la documentación de warehouses dice que las consultas requieren warehouse y no documenta esa excepción.');
archive(96,'Trivia sobre un límite que la documentación actual de Secure Data Sharing no publica, así que la respuesta ilimitado no puede acreditarse.');
archive(150,'Admite tres respuestas, porque VPS incluye todo lo de Business Critical, de modo que elige dos no tiene solución única; la edición mínima para datos regulados se evalúa en el ID 31 de esta tanda.');
archive(154,'Describe la publicación en regiones remotas con la terminología anterior de listings, y el caso de negocio ya se evalúa en los IDs 1219 y 1271.');
archive(173,'El escenario parte de un error de tamaño máximo de 16 MB que ya no se reproduce con los límites actuales de VARIANT, y la corrección propuesta no encaja con una concatenación de documentos JSON.');
archive(190,'Las features de la edición Enterprise ya se evalúan en los IDs 95, 97 y 1210, y el soporte nativo de datos geoespaciales está disponible en todas las ediciones, lo que hace ambigua la selección.');
archive(194,'Trivia sobre qué aparece en la sección de descargas de la interfaz; SnowSQL también se descarga desde ahí, así que la opción descartada es tan válida como las marcadas.');
archive(199,'Parte del mismo supuesto no documentado que corrige el ID 157 de esta tanda: que MIN se resuelve sin cómputo.');
archive(207,'Los tipos de listing documentados hoy son gratuito, de prueba limitada y de pago; estándar y personalizado son la terminología anterior.');
archive(249,'Atribuye COUNT(1) a una caché de metadatos que la documentación no describe, mientras que la página de warehouses afirma que las consultas requieren warehouse.');
archive(339,'La recomendación de dividir en más ficheros pequeños ya se evalúa en el ID 189, y la opción marcada añade un tamaño de warehouse concreto que la documentación no prescribe.');
archive(377,'Los objetos con mantenimiento serverless ya se evalúan en los IDs 327 y 229, y la clave excluye la tabla con clustering automático, que incurre exactamente en ese tipo de coste.');
