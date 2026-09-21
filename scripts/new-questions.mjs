// Original practice scenarios, not extracted from certification exams.
const docs = 'https://docs.snowflake.com/en/';
export const additions = [];
function add(objective, topic, q, options, correct, e, path) {
  additions.push({ i: 3001 + additions.length, q, o: options, c: correct, n: correct.length,
    e, r: docs + path, objective, topic });
}
add('1.2','Snowflake CLI',
  'A team needs to run SQL and deploy Snowflake applications from its automation scripts. Which tool is designed for these command-line workflows?',
  ['Snowflake CLI','Query Profile','Trust Center','A directory table'],[0],
  'Snowflake CLI supports SQL execution and developer workflows. Query Profile diagnoses queries, Trust Center evaluates security, and directory tables describe files.',
  'developer-guide/snowflake-cli/index');
add('1.2','IDE integrations',
  'A developer wants to write and execute Snowflake SQL while staying inside Visual Studio Code. What should the developer use?',
  ['The Snowflake extension for Visual Studio Code','A network policy','A resource monitor','A data listing'],[0],
  'The Snowflake VS Code extension brings Snowflake SQL development into the editor. The other objects serve security, spending, and sharing purposes.',
  'user-guide/vscode-ext');
add('1.4','Gen2 warehouses',
  'A team is considering a Gen2 standard warehouse for an analytics workload. How should it evaluate the change?',
  ['Benchmark representative queries and compare elapsed time and cost','Assume every query will run exactly twice as fast','Assume the warehouse becomes serverless','Remove all clustering keys before testing'],[0],
  'Gen2 combines newer hardware and software optimizations. Benefits depend on the workload, so benchmark rather than assume a fixed speedup.',
  'user-guide/warehouses-gen2');
add('1.4','Gen2 warehouses',
  'Which distinction correctly describes warehouse generation and multi-cluster scaling?',
  ['Generation selects a standard warehouse generation; multi-cluster scaling changes the number of clusters','Generation is the number of active clusters','Gen2 means exactly two clusters must always run','Multi-cluster scaling converts native tables to Iceberg'],[0],
  'Generation and cluster count are separate settings. Gen2 is not a two-cluster configuration.',
  'user-guide/warehouses-gen2');
add('1.5','Dynamic tables',
  'An analytics team defines a SELECT query and wants Snowflake to maintain its materialized result as source data changes. Which object fits this requirement?',
  ['Dynamic table','Standard view','Directory table','File format'],[0],
  'A dynamic table stores and refreshes the result of its defining query. A standard view evaluates its query when accessed; a directory table holds file metadata.',
  'user-guide/dynamic-tables/overview');
add('3.2','Dynamic tables',
  'A dynamic table has a target lag of five minutes. What does this setting express?',
  ['The desired freshness relative to upstream source data','A guarantee that a refresh starts at every five-minute clock boundary','The Time Travel retention period','The maximum duration of every user SELECT query'],[0],
  'Target lag is a freshness objective used by the refresh scheduler, not a fixed cron schedule or a guaranteed query timeout.',
  'user-guide/dynamic-tables/target-lag');
add('3.2','Dynamic tables',
  'A pipeline must call a stored procedure that performs custom procedural steps. Which approach is more appropriate than placing that procedure inside a dynamic table definition?',
  ['Use a task to call the stored procedure','Put CALL in the dynamic table SELECT definition','Use a directory table to execute the procedure','Set the dynamic table target lag to zero'],[0],
  'Tasks can call stored procedures. Dynamic tables are declarative query results, not a replacement for arbitrary procedural orchestration.',
  'user-guide/tasks-intro');
add('3.2','Snowpipe Streaming',
  'A telemetry application produces rows continuously and wants to ingest them without first creating staged files. Which service fits?',
  ['Snowpipe Streaming','File-based Snowpipe only','GET','Database replication'],[0],
  'Snowpipe Streaming accepts rows directly. File-based Snowpipe processes staged files; GET downloads files and replication copies Snowflake data between accounts.',
  'user-guide/snowpipe-streaming/data-load-snowpipe-streaming-overview');
add('3.2','Snowpipe Streaming',
  'A source already delivers complete CSV files to cloud storage. The team wants automated ingestion when files arrive. Which approach fits this existing file pipeline?',
  ['Snowpipe with cloud event notifications','A stream object that reads the bucket directly','A directory table that inserts rows automatically','GET on the external stage'],[0],
  'File arrival notifications can trigger Snowpipe. A stream tracks changes to supported Snowflake objects; it does not independently ingest bucket files.',
  'user-guide/data-load-snowpipe-auto');
add('3.2','Snowpipe Streaming',
  'Which comparison between Snowpipe Streaming and a Snowflake stream object is correct?',
  ['Snowpipe Streaming ingests rows; a stream object exposes change data for downstream processing','Both objects automatically download cloud files','A stream object is a required file format for Snowpipe Streaming','Snowpipe Streaming is the Time Travel log'],[0],
  'The word streaming does not make the services equivalent: ingestion brings rows into Snowflake; a stream object provides change tracking.',
  'user-guide/streams-intro');
add('2.3','Snowpipe billing',
  'Under the current Snowpipe billing model, which quantity is central to estimating ingestion charges?',
  ['The volume of data loaded, using the applicable credit-per-GB rate','The number of interactive users','The size of an assigned user-managed warehouse','The number of roles with SELECT'],[0],
  'Snowpipe now uses volume-based credit-per-GB billing. The earlier per-second/per-core model is historical, and Snowpipe does not require an assigned warehouse.',
  'user-guide/data-load-snowpipe-billing');
add('2.2','Trust Center',
  'An administrator wants to identify security risks such as overly privileged roles or insecure authentication settings. Which feature should they inspect?',
  ['Trust Center','Query Acceleration Service','A materialized view','COPY validation mode'],[0],
  'Trust Center evaluates account security with scanners and findings. It is not a query optimizer or load validator.',
  'user-guide/trust-center/overview');
add('2.2','Trust Center',
  'A Trust Center scanner reports a security finding. What is the appropriate interpretation?',
  ['Investigate the reported condition and recommended remediation','Every reported risk has already been fixed automatically','The account has failed the SnowPro certification exam','All SQL queries must be cancelled'],[0],
  'A finding describes a potential security risk and guidance for reducing it. Detection alone does not establish that remediation has occurred.',
  'user-guide/trust-center/overview');
add('2.1','Authentication policies',
  'A security team wants to control which authentication methods users may use. Which policy type addresses this requirement?',
  ['Authentication policy','Masking policy','Row access policy','Aggregation policy'],[0],
  'Authentication policies govern sign-in methods and related restrictions. Data policies govern access to data or query outputs.',
  'user-guide/authentication-policies');
add('2.1','Service users',
  'An unattended application uses a Snowflake user of TYPE=SERVICE. Which authentication approach is suitable?',
  ['Key-pair authentication','A shared human password and manual push approval','Password-only login','An interactive MFA prompt for every scheduled run'],[0],
  'SERVICE users cannot authenticate with a password. Key-pair authentication is a supported non-interactive alternative; protect and rotate the private key.',
  'user-guide/security-mfa-rollout');
add('2.1','MFA',
  'A human user signs into Snowsight using a Snowflake password. What additional requirement applies under mandatory MFA enforcement?',
  ['A second authentication factor','A clustering key','A dedicated warehouse for authentication','Membership in ACCOUNTADMIN'],[0],
  'Password sign-ins by human users require MFA under enforcement. Administrative privileges and compute configuration are not authentication factors.',
  'user-guide/security-mfa-rollout');
add('2.2','Data lineage',
  'Before changing a source column, an engineer wants to investigate the downstream objects that depend on its data. Which capability is most relevant?',
  ['Data lineage','Auto-resume','File compression','Warehouse scaling policy'],[0],
  'Lineage helps investigate data movement and dependencies, which informs impact analysis. It does not replace validating the planned change.',
  'user-guide/ui-snowsight-lineage');
add('2.2','Privacy policies',
  'A company permits aggregate analysis but wants to restrict queries from revealing contributions of individual entities. Which policy family is designed for differential privacy?',
  ['Privacy policies','Network policies','Password policies','Session policies'],[0],
  'Privacy policies configure differential privacy protections. Network, password, and session policies address connection and authentication controls.',
  'user-guide/diff-privacy/differential-privacy-admin-privacy-policies');
add('4.1','Query Insights',
  'An analyst wants Snowflake-generated observations about conditions hurting a query, together with suggested next steps. Which feature provides these?',
  ['Query Insights','Time Travel','A file format','A database role'],[0],
  'Query Insights provides detected conditions and recommendations. The recommendations still need to be evaluated against the workload.',
  'user-guide/query-insights');
add('4.1','Query Insights',
  'Query Insights identifies an exploding join. What should the developer investigate first?',
  ['Join predicates and the cardinality of matching rows','The default file extension for exports','The account MFA enrollment setting','The age of a Git commit'],[0],
  'An exploding join can produce many more rows than expected. Inspect the join condition and data relationships before simply adding compute.',
  'user-guide/query-insights');
add('4.1','Query attribution',
  'A team needs warehouse compute credits attributed to individual queries. Which ACCOUNT_USAGE view is designed for that analysis?',
  ['QUERY_ATTRIBUTION_HISTORY','LOGIN_HISTORY','TABLE_STORAGE_METRICS','POLICY_REFERENCES'],[0],
  'QUERY_ATTRIBUTION_HISTORY provides query-level compute attribution. Login events, storage metrics, and policy assignments answer different questions.',
  'sql-reference/account-usage/query_attribution_history');
add('4.1','Query attribution',
  'Why can the sum of CREDITS_ATTRIBUTED_COMPUTE differ from total warehouse credits billed?',
  ['Query attribution excludes warehouse idle time','Every query is free when run twice','Storage bytes are counted as compute credits','Attribution includes all account storage charges'],[0],
  'CREDITS_ATTRIBUTED_COMPUTE attributes query execution compute, not warehouse idle time. It is not a complete account bill.',
  'sql-reference/account-usage/query_attribution_history');
add('5.2','Data Clean Rooms',
  'Two companies want to collaborate on analysis while controlling how their sensitive datasets may be used. Which Snowflake capability is designed for this pattern?',
  ['Data Clean Rooms','Unrestricted public file URLs','Warehouse auto-suspend','A CSV file format'],[0],
  'Data Clean Rooms support controlled collaboration. Participants must configure the permitted analyses and policies; they do not simply publish raw data.',
  'user-guide/cleanrooms/introduction');
add('5.3','Native Apps',
  'A provider wants to distribute data together with application logic to other Snowflake accounts. Which framework fits?',
  ['Snowflake Native App Framework','A bare CSV unload','A network policy','A resource monitor'],[0],
  'Native Apps package application logic and data for consumers. A data export alone does not distribute a Snowflake application.',
  'developer-guide/native-apps/native-apps-about');
add('5.3','Native Apps',
  'How can a provider distribute a Snowflake Native App to selected consumers rather than advertise it publicly?',
  ['Use a private listing','Publish the consumer password','Make all underlying tables PUBLIC','Disable role-based access control'],[0],
  'Private listings support distribution to specific consumers. Publication does not require disclosing credentials or removing access controls.',
  'developer-guide/native-apps/native-apps-about');
add('5.3','Listings',
  'A provider wants a data product to be discoverable by potential customers in Snowflake Marketplace. Which mechanism should it use?',
  ['A public Marketplace listing','A local temporary table','A session variable','A warehouse cache'],[0],
  'A public listing makes a data product discoverable in the Marketplace, subject to its access and commercial terms. Discoverability does not mean unrestricted access.',
  'collaboration/collaboration-listings-about');
add('1.6','Cortex Search and Analyst',
  'A support team needs retrieval over product manuals for a retrieval-augmented generation application. Which Cortex service is the closest fit?',
  ['Cortex Search','Cortex Analyst for relational business questions','Warehouse metering','Database failover'],[0],
  'Cortex Search provides retrieval over searchable content. Cortex Analyst focuses on natural-language questions about structured data.',
  'user-guide/snowflake-cortex/cortex-search/cortex-search-overview');
add('1.6','Cortex Search and Analyst',
  'Business users want to ask questions about governed sales metrics in natural language and obtain SQL-based answers. Which service fits?',
  ['Cortex Analyst','Snowpipe Streaming','Automatic Clustering','Fail-safe'],[0],
  'Cortex Analyst uses semantic context to answer business questions over structured data. It is distinct from ingestion, clustering, and disaster recovery.',
  'user-guide/snowflake-cortex/cortex-analyst');
add('1.6','Snowflake ML',
  'A data science team needs tools for developing and managing machine learning models in Snowflake. Which offering addresses this lifecycle?',
  ['Snowflake ML','A direct share alone','COPY validation mode','A session policy'],[0],
  'Snowflake ML provides model development and operational capabilities. Sharing, file validation, and session controls do not provide an ML lifecycle.',
  'developer-guide/snowflake-ml/overview');
add('1.6','Streamlit',
  'A Python developer wants to deliver an interactive data application hosted inside Snowflake. Which feature is intended for that use?',
  ['Streamlit in Snowflake','A directory table','A network rule','A failover group'],[0],
  'Streamlit in Snowflake runs interactive Python data apps. Hosting the app does not replace data access permissions or compute requirements.',
  'developer-guide/streamlit/about-streamlit');
add('1.6','Notebooks',
  'An analyst wants an interactive document combining executable SQL, Python, and explanatory Markdown cells. Which Snowflake interface fits?',
  ['Snowflake Notebooks','Trust Center findings','A file format definition','A resource monitor'],[0],
  'Notebooks combine executable cells and narrative text for data exploration and development.',
  'user-guide/ui-snowsight/notebooks');
add('1.6','Snowpark',
  'A developer uses Snowpark DataFrames for data transformations. What is a key architectural benefit?',
  ['Processing can execute in Snowflake close to the data','All table data must first be exported to the developer laptop','Every operation bypasses role-based access control','A separate Spark cluster is always mandatory'],[0],
  'Snowpark brings supported-language processing to Snowflake. It does not inherently require exporting whole datasets or operating a separate Spark cluster.',
  'developer-guide/snowpark/index');
add('1.5','Iceberg',
  'A company wants an open table format that can interoperate with other data engines. Which Snowflake-supported table format addresses that requirement?',
  ['Apache Iceberg','A temporary native table solely because it is temporary','A secure view solely because it hides its definition','A directory table containing file metadata'],[0],
  'Iceberg is an open table format. Temporary status, secure views, and directory metadata address different concerns.',
  'user-guide/tables-iceberg');
add('3.3','Git',
  'A remote Git repository has new commits, but the Snowflake repository clone is out of date. Which operation updates the clone?',
  ['ALTER GIT REPOSITORY project_repo FETCH','ALTER WAREHOUSE project_repo RESUME','COPY INTO project_repo','UNDROP DATABASE project_repo'],[0],
  'FETCH updates the Snowflake repository clone from its remote. Warehouse, loading, and recovery commands do not synchronize Git content.',
  'developer-guide/git/git-operations');
add('3.3','Git',
  'Why connect a Git repository to Snowflake development workflows?',
  ['To use version-controlled code within supported Snowflake development tools','To replace all database backups','To make warehouse execution free','To grant every repository user ACCOUNTADMIN'],[0],
  'Git integration supports versioned development. Git history is not a database backup and does not eliminate compute costs or access controls.',
  'developer-guide/git/git-overview');
add('2.2','Alerts',
  'An operations team wants Snowflake to evaluate a condition on a schedule and take an action when the condition holds. Which object is designed for this?',
  ['An alert','An internal user stage','A sequence','A file format'],[0],
  'A scheduled alert combines a condition and an action. It is distinct from file storage and identifier generation.',
  'user-guide/alerts');
add('2.2','Notifications',
  'A team needs a reusable Snowflake object describing how notifications reach a supported external destination. Which object should it investigate?',
  ['Notification integration','Clustering key','Dynamic table target lag','Query result cache'],[0],
  'Notification integrations configure supported delivery destinations. They are separate from conditions that trigger an alert.',
  'user-guide/notifications/about-notifications');
add('1.3','Parameter precedence',
  'An inheritable session parameter has an account default and an explicit value in the current session. Which value governs that session?',
  ['The explicit session value','The account value always overrides the session','The value from another user session','The oldest value in query history'],[0],
  'For session parameters that support these levels, the explicit session setting overrides inherited defaults. Not every parameter can be set at every level.',
  'sql-reference/parameters');
add('1.3','Session context',
  'A worksheet uses the wrong database for unqualified object names. Which command changes the current database?',
  ['USE DATABASE analytics','ALTER WAREHOUSE analytics RESUME','USE ROLE analytics','CREATE SHARE analytics'],[0],
  'USE DATABASE changes database context. Role and warehouse selection govern different parts of the session.',
  'sql-reference/sql/use-database');
add('4.4','Window functions',
  'An analyst needs each employee row together with a ranking within that employee\'s department. Which construct fits without collapsing each department to one row?',
  ['A window function using OVER (PARTITION BY department ORDER BY salary DESC)','GROUP BY department alone','A file format','A network policy'],[0],
  'Window functions compute results across related rows while retaining row-level output. GROUP BY alone collapses rows into groups.',
  'user-guide/functions-window-using');
add('4.4','Semi-structured data',
  'A VARIANT column contains an array of line items. An analyst wants one output row per array element. Which function should be used?',
  ['FLATTEN','TO_BOOLEAN','CURRENT_ROLE','GET_DDL'],[0],
  'FLATTEN expands arrays or objects into rows. LATERAL can correlate the resulting rows with their source row.',
  'sql-reference/functions/flatten');
add('4.3','Caching',
  'A warehouse is suspended after running a query. Which distinction is correct?',
  ['Warehouse-local data cache is lost; persisted query results have separate reuse rules','Suspension permanently deletes the source tables','Suspension automatically extends Time Travel','Both caches become permanent backups'],[0],
  'Warehouse cache depends on running compute. Persisted results are separate and may be reused when the documented conditions hold.',
  'user-guide/performance-query-warehouse-cache');
add('4.2','Optimization choices',
  'A query repeatedly returns a handful of rows from a huge table using highly selective equality filters. Which service is specifically designed to help these lookups?',
  ['Search optimization service','Fail-safe','Snowpipe auto-ingest','A network policy'],[0],
  'Search optimization maintains access paths for supported selective lookups. It adds maintenance and storage costs, so evaluate the workload benefit.',
  'user-guide/search-optimization-service');
add('4.2','Query acceleration',
  'An eligible query has expensive portions of scan processing. What can the Query Acceleration Service do?',
  ['Offload eligible work to shared compute resources','Turn every query into a metadata-only operation','Replace data retention policies','Guarantee a fixed speedup for every SQL statement'],[0],
  'QAS can accelerate eligible work using additional resources. Eligibility, speedup, and cost depend on the query.',
  'user-guide/query-acceleration-service');
add('2.1','Database roles',
  'A team wants to package privileges within one database, then make those privileges available to account roles. Which role type fits?',
  ['Database role','A warehouse size','A file format','A query tag'],[0],
  'Database roles scope privileges to a database and can be granted to account roles. They are not directly activated as the session role.',
  'user-guide/security-access-control-overview');
add('2.1','Secondary roles',
  'With secondary roles enabled, which role supplies authorization for creating a new object and becomes its owner by default?',
  ['The active primary role','Every active secondary role jointly','PUBLIC regardless of the session','The oldest role assigned to the user'],[0],
  'CREATE authorization and default ownership come from the primary role. Secondary roles can contribute privileges for other operations.',
  'user-guide/security-access-control-overview');
add('2.3','Resource monitors',
  'A team wants a resource monitor to stop all serverless services when its warehouse budget is exhausted. What should the administrator explain?',
  ['Resource monitors control assigned warehouse usage, not all serverless spending','Resource monitors automatically stop every Cortex call','A resource monitor deletes tables when its quota is reached','A warehouse resource monitor controls all external cloud bills'],[0],
  'Resource monitors are not a universal serverless spending cap. Review the supported cost controls for each service.',
  'user-guide/resource-monitors');
add('5.1','Recovery',
  'A permanent table was accidentally dropped and is still within its configured Time Travel retention period. What is the direct recovery command?',
  ['UNDROP TABLE','GET','CREATE PIPE','ALTER WAREHOUSE RESUME'],[0],
  'UNDROP restores an eligible dropped table within Time Travel. Fail-safe is a later recovery mechanism managed by Snowflake, not the first self-service step.',
  'sql-reference/sql/undrop-table');
add('5.1','Cloning',
  'A team clones a native table and later changes the original. Which statement describes the relationship?',
  ['The clone is independent; later changes to the original are not automatically synchronized','The clone is a continuously synchronized view','Every source update must also update the clone','Cloning always duplicates all stored data immediately'],[0],
  'A zero-copy clone initially shares storage but is an independent object. Later changes can create additional storage; cloning is not replication.',
  'user-guide/object-clone');
add('5.2','Sharing',
  'A consumer queries shared data using its own Snowflake account and warehouse. Who pays for that warehouse compute?',
  ['The consumer','The provider in every case','Snowflake absorbs all compute costs','No compute is needed for shared tables'],[0],
  'The consumer pays for its own query compute. Provider-managed reader accounts have a different billing arrangement.',
  'user-guide/data-sharing-intro');
add('5.2','Reader accounts',
  'A provider creates a reader account for a partner without its own Snowflake account. Which statement is correct?',
  ['The provider is responsible for compute charges incurred by its reader account','Reader account queries never consume compute','The reader account can load arbitrary new datasets like a full account','The provider must email its ACCOUNTADMIN password'],[0],
  'Reader accounts enable consumption of provider-shared data. Their compute is billed to the provider and their operations are restricted.',
  'user-guide/data-sharing-reader-create');
add('3.1','Load validation',
  'A team wants COPY INTO <table> to check staged files for errors without inserting rows. What should it use?',
  ['VALIDATION_MODE with an appropriate supported value','FORCE = TRUE alone','PURGE = TRUE alone','A larger warehouse alone'],[0],
  'Validation mode checks supported loads without loading the rows. FORCE requests reloading; PURGE removes successfully loaded files.',
  'sql-reference/sql/copy-into-table');
add('3.1','External stages',
  'An administrator drops a named external stage that points to an S3 bucket. What happens to the files in that bucket?',
  ['They remain in the external storage location','They are purged by DROP STAGE','They move into Snowflake Fail-safe','They become native Snowflake tables'],[0],
  'Dropping the external stage removes its Snowflake object, not the external files. Dropping an internal stage does remove its staged files.',
  'sql-reference/sql/drop-stage');
add('3.3','Storage integrations',
  'A team wants controlled access to external cloud storage without embedding long-lived cloud credentials in each external stage definition. What should it configure?',
  ['A storage integration with the required cloud permissions','A clustering key','A temporary table','A query result cache'],[0],
  'A storage integration connects Snowflake to authorized storage locations through configured cloud identity and permissions. Access still requires correct grants.',
  'sql-reference/sql/create-storage-integration');
add('3.2','Streams and tasks',
  'A pipeline uses a stream to track table changes and a task to process them. What are their respective responsibilities?',
  ['The stream exposes changes; the task executes processing','The task is a file format and the stream is a warehouse','The stream automatically executes all MERGE statements','Both objects are backups of the entire account'],[0],
  'Streams provide change data; tasks run SQL or procedural processing. Defining a stream alone does not execute a consumer pipeline.',
  'user-guide/streams-intro');
add('4.1','Pruning',
  'Query Profile shows a selective query scanning nearly all table micro-partitions. Which investigation is most relevant?',
  ['Whether filters and data organization allow effective pruning','Whether every user has ACCOUNTADMIN','Whether the result was exported to CSV','Whether MFA uses an authenticator app'],[0],
  'Pruning skips irrelevant micro-partitions. Inspect predicates, data distribution, and clustering before deciding on an optimization.',
  'user-guide/ui-snowsight-activity');
add('4.1','Spilling',
  'Query Profile reports substantial bytes spilled to local and remote storage. Which two responses can help? (Choose two.)',
  ['Test a larger warehouse','Reduce the working set or process smaller batches','Disable all access controls','Increase the Time Travel retention period'],[0,1],
  'Spilling indicates intermediate data did not fit in memory. More memory or a smaller working set may help; measure the cost and performance tradeoff.',
  'user-guide/performance-query-warehouse-memory');
add('4.4','JSON paths',
  'An unquoted VARIANT column SRC contains {"customer":{"name":"Ana"}}. Which two expressions access the name? (Choose two.)',
  ['src:customer.name','SRC:customer.name','src:CUSTOMER.name','src:customer.NAME'],[0,1],
  'Unquoted SQL column identifiers are case-insensitive, but JSON element names are case-sensitive.',
  'user-guide/querying-semistructured');
add('1.5','Table lifetimes',
  'A staging dataset must survive the current session but can be reconstructed and does not need Fail-safe. Which table type fits?',
  ['Transient','Temporary','A standard view with no stored data','A directory table'],[0],
  'Transient tables persist beyond a session without Fail-safe. Temporary tables are session-scoped.',
  'user-guide/tables-temp-transient');
add('1.4','Workload isolation',
  'A bulk loading workload interferes with business reporting queries. Which design provides compute isolation?',
  ['Use separate warehouses for loading and reporting','Put all users in the PUBLIC role','Increase Time Travel retention','Store reports in an internal stage'],[0],
  'Separate warehouses isolate compute resources while accessing shared stored data. Roles and retention do not provide compute isolation.',
  'user-guide/warehouses-considerations');

// Second focused batch: connectivity, access control and app distribution.
add('3.3','Python connectivity',
  'An existing Python application uses DB-API connections and cursors to execute SQL. Which Snowflake component fits this interface without requiring a Spark runtime?',
  ['Snowflake Connector for Python','Snowflake Connector for Spark','Snowflake JDBC driver','A Snowflake Native App application package'],[0],
  'The Python connector implements Python Database API v2 (PEP-249), including connections and cursors. The Spark connector targets Spark, JDBC targets Java interfaces, and an application package distributes an app.',
  'developer-guide/python-connector/python-connector');
add('3.3','JDBC connectivity',
  'A Java reporting service already uses JDBC to access databases. Which component should it use to connect directly to Snowflake?',
  ['Snowflake JDBC driver','Snowflake Connector for Python','Snowflake Connector for Spark','Snowflake CLI as a JDBC library'],[0],
  'Snowflake supplies a type 4 JDBC driver for JDBC applications. Python and Spark connectors target different interfaces; the CLI is a command-line tool, not a JDBC library.',
  'developer-guide/jdbc/jdbc');
add('2.1','Managed access schemas',
  'A developer owns a table in a managed access schema but has neither schema ownership nor MANAGE GRANTS. Who can grant another role SELECT on that table?',
  ['The schema owner or a role with MANAGE GRANTS','The table owner solely because it owns the table','Any role with USAGE on the schema','Any role with SELECT on the table'],[0],
  'Managed access schemas centralize grant decisions with the schema owner and roles holding MANAGE GRANTS. Table ownership alone does not authorize those decisions; USAGE or SELECT alone is also insufficient.',
  'user-guide/security-access-control-overview');
add('2.1','Role inheritance',
  'An administrator executes GRANT ROLE analyst TO ROLE lead. The analyst role has SELECT on a table. What is the direction of privilege inheritance?',
  ['The lead role inherits privileges from analyst','The analyst role inherits all privileges from lead','Both roles inherit every privilege from each other','The grant transfers table ownership to lead'],[0],
  'Granting a role to another role makes the receiving role inherit the granted role\'s privileges. Inheritance runs upward through the role hierarchy; this grant does not transfer object ownership.',
  'user-guide/security-access-control-overview');
add('2.1','Session role context',
  'A user has two account roles and wants to change the primary role of the current SQL session. Which statement serves that purpose?',
  ['USE ROLE reporting_role','USE SECONDARY ROLES ALL','GRANT ROLE reporting_role TO USER analyst','ALTER WAREHOUSE reporting_wh RESUME'],[0],
  'USE ROLE changes the active primary role. USE SECONDARY ROLES changes secondary roles; granting a role assigns it but does not itself switch the current session role. Resuming a warehouse changes compute state.',
  'user-guide/security-access-control-overview');
add('5.3','Native App packaging',
  'A provider needs to package application logic and data content for distribution as a Snowflake Native App. Which object encapsulates the application for this purpose?',
  ['An application package','A consumer-installed application instance','A secure view alone','A virtual warehouse'],[0],
  'The provider creates an application package containing the application content and setup information. A consumer application is an installed instance; a view alone cannot package application logic, and a warehouse provides compute.',
  'developer-guide/native-apps/native-apps-about');
add('5.3','Private app distribution',
  'A provider wants to distribute a Snowflake Native App only to named customer accounts. Which distribution approach fits?',
  ['A private listing addressed to those consumers','A public Marketplace listing for discovery by all consumers','Granting PUBLIC access to the provider account','Exporting only the app tables to CSV'],[0],
  'Native Apps can be distributed to specific consumers through private listings. Public Marketplace publication serves broader discovery; PUBLIC privileges and CSV exports do not provide the requested private app distribution.',
  'developer-guide/native-apps/native-apps-about');
add('5.3','Application versus data sharing',
  'A vendor wants consumers to receive both data and packaged business logic, including stored procedures and a Streamlit interface. Which Snowflake feature is designed for this delivery?',
  ['Snowflake Native App Framework','A secure share containing only tables','A storage integration','A resource monitor'],[0],
  'Native Apps package data with application logic and can include Streamlit interfaces. A tables-only share exposes data, a storage integration authorizes cloud storage access, and a resource monitor tracks warehouse credit use.',
  'developer-guide/native-apps/native-apps-about');
add('5.3','Listing visibility and price',
  'A provider has agreed commercial terms directly with a customer and wants to make data available only to that customer. Must the provider make the listing public or charge through Snowflake?',
  ['No; a free private listing can support an existing business relationship or separately negotiated payment terms','Yes; every private listing must use Snowflake billing','Yes; commercially used data must be publicly listed','No; but private listings can only contain synthetic data'],[0],
  'Listing visibility and commercial arrangements are separate. Snowflake documents free private listings for consumers with existing relationships or negotiated payment terms; private listings are not restricted to synthetic data.',
  'collaboration/collaboration-listings-about');
add('5.3','Native App participants',
  'In the Snowflake Native App Framework, which pairing correctly describes the provider and the consumer?',
  ['The provider packages and shares application content; the consumer accesses the shared application content and logic','The provider must be Snowflake itself; every customer is only a consumer','The consumer creates the provider\'s application package before installation','The provider supplies compute only; the consumer supplies all application logic'],[0],
  'The framework defines a provider as the party sharing application data and logic, and a consumer as the party accessing it. Providers can be Snowflake customers; the consumer does not create the provider\'s package.',
  'developer-guide/native-apps/native-apps-about');
