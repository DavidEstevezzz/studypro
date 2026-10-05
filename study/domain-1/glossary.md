# Domain 1 Glossary — Architecture & Features (COF-C03)

Alphabetical list of the keywords used in Domain 1 questions. Each entry has the **English term** (as written in the exam), a short Spanish equivalent in *italics* when it helps, the objective it belongs to (see the [syllabus](syllabus.md)), and a one- or two-line definition.

⚠️ = name, limit or interface that changes frequently.

---

## A

- **10% adjustment (cloud services)** — *ajuste del 10%* · 1.1 — Cloud services credits are billed only for the part of daily usage above 10% of that day's warehouse compute.
- **ABORT ALL QUERIES** · 1.4 — `ALTER WAREHOUSE wh ABORT ALL QUERIES` cancels every statement running or queued on a warehouse (needs OPERATE).
- **Access control** — *control de acceso* · 1.1 — Cloud services function that checks privileges for every action (RBAC + DAC). Detailed in Domain 2.1.
- **ACCOUNT_USAGE** · 1.3 — Schema in the shared `SNOWFLAKE` database with account-wide views; **365 days** of history, includes dropped objects, **45 min–3 h latency**; ACCOUNTADMIN by default.
- **Account** — *cuenta* · 1.1/1.3 — A Snowflake deployment on one cloud platform and region; top container of databases, users, roles and warehouses.
- **Account identifier** · 1.1 — How an account is addressed: preferred `orgname-account_name`; legacy **account locator**.
- **Account locator** · 1.1 — Legacy system-assigned account ID (e.g. `xy12345`), unique within a region.
- **Account-level object** — *objeto de cuenta* · 1.3 — Object that lives directly in the account, not in a schema: users, roles, warehouses, resource monitors, databases, shares, integrations, network policies, external volumes, compute pools.
- **Account parameter** · 1.3 — Parameter set with `ALTER ACCOUNT` that applies to the whole account (e.g. `MIN_DATA_RETENTION_TIME_IN_DAYS`).
- **AI_AGG** · 1.6 — Cortex function that aggregates a text column across rows guided by a prompt.
- **AI_CLASSIFY** · 1.6 — Classifies text or images into **user-defined categories**.
- **AI_COMPLETE** · 1.6 — General LLM completion function for text/images; **first argument is the model**; recommended for most generative tasks; replaces `COMPLETE`.
- **AI_COUNT_TOKENS** · 1.6 — Returns the number of tokens of an input for a model/function, to avoid exceeding limits.
- **AI_EMBED** · 1.6 — Generates an **embedding vector** for text or an image.
- **AI_EXTRACT** · 1.6 — Extracts structured information/fields from text or documents.
- **AI_FILTER** · 1.6 — Returns TRUE/FALSE for a natural-language condition; used in WHERE/JOIN.
- **AI_PARSE_DOCUMENT** · 1.6 — Extracts text (**OCR** mode) or text + layout (**LAYOUT** mode) from staged documents.
- **AI_REDACT** · 1.6 — Removes **PII** from text.
- **AI_SENTIMENT** · 1.6 — Sentiment scoring (overall and per aspect).
- **AI_SIMILARITY** · 1.6 — Computes embedding similarity between two inputs directly.
- **AI_SUMMARIZE_AGG** · 1.6 — Summarizes a text column **across many rows** into one summary.
- **AI_TRANSCRIBE** · 1.6 — Transcribes staged **audio/video** (text, timestamps, speakers).
- **AI_TRANSLATE** · 1.6 — Translates text between languages.
- **AISQL (Cortex AI SQL / AI Functions)** · 1.6 — Family of SQL functions (`AI_*`) that call Snowflake-hosted LLMs; optimized for batch throughput.
- **ANOMALY_DETECTION** · 1.6 — Snowflake ML function that detects outliers in time-series data.
- **Apache Iceberg™** · 1.5 — Open table format (Parquet data + metadata files) that other engines can read/write; basis of Iceberg tables.
- **API integration** · 1.3/1.6 — Account-level object storing the credentials/endpoint info needed by **external functions** (and Git repositories) to reach a proxy/remote service.
- **Auto-resume (AUTO_RESUME)** · 1.4 — Warehouse property; resumes the warehouse automatically when a statement is submitted. Default TRUE.
- **Auto-scale mode** · 1.4 — Multi-cluster mode with `MIN_CLUSTER_COUNT < MAX_CLUSTER_COUNT`; Snowflake starts/stops clusters according to load.
- **Auto-suspend (AUTO_SUSPEND)** · 1.4 — Seconds of inactivity after which the warehouse suspends. Default **600**; `0`/NULL = never.
- **Automatic Clustering** · 1.5 — Serverless background service that reclusters a table according to its clustering key, without blocking DML; consumes credits.
- **AUTOINCREMENT / IDENTITY** · 1.3 — Column property that generates values from an internal sequence.
- **average_overlaps** · 1.5 — Field of `SYSTEM$CLUSTERING_INFORMATION`: average number of micro-partitions whose value ranges overlap with each micro-partition.
- **AWS PrivateLink** · 1.1 — Private connectivity to Snowflake on AWS without the public internet; **Business Critical**+.
- **Azure Private Link** · 1.1 — Azure equivalent of PrivateLink; Business Critical+.

## B

- **BAA (Business Associate Agreement)** · 1.1 — Contract required with Snowflake before storing PHI (HIPAA) in a Business Critical account.
- **Business Critical Edition** · 1.1 — Edition for regulated/sensitive data: HIPAA/PCI support, Tri-Secret Secure, private connectivity, failover/failback, Client Redirect.

## C

- **CALL** · 1.3 — Command to execute a stored procedure. One procedure per statement.
- **Caller's rights** — *derechos del invocador* · 1.3 — Procedure runs with the caller's privileges and session context (`EXECUTE AS CALLER`); can access session variables.
- **Capacity pricing** · 1.1 — Pre-purchased Snowflake capacity (vs On-Demand).
- **Catalog integration** · 1.5 — Account-level object that connects Snowflake to an external Iceberg catalog (AWS Glue, REST catalog, Open Catalog, object storage).
- **CATALOG = 'SNOWFLAKE'** · 1.5 — Parameter value that makes Snowflake the Iceberg catalog (Snowflake-managed Iceberg table, full read/write).
- **Classic Console** · 1.2 — The old web UI, replaced by Snowsight.
- **Client Redirect** · 1.1 — Redirects client connections to a secondary account during failover; Business Critical+.
- **Cloud platform** · 1.1 — AWS, Microsoft Azure or Google Cloud Platform.
- **Cloud services layer** — *capa de servicios en la nube* · 1.1 — The "brain": authentication, infrastructure management, metadata management, query parsing & optimization, access control; also result cache and DDL.
- **Cluster (warehouse)** · 1.4 — One set of compute resources of a given size; a multi-cluster warehouse has several of them.
- **Clustering** · 1.5 — How data is grouped and stored within micro-partitions.
- **Clustering depth** · 1.5 — Average depth of overlapping micro-partitions for given columns; lower = better clustered.
- **Clustering key** · 1.5 — Columns/expressions designated to co-locate related rows in very large tables (`CLUSTER BY`). Not an index.
- **Column-level security** · 1.1 — Dynamic Data Masking + External Tokenization; **Enterprise**+.
- **Columnar format** — *formato columnar* · 1.1/1.5 — Data stored by column inside micro-partitions; only referenced columns are scanned.
- **Compression** · 1.5 — Automatic, per column, chosen by Snowflake; storage is billed on compressed size.
- **Compute layer (query processing)** — *capa de cómputo* · 1.1 — Virtual warehouses that execute queries.
- **Compute pool** · 1.6 — Account-level set of VM nodes for Snowpark Container Services (and container runtime notebooks/ML).
- **Concurrency** — *concurrencia* · 1.4 — Number of queries running at the same time; handled by scaling **out** (multi-cluster).
- **Constraints** · 1.5 — Only NOT NULL is enforced on standard tables; PK/UNIQUE/FK are informational (enforced on hybrid tables).
- **Container runtime** · 1.6 — Pre-built ML environment on Snowpark Container Services (CPU/GPU) for notebooks and ML jobs.
- **Cortex** (Snowflake Cortex) · 1.6 — Snowflake's fully managed AI service: AISQL functions, Search, Analyst, Agents, fine-tuning.
- **Cortex Agents** · 1.6 — Orchestrates Cortex Search, Cortex Analyst and tools to answer complex requests.
- **Cortex Analyst** · 1.6 — Natural-language questions over **structured data** → SQL answers, based on a semantic model/semantic view.
- **Cortex Guard** · 1.6 — Option that filters unsafe LLM output.
- **Cortex REST API** · 1.6 — HTTP access to Complete/Embed/Agents for **low-latency interactive** use.
- **Cortex Search** · 1.6 — Hybrid (vector + keyword) search service over unstructured text; retrieval for **RAG**.
- **CORTEX_USER** · 1.6 — `SNOWFLAKE.CORTEX_USER` database role required to call Cortex functions (granted to PUBLIC by default ⚠️).
- **Credit** — *crédito* · 1.1/1.4 — Unit of compute consumption (warehouses, serverless, cloud services).
- **CURRENT_ROLE() / CURRENT_WAREHOUSE() / CURRENT_DATABASE() / CURRENT_SCHEMA()** · 1.3 — Context functions returning the session's current values.

## D

- **Dashboard** · 1.2 — Snowsight object with chart tiles built from queries; shared within Snowsight.
- **Data transfer (egress)** · 1.1 — Cost of moving data out of a region/cloud; ingress is free.
- **Database** · 1.3 — Account-level container of schemas.
- **Database role** · 1.3 — Role defined inside a database; useful for sharing and app privileges.
- **Database storage layer** — *capa de almacenamiento* · 1.1 — Cloud object storage holding data in compressed columnar micro-partitions, managed by Snowflake.
- **DDL** · 1.4 — Data definition statements (`CREATE`, `ALTER`, `DROP`); metadata operations handled by cloud services, no warehouse needed.
- **Default namespace / role / warehouse** · 1.3 — User properties (`DEFAULT_NAMESPACE`, `DEFAULT_ROLE`, `DEFAULT_WAREHOUSE`) applied at login.
- **DESCRIBE (DESC)** · 1.3 — Shows details of one object.
- **Directory table** · 1.5 — Implicit catalog of files on a stage (path, size, URL), enabled on the stage.
- **DML** · 1.4 — `INSERT`, `UPDATE`, `DELETE`, `MERGE`; requires a running warehouse.
- **Document AI** ⚠️ · 1.6 — Legacy document extraction feature, superseded by AI_EXTRACT.
- **DROP CLUSTERING KEY** · 1.5 — `ALTER TABLE t DROP CLUSTERING KEY` removes the key.
- **Dynamic Data Masking** · 1.1 — Masking policies that hide column values at query time by role; Enterprise+.
- **Dynamic table** · 1.5 — Table defined by a query, automatically refreshed to a `TARGET_LAG` with a specified warehouse; supports joins.

## E

- **Economy scaling policy** · 1.4 — Starts a new cluster only if there's enough load to keep it busy ≥ **6 minutes**; conserves credits, keeps clusters fully loaded.
- **Edition** — *edición* · 1.1 — Standard, Enterprise, Business Critical, Virtual Private Snowflake.
- **Embedding** · 1.6 — Numeric vector representing meaning of text/images; stored in VECTOR columns.
- **Enterprise Edition** · 1.1 — Adds multi-cluster warehouses, 90-day Time Travel, materialized views, masking, row access policies, search optimization, QAS, periodic rekeying.
- **Event table** · 1.5 — Table that collects logs, traces and metrics from code running in Snowflake.
- **EXECUTE AS OWNER / CALLER / RESTRICTED CALLER** · 1.3 — Rights model of a stored procedure (owner's is the default).
- **EXECUTE IMMEDIATE** · 1.3 — Runs a SQL string dynamically (Snowflake Scripting).
- **EXECUTE IMMEDIATE FROM** · 1.3 — Runs a script file from a stage or Git repository; `USING (...)` renders it as a Jinja2 template.
- **External access integration** · 1.3/1.6 — Lets Python/Java/Scala UDFs and procedures call external network endpoints (with network rules and secrets).
- **External function** · 1.3/1.6 — UDF whose code runs **outside Snowflake**, called via a proxy service and an API integration; scalar; Standard+.
- **External table** · 1.5 — Read-only table whose data stays in files on an external stage; metadata in Snowflake.
- **External Tokenization** · 1.1 — Column-level security using an external tokenization provider via masking policies; Enterprise+.
- **External volume** · 1.5 — Account-level object pointing to customer cloud storage where Iceberg tables keep data/metadata; one volume serves one or more tables.

## F

- **Fail-safe** · 1.1/1.5 — 7-day, non-configurable recovery period after Time Travel, only for **permanent** tables; recovery by Snowflake Support only. Available in Standard.
- **Failover / failback** · 1.1 — Promote a secondary replica to primary in another region/cloud; Business Critical+.
- **Feature Store** · 1.6 — Snowflake ML component to define, store and serve ML features.
- **FORECAST** · 1.6 — Snowflake ML function for time-series forecasting.
- **Fully qualified name** · 1.3 — `database.schema.object`.

## G

- **Gen1 / Gen2 (standard warehouse generation)** ⚠️ · 1.4 — Gen2 uses newer hardware and software optimizations (`RESOURCE_CONSTRAINT = STANDARD_GEN_2`); benchmark time and cost before switching.
- **GET** · 1.2 — Downloads files from an internal stage to a local machine (SnowSQL/CLI/drivers, not Snowsight worksheets).
- **GET_DDL** · 1.3 — Returns the DDL that recreates an object.
- **Git repository (object)** · 1.2/1.6 — Schema object that clones a remote Git repo into Snowflake for CI/CD, notebooks, `EXECUTE IMMEDIATE FROM`.
- **Google Cloud Private Service Connect** · 1.1 — GCP private connectivity; Business Critical+.

## H

- **HIPAA / PHI** · 1.1 — US health data regulation; supported from **Business Critical** with a signed BAA.
- **Hybrid architecture** · 1.1 — Snowflake combines shared-disk (central storage) and shared-nothing (MPP compute).
- **Hybrid table** · 1.5 — Unistore table with row-based storage for low-latency point operations; primary key required and enforced.

## I

- **Iceberg table** · 1.5 — Snowflake table in Apache Iceberg format stored in your cloud storage via an external volume; Snowflake-managed or externally-managed catalog.
- **Identifier (quoted / unquoted)** · 1.3 — Unquoted names are case-insensitive and stored in uppercase; double-quoted names are case-sensitive.
- **Image repository** · 1.6 — Schema object storing container images for Snowpark Container Services.
- **Immutable** — *inmutable* · 1.5 — Micro-partitions are never modified; DML writes new ones.
- **INFORMATION_SCHEMA** · 1.3 — Read-only schema in each database with views for its objects (and account-level objects) plus table functions; no latency; short retention.
- **Infrastructure management** · 1.1 — Cloud services function that manages the underlying cloud resources.
- **INITIALLY_SUSPENDED** · 1.4 — If TRUE, a new warehouse is created suspended. Default FALSE.
- **IS_SECURE** · 1.5 — Column in SHOW VIEWS / INFORMATION_SCHEMA / ACCOUNT_USAGE that flags secure views.

## J

- **JavaScript** · 1.3/1.6 — Handler language for UDFs and stored procedures (not a Snowpark library language).
- **JDBC / ODBC** · 1.2 — Standard drivers for connecting applications/BI tools to Snowflake.
- **Jinja2 templating** · 1.3 — Template syntax applied to scripts run with `EXECUTE IMMEDIATE FROM ... USING`.

## L

- **Lazy evaluation** · 1.6 — Snowpark DataFrame operations execute only when an action (e.g. `collect()`, `show()`) runs.
- **LIST** · 1.3 — `LIST @stage` lists files in a stage (metadata operation).
- **Local disk cache / warehouse cache** · 1.1/1.4 — SSD cache of table data on warehouse nodes; lost on suspend.

## M

- **Managed access schema** · 1.3 — Schema where only the schema owner (or MANAGE GRANTS) grants privileges on contained objects.
- **Materialized view** · 1.5 — View that stores a pre-computed result, maintained automatically by a serverless service; always current; single base table; Enterprise+.
- **MAX_CLUSTER_COUNT / MIN_CLUSTER_COUNT** · 1.4 — Limits of a multi-cluster warehouse; equal = Maximized, different = Auto-scale.
- **MAX_CONCURRENCY_LEVEL** · 1.4 — Concurrent statements per cluster before queuing; default 8.
- **Maximized mode** · 1.4 — Multi-cluster mode with MIN = MAX (> 1): all clusters run whenever the warehouse runs.
- **Metadata** — *metadatos* · 1.1/1.5 — Information about objects and micro-partitions (value ranges, distinct counts) stored in cloud services; enables pruning, Time Travel, cloning, sharing.
- **Metadata management** · 1.1 — Cloud services function maintaining object and partition information.
- **Micro-partition** · 1.5 — Automatic, immutable, compressed, columnar storage unit of 50–500 MB uncompressed.
- **Model Registry** · 1.6 — Snowflake ML component to store, version, govern and serve models.
- **MODIFY (warehouse privilege)** · 1.4 — Allows altering warehouse properties, including **resizing**.
- **MONITOR (warehouse privilege)** · 1.4 — Allows viewing queries and usage on the warehouse.
- **MPP (massively parallel processing)** · 1.1 — Processing model of warehouses: work split across nodes of a cluster.
- **Multi-cluster, shared data** · 1.1 — Official description of Snowflake's architecture.
- **Multi-cluster warehouse** · 1.4 — Warehouse with several same-size clusters to handle concurrency; Enterprise+.

## N

- **Namespace** · 1.3 — Database + schema.
- **Native App (Native Apps Framework)** · 1.6 — Packaged application (data + code) distributed via listings; installed as an account-level APPLICATION.
- **Natural clustering** · 1.5 — Clustering that results from the order data was loaded (e.g. by date).
- **NEXTVAL** · 1.3 — Gets the next value from a sequence; gaps possible.
- **Notebook (Snowflake Notebooks)** · 1.6 — Interactive SQL/Python/Markdown cells in Snowsight, integrated with Snowpark, Cortex and Git ⚠️ (moving to Notebooks in Workspaces).

## O

- **On-Demand pricing** · 1.1 — Pay-as-you-go pricing for storage and credits.
- **OPERATE (warehouse privilege)** · 1.4 — Allows starting, suspending, resuming a warehouse and aborting its queries.
- **Organization** · 1.1 — Groups a customer's accounts across clouds/regions; consolidated management and billing.
- **ORGADMIN** ⚠️ · 1.1 — Role that manages the organization (create accounts, view org usage); GLOBALORGADMIN in an organization account.
- **Overloading** · 1.3 — Several functions/procedures with the same name but different argument number or types.
- **Owner's rights** — *derechos del propietario* · 1.3 — Default procedure mode: owner's privileges, caller's warehouse, procedure's own database/schema, no access to caller session variables.

## P

- **Parameter precedence** · 1.3 — The most specific level wins (session > user > account; table > schema > database > account).
- **Partner Connect** · 1.2 — Snowsight feature to quickly start trials with ecosystem partners.
- **Periodic rekeying** · 1.1 — Automatic re-encryption of data older than a year with new keys; Enterprise+.
- **Permanent table** · 1.5 — Default table type: Time Travel (1 day; up to 90 Enterprise) + 7-day Fail-safe.
- **PROMPT** · 1.6 — Helper that builds a prompt object combining text and file placeholders for AI functions.
- **Pruning** — *poda* · 1.5 — Skipping micro-partitions whose metadata ranges can't match the query filter.
- **PUBLIC schema** · 1.3 — Default schema created in every database.
- **PUT** · 1.2 — Uploads local files to an internal stage (SnowSQL/CLI/drivers, not Snowsight worksheets).
- **Python worksheet** · 1.2/1.6 — Snowsight worksheet that runs Snowpark Python code.

## Q

- **Query Acceleration Service (QAS)** · 1.4 — Serverless offload of eligible scan-heavy query parts; Enterprise+ (Domain 4.2).
- **Query compilation** · 1.1 — Parsing and optimizing SQL into an execution plan; cloud services.
- **Query execution plan** · 1.1 — Plan produced by the optimizer in cloud services and executed by the warehouse.
- **Query History** · 1.2 — Snowsight/monitoring view of past queries: **14 days** in Snowsight; 365 days in ACCOUNT_USAGE.QUERY_HISTORY.
- **Query parsing and optimization** · 1.1 — Cloud services function.
- **Query processing layer** · 1.1 — Synonym for the compute layer.
- **Queuing** · 1.4 — Statements wait when warehouse capacity is exhausted; solved by scaling out or separating workloads.

## R

- **RAG (retrieval-augmented generation)** · 1.6 — Pattern: retrieve relevant documents (Cortex Search) and pass them to an LLM (AI_COMPLETE).
- **Recursive view** · 1.5 — View built on a recursive CTE.
- **Region** · 1.1 — Geographic location of a cloud platform where an account runs.
- **Resize** · 1.4 — Change warehouse size at any time; running queries unaffected; new size for queued/new queries.
- **RESOURCE_CONSTRAINT** ⚠️ · 1.4 — Warehouse property selecting generation (`STANDARD_GEN_1/2`) or Snowpark-optimized memory option (`MEMORY_1X/16X/64X`).
- **Resource monitor** · 1.4 — Account-level object that tracks credit usage and can notify/suspend warehouses (Domain 2.3).
- **Result cache (query result cache)** · 1.1 — Persisted query results in cloud services, reused for identical queries (24 h, up to 31 days) without warehouse compute.
- **RESULT_SCAN** · 1.3 — Table function that reads the result of a previous query (e.g. a procedure's output).
- **RETURNS TABLE** · 1.3 — Clause that defines a tabular UDF (UDTF).
- **Row access policy** · 1.1 — Row-level security policy; Enterprise+.

## S

- **Scale out** · 1.4 — Add clusters (multi-cluster) → concurrency.
- **Scale up** · 1.4 — Increase warehouse size → performance of complex queries.
- **Scaling policy** · 1.4 — Standard or Economy; controls when clusters start/stop in auto-scale mode, to control credits.
- **Schema** · 1.3 — Logical grouping of database objects inside one database.
- **Schema-level object** · 1.3 — Tables, views, stages, file formats, sequences, pipes, streams, tasks, UDFs, procedures, policies, tags, etc.
- **Search Optimization Service** · 1.1 — Serverless access paths for selective point lookups; Enterprise+ (Domain 4.2).
- **Secure UDF** · 1.3 — UDF whose definition is hidden and optimizations limited, for privacy.
- **Secure view** · 1.5 — View whose definition is hidden from non-owners and that disables data-exposing optimizations; used for privacy and sharing.
- **Secure Data Sharing** · 1.1 — Sharing live data between accounts without copying; Standard+.
- **Semantic view / semantic model** · 1.6 — Business definitions (metrics, dimensions) used by Cortex Analyst.
- **Separation of storage and compute** · 1.1 — Each scales and is billed independently; many warehouses read the same data without contention.
- **Sequence** · 1.3 — Schema object generating unique numbers; gaps possible.
- **Serverless compute** · 1.1/1.4 — Snowflake-managed compute for features like Snowpipe, Automatic Clustering, MV maintenance, serverless tasks, search optimization, QAS, replication.
- **Session** · 1.3 — A connection with its context (role, warehouse, database, schema, parameters, variables).
- **Session parameter** · 1.3 — Parameter settable at account, user and session level (e.g. `TIMEZONE`, `QUERY_TAG`).
- **Session variable** · 1.3 — `SET v = ...` / `$v`; accessible in caller's-rights procedures only.
- **Shared-disk / shared-nothing** · 1.1 — Classic architectures that Snowflake combines.
- **SHOW** · 1.3 — Lists objects visible to the current role (metadata, no warehouse).
- **Snowflake AI Data Cloud** · 1.1 — Current name of the Snowflake platform.
- **Snowflake CLI (`snow`)** · 1.2 — Newer open-source command-line tool for SQL and developer workflows (apps, Snowpark, Streamlit, notebooks).
- **Snowflake Intelligence** ⚠️ · 1.6 — Agent-based conversational experience for business users built on Cortex Agents.
- **Snowflake ML** · 1.6 — Capabilities to develop, train, deploy and manage ML models in Snowflake (ML library, Feature Store, Model Registry, ML functions).
- **Snowflake Scripting** · 1.3 — SQL procedural language (DECLARE/BEGIN/END, loops, exceptions) for procedures and anonymous blocks.
- **Snowflake SQL API** · 1.2 — REST API to submit SQL statements.
- **Snowgrid** · 1.1 — Snowflake's cross-cloud, cross-region layer for sharing, replication and failover.
- **Snowpark** · 1.6 — Libraries (Python, Java, Scala) with a DataFrame API whose operations run inside Snowflake, pushed down to SQL.
- **Snowpark Container Services (SPCS)** · 1.6 — Runs containerized services/jobs in Snowflake on compute pools.
- **Snowpark-optimized warehouse** · 1.4 — Warehouse type with much more memory per node for memory-intensive workloads (ML, large UDFs).
- **Snowsight** · 1.2 — Snowflake's web interface (worksheets, dashboards, notebooks, monitoring, admin).
- **SnowSQL** · 1.2 — Legacy command-line SQL client built on the Python connector.
- **Standard Edition** · 1.1 — Entry edition: full SQL, sharing, 1-day Time Travel, Fail-safe, encryption, external functions.
- **Standard scaling policy** · 1.4 — Default; starts clusters immediately on queuing to minimize queuing (favors performance).
- **Standard warehouse** · 1.4 — General-purpose warehouse type (Gen1 or Gen2).
- **Statement timeout (STATEMENT_TIMEOUT_IN_SECONDS)** · 1.4 — Max execution time; default 172800 s; lowest of session/warehouse applies.
- **STATEMENT_QUEUED_TIMEOUT_IN_SECONDS** · 1.4 — Max queuing time; default 0 (none).
- **Stored procedure** — *procedimiento almacenado* · 1.3 — Procedural code called with CALL; can run DDL and DML; owner's or caller's rights.
- **Streamlit in Snowflake** · 1.6 — Interactive Python data apps hosted inside Snowflake.
- **STRICT** · 1.3 — Function/procedure option: returns NULL when any input is NULL.
- **Suspend / resume** · 1.4 — Stop/start a warehouse; suspended warehouses use no credits; resume billed with 60-s minimum.
- **SYSTEM$CLUSTERING_DEPTH / SYSTEM$CLUSTERING_INFORMATION** · 1.5 — Functions that report how well a table is clustered.

## T

- **Table function (UDTF)** · 1.3 — Function returning a set of rows (`RETURNS TABLE`), used in `FROM TABLE(...)`.
- **TARGET_LAG** · 1.5 — Freshness target of a dynamic table.
- **Temporary table** · 1.5 — Exists only in the creating session; no Fail-safe; 0–1 day Time Travel.
- **Time Travel** · 1.1/1.5 — Access historical data (default 1 day; up to 90 days on Enterprise for permanent objects).
- **TO_FILE** · 1.6 — Creates a reference to a staged file for AI functions.
- **TOP_INSIGHTS** · 1.6 — ML function that identifies dimensions driving a metric change.
- **Transient table** · 1.5 — Persists until dropped; no Fail-safe; 0–1 day Time Travel.
- **Tri-Secret Secure** · 1.1 — Composite master key from a customer-managed key + Snowflake key; Business Critical+.

## U

- **UDAF** · 1.3 — User-defined aggregate function (Python).
- **UDF (user-defined function)** · 1.3 — Custom function returning a value; SQL, JavaScript, Python, Java, Scala; no DDL/DML.
- **Unistore** · 1.5 — Snowflake's transactional + analytical workload offering based on hybrid tables.
- **USAGE (warehouse privilege)** · 1.4 — Allows using a warehouse to run queries.
- **USE ROLE / USE WAREHOUSE / USE DATABASE / USE SCHEMA / USE SECONDARY ROLES** · 1.3 — Commands that set the session context.

## V

- **VECTOR data type** · 1.6 — Stores embeddings (e.g. `VECTOR(FLOAT, 768)`).
- **VECTOR_COSINE_SIMILARITY** · 1.6 — Measures semantic similarity between two vectors (also `VECTOR_L2_DISTANCE`, `VECTOR_INNER_PRODUCT`).
- **View (standard)** · 1.5 — Stored query definition, no data; recreate to change it.
- **Virtual Private Snowflake (VPS)** · 1.1 — Highest-security edition: completely isolated environment with dedicated metadata store and compute.
- **Virtual warehouse** — *almacén virtual* · 1.4 — Cluster(s) of compute that run queries, DML and loading; billed per second with 60-s minimum.
- **VS Code extension** · 1.2 — Snowflake extension to write and run SQL inside Visual Studio Code.

## W

- **WAIT_FOR_COMPLETION** · 1.4 — With `ALTER WAREHOUSE ... SET WAREHOUSE_SIZE`, TRUE makes the command return only after the resize is complete.
- **Warehouse size** · 1.4 — X-Small (1 credit/h) … 6X-Large (512 credits/h), doubling each step.
- **WAREHOUSE_TYPE** · 1.4 — `STANDARD` or `SNOWPARK-OPTIMIZED`.
- **Workload isolation** · 1.4 — Using separate warehouses per workload to avoid contention.
- **Worksheet** · 1.2 — Snowsight editor for SQL/Python with its own role/warehouse/database/schema context; shareable.
- **Workspaces** ⚠️ · 1.2 — Snowsight file-based development environment (folders, Git, notebooks).

## X

- **X-Small** · 1.4 — Smallest warehouse size (1 credit/hour); default size with `CREATE WAREHOUSE`.
