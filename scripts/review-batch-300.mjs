export const batch300 = [];
function keep(ids, objective, path, e) {
  for (const i of ids) batch300.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,
    decision:'conservar_revisada',reason:'Enunciado, alternativas y clave contrastados; explicación actualizada.'});
}
function fix(i, objective, path, q, o, c, e) {
  batch300.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,
    decision:'corregir',reason:'Reformulado para corregir alcance, ambigüedad o datos desactualizados; respuesta contrastada.'});
}
function archive(i,reason){batch300.push({i,decision:'archivar',reason});}

keep([458],'4.4','sql-reference/data-types-semistructured','VARIANT and GEOGRAPHY are valid Snowflake SQL types. JSON is an input format rather than a dedicated type named JSON; BLOB and CLOB are not Snowflake SQL type names.');
keep([463,598],'1.5','user-guide/tables-clustering-micropartitions','Snowflake automatically creates micro-partitions. Within them, data is organized and compressed by column; the service chooses suitable compression. There is no requirement to issue PARTITION BY or to specify GZIP for every stored column.');
keep([465],'2.3','user-guide/resource-monitors','MONITOR permits viewing a resource monitor and MODIFY permits changing its properties, subject to the relevant role grants. These are the object privileges, not generic ALTER or DROP privileges.');
keep([469],'3.1','sql-reference/sql/create-file-format','ORC and XML are supported semi-structured input formats among these choices. CSV is supported delimited text, while EDI and HTML are not corresponding built-in semi-structured COPY file formats.');
keep([477],'1.2','user-guide/snowsql','SnowSQL is the command-line SQL client built on the Python connector. It is distinct from Snowsight, the SQL language itself and Snowpark. Snowflake CLI is a separate newer command-line tool with broader developer workflows.');
keep([482],'2.3','user-guide/warehouses-considerations','Provisioning user-managed warehouse compute incurs a minimum 60-second billing period, followed by per-second billing. Suspending after 30 seconds therefore does not reduce this start to a 30-second charge.');
keep([483,652],'1.3','developer-guide/stored-procedure/stored-procedures-rights','A caller-rights procedure runs with caller privileges and can access the caller session context, including session variables. Owner-rights execution has different context restrictions and can delegate privileges. STRICT controls null-input handling, not session-variable access.');
keep([485],'4.4','user-guide/querying-approximate-cardinality','HyperLogLog estimates distinct cardinality efficiently for large datasets when approximation is acceptable. It does not provide an exact distinct count; hashing with MD5 alone is not a cardinality estimator.');
keep([486],'2.2','sql-reference/sql/alter-tag','ALTER TAG modifies tag properties and DROP TAG removes a tag. Privileges are granted on tags to roles or users as supported, not to a tag as a security principal. DESCRIBE TAG is not the corresponding documented tag-management statement.');
keep([491],'3.1','sql-reference/sql/copy-into-table','COPY INTO mytable FROM @my_int_stage loads staged files into the table. PURGE_MODE and VALIDATION are not the named options shown; VALIDATION_MODE checks files rather than loading rows.');
keep([496],'2.3','user-guide/warehouses-tasks','MONITOR on the warehouse allows monitoring its activity and load. MODIFY changes properties, OPERATE controls operation and USAGE allows warehouse use; they are not substitutes for the stated monitoring privilege.');
keep([510],'3.1','user-guide/data-load-considerations-load','PATTERN applies a regular expression to staged file paths and can be slow over a very large file set. Narrow prefixes or explicit file lists can reduce work. File format remains necessary for parsing and VALIDATION_MODE changes the purpose of the operation.');
keep([513,569,585,631,649],'3.1','user-guide/data-load-dirtables-query','SELECT * FROM DIRECTORY(@stage_name) reads enabled directory metadata. Columns include RELATIVE_PATH, LAST_MODIFIED and FILE_URL. FILE_URL is a Snowflake file URL, not automatically a pre-signed or scoped URL. LIST and METADATA$FILENAME do not provide the same directory-table result.');
keep([517],'3.1','user-guide/data-unload-considerations','OBJECT_CONSTRUCT can turn relational columns into an OBJECT value for a JSON unload SELECT. PARSE_JSON parses existing JSON text; it does not construct a full object from arbitrary relational columns. BUILD_STAGE_FILE_URL constructs a URL, not JSON data.');
keep([521],'2.1','sql-reference/functions/rest_event_history','REST_EVENT_HISTORY returns SCIM REST API request history for a specified interval. ACCESS_HISTORY concerns data/object access, QUERY_HISTORY concerns SQL execution and LOAD_HISTORY concerns data loading.');
keep([541],'2.1','user-guide/security-mfa','With supported MFA token caching configured, a cached token is valid for up to four hours. It may become invalid sooner under documented conditions. This is not an unconditional four-hour session lifetime or permission to bypass the authentication policy.');
keep([552],'4.4','sql-reference/data-types-numeric','DOUBLE, DOUBLE PRECISION and REAL are synonyms of FLOAT. DECIMAL, NUMBER and NUMERIC are fixed-point numeric types. FLOAT synonyms do not make binary floating-point arithmetic exact for decimal values.');
keep([556],'3.1','sql-reference/sql/create-file-format','For JSON input, STRIP_OUTER_ARRAY=TRUE removes the top-level array wrapper so its elements can load as separate rows. STRIP_OUTER_ELEMENT pertains to XML, and byte-order-mark handling is unrelated to array expansion.');
keep([562],'2.1','user-guide/security-access-control-overview','Roles can receive and lose object privileges and can be granted to other roles to form a hierarchy. System-defined roles cannot be dropped, and Snowflake-provided grants to those roles cannot be revoked like ordinary custom grants.');
keep([564],'2.1','user-guide/security-access-control-overview','Managed access schemas centralize grant decisions with the schema owner or a role holding MANAGE GRANTS. They do not require identical grants on every object or mandatory masking/row policies, and do not automatically audit every operation.');
keep([567],'2.1','sql-reference/sql/grant-privilege','MANAGE GRANTS is a global account privilege. It permits grant management according to Snowflake rules; it is not granted separately on a table, schema or database.');
keep([577],'2.2','user-guide/security-column-intro','Dynamic Data Masking and External Tokenization are column-level security features. Row access policies filter rows, key-pair authentication authenticates users and continuous data protection concerns recovery.');
keep([578],'1.3','developer-guide/udf/udf-overview','JavaScript and Python are supported native UDF handler languages among the offered choices. SQL, Java and Scala are supported too, but are not listed. External-function remote services are a separate execution mechanism.');
keep([581],'1.1','user-guide/intro-editions','Virtual Private Snowflake is the edition described as offering the highest level of isolation/security for the strictest organizational requirements. This positioning does not mean lower editions lack encryption or access control.');
keep([584,634,644],'3.1','sql-reference/sql/copy-into-location','COPY INTO a location unloads table/query data to an internal or external stage or a supported cloud location. By default it permits multiple files for parallel processing. GET downloads internal-stage files to a client; PUT uploads local files. A local intermediate transfer is not required to unload to cloud storage.');
keep([587],'3.1','sql-reference/sql/copy-into-table','FORCE=TRUE reloads eligible source files regardless of recorded load status and can duplicate data. LOAD_UNCERTAIN_FILES targets files whose load status is uncertain rather than overriding all deduplication history.');
keep([591],'2.2','sql-reference/account-usage/access_history','ACCESS_HISTORY records supported query/object access information, including the executing user and accessed objects. It is not a file-load log, active-role listing or inventory of grants. It has edition, latency and coverage limitations.');
keep([593],'5.2','user-guide/data-sharing-intro','Eligible secure UDFs can be shared directly. Tasks, pipes and stored procedures are not directly distributed as such through a secure share; Native Apps offer a distinct application-packaging mechanism.');
keep([606],'5.1','user-guide/tables-temp-transient','Transient tables have no Fail-safe, including on Enterprise and higher editions. Their Time Travel retention remains limited to zero or one day, so reconstructability and recovery needs matter when choosing them.');
keep([609,651],'1.1','user-guide/intro-key-concepts','Snowflake combines shared persistent storage with independent compute clusters, blending shared-disk and shared-nothing concepts. Its database storage representation is optimized, compressed and columnar, not row-based. Warehouses process queries against shared data.');
keep([610],'4.4','sql-reference/constructs/sample','SAMPLE selects a random subset of table rows according to the selected method and parameters. GENERATOR produces rows, PIVOT reshapes data and LATERAL relates a table expression to preceding rows.');
keep([612],'3.2','user-guide/streams-intro','A stream tracks an offset over source change-tracking metadata and exposes change data for downstream consumption. It is not a separate copy of the entire table or an ingestion pipe; tasks can process the changes on a schedule or trigger.');
keep([613],'4.1','user-guide/ui-snowsight-activity','Query Profile exposes Total invocations for external functions. Counts can reflect row batches and retries rather than simply the number of function mentions in SQL. Partitions scanned and ordinary network/storage bytes are not specific to external functions.');
keep([619],'1.4','user-guide/warehouses-multicluster','Auto-scale uses different minimum and maximum cluster counts. Maximized mode sets them equal. Standard and Economy are scaling policies, not these operating modes.');
keep([620],'4.4','developer-guide/snowflake-scripting/loops','REPEAT tests its condition after the loop body and stops when it becomes true, so the body runs at least once. WHILE tests before executing the body; LOOP requires explicit exit control.');
keep([621],'1.4','sql-reference/sql/alter-warehouse','For resizing, WAIT_FOR_COMPLETION=TRUE makes ALTER WAREHOUSE wait for the size change to finish before returning. Naming the property without setting it TRUE is insufficient; scaling policy and resource-monitor settings do not provide this synchronization.');
keep([623,630,640],'4.4','sql-reference/data-types-semistructured','VARIANT, OBJECT and ARRAY are Snowflake semi-structured container types. VARIANT is a flexible choice when incoming shapes and later operations are not yet known. JSON, ORC and Parquet are formats, while VARCHAR/STRING store text rather than the native typed hierarchy.');
keep([624],'5.1','user-guide/data-failsafe','Eligible historical data from permanent tables has a non-configurable seven-day Fail-safe period after Time Travel. Recovery is managed by Snowflake; it is not a seven-day extension available through ordinary Time Travel SQL.');
keep([625],'1.5','sql-reference/functions/system_clustering_information','average_overlaps measures the average number of overlapping micro-partitions for each micro-partition with respect to the clustering expressions. It is not physical co-location, cloning or Time Travel retention.');
keep([632],'3.3','user-guide/snowcd','SnowCD diagnoses connectivity to endpoints needed by Snowflake. Snowpark provides programming APIs, Snowsight is the UI and SnowSQL is a SQL client rather than the dedicated connectivity diagnostic tool.');
keep([635],'2.1','sql-reference/sql/desc-network-policy','DESCRIBE NETWORK POLICY shows policy properties, including allowed/blocked lists. SHOW NETWORK POLICIES lists policies; ALTER and CREATE modify or create them rather than describe the configuration.');
keep([636],'3.1','sql-reference/functions-file','GET_PRESIGNED_URL and BUILD_SCOPED_FILE_URL are documented as non-deterministic. They generate temporary access URLs; path conversion and stable stage-file URL functions do not have that same classification.');
keep([639],'3.1','user-guide/data-unload-considerations','Parquet unloads floating-point columns as DOUBLE by default. The documentation distinguishes this from precision truncation when exporting FLOAT values to CSV/JSON. This preserves the available floating-point representation; it does not recover precision already lost before the unload. ORC is not an unload format.');
keep([643],'3.2','sql-reference/sql/create-stream','Streams on external tables use insert-only change tracking. They track newly added files/rows rather than providing the full update/delete semantics of a standard stream on a native table.');
keep([646],'1.3','sql-reference/sql/create-function','A table function declares RETURNS TABLE with its output columns and types. ROW_NUMBER is a function name, not the return-clause marker, and TABULAR/VALUES are not the required keyword.');

fix(452,'5.2','user-guide/data-sharing-reader-create','A provider wants to let a supplier query shared data without purchasing its own Snowflake account. Which approach is designed for this?',
 ['Create and manage a reader account for the supplier','Assume the supplier can query a share without any account context','Require the supplier to modify the provider source tables','Use a resource monitor as the data-sharing object'],[0],
 'A provider-managed reader account enables consumption without a separate Snowflake customer agreement for that consumer. The provider pays its compute charges. The original mixed this decision with cross-region delivery mechanisms and an ambiguous two-answer requirement.');
fix(453,'5.2','user-guide/data-sharing-intro','For a direct secure share, what determines which provider objects the consumer can query?',
 ['The consumer automatically sees every future provider object','The consumer becomes owner of the provider database','The provider explicitly exposes supported objects through share grants','Every provider object becomes visible after any one table is shared'],[2],
 'Share privileges expose selected supported objects; sharing one table does not open the full source database. Cross-region/cloud delivery and edition restrictions are separate questions, so the original broad alternatives were removed.');
fix(455,'2.1','user-guide/security-access-control-overview','Under role-based access control, which entity receives SELECT on a table and is then assigned to users?',
 ['A file format','A role','A warehouse size','A schema name used as an identity'],[1],
 'RBAC grants privileges to roles assigned to users. Current Snowflake also supports user-based access control with direct user grants under its documented conditions; the original unrestricted question incorrectly implied roles were the only possible grantee.');
fix(457,'1.4','user-guide/warehouses-multicluster','An auto-scaling multi-cluster warehouse is at its configured maximum, and otherwise healthy independent queries are queuing. Which change can allow more clusters to serve this workload?',
 ['Lower only the queue timeout','Lower only AUTO_SUSPEND','Increase a nonexistent MAX_CONCURRENCY_LIMIT setting','Increase MAX_CLUSTER_COUNT within supported limits'],[3],
 'A higher maximum permits scale-out if the scaling policy and workload call for it. This requires an eligible edition and multi-cluster configuration; it is not a universal fix for every slow query.');
fix(460,'2.2','user-guide/security-encryption-manage','When does Snowflake automatically rotate active keys in its Snowflake-managed encryption-key hierarchy?',
 ['When they are more than 30 days old','Only after 60 days','Only when a customer opens a support case','Only after 365 days'],[0],
 'The documented rotation threshold for this managed hierarchy is more than 30 days. Rotation retires old keys for new encryption while retaining necessary decryption access; periodic rekeying of older data is a separate mechanism. This is not a rule for every customer-managed authentication key.');
fix(478,'1.3','user-guide/querying-sequences','A sequence is referenced with NEXTVAL in SELECT and INSERT statements. Which assumption is safe?',
 ['Only INSERT consumes sequence values','Repeated SELECT references always return the last inserted value','NEXTVAL requests sequence values, and gap-free numbering is not guaranteed','Every sequence defaults to a guarantee of contiguous ordered values'],[2],
 'NEXTVAL is evaluated when referenced, including SELECT expressions. Snowflake does not guarantee gap-free values, and ORDER/NOORDER affects ordering. The original demanded a fixed numeric output without stating the required ordering/concurrency assumptions.');
fix(481,'3.2','user-guide/streams-intro','Which parameter limits how far Snowflake may extend table retention to help protect unconsumed stream changes from staleness?',
 ['MAX_DATA_EXTENSION_TIME_IN_DAYS','MIN_DATA_RETENSION_TIME_IN_DAYS','LOCK_TIMEOUT','STALE_AFTER'],[0],
 'MAX_DATA_EXTENSION_TIME_IN_DAYS bounds the automatic extension. It does not prevent staleness indefinitely: consume streams within the effective retention window and monitor STALE_AFTER. The other retention option is misspelled and is not this parameter.');
fix(484,'1.3','sql-reference/sql/create-procedure','Which delimiters can enclose an inline JavaScript procedure body in CREATE PROCEDURE SQL? (Choose two.)',
 ['Double-quoted SQL identifiers','Single-quoted string literals','Double forward slashes','A pair of backslashes','Dollar-quoted string literals using $$'],[1,4],
 'The SQL statement can quote the handler body with single quotes or $$. These delimit the SQL string containing JavaScript; they are not JavaScript comment syntax. Dollar quoting reduces the need to escape quotes inside the body.');
fix(487,'5.2','user-guide/data-sharing-intro','Which listed objects can a provider expose as directly queryable data in a secure share? (Choose two.)',
 ['A non-secure standard view','An eligible table','A stored procedure','A task','A secure view'],[1,4],
 'Eligible tables and secure views can be shared directly. The original generic views alternative overlapped secure views. Application logic distribution through Native Apps is a separate mechanism.');
fix(500,'3.1','user-guide/unstructured-intro','Which function generates a temporary URL whose holder can retrieve the file without a separate Snowflake login?',
 ['GET_RELATIVE_PATH','GET_PRESIGNED_URL','BUILD_STAGE_FILE_URL','BUILD_SCOPED_FILE_URL'],[1],
 'GET_PRESIGNED_URL creates a bearer-style temporary link. Generating it requires appropriate privileges, and possession of the URL supplies access authorization; saying that the entire workflow needs no authentication or authorization was misleading.');
fix(503,'3.1','user-guide/unstructured-intro','How can a client retrieve a staged unstructured file using a URL?',
 ['Use the file as a SQL identifier with no access checks','Generate or obtain the appropriate file URL and satisfy its access requirements','Expect every SELECT result to download staged files automatically','Use a resource monitor to turn a PDF into SQL rows'],[1],
 'Snowflake supports stage-file, scoped and pre-signed URLs with different access rules. GET can also download from internal stages, but it is a SQL command rather than the SQL function described in the original distractor.');
fix(504,'5.1','sql-reference/sql/create-clone','Which clause requests copying explicit privileges other than OWNERSHIP when cloning a table?',
 ['COPY GRANTS in CREATE TABLE ... CLONE','A standalone COPY GRANTS statement with no CREATE','ALTER TABLE ... COPY ALL OWNERS','COPY OWNERSHIP=TRUE'],[0],
 'COPY GRANTS is a clause, not a separate command. OWNERSHIP is not copied, and future-grant behavior must be considered separately, so the resulting grants should not be described as unconditionally identical.');
fix(520,'5.2','user-guide/data-sharing-intro','A provider drops a shared table and recreates it as a new object without restoring SELECT to the share. What can happen?',
 ['The consumer automatically owns the new table','The consumer automatically bypasses grants for 24 hours','The replacement table is unavailable to the consumer until the required share grant is restored','The consumer must set Time Travel to zero'],[2],
 'Shares depend on granted object access. Dropping and recreating an object can require reapplying grants; a familiar name alone does not preserve the former object authorization.');
fix(540,'4.2','user-guide/views-materialized','A supported expensive expression over a slowly changing base table is repeatedly queried. Which feature can precompute and maintain the result to reduce repeated computation?',
 ['Only adding a clustering key','Only adding a search access path','A suitable materialized view','Increasing Time Travel retention'],[2],
 'A materialized view can store a supported precomputed result, with storage and refresh costs. Search optimization helps selective access, but does not itself precompute arbitrary expensive expressions. The original mixed selectivity with computation without clarifying the bottleneck.');
fix(547,'4.4','sql-reference/constructs/sample','How does BERNOULLI sampling select data?',
 ['It considers each row for random inclusion with the specified probability','It always selects exactly 10 percent of rows','It randomly selects storage blocks instead of individual rows','It always returns exactly 1000 rows'],[0],
 'BERNOULLI/ROW sampling works at row granularity. The sample need not contain every row or an exact percentage count; SYSTEM/BLOCK sampling uses blocks.');
fix(555,'1.5','user-guide/tables-temp-transient','Reconstructable intermediate data must remain available across sessions but does not need Fail-safe. Which native table type fits?',
 ['Permanent','Transient','Temporary','An external table automatically storing data in Snowflake'],[1],
 'Transient tables persist across sessions without Fail-safe. Temporary tables are session-scoped, and external tables reference externally stored data. Explicit cross-session persistence resolves the original ambiguity between transient and temporary.');
fix(558,'4.4','sql-reference/functions/flatten','Which table function expands compound values in VARIANT, OBJECT or ARRAY input into relational rows?',
 ['CAST','FLATTEN','GET','PARSE_JSON'],[1],
 'FLATTEN emits rows for elements or fields according to its input and options. It does not blindly emit one row for every object anywhere in an arbitrary hierarchy unless the selected recursive/path settings call for that.');
fix(563,'3.1','sql-reference/sql/put','Which command uploads existing local unstructured files to an internal Snowflake stage?',
 ['PUT','GET','LIST','COPY INTO a table'],[0], 'PUT moves local files to an internal stage. GET downloads and LIST enumerates; COPY INTO a table parses supported input into table data rather than uploading arbitrary local binaries.');
fix(570,'3.1','sql-reference/sql/create-stage','For an internal stage configured with SNOWFLAKE_FULL encryption, when is client-side encryption applied to a PUT upload?',
 ['Only when a warehouse starts','Only when table micro-partitions are written','Before the file leaves the client','Only after the file arrives at the stage'],[2],
 'SNOWFLAKE_FULL combines client-side and server-side encryption. SNOWFLAKE_SSE is server-side-only; transport encryption is separate. The original treated client-side encryption as unconditional for every internal-stage configuration.');
fix(572,'2.3','user-guide/warehouses-multicluster','Holding running time, warehouse type and generation constant, which settings affect multi-cluster warehouse compute credits? (Choose two.)',
 ['A user-selected local cache price','Warehouse size','Number of running clusters','Number of registered users without changing compute','Number of SQL characters submitted'],[1,2],
 'Size and active cluster count affect compute consumption; runtime matters too and is held constant. Billing is not directly per registered user or SQL character.');
fix(573,'2.1','user-guide/network-policies','A client IP appears in both ALLOWED_IP_LIST and BLOCKED_IP_LIST of the applicable network policy. What is the result?',
 ['The allow entry always overrides the block','The block takes precedence and access is denied','The lists cancel and no policy applies','The warehouse size determines which list wins'],[1],
 'A blocked IP takes precedence when it also appears in the allowed list. This states the access result without relying on an internal evaluation-order implementation detail.');
fix(576,'3.1','sql-reference/sql/list','Which statements list files in the current user stage? (Choose two.)',
 ['LIST @~;','LS @~;','LS @usr;','SHOW @%;'],[0,1],
 'LS is the abbreviated form of LIST, and @~ denotes the current user stage. Both first alternatives are valid listing commands. A named stage called usr is not automatically the current user stage.');
fix(579,'4.3','user-guide/querying-persisted-results','Repeated reuse can reset a persisted query result retention window, but what is the maximum age measured from its first execution?',
 ['1 day','10 days','31 days','60 days'],[2],
 'Reuse resets the 24-hour window up to a maximum of 31 days from the original execution. This does not guarantee all results are reusable for 31 days; query/data/access eligibility still applies.');
fix(580,'4.1','sql-reference/functions/warehouse_load_history','Many short queries on one warehouse have high end-to-end latency. Monitoring shows a high queued load. Which diagnosis is supported?',
 ['Concurrency contention is adding queue wait time','The data cache is necessarily corrupt','Every client driver must be obsolete','A low queue timeout makes completed SQL operators execute more slowly'],[0],
 'Observed queued load supports concurrency contention. User count alone would not establish the cause; elapsed time includes queue wait as well as execution.');
fix(582,'4.4','sql-reference/data-types-semistructured','What is the documented upper bound for the uncompressed size of one VARIANT value, before practical reductions for internal overhead?',
 ['8 MB','16 MB','32 MB','128 MB'],[3],
 'The current documented upper bound is 128 MB uncompressed. Actual supported values may be smaller because of overhead and the stored object shape. This is not a 128 MB compressed-file limit.');
fix(586,'1.5','user-guide/views-secure','Why might a provider use a secure view for sensitive data?',
 ['It automatically grants every user access','It restricts definition visibility and avoids certain optimizations that could expose underlying data','It copies all data to a special encrypted warehouse','Only secure views can ever have row access policies'],[1],
 'Secure views restrict visibility and some optimizations for privacy. Owners and certain privileged roles can still inspect their definitions; the original claim that all end users are unable to see them was too absolute.');
fix(589,'2.2','sql-reference/account-usage/access_history','Which source can help identify tables not observed in supported access records during the available history window?',
 ['ACCESS_HISTORY','Data classification alone','A masking policy alone','A tag name alone'],[0],
 'ACCESS_HISTORY supports usage analysis. Absence of a record is not by itself proof that an object is safe to delete: retention, supported access coverage and external business dependencies must be considered.');
fix(590,'4.4','user-guide/queries-hierarchical','Which constructs can traverse a hierarchy whose depth is not known in advance? (Choose two.)',
 ['CONNECT BY','LISTAGG','QUALIFY','A non-recursive GROUP BY','A recursive CTE introduced with WITH'],[0,4],
 'CONNECT BY and recursive CTEs express recursive traversal. WITH alone does not make an ordinary CTE recursive; termination and cycle handling matter.');
fix(595,'5.2','sql-reference/sql/alter-share','Which statement adds a consumer account to an existing direct share using an organization-qualified account identifier?',
 ['GRANT USAGE ON SHARE my_share TO ACCOUNT myorg.consumer','GRANT SELECT ON SHARE my_share TO ACCOUNT myorg.consumer','ALTER SHARE my_share ADD ACCOUNTS = myorg.consumer','ALTER ACCOUNT myorg.consumer ADD SHARE my_share'],[2],
 'ALTER SHARE ... ADD ACCOUNTS adds the recipient. Object privileges must also be present in the share. The account name is illustrative; cross-region delivery and edition restrictions require their own configuration.');
fix(597,'1.4','user-guide/warehouses-multicluster','On Enterprise Edition, independent queries are queuing because a warehouse has insufficient concurrency capacity. Which feature can scale out its compute?',
 ['Group unrelated warehouse names into an invented cluster','Set a user-count threshold to exactly 100','Configure a multi-cluster warehouse','Assume any warehouse fails once user 101 signs in'],[2],
 'Multi-cluster warehouses add clusters for concurrency. There is no general 100-user threshold that determines when one must be used; measure queued load and workload requirements.');
fix(600,'4.1','user-guide/performance-query-warehouse-memory','A query spills a large amount of intermediate data to local storage. Which response is reasonable?',
 ['Always shrink the warehouse','Investigate memory demand, then benchmark a larger warehouse or reduce intermediate data through query changes','Assume the console timed out','Assume adding clusters gives this single query more memory'],[1],
 'Local spill indicates intermediate data exceeded available memory. More memory can help, but query rewrites can reduce demand too. Multi-cluster scale-out primarily helps concurrency rather than splitting one query across clusters.');
fix(603,'3.1','sql-reference/sql/get','Which command downloads a file from an internal Snowflake stage to a client filesystem?',
 ['PUT','INSERT','GET','COPY INTO a table'],[2], 'GET downloads internal-stage files. External-stage object retrieval normally uses cloud tools or applicable file URLs; the original omitted the stage type.');
fix(614,'1.4','user-guide/warehouses-multicluster','Sustained warehouse queues are caused by concurrent independent workloads. Which approaches can distribute future work over additional compute? (Choose two.)',
 ['Decrease warehouse size unconditionally','Reduce the available cluster capacity','Configure eligible multi-cluster scaling to add clusters','Route part of the workload to a separate warehouse'],[2,3],
 'Both multi-cluster scale-out and separate warehouses can address concurrency. Already queued statements do not automatically migrate to another warehouse; routing concerns new submissions or deliberate resubmission. The original incorrectly chose only one plausible approach.');
fix(622,'2.1','user-guide/security-mfa','Which are user authentication mechanisms rather than data encryption or object authorization? (Choose two.)',
 ['Snowflake-managed data encryption keys','SELECT grants on a table','Multi-factor authentication','Federated authentication/SSO'],[2,3],
 'MFA strengthens identity verification; federation/SSO delegates authentication to an identity provider. Security strength depends on configuration. Grants authorize access and storage keys protect data rather than authenticate the user.');
fix(637,'4.2','user-guide/search-optimization-service','Which features can improve selective access to a large standard native analytical table when justified by its workload? (Choose two.)',
 ['An ordinary view alone that stores no result','An appropriate clustering key','Search optimization on supported predicates','Longer Time Travel retention','An unsupported INDEX_HINTS setting'],[1,2],
 'Clustering can improve pruning and search optimization can accelerate selective predicates. Both require workload/cost evaluation; generic indexing is ambiguous because other Snowflake table types have different capabilities.');
fix(641,'4.1','sql-reference/functions/warehouse_load_history','Which Information Schema table function provides aggregate warehouse-load measures such as AVG_QUEUED_LOAD?',
 ['RESOURCE_MONITOR','ACCOUNT_USAGE.QUERY_HISTORY','WAREHOUSE_LOAD_HISTORY','WAREHOUSE_METERING_HISTORY'],[2],
 'WAREHOUSE_LOAD_HISTORY reports load and queuing. QUERY_HISTORY also contains useful per-query queue timings, so the original general troubleshooting question had more than one plausible answer. Metering reports credits instead.');
fix(647,'1.4','user-guide/warehouses-considerations','Which operation uses warehouse compute rather than being an ordinary metadata-only operation on a standard native table?',
 ['SHOW TABLES','ALTER TABLE t ADD COLUMN region VARCHAR','INSERT INTO t(id) VALUES (1)','CREATE TABLE empty_t(id NUMBER)'],[2],
 'The INSERT writes table data using compute. The other listed ordinary operations manage metadata. The original COUNT(*) alternative was context-dependent because some counts use metadata while others need execution.');
fix(648,'3.3','user-guide/data-load-unstructured-rest-api','Which REST endpoint family retrieves a staged file using an appropriate Snowflake file URL or scoped URL?',
 ['insertFiles','insertReport','GET /api/files/','loadHistoryScan'],[2],
 'GET /api/files/ retrieves a file; the full resource URL and required authentication/authorization must be supplied. Snowpipe insertFiles/report/history endpoints concern ingestion rather than file retrieval.');

archive(473,'Repite el contraste caller/owner rights ya validado en ID 174; se conserva el original.');
archive(476,'Memorización de la ubicación de un menú cambiante; el uso de Query History ya se evalúa con preguntas funcionales.');
archive(544,'Repite la transferencia de ownership al eliminar un rol, ya contrastada en ID 55.');
archive(554,'Repite OBJECT_CONSTRUCT para descarga JSON, cubierto en ID 517 de esta tanda.');
archive(616,'Repite los 14 días de metadatos del pipe, ya acotados y contrastados en ID 200.');
archive(633,'Repite la función de los streams, conservada en ID 612 de esta tanda.');
