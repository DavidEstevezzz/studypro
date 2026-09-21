export const batch200 = [];
function keep(ids, objective, path, e) {
  for (const i of ids) batch200.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,
    decision:'conservar_revisada',reason:'Enunciado, opciones y clave contrastados; explicación actualizada.'});
}
function fix(i, objective, path, q, o, c, e) {
  batch200.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,
    decision:'corregir',reason:'Corregidos alcance, ambigüedad o contenido desactualizado; alternativas y explicación contrastadas.'});
}
function archive(i,reason){batch200.push({i,decision:'archivar',reason});}

keep([209],'1.4','user-guide/warehouses-multicluster','Auto-scale multi-cluster warehouses address fluctuating concurrency by changing the active cluster count within configured limits. They do not divide one slow query across multiple clusters.');
keep([211],'3.1','user-guide/data-load-overview','External stages can reference Amazon S3, Azure cloud storage and Google Cloud Storage. Docker is not a cloud object-storage service. IBM and Oracle are not the native stage providers listed here.');
keep([212,229],'4.2','user-guide/views-materialized','A materialized-view definition references one base table and cannot contain a JOIN. A query can join the materialized view to other objects, and supported aggregates are allowed. Base-table changes and maintaining clustering affect maintenance credits; querying frequency is not the direct refresh trigger.');
keep([214,225,283],'1.1','user-guide/intro-editions','Enterprise is the minimum edition for Dynamic Data Masking and row access policies. Automatic encryption and object-level access control are available in Standard; extended Time Travel and Tri-Secret Secure require higher editions.');
keep([222,344],'5.2','user-guide/data-sharing-intro','Direct Secure Data Sharing supports eligible tables, external tables, secure views and secure UDFs. It does not distribute a stored procedure, task or masking policy as a directly consumable shared object. Access can be revoked; consumers cannot clone a shared database or its shared tables.');
keep([230],'3.1','sql-reference/sql/copy-into-location','SINGLE=FALSE permits unloading into multiple files; SINGLE=TRUE requests one file. MULTIPLE is not a COPY unload option. Small results can still produce only one file when SINGLE is FALSE.');
keep([231],'5.1','sql-reference/sql/create-clone','Cloning does not rewrite fully qualified names embedded in view definitions or stored-procedure code. Explicit references to the source database therefore continue pointing there; review dependencies before treating a clone as isolated.');
keep([236],'5.1','user-guide/tables-temp-transient','Transient tables support at most one day of Time Travel and have no Fail-safe. A version from three days earlier cannot be recovered through those mechanisms. A separate previously created copy would be a different recovery source.');
keep([238,404],'5.1','user-guide/data-failsafe','Time Travel and Fail-safe retain historical data and can increase storage usage after data changes. Fail-safe applies to eligible permanent-table data; temporary and transient tables do not have it. Clones are explicitly created rather than automatically maintained recovery periods.');
keep([240,355],'1.3','sql-reference/external-functions-introduction','An external function is a UDF whose executable code runs outside Snowflake, normally accessed through a proxy service and API integration. Its Snowflake object stores connection metadata rather than the remote implementation. It returns one value per input row, not a table-function row set.');
keep([241],'2.1','user-guide/security-access-control-overview','Snowflake supports role-based access control and encrypts stored data and communications. A cloud IAM user is not mandatory for a Snowflake login. Snowflake is a managed service, not a database deployed in a customer-owned VPC; staged files need not all be compressed.');
keep([246],'4.4','sql-reference/data-types-semistructured','VARIANT and ARRAY are the offered semi-structured container types; OBJECT is another supported type. VARCHAR stores text, XML is an input format rather than a dedicated Snowflake SQL type, and BLOB is not one of these container types.');
keep([255],'1.5','sql-reference/sql/alter-table','The full syntax is ALTER TABLE <table_name> DROP CLUSTERING KEY. PURGE, DELETE and REMOVE CLUSTERING KEY are not the supported alternatives. Removing the key does not immediately rewrite existing micro-partitions.');
keep([258],'4.4','sql-reference/data-types-semistructured','VARIANT represents a JSON document while preserving native value types, including arrays, objects and scalars. A generic JSON document need not be an object. VARCHAR can store serialized text but is not the native semi-structured representation.');
keep([280],'2.1','user-guide/security-access-control-configure','Grant custom roles into a hierarchy ultimately assigned to SYSADMIN. This need not mean granting every leaf role directly to SYSADMIN. PUBLIC grants would expose privileges much more broadly; a name suffix supplies no security.');
keep([287],'1.5','user-guide/tables-auto-reclustering','Automatic Clustering reorganizes data according to the clustering key as needed without blocking concurrent DML. It creates replacement micro-partitions rather than sorting immutable partitions in place, and it is not a warehouse hash index.');
keep([289],'2.3','user-guide/resource-monitors','Resource monitors track user-managed warehouse credits and can notify or suspend at configured thresholds. They are not a hard real-time guarantee against any overrun and do not cover every serverless service.');
keep([300],'5.1','user-guide/data-time-travel','Standard Edition permits at most one day of Time Travel retention. The higher-edition maximum of 90 days is for eligible permanent objects, not temporary or transient tables.');
keep([302],'3.1','sql-reference/sql/copy-into-table','With unchanged original files and default COPY options, load metadata prevents reloading those files the next day. Newly added files are appended, including rows that describe updates; COPY does not automatically MERGE them by customer key. FORCE or changed files can alter deduplication behavior.');
keep([304],'3.3','sql-reference/functions/current_client','CURRENT_CLIENT() reports the invoking client version, or its JDBC/ODBC driver version when called through those drivers. CURRENT_VERSION() reports Snowflake service version, not the installed client driver.');
keep([310],'4.1','user-guide/tables-clustering-micropartitions','Micro-partition pruning skips partitions whose metadata shows they cannot contribute to the query. It is distinct from result reuse and does not deliberately return overlapping partitions.');
keep([311],'2.2','sql-reference/functions/get_ddl','GET_DDL returns a CREATE statement for a supported object such as a masking policy, subject to access requirements. SHOW lists policy metadata; DESCRIBE exposes properties rather than the full CREATE statement.');
keep([322],'5.2','user-guide/data-exchange','A Data Exchange supports private collaboration among invited member accounts. An account can publish some datasets and consume others. Membership does not remove Marketplace access, and the exchange does not make arbitrary non-Snowflake destinations into direct Snowflake consumers.');
keep([327],'2.3','user-guide/tables-auto-reclustering','Automatic Clustering and file-based Snowpipe use Snowflake-managed compute. Ordinary user-issued COPY and UPDATE workloads generally execute on a user-managed warehouse. The warehouse resizing operation is not a separate serverless workload.');
keep([340],'1.5','sql-reference/info-schema/views','IS_SECURE indicates whether a view is secure. CHECK_OPTION, IS_UPDATABLE and TABLE_NAME do not encode that security attribute. Object visibility still depends on privileges.');
keep([342],'2.1','sql-reference/sql/show-grants','SHOW GRANTS ON SCHEMA ANALYTICS_DW.MARKETING lists grants on that schema. TO USER lists role assignments to a user; OF ROLE lists who received a role, rather than grants on the schema.');
keep([347],'1.4','sql-reference/sql/alter-warehouse','WAIT_FOR_COMPLETION=TRUE causes the resizing command to wait until the warehouse size change completes before returning. It does not defer the change until queued/running queries finish, nor require suspension.');
keep([356],'2.1','user-guide/security-access-control-overview','Federated authentication, key-pair authentication and OAuth are authentication approaches. SCIM provisions users/groups, TLS protects communications, and OCSP checks certificate status; these are not alternative user-login methods.');
keep([358],'5.1','user-guide/account-replication-intro','Failover/failback across accounts requires Business Critical or higher. Database and share replication alone is available in lower editions too; replication and promotion for business continuity are different capabilities.');
keep([368],'2.2','sql-reference/account-usage/policy_references','MASKING_POLICIES describes masking-policy objects, while POLICY_REFERENCES lists policy associations. ACCESS_HISTORY can support auditing policy use during queries but is not the policy-definition inventory.');
keep([369],'3.1','user-guide/data-load-dirtables','A directory table stores file metadata as an implicit object layered on a stage. It has no independent grantable privileges, can be added during or after stage creation, and supports manual refresh.');
keep([371],'5.2','user-guide/data-sharing-reader-create','Providers create and manage reader accounts; SHOW MANAGED ACCOUNTS lists them. Readers cannot load their own datasets or perform general DML. The provider bears their warehouse credit charges.');
keep([376],'3.2','sql-reference/sql/create-pipe','A file-based pipe defines a COPY INTO table statement. It is not a task that invokes a stored procedure or arbitrary INSERT. Supported COPY transformations can contain supported expressions; that does not change the pipe body into a general UDF call.');
keep([378],'3.1','sql-reference/sql/create-file-format','JSON, Avro and Parquet are supported semi-structured loading formats. PDF and JPEG are unstructured documents/images, not formats parsed into table rows by ordinary COPY; TSV is delimited text.');
keep([388],'3.1','user-guide/unstructured-intro','A pre-signed URL provides temporary access without a separate Snowflake login or authorization header for its holder. The URL itself contains authorization material, so it must be handled as a sensitive bearer link until it expires.');
keep([389],'2.3','sql-reference/account-usage/query_history','SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY retains query history for up to 365 days, making it suitable for a query from 90 days ago. Information Schema query-history functions have a much shorter window. There is no QUERY_HISTORY_ARCHIVE view as offered here.');
keep([401],'2.1','user-guide/network-policies','Network policies can be assigned at account and user levels, among other supported integration contexts. They are not assigned to roles, databases or warehouses; user policies can override account-level policy for that user.');
keep([407],'4.1','sql-reference/parameters','STATEMENT_QUEUED_TIMEOUT_IN_SECONDS controls how long a statement can wait in a warehouse queue. MAX_CONCURRENCY_LEVEL affects admission/concurrency, while STATEMENT_TIMEOUT_IN_SECONDS limits broader statement duration.');
keep([414],'4.2','user-guide/search-optimization-service','Search optimization is intended for supported highly selective access patterns such as point lookups. Table size alone or selecting a few columns does not guarantee benefit; frequent DML can add maintenance cost.');
keep([416],'3.3','user-guide/snowcd','SnowCD is the Snowflake connectivity diagnostic tool. It checks network access to endpoints required by Snowflake; SQL clients and UI names are not substitutes for this specific diagnostic purpose.');
keep([419],'1.5','user-guide/tables-clustering-micropartitions','Snowflake automatically creates micro-partitions as data is loaded. Users do not specify a partition scheme or disable micro-partitioning. Data distribution can affect pruning, but automatic partitioning itself is not a promise of ideal clustering.');
keep([420],'2.1','user-guide/security-access-control-overview','ACCOUNTADMIN inherits broad user-administration privileges, including SHOW, DESCRIBE, ALTER and DROP user operations. DEFINE, INDEX, MODIFY USER and DELETE USER are not the listed management syntax. Prefer a narrower administration role for ordinary user management.');
keep([429],'1.5','user-guide/views-materialized','Secure views and materialized views are supported Snowflake view features. Layered and embedded are not formal view types; an external table is a separate object type rather than the offered external view.');
keep([431],'1.3','developer-guide/udf/udf-overview','JavaScript and SQL are the supported UDF handler languages among these choices. Snowflake also supports Java, Python and Scala handlers; Ruby, Perl and C# are not native handler choices in this list. Remote external-function implementations are a separate matter.');
keep([433],'1.4','user-guide/warehouses-tasks','A warehouse can be resized while running or suspended. Already executing queries do not migrate to larger resources as a result; the new capacity primarily benefits queued/new work once provisioned.');
keep([436],'3.1','user-guide/data-load-overview','COPY INTO a table is the normal bulk-loading approach for a batch of files already staged in cloud storage. Snowpipe targets continuous file ingestion; external tables expose external data rather than bulk-loading it into a native table.');
keep([451],'4.1','user-guide/ui-snowsight-activity','Query Profile visualizes the operators and their execution statistics for a query. It is not capped at 100 queries per week and is distinct from account-wide query-cost attribution. Programmatic operator statistics do not make the UI itself the claimed generic profiler API.');

fix(205,'2.2','sql-reference/sql/alter-table','How can an existing row access policy be attached to a table? (Choose two.)',
 ['Define only the policy without modifying the table','Specify WITH ROW ACCESS POLICY in CREATE TABLE','Use a future APPLY grant to attach it automatically','Insert the table name into a mapping table','Use ALTER TABLE ... ADD ROW ACCESS POLICY ... ON (...)'],[1,4],
 'A policy can be attached when the table is created or using ALTER TABLE afterward. Defining a policy, granting APPLY or populating a mapping table does not by itself attach it. The original ALTER syntax omitted the object.');
fix(206,'3.1','sql-reference/sql/put','Which SQL command uploads local client files to an internal Snowflake stage?',
 ['JOIN','COPY INTO a table','PUT','GET'],[2], 'PUT uploads local files to internal stages; GET downloads them. COPY INTO a location can unload query data to a stage, so the local-file source is essential to avoid ambiguity.');
fix(210,'5.1','user-guide/account-replication-considerations','What should be expected when a cloned table is replicated into a secondary database?',
 ['Its physical data is replicated and can increase storage usage in the target account','Only a cross-region pointer is created, with no target data storage','Replication of every cloned table fails','The consumer can modify the secondary table directly before promotion'],[0],
 'A local zero-copy clone shares storage, but replication of that clone also replicates physical data to the destination. Secondary data is read-only until an applicable promotion. The original choose-two omitted another true read-only alternative.');
fix(215,'1.1','user-guide/intro-key-concepts','Which responsibilities belong to Snowflake cloud services? (Choose two.)',
 ['Scanning table data in a warehouse execution operator','Executing a warehouse join operator','Authentication','Persisting table micro-partition bytes in the storage layer','Metadata management'],[2,4],
 'Cloud services coordinate authentication and metadata, along with planning and infrastructure management. Warehouse operators execute scans/joins, and the storage layer persists table data. The original compute-resources alternative could also describe cloud-services coordination.');
fix(228,'5.3','collaboration/collaboration-listings-about','A consumer obtains a data listing delivered through Secure Data Sharing in the same region. Which statement best describes access?',
 ['The consumer can query the shared data without first importing a separate copy','The consumer must always upload the provider data again','The consumer receives permanent write access to provider tables','Every listing requires a transformation job before any query'],[0],
 'Same-region Secure Data Sharing provides access without copying the shared dataset into consumer-owned storage. Listings in other regions can involve auto-fulfillment replication; freshness and personalized offerings depend on the provider.');
fix(237,'1.4','user-guide/warehouses-multicluster','A warehouse queues many independent concurrent queries. Which approaches directly provide more independent compute capacity? (Choose two.)',
 ['Enable appropriate multi-cluster scale-out','Increase only Time Travel retention','Restart the same warehouse repeatedly','Move part of the workload to a separate warehouse','Grant more users the same warehouse role'],[0,3],
 'Additional clusters or separate warehouses spread concurrent work. Scaling up can sometimes shorten queries and reduce queues too, so the original wording did not exclude that plausible alternative.');
fix(245,'3.2','user-guide/tasks-intro','Which description of a Snowflake task body is accurate?',
 ['It must be invoked with CALL TASK','It can only contain a SELECT','It can execute a SQL statement, including a procedure call or a Snowflake Scripting block','It cannot be scheduled'],[2],
 'Tasks execute SQL on a schedule or trigger. A procedure call or scripting block can perform multiple operations; EXECUTE TASK is the manual execution command, while CALL invokes procedures.');
fix(252,'1.4','user-guide/warehouses-tasks','Which compute component lets a customer directly choose warehouse size and auto-suspend behavior?',
 ['The storage micro-partition format','The global cloud-services scheduler','A virtual warehouse','The cloud provider physical host model'],[2],
 'Customers configure virtual warehouses for query processing. The original implied no storage or cloud-services settings exist, which is too broad; the rewrite identifies the actual configurable compute properties.');
fix(257,'2.1','user-guide/security-mfa','Which statement accurately describes Snowflake MFA enrollment?',
 ['It grants all privileges of the ACCOUNTADMIN role','Every user automatically has a usable second factor without enrollment','Only support can register a user second factor','MFA is built in, and enrollment/configuration is distinct from enforcement rules'],[3],
 'Snowflake integrates MFA, but a supported second factor must be configured. Enforcement can require enrollment; this does not mean every account user already has an enrolled factor or that MFA grants database privileges.');
fix(261,'1.1','user-guide/intro-key-concepts','Which responsibility belongs to Snowflake virtual warehouses?',
 ['Maintaining the physical cloud infrastructure','Maintaining account-wide object metadata','Executing queries that require warehouse compute','Parsing and optimizing query plans in cloud services','Permanently storing native table data'],[2],
 'Virtual warehouses execute query operators. Cloud services manage planning/metadata and the storage layer holds persistent table data. The rewrite also removes damaged punctuation from the original.');
fix(265,'4.1','user-guide/performance-query-warehouse-memory','Which Query Profile symptom suggests that more warehouse memory or a query rewrite could improve performance?',
 ['Many filter nodes by itself','Spilling intermediate data to remote storage','A large row count by itself','Scanning every partition by itself'],[1],
 'Remote spilling indicates memory pressure after local spill capacity is exceeded. It is a diagnostic signal, not proof that resizing alone is the right fix; reducing intermediate results can also help.');
fix(266,'5.1','user-guide/data-time-travel','What is the standard default Time Travel retention for a newly created native table when no explicit or inherited setting overrides it?',
 ['1 day','7 days','45 days','90 days'],[0], 'The default is one day. Account/database/schema settings can be inherited, and zero retention is possible; seven days is the separate Fail-safe period for eligible permanent data.');
fix(267,'3.1','user-guide/data-load-considerations-prepare','Which preparations generally help efficient bulk loading? (Choose two.)',
 ['Make every file smaller than 25 MB','Remove all timestamps','Use roughly 100–250 MB compressed files or larger where appropriate','Use numeric text compatible with the chosen parsing format, avoiding unhandled thousands separators','Remove all semi-structured values'],[2,3],
 'File sizing supports parallelism; the range refers to compressed size and is guidance. Numeric formatting must match parsing rules. Dates and semi-structured data are supported and need not be removed.');
fix(275,'3.1','sql-reference/sql/copy-into-table','Which COPY INTO table use is not supported with VALIDATION_MODE?',
 ['Validating ordinary staged CSV rows','Checking for parsing errors','Returning sample validated rows','Using a SELECT transformation in the COPY statement'],[3],
 'VALIDATION_MODE does not support COPY statements that transform data. It validates file parsing/loading, not business-key uniqueness; duplicate input values alone are not a validation error.');
fix(282,'4.1','user-guide/performance-query-warehouse-memory','Which metric specifically indicates intermediate results spilled beyond local warehouse storage?',
 ['Bytes sent over the network','Synchronization time','Initialization time','Bytes spilled to remote storage'],[3],
 'Remote spill is distinct from ordinary network traffic or initialization. Investigate memory demand and query shape before deciding whether to resize.');
fix(284,'3.1','sql-reference/sql/put','Can SnowSQL execute PUT to upload a local file to an internal stage?',
 ['Yes, with suitable authentication and stage privileges','No, PUT is only a worksheet command'],[0],
 'SnowSQL supports PUT, as do other supported clients. The original single-choice comparison with drivers was not a stable way to imply exclusivity; browser upload workflows are also distinct from SQL PUT.');
fix(290,'5.1','user-guide/account-replication-intro','Which combination supports business continuity through a secondary Snowflake account?',
 ['Replication plus appropriately configured failover/failback capabilities','Time Travel alone moves an account to a different region','Fail-safe gives consumers direct access to a writable secondary account','Cloning alone automatically promotes a different account'],[0],
 'Replication maintains secondary copies; failover/failback enables promotion and recovery workflows and has edition requirements. Time Travel and Fail-safe are distinct recovery mechanisms, not cross-account promotion.');
fix(293,'4.3','user-guide/querying-persisted-results','With unchanged data and privileges, which change prevents direct reuse of the exact previously persisted query result?',
 ['Removing a selected column so the query text changes','Suspending the warehouse after the original query','Reusing the result before its retention expires','Keeping the same query and eligible settings'],[0],
 'Persisted-result reuse requires matching query text and other eligibility conditions. Suspension clears warehouse-local data cache, not persisted results. RESULT_SCAN is a separate way to query an existing result; RESULTS_SCAN is not its name.');
fix(295,'4.4','sql-reference/data-types-geospatial','Which are Snowflake dedicated geospatial SQL data types? (Choose two.)',
 ['VARIANT','OBJECT','GEOMETRY','GEOGRAPHY'],[2,3],
 'GEOGRAPHY models spherical Earth coordinates; GEOMETRY models a planar system. VARIANT and OBJECT may contain a GeoJSON representation but are not dedicated geospatial types, which was ambiguous in the original.');
fix(296,'1.4','user-guide/warehouses-multicluster','A single-cluster warehouse has reached its query concurrency capacity and no additional cluster can start. What normally happens to new warehouse queries?',
 ['Every running query terminates','A new cluster always starts regardless of configuration','The busy warehouse suspends itself','They queue until admitted or until an applicable timeout/cancellation'],[3],
 'Queries can queue when capacity is exhausted. Auto-scale can add clusters only when configured and within limits; timeout and cancellation can end the wait.');
fix(298,'2.3','user-guide/resource-monitors','Which threshold actions can a resource monitor perform? (Choose three.)',
 ['Increase the warehouse size','Notify','Notify and suspend after running statements finish','Delete the warehouse','Notify and suspend immediately, cancelling running statements'],[1,2,4],
 'Resource monitors support notifications, suspension and immediate suspension. The original omitted SUSPEND_IMMEDIATE from its correct key despite offering it as an alternative.');
fix(305,'4.2','user-guide/tables-clustering-keys','A large native analytical table has poor pruning for recurring selective filters. Which technique can improve data organization for those filters?',
 ['Define a suitable clustering key after measuring benefit','Add INDEX_HINTS to every query','Manually fragment warehouse disks','Assume any table needs a user-created index'],[0],
 'A clustering key can improve pruning for a suitable workload, with maintenance cost. The original broad indexing distractor ignored that some Snowflake table types have distinct indexing capabilities.');
fix(307,'4.4','sql-reference/session-variables','Which prefix references a SQL session variable previously assigned with SET?',
 ['@','&','$','#'],[2], 'SQL session variables use $, for example SELECT $my_var. @ denotes a stage reference. Snowflake Scripting local variables and bind syntax have different rules, so not all variables use the same prefix.');
fix(326,'2.3','user-guide/cost-understanding-data-transfer','Which operation can incur Snowflake data-transfer egress charges?',
 ['Direct secure sharing within one region','Merely defining a view','Replicating database data to an account in a different region','Only creating an empty warehouse'],[2],
 'Cross-region or cross-cloud data transfer can incur egress charges. Replication is not unconditionally charged for egress regardless of location; same-region transfer is treated differently.');
fix(334,'3.2','user-guide/data-load-snowpipe-auto','Which object defines the COPY load for file-based Snowpipe auto-ingest when cloud notifications are configured?',
 ['A pipe','An external stage alone','A stream alone','A file format alone'],[0],
 'The pipe defines the load. Auto-ingest additionally requires the supported notification configuration; creating a stage or pipe alone does not guarantee immediate ingestion.');
fix(349,'4.3','user-guide/querying-persisted-results','Which statement correctly distinguishes persisted query results from ordinary views?',
 ['Persisted results are retained for eligible reuse, while a standard view stores a query definition rather than its own result data','Every standard view permanently stores its result rows','Persisted query results exist only on client disks','Suspending a warehouse deletes all persisted results'],[0],
 'Persisted results and standard view definitions are separate concepts. Materialized views do store maintained results; secure is a security property rather than a universal rule about materialization.');
fix(351,'2.3','user-guide/warehouses-considerations','Which operations ordinarily use user-managed warehouse compute when no persisted result can be reused? (Choose two.)',
 ['A metadata-only SHOW command','An EXPLAIN that compiles but does not execute a query','Creating a zero-copy database clone','Executing a SELECT that scans native table data','Executing a bulk COPY INTO table directly as a user statement'],[3,4],
 'Data-scanning queries and direct bulk COPY use warehouse compute. Snowpipe uses managed compute, so not every operation containing COPY should be categorized identically. EXPLAIN can incur cloud-services work without warehouse execution.');
fix(353,'4.3','user-guide/performance-query-warehouse-cache','What does a warehouse data cache retain for possible use by later queries?',
 ['All account data regardless of access','Table data read by that warehouse while processing queries','Only the SQL query text','Every other warehouse\'s local cache'],[1],
 'Warehouse-local cache retains accessed table data and can reduce subsequent remote reads. It is not the persisted query-result cache, and suspension loses it. The original claimed a precise column granularity without context.');
fix(357,'1.4','user-guide/warehouses-multicluster','Under the Standard multi-cluster scaling policy, when can Snowflake shut down a cluster?',
 ['After sustained low load, when work can fit in fewer clusters and running queries on the selected cluster finish','Exactly after every second query','Only after manually suspending the entire warehouse','Always immediately, cancelling every query on the cluster'],[0],
 'Standard scales down after sustained low load by selecting least-loaded clusters and allowing their running queries to finish. The current documentation no longer defines the old fixed two-to-three-check rule used in the original.');
fix(359,'3.2','user-guide/tasks-intro','A scheduled task needs to execute several related SQL operations. Which task body is a valid approach?',
 ['A call to a stored procedure that executes those operations','Several independent SQL statements without a block or procedure wrapper','A SELECT that automatically invokes every task in the account','A mandatory one-DML-statement-per-procedure design'],[0],
 'A task can call a multi-statement stored procedure; a Snowflake Scripting block is another supported approach. Task graphs express dependencies rather than relying on the original invented control-task syntax.');
fix(366,'2.1','user-guide/network-policies','Which system roles have CREATE NETWORK POLICY authority through the default role hierarchy? (Choose two.)',
 ['ROLEADMIN','ACCOUNTADMIN','SYSADMIN','SECURITYADMIN','USERADMIN'],[1,3],
 'SECURITYADMIN and ACCOUNTADMIN hold this authority by default. A custom role can receive CREATE NETWORK POLICY too. Creating a policy and assigning it to a user are distinct privilege checks; there is no separate user-level policy object type.');
fix(373,'5.2','user-guide/data-sharing-intro','Which directly consumable data or function objects can be included in a secure share? (Choose three.)',
 ['Account roles','Warehouses','Secure views','Stored procedures','Tables','Secure UDFs'],[2,4,5],
 'Eligible tables, secure views and secure UDFs support direct sharing. Database/schema USAGE grants provide namespace access; that does not make schema itself the data payload. Native Apps can package additional application logic separately.');
fix(379,'5.2','user-guide/data-sharing-reader-create','Which statements about reader accounts and direct sharing are true? (Choose two.)',
 ['Every future provider object is automatically shared','Consumers can write directly into the imported shared database','Providers create their reader accounts','Imported shared databases are read-only to consumers','Reader users pay warehouse charges through their own separate Snowflake contracts'],[2,3],
 'Providers create reader accounts and pay the associated credit charges. Shared data is read-only to consumers; providers explicitly control shared objects. The original charging alternative did not distinguish usage incurred from who pays.');
fix(381,'1.1','user-guide/intro-key-concepts','Which activities are coordinated in the cloud services layer? (Choose two.)',
 ['Executing table-scan operators in a warehouse','Persisting native table micro-partitions','Storing Fail-safe historical table bytes','Query parsing and optimization','Authentication and access control'],[3,4],
 'Cloud services coordinate planning and access control. Warehouses execute scans, and storage retains data. The original security and authentication alternatives substantially overlapped.');
fix(386,'3.2','user-guide/data-load-snowpipe-intro','Does the 14-day history retained in pipe metadata mean every Snowpipe history view has only 14 days of history?',
 ['Yes; all history surfaces have identical retention','No; pipe metadata and historical views have distinct retention windows'],[1],
 'Fourteen days describes the file-load history held in pipe metadata. Other history surfaces can retain records longer. The rewrite adds a useful distinction rather than repeating ID 200.');
fix(423,'3.1','sql-reference/sql/copy-into-table','Which are valid values for COPY INTO table VALIDATION_MODE? (Choose two.)',
 ['TRUE','RETURN_ERROR_SUM','RETURN_ALL_ERRORS','RETURN_10_ROWS','RETURN_FIRST__ERRORS'],[2,3],
 'RETURN_ALL_ERRORS is a supported mode and RETURN_10_ROWS is a concrete instance of RETURN_n_ROWS. RETURN_ERRORS is also supported but is not listed. The original RETURN_N_ROWS was a syntax placeholder, not a literal numeric value.');
fix(427,'3.1','sql-reference/sql/list','Which command lists files present in a stage after an unload?',
 ['LIST @file_stage','SHOW @file_stage','VIEW @file_stage','VERIFY @file_stage'],[0],
 'LIST enumerates staged files and metadata. It does not validate the rows or business correctness inside those files; use an appropriate query or validation workflow for content checks.');
fix(437,'3.1','sql-reference/sql/create-file-format','What is the default ENCODING value for a CSV file format?',
 ['UTF-16','ASCII only','ISO-8859-1','UTF8'],[3],
 'UTF8 is the default CSV character encoding. Delimiter, encoding and input-file format are different settings; the original alternatives included an ambiguous claim about direct loading.');
fix(438,'4.4','developer-guide/snowflake-scripting/blocks','What distinguishes an anonymous Snowflake Scripting block from a stored procedure?',
 ['It must first be registered under a procedure name','It can be executed as a block without creating a named stored-procedure object','It must be submitted using a SUBMIT command','It cannot contain SQL statements'],[1],
 'An anonymous block can execute without CREATE PROCEDURE. Client-specific execution may use EXECUTE IMMEDIATE with a quoted block; CALL is for a named procedure.');
fix(443,'4.1','user-guide/tables-clustering-micropartitions','For a native table scan, Partitions scanned is lower than Partitions total. What can you conclude?',
 ['At least some partitions were pruned','The query is necessarily optimally tuned','No partitions were skipped','The result cache must have served the whole query'],[0],
 'Scanning fewer partitions demonstrates pruning, but not necessarily efficient or optimal pruning for the predicate. Compare selectivity and query context rather than labeling any reduction ideal.');
fix(444,'4.2','user-guide/tables-clustering-keys','Which clustering metric helps assess overlap among micro-partitions for candidate clustering columns?',
 ['User count','Clustering depth','Warehouse billing ratio','Number of roles'],[1],
 'Clustering depth describes overlap and can inform clustering decisions. A deep table alone does not justify a key: query filters, selectivity, table size and maintenance costs also matter.');
fix(446,'1.2','user-guide/ui-snowsight-worksheets','Does sharing a Snowsight worksheet automatically grant recipients access to its underlying database objects?',
 ['Yes; worksheet sharing bypasses role privileges','No; recipients still need the appropriate execution context and object privileges'],[1],
 'Worksheet sharing controls collaboration on the worksheet, not independent database authorization. The original alternatives mixed role requirements with other true collaboration features.');
fix(450,'2.3','sql-reference/account-usage/warehouse_metering_history','Which ACCOUNT_USAGE view reports hourly warehouse credit usage?',
 ['AUTOMATIC_CLUSTERING_HISTORY','MATERIALIZED_VIEW_REFRESH_HISTORY','WAREHOUSE_LOAD_HISTORY','WAREHOUSE_METERING_HISTORY'],[3],
 'WAREHOUSE_METERING_HISTORY reports warehouse credits. Load history reports warehouse activity/load, not metered credits. The older Information Schema metering function is generally deprecated in favor of this view.');

fix(346,'3.1','user-guide/data-load-considerations-load','A daily bulk load should scan only one date partition of a large external stage. Which organization helps target the relevant files?',
 ['Use logical date-based paths and load from the corresponding prefix','Put every historical file into one flat path and always scan it','Combine all dates into one enormous file','Assume the external stage maintains a warehouse data cache'],[0],
 'Logical paths let COPY target relevant subsets. Performance still depends on file size, count and compute; regex matching is available but need not be the most efficient way to restrict a very large file set.');
archive(382,'Repite la responsabilidad de ejecución de warehouses ya corregida en el ID 261; se conserva el original.');
archive(418,'Repite los métodos de gestión de shares ya contrastados en el ID 131, sin aportar un escenario nuevo.');
archive(442,'Trivia sobre tipos de gráficos de una interfaz cambiante; se retira del simulacro y se conserva el original.');
