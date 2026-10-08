# Domain 3 Glossary — Data Loading, Unloading & Connectivity (COF-C03)

Alphabetical list of the keywords used in Domain 3 questions. Each entry has the **English term** (as written in the exam), a short Spanish equivalent in *italics* when it helps, the objective it belongs to (see the [syllabus](syllabus.md)), and a one- or two-line definition.

⚠️ = name, limit or interface that changes frequently.

---

## A

- **ABORT_STATEMENT** · 3.1 — Default ON_ERROR value for bulk COPY: the whole load stops at the first error.
- **ALLOWED_AUTHENTICATION_SECRETS** · 3.3 — API integration parameter listing the secrets that may be used with it (e.g. for Git).
- **ALTER GIT REPOSITORY … FETCH** · 3.3 — Updates the Snowflake clone of a Git repository with the remote's branches, tags and commits.
- **ALTER PIPE … REFRESH** · 3.2 — Queues files staged in the last 7 days that the pipe has not loaded.
- **API integration** · 3.3 — Account object defining how Snowflake reaches a proxy service (external functions) or a Git server; restricts endpoints with API_ALLOWED_PREFIXES.
- **API_ALLOWED_PREFIXES** · 3.3 — API integration parameter restricting which HTTPS endpoints Snowflake may call.
- **Append-only stream** · 3.2 — Stream that records only inserted rows; cheaper for ELT on tables, views and dynamic tables.
- **AUTO_COMPRESS** · 3.1 — PUT option, TRUE by default: uncompressed files are gzip-compressed before upload.
- **AUTO_INGEST** · 3.2 — Pipe setting that makes Snowpipe load files when cloud event notifications announce them.
- **Avro** · 3.1 — Row-oriented semi-structured format; can be loaded, not unloaded.

## B

- **BUILD_SCOPED_FILE_URL** · 3.1 — Generates a temporary scoped URL for a staged file, usable only by the user who created it; non-deterministic.
- **BUILD_STAGE_FILE_URL** · 3.1 — Generates a permanent Snowflake file URL from a stage name and relative path; access needs authentication and privileges.
- **Bulk loading** — *carga masiva* · 3.1 — Loading batches of staged files with `COPY INTO <table>` on a user-managed warehouse.

## C

- **Catalog integration** · 3.3 — Account object connecting Snowflake to an external Iceberg catalog (Glue, object storage, REST, Open Catalog); not needed when Snowflake is the catalog.
- **Change tracking** · 3.2 — Table/view property that records row-level change metadata used by streams.
- **CHANGES clause** · 3.2 — `SELECT … FROM t CHANGES(INFORMATION => DEFAULT) AT(…)`: query change-tracking data without creating a stream.
- **Cloud messaging (event notifications)** · 3.2 — S3/SQS, Azure Event Grid or GCS Pub/Sub messages that tell Snowpipe new files have arrived.
- **COMPRESSION** · 3.1 — File format option; on unload AUTO means gzip for CSV/JSON and Snappy for Parquet.
- **COPY INTO location** · 3.1 — Unloads a table or SELECT result into files in a stage or cloud location (CSV, JSON, Parquet).
- **COPY INTO table** · 3.1 — Loads staged files into a table; supports simple transformations, validation and error handling options.
- **COPY_HISTORY** · 3.1 — Table function (14 days) / ACCOUNT_USAGE view (365 days) with per-file load status, partial loads, error counts and first error.
- **CREATE GIT REPOSITORY** · 3.3 — Creates the Git repository object, with API_INTEGRATION, GIT_CREDENTIALS (secret) and ORIGIN (remote URL).
- **CURRENT_CLIENT** · 3.3 — Function returning the version of the client or driver (JDBC/ODBC) executing the query.
- **CURRENT_TASK_GRAPHS** · 3.2 — Table function returning task graph runs currently scheduled or executing.

## D

- **Data loading wizard (Snowsight)** ⚠️ · 3.1 — UI to upload and load local files into a table without writing COPY.
- **Direct Connect (AWS)** · 3.3 — AWS service linking an on-premises data center to a VPC; combined with PrivateLink to reach Snowflake privately.
- **Directory table** — *tabla de directorio* · 3.1 — Implicit object layered on an internal or external stage that stores file-level metadata; queried with DIRECTORY(@stage); no own privileges.
- **DIRECTORY(@stage)** · 3.1 — Table function syntax to query a stage's directory table (RELATIVE_PATH, SIZE, LAST_MODIFIED, FILE_URL…).
- **DOWNSTREAM (target lag)** · 3.2 — Dynamic table lag setting that refreshes only when dependent dynamic tables need it.
- **Dynamic table** · 3.2 — Table defined by a query and refreshed automatically to meet a TARGET_LAG using a specified warehouse.

## E

- **EMPTY_FIELD_AS_NULL** · 3.1 — CSV option that loads empty fields as NULL.
- **ENCODING** · 3.1 — CSV option for the character set; default UTF8.
- **ERROR_ON_COLUMN_COUNT_MISMATCH** · 3.1 — CSV option that raises an error when a row's field count differs from the table's columns.
- **ESCAPE / ESCAPE_UNENCLOSED_FIELD** · 3.1 — CSV options defining the escape character for enclosed and unenclosed fields.
- **Event Grid / SQS / Pub/Sub** · 3.2 — Cloud messaging services (Azure, AWS, Google) used for Snowpipe auto-ingest and auto-refresh notifications.
- **EXECUTE IMMEDIATE FROM** · 3.3 — Runs SQL from a file on a stage or Git repository clone.
- **EXECUTE TASK** · 3.2 — Command that runs a task once manually; also the account privilege needed to run tasks.
- **External access integration** · 3.3 — Lets UDFs and procedures call external network endpoints using network rules and secrets.
- **External function** · 3.3 — UDF whose code runs outside Snowflake through an API integration; the documented way to call a third-party SaaS service from SQL.
- **External stage** — *stage externo* · 3.1 — Named stage pointing to Amazon S3, Azure Blob/ADLS or Google Cloud Storage; files stay in your cloud account.
- **External volume** · 3.3 — Account object pointing to the cloud storage where Iceberg tables keep their data and metadata.

## F

- **FIELD_DELIMITER** · 3.1 — CSV option for the column separator (comma by default).
- **FIELD_OPTIONALLY_ENCLOSED_BY** · 3.1 — CSV option for the character enclosing fields: a double quote, a single quote or NONE.
- **File format** — *formato de fichero* · 3.1 — Options describing staged files (TYPE and format options); can be inline, on a stage, on a table or a named object.
- **File URL** · 3.1 — Permanent Snowflake URL to a staged file (used by directory tables); requires authentication and privileges.
- **FILES** · 3.1 — COPY parameter with an explicit list of files (max 1,000); generally the fastest way to select files.
- **Finalizer task** · 3.2 — Optional task that runs after all tasks of a graph finish, for clean-up or notifications.
- **FORCE** · 3.1 — COPY option that reloads files regardless of load metadata; can duplicate data.

## G

- **GET** · 3.1 — Downloads files from an internal stage to the local file system; not from external stages; not in Snowsight worksheets.
- **GET /api/files/** · 3.3 — REST endpoint that retrieves a staged file through a file URL or scoped URL.
- **GET_PRESIGNED_URL** · 3.1 — Creates a pre-signed URL anyone can use until expiration_time (default 3600 s) without logging into Snowflake; non-deterministic.
- **GET_RELATIVE_PATH / GET_ABSOLUTE_PATH / GET_STAGE_LOCATION** · 3.1 — File functions returning a file's relative path, its absolute path, or the stage URL.
- **Git repository (object)** · 3.3 — Read-only clone of a remote Git repository in Snowflake, accessed like a stage.
- **GIT_CREDENTIALS** · 3.3 — CREATE GIT REPOSITORY parameter naming the secret with the Git credentials.

## H

- **HEADER** · 3.1 — Unload option that writes column names into CSV output.

## I

- **INCLUDE_QUERY_ID** · 3.1 — Unload option that adds the query ID (a UUID) to output file names.
- **Incremental refresh** · 3.2 — Dynamic table refresh mode that processes only changed data (REFRESH_MODE = INCREMENTAL; AUTO lets Snowflake choose).
- **INFER_SCHEMA** · 3.1 — Table function that detects column definitions from staged files; used with CREATE TABLE … USING TEMPLATE.
- **Insert-only stream** · 3.2 — Stream type for external tables (and externally managed Iceberg tables) that tracks only new rows.
- **insertFiles** · 3.2 — Snowpipe REST endpoint that submits a list of staged files to a pipe.
- **Internal stage** — *stage interno* · 3.1 — Stage whose files live in Snowflake storage: user (@~), table (@%t) or named internal.

## J

- **JDBC driver** · 3.3 — Type 4 Java driver; default authenticator is snowflake; others include externalbrowser, snowflake_jwt and oauth.
- **JOB_ID** · 3.1 — Argument of VALIDATE identifying the COPY load to inspect ('_last' = last load in the session).

## K

- **Kafka connector** · 3.2/3.3 — Loads Kafka topics into tables (RECORD_CONTENT, RECORD_METADATA) using Snowpipe or Snowpipe Streaming.

## L

- **LIST (LS)** · 3.1 — Lists the files in a stage or Git repository path.
- **Load metadata** · 3.1 — Per-file load status stored in the target table's metadata for 64 days; prevents loading the same file twice.
- **LOAD_HISTORY** · 3.1 — INFORMATION_SCHEMA view (14 days) of COPY loads into tables.
- **LOAD_UNCERTAIN_FILES** · 3.1 — COPY option to load files whose load status is unknown because metadata expired (older than 64 days).
- **Logical paths (partitioning staged files)** · 3.1 — Organizing files by date/source/region so COPY can target a prefix; improves load performance.

## M

- **MATCH_BY_COLUMN_NAME** · 3.1 — COPY option mapping file fields to table columns by name.
- **MAX_DATA_EXTENSION_TIME_IN_DAYS** · 3.2 — Limit on how far Snowflake extends a table's retention to keep unconsumed streams from becoming stale (default 14).
- **MAX_FILE_SIZE** · 3.1 — Unload option for the maximum size of each output file; default 16 MB, up to 5 GB.
- **METADATA$ACTION** · 3.2 — Stream column with INSERT or DELETE.
- **METADATA$FILE_LAST_MODIFIED / METADATA$FILE_CONTENT_KEY** · 3.1 — Staged-file metadata columns: last modification time and a key identifying the file content.
- **METADATA$FILE_ROW_NUMBER** · 3.1 — Staged-file metadata column with the row number within the file.
- **METADATA$FILENAME** · 3.1 — Staged-file metadata column identifying the source file of each row.
- **METADATA$ISUPDATE** · 3.2 — Stream column that is TRUE for the DELETE/INSERT pair produced by an UPDATE.

## N

- **Named internal stage** · 3.1 — Stage created with CREATE STAGE whose files live in Snowflake; privileges READ and WRITE.
- **Notification integration** · 3.2/3.3 — Account object for cloud queues, email or webhooks (auto-ingest on Azure/GCS, error notifications, alerts).
- **NULL_IF** · 3.1 — CSV option listing strings treated as NULL on load; on unload the first value is written for SQL NULL.

## O

- **OBJECT_CONSTRUCT** · 3.1 — Builds an OBJECT from columns; used to unload relational rows as JSON.
- **ODBC driver** · 3.3 — Driver for ODBC-based tools and applications.
- **ON_ERROR** · 3.1 — COPY option: ABORT_STATEMENT (bulk default), CONTINUE, SKIP_FILE (Snowpipe default), SKIP_FILE_n, SKIP_FILE_n%.
- **Openflow** ⚠️ · 3.2/3.3 — Snowflake's managed data-integration service based on Apache NiFi, with connectors for many sources.
- **ORC** · 3.1 — Columnar semi-structured format; can be loaded, not unloaded.
- **ORIGIN** · 3.3 — CREATE GIT REPOSITORY parameter with the remote repository URL.
- **OVERWRITE** · 3.1 — PUT and unload option that replaces existing files with the same name.

## P

- **PARALLEL** · 3.1 — PUT/GET option for the number of threads used to transfer files.
- **Parquet** · 3.1 — Compressed, efficient, columnar format; can be loaded and unloaded; keeps floating-point precision on unload.
- **PARSE_HEADER** · 3.1 — CSV option that reads column names from the header line (used with MATCH_BY_COLUMN_NAME and INFER_SCHEMA).
- **PARTITION BY (unload)** · 3.1 — Unload option splitting output files into paths by an expression.
- **Partner Connect** · 3.3 — Snowsight feature to start trials of ecosystem partners (ETL, BI, ML) with objects created automatically.
- **PATTERN** · 3.1 — COPY regular expression to select staged files; slowest over very large file sets.
- **Personal access token** · 3.3 — Recommended value for the PASSWORD of a Git secret instead of an account password.
- **Pipe** · 3.2 — Schema object containing a single COPY INTO statement used by Snowpipe.
- **PIPE_EXECUTION_PAUSED** · 3.2 — Pipe parameter to pause (TRUE) or resume (FALSE) a pipe.
- **Pre-signed URL** · 3.1 — Time-limited URL with embedded authorization; its holder can download the file without Snowflake authentication.
- **Private connectivity** · 3.3 — AWS PrivateLink, Azure Private Link or Google Private Service Connect: traffic to Snowflake without the public internet (Business Critical+).
- **PURGE** · 3.1 — COPY option that removes successfully loaded source files from the stage.
- **PUT** · 3.1 — Uploads local files to an internal stage (compressing and encrypting them); not in Snowsight worksheets or the SQL API.

## R

- **REFRESH_MODE** · 3.2 — Dynamic table setting: AUTO, INCREMENTAL or FULL.
- **REMOVE (RM)** · 3.1 — Deletes files from an internal or external stage.
- **REST API (Snowpipe)** · 3.2 — insertFiles / insertReport / loadHistoryScan endpoints to submit files to a pipe; works with internal and external stages.
- **RETURN_ALL_ERRORS** · 3.1 — VALIDATION_MODE value returning all errors, including files partially loaded earlier.
- **RETURN_ERRORS** · 3.1 — VALIDATION_MODE value returning errors in the specified files (not earlier partial loads).
- **RETURN_n_ROWS** · 3.1 — VALIDATION_MODE value validating n rows (e.g. RETURN_10_ROWS), failing at the first error.
- **RETURN_ROWS** · 3.1 — VALIDATION_MODE for COPY INTO location: returns the query results instead of writing files.

## S

- **Schema evolution** ⚠️ · 3.1 — Table option (ENABLE_SCHEMA_EVOLUTION) that adds new columns automatically when loaded files contain them.
- **Scoped URL** · 3.1 — Encoded temporary URL to a staged file for the user who generated it; non-deterministic.
- **Secret** · 3.3 — Schema object storing credentials (password, OAuth token, generic string) for integrations, Git and UDFs.
- **Serverless task** · 3.2 — Task without a WAREHOUSE; Snowflake manages and sizes the compute (needs EXECUTE MANAGED TASK).
- **SHOW GIT BRANCHES** · 3.3 — Lists the branches fetched into a Git repository clone (`SHOW GIT BRANCHES IN repo`).
- **SINGLE** · 3.1 — Unload option; FALSE (default) writes several files in parallel, TRUE writes one file.
- **SIZE_LIMIT** · 3.1 — COPY option capping the amount of data loaded by one statement.
- **SKIP_FILE** · 3.1/3.2 — ON_ERROR value that skips a file with errors; default for Snowpipe.
- **SKIP_HEADER** · 3.1 — CSV option to skip header lines when loading.
- **Snappy** · 3.1 — Default (AUTO) compression for Parquet unloads; LZO and NONE are alternatives.
- **SnowCD** ⚠️ · 3.3 — Connectivity diagnostic tool to troubleshoot network access to Snowflake endpoints.
- **Snowflake Connector for Python** · 3.3 — Python library implementing DB-API 2.0 (PEP 249); base of SnowSQL and SQLAlchemy.
- **Snowflake Python APIs** ⚠️ · 3.3 — Python library to manage Snowflake resources (databases, warehouses, tasks…) as objects.
- **Snowflake SQLAlchemy** · 3.3 — SQLAlchemy dialect for Snowflake built on the Python connector.
- **SNOWFLAKE_FULL / SNOWFLAKE_SSE** · 3.1 — Internal stage encryption types: client-side + server-side (default) or server-side only.
- **Snowpipe** · 3.2 — Serverless, continuous file loading triggered by cloud notifications or REST calls; 14-day pipe load history.
- **Snowpipe Streaming** ⚠️ · 3.2 — Row-level ingestion through an SDK/API without staged files; lowest latency.
- **SOURCE_COMPRESSION** · 3.1 — PUT option declaring the compression of files that are already compressed.
- **Spark connector** · 3.3 — Lets Apache Spark read and write Snowflake with query pushdown.
- **SQL API** · 3.3 — REST API to submit SQL statements; does not support PUT/GET.
- **Stage** · 3.1 — Location where files are stored for loading and unloading (internal or external).
- **Stale stream** · 3.2 — Stream whose offset is outside the source's retention period; can no longer return changes.
- **Standard stream** · 3.2 — Default stream type tracking inserts, updates and deletes (net delta).
- **Storage integration** · 3.3 — Account object giving external stages access to cloud storage through a cloud identity, without embedded credentials.
- **Stream** · 3.2 — Object that records DML changes (CDC) to a source since its offset; consumed by committed DML.
- **STRIP_NULL_VALUES** · 3.1 — JSON option removing fields/elements with null values on load.
- **STRIP_OUTER_ARRAY** · 3.1 — JSON option removing the outer array so each element loads as a separate row.
- **STRIP_OUTER_ELEMENT** · 3.1 — XML option removing the outer element.
- **SUSPEND_TASK_AFTER_NUM_FAILURES** · 3.2 — Task parameter that suspends a task automatically after consecutive failures.
- **SYSTEM$ALLOWLIST** · 3.3 — Returns the hostnames and ports a firewall must allow for Snowflake connectivity.
- **SYSTEM$PIPE_STATUS** · 3.2 — Returns the current status of a pipe.
- **SYSTEM$STREAM_HAS_DATA** · 3.2 — Returns TRUE when a stream contains change records; used in task WHEN clauses.

## T

- **Table stage** · 3.1 — Stage allocated automatically for each table (@%table); cannot be altered or dropped; COPY INTO the table can omit FROM.
- **TARGET_LAG** · 3.2 — Freshness target of a dynamic table relative to its sources.
- **Task** — *tarea* · 3.2 — Object that runs one SQL statement, a procedure CALL or a Scripting block on a schedule or trigger; created suspended.
- **Task graph (DAG)** · 3.2 — Root task with a schedule and child tasks (AFTER) that run in dependency order.
- **TASK_HISTORY** · 3.2 — Table function / view with past and scheduled task runs.
- **Transformations during load** · 3.1 — COPY with a SELECT over staged files: reorder, omit and cast columns; no WHERE, JOIN, GROUP BY, ORDER BY or LIMIT.
- **Triggered task** ⚠️ · 3.2 — Task that runs when its stream has new data instead of on a fixed schedule.
- **TRIM_SPACE** · 3.1 — CSV option that removes leading and trailing whitespace from fields.
- **TRUNCATECOLUMNS / ENFORCE_LENGTH** · 3.1 — COPY options that truncate strings longer than the column or raise an error.

## U

- **Unloading** — *descarga / exportación* · 3.1 — Writing table or query data to files with COPY INTO location.
- **User stage** · 3.1 — Stage allocated automatically for each user (@~); private to that user; cannot be altered or dropped.
- **USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE** · 3.2 — Initial compute size hint for serverless tasks.
- **USING TEMPLATE** · 3.1 — CREATE TABLE clause that builds columns from INFER_SCHEMA output.

## V

- **VALIDATE** · 3.1 — Table function returning all errors of a previous COPY load (JOB_ID).
- **VALIDATION_MODE** · 3.1 — COPY option that validates files (or previews unload rows) without loading/writing data; not supported with transformations.

## W

- **write_pandas** · 3.3 — Python connector helper that writes a pandas DataFrame to a table.

## X

- **XML** · 3.1 — Semi-structured format that can be loaded (not unloaded).
