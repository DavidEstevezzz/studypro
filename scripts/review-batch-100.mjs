// First 100 pending IDs captured before this review. Original content remains in audit/original.
export const batch100 = [];
function keep(ids, objective, path, e) {
  for (const i of ids) batch100.push({ i, objective, r: `https://docs.snowflake.com/en/${path}`, e,
    decision: 'conservar_revisada', reason: 'Enunciado, todas las opciones y clave contrastados; explicación actualizada.' });
}
function fix(i, objective, path, q, o, c, e) {
  batch100.push({ i, objective, r: `https://docs.snowflake.com/en/${path}`, q, o, c, n: c.length, e,
    decision: 'corregir', reason: 'Reformulado para corregir ambigüedad, alcance o terminología; clave y explicación contrastadas.' });
}
function archive(i, reason) { batch100.push({ i, decision: 'archivar', reason }); }

keep([5,22,111,161,202], '3.1', 'sql-reference/sql/copy-into-location',
  'COPY INTO a location can unload a table or SELECT query. Supported output formats are CSV, JSON and Parquet, with format-specific compression options. SINGLE=TRUE requests one output file. ORC, Avro and XML are not supported unload formats.');
keep([10,101,116], '1.5', 'user-guide/tables-clustering-micropartitions',
  'Snowflake automatically organizes loaded data into immutable micro-partitions and records their metadata. Clustering describes how values are distributed among them; no user-defined partition scheme is required. DML creates replacement micro-partitions rather than modifying existing ones in place.');
keep([13,49], '5.1', 'user-guide/object-clone',
  'Snowflake supports cloning tables, schemas, databases and named file formats, but not users or shares. Zero-copy clones are useful for development, testing and logical snapshots/backups. They initially share storage and are not independent disaster-recovery backups or a query-performance optimization.');
keep([18,123], '5.2', 'user-guide/data-sharing-reader-create',
  'The provider owns the reader account and is responsible for its credit charges. Consumers can extract shared data; reader accounts can unload to cloud storage with connection credentials, but cannot unload using a storage integration. Read-only access to shared objects does not mean free compute.');
keep([26,112,127], '1.4', 'user-guide/warehouses-tasks',
  'Warehouse size can be changed while running or suspended. AUTO_SUSPEND and AUTO_RESUME control idle suspension and restart when needed. Resizing a suspended warehouse changes its configuration without starting it. Local SSD size and a user-count setting are not independently configurable warehouse creation options.');
keep([33,69,107], '3.2', 'user-guide/data-load-snowpipe-intro',
  'File-based Snowpipe uses Snowflake-managed compute and tracks loaded files. REST-triggered loading supports internal and external stages; not all bulk COPY options are supported in a pipe. This is distinct from Snowpipe Streaming, which ingests rows.');
keep([35], '3.1', 'sql-reference/sql/copy-into-table',
  'A named file format is optional: COPY can use inline format options, a stage-associated format or applicable defaults. This does not mean every input format can be loaded correctly without configuring it.');
keep([52], '2.1', 'user-guide/network-policies',
  'Network policies are available across editions and can restrict access based on network identifiers, including IP addresses. They are not database settings activated with ALTER DATABASE. Modern network rules support more than just IP allowlists.');
keep([53], '5.2', 'user-guide/data-sharing-intro',
  'Creating a secure share does not incur a per-share creation fee. Consumers generally pay their own query compute, while reader-account compute is charged to its provider. Storage, replication and cross-region delivery can create separate costs.');
keep([55], '2.1', 'sql-reference/sql/drop-role',
  'On a successful DROP ROLE, ownership of its objects transfers to the executing role, not the user or automatically SYSADMIN. A role owning a shared database requires prior ownership transfer before it can be dropped.');
keep([62,141,148,179], '1.1', 'user-guide/intro-key-concepts',
  'Snowflake combines shared storage with independent compute clusters. Cloud services coordinate authentication, metadata and query parsing/optimization, including execution planning; virtual warehouses execute query operators. This is the multi-cluster shared-data architecture.');
keep([74], '3.2', 'sql-reference/sql/alter-pipe',
  'ALTER PIPE supports PIPE_EXECUTION_PAUSED to pause or resume pipe execution. A pipe does not require a dedicated user-managed warehouse.');
keep([77], '3.1', 'user-guide/data-load-overview',
  'Bulk COPY from internal or external stages, REST-triggered file Snowpipe, and Snowsight file loading are supported ingestion approaches. They have different automation, file and workload requirements.');
keep([79], '2.1', 'user-guide/security-mfa',
  'Snowflake MFA can protect password authentication without requiring SSO. SSO configuration and the choice of second-factor authentication are separate concerns.');
keep([84], '4.3', 'user-guide/warehouses-considerations',
  'Some queries can be satisfied from stored metadata without a running warehouse. This is not a promise that every aggregate is metadata-only; data-scanning queries require compute unless an eligible persisted result is reused.');
keep([86,95,97,138,159,168,176], '1.1', 'user-guide/intro-editions',
  'Standard includes Secure Data Sharing. Enterprise adds multi-cluster warehouses, extended Time Travel up to 90 days for eligible permanent objects, column-level security and materialized views. VPS provides dedicated metadata and compute resources. Extended retention does not apply to temporary or transient tables.');
keep([87,204], '1.2', 'user-guide/ui-snowsight-worksheets',
  'Snowsight worksheets have execution context such as role and warehouse and can be shared with teammates through worksheet sharing. Sharing worksheet text does not grant access to underlying data. No clone, Data Exchange or blanket database grant is required to share a worksheet.');
keep([88], '3.1', 'user-guide/querying-stage',
  'Snowflake can query supported staged data files directly using a stage reference and suitable file-format settings. Loading the files into a table first is not mandatory; this does not mean every arbitrary file type is directly queryable.');
keep([93,186], '1.5', 'user-guide/tables-clustering-keys',
  'Clustering keys can improve data organization for suitable very large tables, but have maintenance costs. Define them based on query patterns and measured benefit, not on every table by default. Micro-partitions are the storage units, not a user-defined clustering key.');
keep([100], '5.1', 'user-guide/data-time-travel',
  'DATA_RETENTION_TIME_IN_DAYS can be set at account, database, schema and table levels, with inheritance. Table is the most granular of the listed levels; allowed retention depends on edition and object type.');
keep([102], '2.3', 'user-guide/warehouses-considerations',
  'User-managed warehouse compute uses per-second billing with a minimum 60-second charge each time compute is provisioned, not a five-minute minimum.');
keep([108,134], '2.1', 'user-guide/admin-security-fed-auth-overview',
  'Federated authentication is supported across editions. With SAML SSO, the identity provider authenticates the user and sends an assertion; Snowflake does not import the user password from the identity provider. User provisioning is a separate concern.');
keep([126,189], '3.1', 'user-guide/data-load-considerations-prepare',
  'Snowflake recommends roughly 100–250 MB compressed files, or larger where appropriate, to balance parallelism and overhead. This is guidance, not a 16 MB input-file limit. Several suitably sized files allow parallel loading; they are not a guarantee of sequential load order.');
keep([128], '2.1', 'user-guide/security-access-control-configure',
  'Snowflake recommends a custom-role hierarchy ultimately assigned to SYSADMIN for object administration. Granting every new role directly to ACCOUNTADMIN is not the recommended default.');
keep([131], '5.2', 'user-guide/data-sharing-intro',
  'Secure shares can be created and managed through SQL or supported Snowsight sharing workflows. DATA_SHARE=TRUE is not the mechanism, and warehouses supply compute rather than manage shares.');
keep([143], '4.1', 'user-guide/performance-query-warehouse-memory',
  'Spilling to remote storage indicates intermediate data exceeded available memory and local spill capacity. An aggregate node, an expensive join or scanning all partitions does not alone prove memory exhaustion.');
keep([145], '3.1', 'user-guide/data-load-transform',
  'COPY-based load transformations, including those used by Snowpipe, can reorder or omit columns. The COPY transformation SELECT does not support arbitrary WHERE filtering or joins with other tables. Row access policies are not load transformations.');
keep([156], '2.2', 'user-guide/security-column-ext-token-intro',
  'External Tokenization substitutes tokens for sensitive values before loading and can integrate with masking policies for authorized detokenization. External tables, materialized views and UDTFs are not substitutes for this tokenization feature.');
keep([174], '1.3', 'developer-guide/stored-procedure/stored-procedures-rights',
  'Stored procedures may run with caller\'s or owner\'s rights. They can contain multiple statements and access multiple databases when privileges permit. SECURE does not hide a procedure from every user without exception.');
keep([183], '1.1', 'user-guide/intro-cloud-platforms',
  'Snowflake accounts can be hosted on AWS, Microsoft Azure or Google Cloud. Oracle Cloud and Alibaba Cloud are not listed Snowflake hosting platforms; a private virtual cloud is not a fourth cloud provider.');
keep([187], '4.1', 'sql-reference/sql/explain',
  'EXPLAIN compiles a statement to show its logical plan without executing the query. Query Profile supplies runtime information after execution. EXPLAIN does not expose actual elapsed times or runtime spill measurements.');
keep([188], '4.4', 'sql-reference/data-types-semistructured',
  'VARIANT, OBJECT and ARRAY are Snowflake semi-structured types. Of the offered options, VARIANT and ARRAY are valid. VARRAY, STRUCT and QUEUE are not the names of these Snowflake semi-structured types.');
keep([201], '1.4', 'user-guide/warehouses-multicluster',
  'Multi-cluster warehouses in auto-scale mode add or remove clusters within configured limits to address concurrency. Resizing primarily changes resources per cluster; it is not the same as adding clusters. Warehouse indexing is not a configuration feature.');

fix(1,'1.5','user-guide/tables-clustering-keys',
  'A very large table needs explicit column-based clustering to improve pruning for recurring filters. Which feature lets the owner specify those columns?',
  ['Micro-partitions','Clustering keys','Key partitions','Clustered partitions'],[1],
  'A clustering key specifies expressions used to organize table data. Snowflake still manages micro-partitions; this is not an override of an algorithm with user-written clustering code.');
fix(4,'2.1','user-guide/security-access-control-overview',
  'Which system role is dedicated to creating and managing users and roles?',
  ['SYSADMIN','USERADMIN','PUBLIC','ACCOUNTADMIN'],[1],
  'USERADMIN is the dedicated user/role administration role. SECURITYADMIN inherits its privileges and also manages grants. ACCOUNTADMIN has broader powers and is not the least-privilege choice for this task.');
fix(7,'1.2','user-guide/ui-snowsight-worksheets',
  'Does using Snowflake through a SQL client inherently prevent the same user from also using Snowsight?',
  ['Yes; support must switch the account to UI-only mode','No; multiple interfaces can be used, subject to authentication, policies and privileges'],[1],
  'Client choice does not exclusively bind an account to that interface. Authentication policies and privileges can still restrict access; switching interface does not bypass them.');
fix(9,'2.3','user-guide/warehouses-considerations',
  'For equal running time and the same warehouse type and generation, which changes directly affect warehouse compute credits? (Choose two.)',
  ['Changing the number of registered users without changing compute','Changing warehouse size','Changing stored data volume without changing compute','Changing the number of running clusters'],[1,3],
  'Warehouse size and active cluster count affect compute consumption. Runtime, type and generation also matter, so the question holds them constant. Users and data volume can influence workloads but are not direct warehouse billing units.');
fix(11,'3.1','sql-reference/sql/copy-into-table',
  'Must a COPY INTO table statement always contain an explicit FILE_FORMAT clause?',
  ['Yes','No'],[1],
  'COPY can inherit a file format from a stage or use defaults. A format definition appropriate to the data is still necessary for successful parsing; a named file-format object is not mandatory.');
fix(17,'1.4','user-guide/warehouses-considerations',
  'One complex query is limited by compute resources in an X-Small warehouse. Which change should be benchmarked to give that query more resources?',
  ['Add users to the warehouse','Increase only the maximum cluster count','Increase the query result retention period','Resize the warehouse to Medium'],[3],
  'Scaling up supplies more resources within a cluster and can help a resource-bound query. Scaling out primarily addresses concurrent queries. Benchmark because larger warehouses do not improve every query equally.');
fix(19,'2.1','user-guide/security-mfa',
  'Which listed interfaces support Snowflake MFA with supported client versions and compatible authentication methods? (Choose all five.)',
  ['JDBC','SnowSQL','Snowsight','ODBC','Snowflake Connector for Python'],[0,1,2,3,4],
  'All five support MFA. Client version, chosen method and authentication configuration matter; not every MFA method works with every driver. MFA authenticates identity and does not grant object privileges.');
fix(20,'2.3','user-guide/cost-understanding-data-storage',
  'Is there a separate storage-price premium solely because native table data is semi-structured rather than structured?',
  ['Yes','No'],[1],
  'Storage charges depend on stored volume and applicable rates, not a special semi-structured surcharge. Compression and representation can affect the bytes actually stored.');
fix(24,'5.1','user-guide/data-failsafe',
  'Can an administrator configure a shorter Fail-safe retention period for a permanent Snowflake table?',
  ['Yes, using DATA_RETENTION_TIME_IN_DAYS','No; the Fail-safe period is not configurable'],[1],
  'Fail-safe is a non-configurable seven-day recovery period managed by Snowflake. DATA_RETENTION_TIME_IN_DAYS controls Time Travel, not Fail-safe. Temporary and transient tables do not have Fail-safe.');
fix(27,'3.1','sql-reference/sql/put',
  'For an uncompressed file uploaded with PUT using default compression settings, which statements are true? (Choose two.)',
  ['PUT creates a named file format automatically','PUT automatically chooses the last-created stage','AUTO_COMPRESS defaults to TRUE and uses gzip','Files stored on the internal stage are encrypted'],[2,3],
  'PUT defaults AUTO_COMPRESS to TRUE for uncompressed input. Internal-stage files are encrypted. The stage must be specified, and PUT does not create a file-format object. Already-compressed input and non-default settings require separate consideration.');
fix(29,'1.4','user-guide/warehouses-tasks',
  'Which interfaces can create and manage virtual warehouses when the user has the required privileges? (Choose two.)',
  ['Snowsight','SQL warehouse commands','A data file format','A query result identifier'],[0,1],
  'Snowsight and SQL provide warehouse management. A third-party integration tool can do so only if it exposes or executes the relevant commands; this is not guaranteed for every integration tool.');
fix(30,'3.2','user-guide/data-load-snowpipe-manage',
  'What happens to the pipe-specific file load history when a pipe is recreated with CREATE OR REPLACE PIPE?',
  ['The history of the replaced pipe is removed','It is transferred automatically to every new pipe','All old files are permanently excluded from loading','A mandatory REFRESH=TRUE parameter preserves it'],[0],
  'Recreating a pipe removes its pipe-specific load history. Previously loaded files can consequently be loaded again if submitted or refreshed. This is distinct from the retention of account-level historical views.');
fix(34,'3.3','developer-guide/jdbc/jdbc',
  'A third-party Java tool supports JDBC but has no built-in Snowflake connection profile. Can it potentially connect to Snowflake?',
  ['Yes, if it can load and configure the Snowflake JDBC driver','Yes, using any unrelated database JDBC driver unchanged','No, only Snowflake-branded applications can connect','No, JDBC cannot query Snowflake'],[0],
  'A generic JDBC-capable tool can connect when it supports configuring the Snowflake driver. A compatible driver is still required; generic JDBC support alone does not make every database driver interchangeable.');
fix(37,'4.4','sql-reference/data-types-semistructured',
  'How does JSON null stored inside a VARIANT compare with SQL NULL?',
  ['They are distinct values with different semantics','They are always identical','JSON null cannot be represented in VARIANT','Both are always stored as the string null'],[0],
  'Snowflake distinguishes SQL NULL (missing/unknown SQL value) from a VARIANT value representing JSON null. The original question combined this fact with unconditional loading recommendations that depend on workload.');
fix(42,'1.5','user-guide/tables-clustering-micropartitions',
  'How is data in a standard native Snowflake table physically organized?',
  ['In automatically managed columnar micro-partitions','In user-defined fixed disk partitions','In an index that every table owner must manually create','Only in the local cache of one warehouse'],[0],
  'Native table data is stored in compressed columnar micro-partitions managed by Snowflake. The logical-versus-physical distinction in the original alternatives was ambiguous.');
fix(57,'4.4','sql-reference/sql/merge',
  'Which Snowflake SQL statement can update matching target rows and insert nonmatching rows from a source in one statement?',
  ['MERGE','A standalone UPSERT statement','SELECT','GRANT'],[0],
  'MERGE expresses matched updates/deletes and nonmatched inserts. Snowflake does not provide a standalone UPSERT statement with that name. The rewrite avoids mixing DDL/DML classifications for TRUNCATE.');
fix(76,'1.4','user-guide/warehouses-considerations',
  'Which situations can justify keeping a warehouse running rather than aggressively auto-suspending it? (Choose two.)',
  ['An idle warehouse with no expected work for days','A steady continuous workload','A latency-sensitive workload that should avoid resume delays','A requirement to avoid manual resumes when AUTO_RESUME is available'],[1,2],
  'Continuous work and sensitivity to restart latency can justify keeping compute active. Balance latency and cache reuse against idle credit costs. AUTO_RESUME already avoids manual startup.');
fix(89,'4.4','sql-reference/functions/flatten',
  'What does the FLATTEN table function do?',
  ['Expands compound ARRAY, OBJECT or VARIANT input into rows','Converts every relational table to CSV','Automatically reclusters a table','Makes all JSON field names case-insensitive'],[0],
  'FLATTEN expands compound values into a relational row set. It supports semi-structured inputs and supported structured ARRAY/OBJECT inputs; saying simply structured data can misleadingly imply any relational table.');
fix(106,'2.3','user-guide/cost-understanding-data-storage',
  'Who charges for the object storage holding files in an external stage?',
  ['The external cloud storage provider; merely defining the stage does not copy those files into Snowflake storage','Snowflake charges those external bytes as native internal-stage storage','No provider can charge for those files','Every external stage has a fixed Snowflake storage allocation'],[0],
  'External-stage files remain in the external cloud storage account. Internal-stage storage is stored within Snowflake and contributes to Snowflake storage usage. Access, compute and transfer costs are separate from this distinction.');
fix(115,'5.1','user-guide/data-failsafe',
  'What is the non-configurable Fail-safe period for historical data from eligible permanent Snowflake tables after Time Travel ends?',
  ['1 day','7 days','45 days','90 days'],[1],
  'Eligible permanent-table data has seven days of Fail-safe after Time Travel. Temporary and transient tables have no Fail-safe; 90 days refers to extended Time Travel for eligible objects, not Fail-safe.');
fix(117,'1.1','user-guide/intro-key-concepts',
  'Which tasks are handled by the Snowflake service rather than requiring customers to maintain an on-premises database installation? (Choose two.)',
  ['Choosing every business access policy automatically','Patching the database service software','Validating the business meaning of every record','Maintaining platform metadata and statistics'],[1,3],
  'Snowflake operates its database service and manages platform metadata. Customers remain responsible for business access choices and data meaning. The original options mixed cloud-provider physical responsibilities with Snowflake service responsibilities.');
fix(120,'1.4','user-guide/tasks-intro',
  'A user-managed task will call a stored procedure containing several SQL statements. What is a sound way to choose its warehouse size?',
  ['Always use the largest warehouse','Estimate only from the number of task definitions','Benchmark the procedure with representative data on candidate warehouse sizes','Assume every task must use a multi-cluster warehouse'],[2],
  'Test the complete task workload against its runtime and cost requirements. Warehouse sizing depends on the actual statements and data. Serverless tasks use a different compute-management model.');
fix(121,'2.3','sql-reference/account-usage/stage_storage_usage_history',
  'Which ACCOUNT_USAGE view reports historical storage usage for internal stages?',
  ['STAGE_STORAGE_USAGE_HISTORY','LOGIN_HISTORY','QUERY_ATTRIBUTION_HISTORY','WAREHOUSE_EVENTS_HISTORY'],[0],
  'STAGE_STORAGE_USAGE_HISTORY reports internal-stage storage usage. Login history, query compute attribution and warehouse events measure different activity. The original grouped Information Schema and Account Usage without distinguishing their views and scope.');
fix(122,'3.1','sql-reference/sql/copy-into-table',
  'For COPY INTO a table, what file-format type is used when neither the statement nor its stage supplies a different format?',
  ['CSV','JSON','Parquet','XML'],[0],
  'CSV is the default format type. An explicitly provided format or one associated with a stage can change it, so omitting a clause from the COPY statement alone does not always imply CSV.');
fix(135,'3.1','user-guide/data-load-considerations-prepare',
  'Which file-preparation choices generally support efficient and correct bulk loading? (Choose two.)',
  ['Use suitably sized compressed files, commonly around 100–250 MB or larger as appropriate','Put every workload into a single enormous file','Split very large inputs into multiple files to permit parallel loading','Always transfer files to a different cloud region first'],[0,2],
  'Balanced file sizes allow parallel processing while avoiding excessive small-file overhead. The recommended range is guidance. Delimiter-containing fields also require matching enclosure/escape settings, not an unconditional rule that either quote character works without configuration.');
fix(144,'4.2','user-guide/search-optimization-service',
  'Which workload is a typical candidate for search optimization?',
  ['Repeated highly selective equality lookups in a large table','A full-table aggregate with no selective filter','Every query containing OR, regardless of selectivity','A guarantee of speeding up all window functions'],[0],
  'Search optimization targets supported selective access patterns, including equality lookups. It also supports selected semi-structured predicates, so the original alternatives were not mutually exclusive. Benefit depends on predicate support, selectivity and cost.');
fix(146,'1.4','sql-reference/sql/create-warehouse',
  'Which settings are directly configurable properties of a virtual warehouse? (Choose two.)',
  ['AUTO_RESUME','AUTO_SUSPEND','A fixed number of user accounts stored in the warehouse','A manually chosen SSD model'],[0,1],
  'AUTO_RESUME and AUTO_SUSPEND are warehouse properties. Client-specific default warehouse settings are separate from warehouse creation properties; the original mixed these concepts.');
fix(165,'3.1','sql-reference/sql/get',
  'Which command downloads files from an internal Snowflake stage to the client local filesystem?',
  ['PUT','GET','COPY INTO a table','SELECT'],[1],
  'GET downloads from internal stages. PUT uploads to them; COPY INTO a table loads data. Downloading directly from external object storage uses the relevant cloud tools, so the stage type matters.');
fix(172,'4.3','user-guide/querying-persisted-results',
  'Which statement about persisted query results is correct?',
  ['RESULT_SCAN can expose an accessible previous query result as a table for further querying','Every user can read every other user\'s query results','Suspending a warehouse immediately deletes all persisted query results','USE_METADATA_CACHE must be enabled to use RESULT_SCAN'],[0],
  'RESULT_SCAN queries an eligible stored result subject to its access and retention rules. Persisted results are separate from warehouse-local data cache. The original mixed these caches with an undocumented universal eviction rule.');
fix(180,'3.1','sql-reference/sql/copy-into-location',
  'A team wants multiple unload jobs to reuse one centrally defined set of output-format options. Which approach fits?',
  ['Create a named file format and reference it from COPY INTO the output location','Set SINGLE=TRUE and omit all format settings','Avoid CAST even when conversion is required','Use OBJECT_CONSTRUCT(*) for every Parquet column'],[0],
  'A named file format allows reusable output-format configuration. It is optional rather than universally required; SINGLE controls output-file count, while casts and object construction depend on the desired output schema.');
fix(181,'3.2','user-guide/streams-intro',
  'Which operations consume a stream and advance its offset when the transaction commits? (Choose two.)',
  ['An UPDATE that uses the stream as its change-data source','A standalone SELECT from the stream','An INSERT INTO target SELECT ... FROM stream','BEGIN followed immediately by COMMIT without consuming the stream','SHOW STREAMS'],[0,2],
  'Committed DML using a stream as a source advances its offset. A standalone SELECT or an empty transaction does not. These alternatives describe operations rather than presenting invalid shorthand as executable SQL.');
fix(182,'3.1','sql-reference/sql/remove',
  'Which approaches can remove successfully loaded source files from a named internal stage? (Choose two.)',
  ['DROP the file-format object','Set TEMPORARY on the file format','Use COPY INTO the table with PURGE=TRUE','Run REMOVE against the staged files','Run DELETE LOAD HISTORY'],[2,3],
  'PURGE requests removal after successful loading; REMOVE explicitly deletes staged files. Check results when cleanup matters because successful loading does not guarantee every requested purge succeeded. Dropping a format does not remove files.');
fix(191,'3.1','sql-reference/sql/copy-into-location',
  'What is the documented default value of MAX_FILE_SIZE for COPY INTO a location?',
  ['5 MB','8 GB','16 MB (16777216 bytes)','32 MB'],[2],
  'The default parameter value is 16777216 bytes. It is a limit/target governing generated output files, not a guarantee that each actual file is exactly 16 MB; output depends on data, parallelism and other options.');
fix(193,'4.3','user-guide/intro-key-concepts',
  'Which architectural layer coordinates access and query processing when Snowflake can reuse a persisted query result?',
  ['A user-created index layer','A dedicated reader warehouse','The client\'s local disk','Cloud services'],[3],
  'Cloud services coordinate query processing and access checks. Reusing an eligible persisted result can avoid warehouse execution; the result itself should not be confused with metadata or warehouse-local cache.');
fix(200,'3.2','user-guide/data-load-snowpipe-intro',
  'For file-based Snowpipe, how long is pipe-specific file load history retained in pipe metadata?',
  ['1 day','7 days','14 days','64 days'],[2],
  'Pipe metadata retains Snowpipe file load history for 14 days. Other history surfaces, including Account Usage, have their own retention. The question concerns pipe-specific metadata rather than every Snowpipe history view.');

archive(25,'Trivia histórica sobre el origen del producto; la arquitectura actual ya se evalúa en preguntas más útiles.');
archive(39,'La unicidad global de identificadores y su uso con soporte no evalúa una habilidad prioritaria del temario; se conserva el original sin afirmar que la clave sea falsa.');
archive(46,'Navegación de la interfaz clásica: las opciones no representan una pregunta estable sobre Snowsight actual.');
archive(48,'Cadencia operativa de releases e interfaz de mantenimiento: retirar de evaluación para evitar memorizar detalles cambiantes ajenos a las habilidades principales.');
archive(56,'Ubicación histórica de descargas en la interfaz clásica; sustituida en la selección por preguntas de herramientas y conectividad.');
archive(94,'Repite la afirmación histórica de diseño cloud-native; el objetivo de arquitectura se cubre con preguntas funcionales.');
archive(119,'Comparación vaga de tiempos de aprovisionamiento sin condición medible; no aporta una decisión práctica y no garantiza comportamiento.');
