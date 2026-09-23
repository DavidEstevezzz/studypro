// Fifth pending batch, selected after the externally completed batch 400.
// Reviewed on 2026-09-23. Original IDs and original content remain in the ledger.
export const batch500 = [];
function keep(ids, objective, path, e) {
  for (const i of ids) batch500.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,
    decision:'conservar_revisada',reason:'Enunciado, opciones y clave contrastados; explicación revisada.'});
}
function fix(i, objective, path, q, o, c, e) {
  batch500.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,
    decision:'corregir',reason:'Acotado o corregido el contenido para evitar ambigüedad; alternativas y explicación contrastadas.'});
}
function duplicate(i, duplicateOf) {
  batch500.push({i,decision:'archivar',duplicateOf,
    reason:`Repite la habilidad y respuesta de la pregunta contrastada ${duplicateOf}, sin aportar un escenario sustancialmente distinto. Se conserva el original.`});
}

keep([816],'2.3','user-guide/tables-temp-transient','Transient tables have no Fail-safe, eliminating their Fail-safe storage charges. Active data and retained Time Travel versions still occupy billable storage; making a table transient does not eliminate unrelated staged-file storage.');
keep([823],'4.4','user-guide/querying-semistructured','Use a colon after the VARIANT column, dot notation for object fields, and zero-based array indexing: source_column:elements[0].name. This returns the element value as VARIANT; append ::STRING if a SQL string is required.');
keep([824],'4.4','sql-reference/functions/parse_json','PARSE_JSON parses valid JSON text into its native representation in VARIANT. TO_VARIANT on a string preserves a string value rather than parsing its JSON structure. CHECK_JSON validates syntax and FLATTEN expands compound values.');
keep([825],'1.4','sql-reference/sql/alter-warehouse','MODIFY on the warehouse permits changing properties such as its size. MONITOR permits monitoring and USAGE permits using the warehouse. ALTER is a command family, not the warehouse privilege name.');
keep([831],'4.2','user-guide/query-acceleration-service','Large scans with selective filters are typical query-acceleration candidates. Eligibility depends on the actual plan and supported workload; high-cardinality GROUP BY can prevent useful acceleration, and enabling search optimization alone does not make a query eligible.');
keep([836],'3.1','user-guide/unstructured-intro','Snowflake provides file URLs and scoped URLs for staged files; pre-signed URLs are another supported type, but are not an offered answer. Absolute and relative paths are not the named access-URL categories in this question.');
keep([837],'4.4','sql-reference/constructs/sample','SAMPLE (10) defaults to BERNOULLI/ROW sampling with a 10 percent per-row inclusion probability. It does not guarantee exactly 100 rows out of 1000. Adding ROWS requests a fixed count, and 0.1 without ROWS means 0.1 percent.');
keep([845],'1.4','user-guide/warehouses-tasks','Resizing a suspended warehouse updates its configuration without starting it. Compute for the new size is provisioned when it resumes; query acceleration resources and other warehouses are independent.');
keep([846],'3.1','sql-reference/functions/validate','VALIDATE accepts a table and the named JOB_ID argument identifying the COPY load to inspect. A query ID value, including the supported last-job form, supplies that argument; LAST_QUERY_ID is not the argument name. Validation has documented restrictions, including transformed loads.');
keep([851],'2.1','user-guide/security-access-control-overview','A parent role inherits privileges from roles granted to it, transitively up the granted hierarchy. Sibling roles do not inherit each other merely by being at the same level, and privileges do not flow down to child roles.');
keep([852],'2.1','sql-reference/parameters','ALLOW_CLIENT_MFA_CACHING is an account-level parameter. It controls whether supported clients can cache MFA tokens in the operating-system keystore; role, session and user are not its parameter-setting levels.');
keep([853],'5.2','user-guide/data-sharing-intro','The provider owns or controls the source data and exposes authorized objects through sharing. Consumers query the shared data; a reader account is a provider-managed consumption account, not the definition of a data provider.');
keep([855,885],'2.1','user-guide/network-policies','MINS_TO_BYPASS_NETWORK_POLICY is a user-object property for temporary bypass. Snowflake documentation says only Snowflake can set it and directs users to Support. A powerful local role alone does not authorize setting this special property.');
keep([856],'3.1','sql-reference/sql/copy-into-location','For CSV unloading, NULL_IF specifies the output text used for SQL NULL; the first specified string is used, for example NULL_IF=(\'null\'). EMPTY_FIELD_AS_NULL concerns empty-field handling rather than choosing this output string.');
keep([857],'3.2','sql-reference/functions/current_task_graphs','CURRENT_TASK_GRAPHS returns graph runs currently scheduled or executing. TASK_DEPENDENTS describes dependencies, while completed graph history is a different function; COMPLETE_TASK_GRAPHS is not its correct name.');
keep([858],'4.2','user-guide/views-materialized','A materialized view stores and automatically maintains the result of a supported query definition, enabling reuse of precomputed work. A standard secure view does not itself materialize its result; maintenance and storage have costs.');
keep([865],'2.3','user-guide/resource-monitors','Only users with ACCOUNTADMIN can create resource monitors. Account administrators can grant other roles privileges to view or modify existing monitors; these are distinct from creation.');
keep([873],'3.1','sql-reference/sql/create-file-format','FIELD_OPTIONALLY_ENCLOSED_BY selects the field-enclosure character for CSV. Configure the actual character used, such as a single or double quote; one setting does not mean both quote styles are automatically interchangeable.');
keep([875,876],'4.1','user-guide/ui-snowsight-activity','TableScan represents access to a table in the execution plan. The statistics include pruning measures such as Partitions scanned and Partitions total. Stage scans, VALUES and generated rows have different operator meanings; the operator tree is distinct from the statistics pane.');
keep([887],'3.1','sql-reference/sql/copy-into-table','COPY INTO a table may omit FROM when loading from that target table\'s table stage. It does not automatically select the user stage or an arbitrary named internal/external stage. File-format and load options still need to suit the files.');
keep([900],'5.1','user-guide/tables-temp-transient','Temporary and transient tables have no Fail-safe and at most one day of Time Travel. Temporary-table lifetime is session-scoped; transient tables persist beyond a session. Dropping a transient table does not erase the entire configured Time Travel window immediately.');
keep([904],'1.6','developer-guide/snowpark/index','Python and Scala are Snowpark library languages among these choices; Java is also supported but is not offered. JavaScript UDF support does not imply a JavaScript Snowpark library, and R/C++ are not these library interfaces.');
keep([908],'5.2','user-guide/data-sharing-intro','Consumers can SELECT shared tables and join them to other accessible tables. The imported shared database is read-only: consumers cannot modify its shared source data, clone shared tables or use ordinary consumer Time Travel on those shared tables.');
keep([915],'4.1','user-guide/tables-clustering-micropartitions','Micro-partition metadata, including value ranges, helps eliminate partitions that cannot satisfy filters. Collecting such statistics does not itself reduce the physical partition count or require reading every partition for every query.');
keep([922],'4.3','user-guide/performance-query-warehouse-cache','Suspending a warehouse discards its local table-data cache. That cache must be rebuilt by later reads after restart. Persisted query results are separate and are not deleted merely because the warehouse is suspended.');
keep([926],'2.1','sql-reference/sql/create-security-integration-saml2','CREATE SECURITY INTEGRATION with TYPE=SAML2 is used to configure a Snowflake SAML integration with an identity provider. A password policy, session policy or network rule is not that integration; the identity-provider setup must also be completed.');
keep([928],'2.1','sql-reference/sql/revoke-role','REVOKE ROLE removes an existing role grant from a role or user. USE ROLE and USE SECONDARY ROLES change session activation without removing the underlying grants.');
keep([933],'2.3','sql-reference/info-schema/table_storage_metrics','TABLE_STORAGE_METRICS exists in both ACCOUNT_USAGE and INFORMATION_SCHEMA and describes per-table storage, including retained historical bytes. These surfaces differ in access requirements and latency; metering views concern credits and STORAGE_USAGE reports broader totals.');
keep([938],'3.1','user-guide/data-load-overview','Parquet is a columnar representation commonly used with compression. Avro is row-oriented, JSON is textual and TSV is delimited text. Parquet encoding and compression settings determine actual storage size.');
keep([942,948],'2.1','user-guide/security-access-control-overview','A privilege defines an allowed level of access to an object. SECURITYADMIN has global MANAGE GRANTS by default, allowing broad grant management; custom roles or higher roles can also hold that privilege. A role, grant operation and session are different concepts.');
keep([956],'2.2','sql-reference/account-usage/access_history','ACCESS_HISTORY includes supported read/write object access and column-lineage information linking sources to write targets. COPY_HISTORY and LOAD_HISTORY concern ingestion history; QUERY_HISTORY is not the equivalent lineage record. Access History has edition, latency and coverage requirements.');
keep([959],'1.3','sql-reference/sql/show-file-formats','SHOW FILE FORMATS lists file formats visible to the active role; use IN ACCOUNT for an account-wide scope. Without an explicit scope the current database/schema context can affect the listing. DESCRIBE examines one format, and LIST enumerates staged files.');
keep([977],'1.1','user-guide/organizations','Organizations link related Snowflake accounts and simplify consolidated administration and billing across regions/clouds. They do not enable zero-copy cloning directly across accounts; replication and sharing are separate capabilities.');

fix(832,'4.2','user-guide/search-optimization-service','How does search optimization help skip irrelevant micro-partitions?',
 ['It always scans only join columns','It maintains a persistent search access path recording where column values may occur','It replaces all table storage with warehouse cache','It stores every running query result for permanent reuse'],[1],
 'The search access path records which values might occur in each micro-partition so scans can skip candidates that cannot match supported predicates. It is maintained separately from warehouse cache and persisted query results. Damaged punctuation in the original was removed.');
fix(833,'1.4','user-guide/warehouses-multicluster','An eligible warehouse has recurring concurrency queues. Which change adds independent clusters rather than more resources to one cluster?',
 ['Increase AUTO_SUSPEND alone','Configure multi-cluster scale-out','Increase the size of the existing single cluster','Reduce MAX_CONCURRENCY_LEVEL'],[1],
 'Multi-cluster scaling adds clusters to serve concurrent queries. Increasing size can also reduce some queues by shortening execution, so the original generic question had more than one plausible remedy.');
fix(841,'3.1','sql-reference/sql/copy-into-location','What does VALIDATION_MODE=RETURN_ROWS do in COPY INTO a location?',
 ['Checks the contents of files already written to the stage','Unloads a CSV file and automatically reloads it','Replaces SQL NULL with the string null','Returns the SELECT results instead of writing output files'],[3],
 'RETURN_ROWS previews the data selected for an unload without unloading it. It is not a validation of files after they have been written, nor a generic assurance that output parsing will succeed.');
fix(850,'4.1','user-guide/warehouses-considerations','Which workload-specific actions can improve performance when justified by measurements? (Choose two.)',
 ['Address concurrency queues with additional appropriate compute capacity','Deliberately increase spilling','Always raise MAX_CONCURRENCY_LEVEL regardless of memory','Benchmark a larger warehouse for a resource-bound query','Suspend after every query to keep the cache warm'],[0,3],
 'Treat concurrency and resource-intensive individual queries separately. Larger compute is not universally faster; raising concurrency can increase memory contention, and suspension drops the local data cache.');
fix(859,'4.3','sql-reference/functions/result_scan','User1 manually ran a query. Can a different User2 access that stored result with RESULT_SCAN solely by holding ACCOUNTADMIN?',
 ['Yes, ACCOUNTADMIN can read every stored result','Yes, if both users select the same primary role','Yes, provided User2 resumes the original warehouse','No; a manually run query result is accessible through RESULT_SCAN only to the user who ran it'],[3],
 'Viewing another user\'s query history is distinct from accessing its result rows. RESULT_SCAN restricts manually executed results by user. Task-generated results have a separate owner-role rule. The rewrite avoids conflating history visibility with results.');
fix(861,'4.1','user-guide/ui-snowsight-activity','Which pair of Query Profile statistics directly compares scanned micro-partitions with all partitions of the scanned table? (Choose two.)',
 ['Partitions scanned','Partitions total','Bytes scanned','Bytes read from result','Bytes written'],[0,1],
 'Comparing scanned with total partitions quantifies partition pruning. Bytes scanned can also reflect pruning effects, so the original wording did not uniquely distinguish its required pair.');
fix(866,'5.2','user-guide/data-sharing-intro','Which statement can a consumer execute directly against an accessible shared table without modifying the provider data?',
 ['ALTER TABLE','INSERT INTO','MERGE','SELECT'],[3],
 'Shared databases are read-only to consumers, who may SELECT permitted data. This avoids labeling SELECT as a data-definition or modifying statement; modification or cloning of the provider object is not granted by sharing.');
fix(872,'4.2','user-guide/search-optimization/join-queries','Which listed join-predicate pattern is supported by search optimization?',
 ['Disjunctions using OR in join predicates','LIKE/ILIKE/RLIKE join predicates','Join predicates on VARIANT columns','Conjunctions using AND of supported equality predicates'],[3],
 'Search optimization supports conjunctions of equality join predicates. The listed OR, pattern-matching and VARIANT join cases are documented limitations. Standalone WHERE predicate support is a separate question.');
fix(878,'4.4','sql-reference/functions/result_scan','Which table function can expose the stored output of SHOW FILE FORMATS to a subsequent SELECT within the supported access/retention window?',
 ['RESULT_SCAN','FLATTEN directly on the SHOW keyword','PARSE_JSON on the command name','CURRENT_WAREHOUSE'],[0],
 'RESULT_SCAN can turn a SHOW result into a queryable row set. Other scripting mechanisms can process results too, so the original broad alternatives were not a reliable single-choice distinction.');
fix(882,'1.4','user-guide/warehouses-multicluster','What is a benefit of an auto-scaling multi-cluster warehouse configured with different minimum and maximum cluster counts?',
 ['It always makes one data-load statement faster','It always costs less than a single cluster','It automatically changes the warehouse size','It can start and stop additional clusters as concurrency demand changes'],[3],
 'Auto-scale changes cluster count within configured limits. Maximized mode uses equal minimum/maximum counts; multi-cluster by itself does not imply elastic cluster counts or automatic resizing.');
fix(903,'5.1','user-guide/data-time-travel','A schema retention setting changes. Which statements about child-table retention are true, assuming applicable edition/type limits and no higher account minimum? (Choose two.)',
 ['Every explicit table setting is replaced','Tables without an explicit override inherit the applicable schema value','All tables automatically become permanent','Explicit table overrides remain configured'],[1,3],
 'Inheritance applies to tables without their own setting. Explicit overrides remain in place, so the original single-answer key omitted another true option. Account minimums and object-type limits can affect effective retention separately.');
fix(905,'4.4','sql-reference/constructs/sample','Assuming SNOWPRO contains at least 10 rows, which statements request a fixed sample of 10 rows? (Choose two.)',
 ['SELECT * FROM SNOWPRO SAMPLE SYSTEM (10)','SELECT * FROM SNOWPRO TABLESAMPLE (10 ROWS)','SELECT * FROM SNOWPRO TABLESAMPLE BLOCK (10)','SELECT * FROM SNOWPRO TABLESAMPLE BLOCK (10 ROWS)','SELECT * FROM SNOWPRO SAMPLE BERNOULLI (10 ROWS)'],[1,4],
 'Fixed-row sampling is supported with ROW/BERNOULLI, including the default method. SYSTEM/BLOCK uses a percentage and does not support a fixed ROWS count. A table with fewer than 10 rows cannot provide 10 distinct input rows.');
fix(916,'4.4','developer-guide/udf/udf-overview','Which kind of UDF returns a single value for each input row rather than a table of output rows?',
 ['A table UDF','A scalar UDF','A directory table','A stage'],[1],
 'A scalar UDF returns one value per input row; a table UDF returns rows. The original one-value-per-invocation wording could also describe other function families without distinguishing their grouping semantics.');
fix(929,'2.2','user-guide/object-tagging/introduction','A tag is assigned to a schema. With ordinary tag inheritance and no overriding value, which path describes its inheritance to table columns?',
 ['Schema to table to column','Schema to warehouse to user','Schema to account role to warehouse','Schema to organization to cloud region'],[0],
 'Tags inherit through supported securable-object hierarchies, including schema, table and column. The original database-to-view-to-column alternative could also describe supported inheritance, making the single-answer question ambiguous.');
fix(941,'5.1','sql-reference/parameters','In Enterprise Edition, a permanent table has DATA_RETENTION_TIME_IN_DAYS=2 and the account has MIN_DATA_RETENTION_TIME_IN_DAYS=5. What is its effective Time Travel retention?',
 ['2 days','3 days','5 days','7 days'],[2],
 'For an eligible permanent table the effective retention is MAX(2,5)=5. The minimum parameter does not change the stored table setting and does not apply to temporary/transient tables; edition and object type must be specified.');
fix(943,'4.2','user-guide/views-materialized','Which object has automatically maintained stored query results whose refresh can incur credits?',
 ['A standard view with no materialization','A role','A materialized view','A file-format definition'],[2],
 'Materialized-view maintenance refreshes stored query results and incurs costs. Ordinary tables can also incur optional service costs such as Automatic Clustering, so the original broad maintenance question was insufficiently precise.');
fix(952,'2.1','user-guide/security-access-control-overview','Which statement describes the ownership principle of discretionary access control in Snowflake?',
 ['A privilege is a session identifier','Objects cannot have owners','A securable object has an owner with control over it, subject to Snowflake grant-management rules','Only the name of a role determines its privileges'],[2],
 'DAC is based on object ownership. Managed access schemas centralize grant decisions with the schema owner or MANAGE GRANTS role, so object ownership does not mean unrestricted grant authority in every context.');
fix(957,'2.1','user-guide/network-policies','Which roles can create a network policy? (Choose two.)',
 ['SYSADMIN solely because of its name','ORGADMIN solely because of its name','SECURITYADMIN or a role inheriting its relevant privileges','A custom role granted CREATE NETWORK POLICY on the account','Any role with only CREATE SECURITY INTEGRATION'],[2,3],
 'Creation depends on CREATE NETWORK POLICY. SECURITYADMIN has it by default, and it can be delegated. Snowflake roles form a grant hierarchy, not a universal ranking in which every administrator role is automatically higher.');
fix(966,'4.4','sql-reference/functions/object_construct','Which expression constructs an OBJECT from the columns of each input row when used in a SELECT?',
 ['ARRAY_AGG(*)','OBJECT_AGG(*) without its required arguments','ARRAY_CONSTRUCT(*)','OBJECT_CONSTRUCT(*)'],[3],
 'OBJECT_CONSTRUCT(*) produces an OBJECT for each row, which can be stored in VARIANT. It does not by itself aggregate all rows into one value. SQL NULL-valued pairs are omitted unless a suitable keep-null function is used.');
fix(969,'3.1','sql-reference/sql/get','What is the primary transfer operation performed by GET?',
 ['Rename every source file','Upload local files to external storage','Download internal-stage files to the local client filesystem','Download external-stage files directly with the same GET command'],[2],
 'GET downloads internal-stage files. Decryption may also occur as part of the applicable client-side encryption workflow, so the original action question included another potentially true statement.');
fix(971,'4.4','user-guide/querying-semistructured','In a JSON path expression using an unquoted SQL column identifier, how are that identifier and the JSON element names treated?',
 ['Both are always case-insensitive','Both are always case-sensitive','Only the SQL column identifier is case-sensitive','The unquoted SQL column identifier is case-insensitive; JSON element names are case-sensitive'],[3],
 'Unquoted SQL identifiers follow Snowflake normalization rules; JSON element names retain case. Double-quoted SQL identifiers require separate handling, so the original regardless-of-notation claim was too broad.');
fix(972,'4.1','user-guide/ui-snowsight-activity','How can Query Profile help identify the operator accounting for the largest share of query processing time?',
 ['Assume any scan with many partitions is always the slowest','Compare operator time percentages and the most-expensive-node information','Treat percent scanned from cache as operator elapsed time','Use output row count as an exact elapsed-time measure'],[1],
 'Operator time shares identify time-intensive work. They are not an exact allocation of monetary credits per operator; rows and partitions provide context rather than direct time measurements.');
fix(973,'5.3','collaboration/consumer-becoming','Before consuming a paid listing where acceptance of the Snowflake Provider and Consumer Terms is required, which statement reflects the documented setup?',
 ['Every SELECT requires a fresh acceptance','The SYSADMIN role automatically bypasses the terms','Sharing a warehouse accepts terms for every account','An organization administrator accepts the terms, and consumers still need the relevant listing privileges'],[3],
 'The consumer setup describes organization-administrator acceptance and separate consumer privileges. Free/offline-term cases can differ; the original unqualified claim about every Marketplace listing was too broad. No terms are accepted by this practice question.');
fix(974,'4.1','user-guide/ui-snowsight-activity','Which Query Profile statistics record intermediate data spilled beyond memory? (Choose two.)',
 ['Bytes scanned','Partitions scanned','Bytes spilled to local storage','Bytes spilled to remote storage','Percentage scanned from cache'],[2,3],
 'Local and remote spill bytes measure intermediate data written beyond memory. This identifies memory pressure without asserting that resizing is the only remedy; reducing intermediate rows can help too.');

for (const [i,other] of [
  [818,280],[822,792],[827,230],[830,266],[842,4],[843,584],[848,44],[849,26],
  [862,623],[863,107],[870,792],[883,597],[884,858],[889,289],[890,161],[894,600],
  [899,678],[901,465],[906,555],[909,640],[912,451],[913,624],[917,161],[919,8],
  [920,452],[925,509],[930,573],[932,729],[936,555],[939,148],[940,640],[945,451],
  [946,809],[953,182],[955,612],[961,692],[963,47],[967,182],[968,457],
]) duplicate(i,other);
batch500.push({i:867,decision:'archivar',reason:'Memorización de tipos de gráficos de Snowsight, dependiente de interfaz; se mantiene el criterio aplicado a IDs 442 y 742 y se conserva el original.'});
