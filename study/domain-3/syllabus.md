# Domain 3 — Data Loading, Unloading & Connectivity

**SnowPro Core (COF-C03) · weight 18% (~18 of 100 questions)**

This syllabus covers the three objectives used by the StudyPro bank:

| Obj. | Topic | Verified questions in the bank |
|---|---|---|
| [3.1](#31-data-loading-and-unloading) | Stages, PUT/GET, file formats, COPY INTO (load and unload), unstructured data | 135 |
| [3.2](#32-automated-ingestion-and-pipelines) | Snowpipe, Snowpipe Streaming, streams, tasks, dynamic tables | 29 |
| [3.3](#33-connectors-and-integrations) | Drivers, connectors, integrations, Git, connectivity | 23 |

How to use it:

- **Bold terms** are the exact English keywords the exam uses. Learn them as written.
- 3.1 is the **second biggest objective of the whole bank**: COPY options and stage types appear constantly. Memorize the tables of 3.1.4–3.1.9.
- Every section ends with **Exam traps** and the last section is a **rapid-fire self-test**.
- ⚠️ marks facts that change often (new ingestion services, limits, billing models).

---

## 3.1 Data loading and unloading

### 3.1.1 The big picture

```
 local files ──PUT──▶ INTERNAL STAGE ──COPY INTO <table>──▶ TABLE
                          ▲    │                             │
                          │    └──GET──▶ local files         │
 cloud storage ◀─────── EXTERNAL STAGE ◀──COPY INTO <location>┘
 (S3 / Azure / GCS)        (unload)
```

- **Loading** = files in a **stage** → table with **`COPY INTO <table>`** (bulk) or **Snowpipe** (continuous).
- **Unloading** = table/query → files in a stage or cloud location with **`COPY INTO <location>`**.
- Other ways to get data in: **Snowsight "Add data" / load wizard**, `INSERT`, `CREATE TABLE AS SELECT`, **Snowpipe Streaming**, connectors, **external tables** / **Iceberg tables** (query in place, no load).
- Bulk loading **with COPY** is the recommended approach for **batches of files already in cloud storage**.

### 3.1.2 Stages

A **stage** is a location where data files are stored for loading/unloading.

| Stage | Reference | Created | Notes |
|---|---|---|---|
| **User stage** | **`@~`** | **Automatically** for every user | Only that user can access it. **Cannot be altered or dropped.** No grants. |
| **Table stage** | **`@%my_table`** | **Automatically** for every table | Accessible to users with privileges on the table. Loads only into that table. **Cannot be altered or dropped**, doesn't support transformations while loading. If loading from the table's own stage, `COPY INTO my_table` **can omit FROM**. Not available for Iceberg tables. |
| **Named internal stage** | **`@my_stage`** | `CREATE STAGE` | Schema object, most flexible, shareable via privileges (**READ**, **WRITE**). Can have a default file format. |
| **Named external stage** | **`@my_ext_stage`** | `CREATE STAGE ... URL = 's3://…'` | Points to **Amazon S3**, **Microsoft Azure** (Blob / ADLS Gen2) or **Google Cloud Storage**. Privilege **USAGE**. Use a **storage integration** instead of embedding credentials. |

- **Internal stages** = user, table, named internal. Files live in Snowflake storage (billed as storage) and are **encrypted** automatically.
  - Encryption type of a named internal stage: **`SNOWFLAKE_FULL`** (default: **client-side + server-side** — the client encrypts **before the file leaves** it) or **`SNOWFLAKE_SSE`** (server-side only).
- **External stages**: files live in **your** cloud account (billed by the cloud provider).
- **Dropping a stage**:
  - Named **internal** stage → its **files are purged**.
  - **External** stage → only the Snowflake object is removed; **files remain** in the bucket.
  - There is **no `UNDROP STAGE`**.
- `ALTER STAGE` / `DROP STAGE` work on **named** stages (internal or external) only.
- Organize files with **logical paths** (e.g. `@stage/sales/2026/10/05/`) so COPY can target a **prefix** → this "partitioning" of staged files **improves load performance**.

### 3.1.3 Moving and managing staged files

| Command | Does |
|---|---|
| **`PUT file://… @stage`** | **Uploads local files to an internal stage** (user, table or named). By default **`AUTO_COMPRESS = TRUE`** compresses uncompressed files with **gzip**; files are **encrypted**. Options: `PARALLEL`, `OVERWRITE`, `SOURCE_COMPRESSION`. Does **not** load rows into a table. |
| **`GET @stage file://…`** | **Downloads files from an internal stage** to the local client. **Not from external stages** (use the cloud provider's tools). |
| **`LIST @stage`** / **`LS`** | Lists files (name, size, MD5, last modified) in a stage. `LIST @~` = user stage; `LIST @%t` = table stage. |
| **`REMOVE @stage/path`** / **`RM`** | **Deletes files** from an internal or external stage (doesn't touch loaded rows). |

- `PUT` and `GET` run from **SnowSQL, Snowflake CLI and drivers/connectors** (JDBC, ODBC, Python, Node.js, Go, .NET). They **cannot run in Snowsight worksheets** and are **not supported by the SQL API**.

### 3.1.4 File formats

| Format | Load | Unload | Notes |
|---|---|---|---|
| **CSV / delimited** (TSV, pipe…) | ✅ | ✅ | **Default `TYPE`**. Default **ENCODING = UTF8**. |
| **JSON** | ✅ | ✅ | Semi-structured → **VARIANT** |
| **Parquet** | ✅ | ✅ | **Compressed, efficient, columnar** |
| **Avro** | ✅ | ❌ | Row-oriented, semi-structured |
| **ORC** | ✅ | ❌ | Columnar, semi-structured |
| **XML** | ✅ | ❌ | Semi-structured |

- **Load**: CSV, JSON, Avro, ORC, Parquet, XML. **Unload**: **CSV/delimited, JSON, Parquet** only.
- Specify the format **inline** in COPY (`FILE_FORMAT = (TYPE = CSV …)`), on the **stage**, on the **table**, or as a **named file format object** (schema-level, `CREATE FILE FORMAT`). A named object is **optional** — useful to reuse options across loads/unloads.
- **Precedence** when defined in several places: **COPY statement > stage > table**. Options are **not merged**.
- `ALTER FILE FORMAT` can rename and change options of the same type, but **changing TYPE (CSV → JSON) requires `CREATE OR REPLACE FILE FORMAT`**.
- `SHOW FILE FORMATS` lists formats visible to the role.

Most-asked options:

| Option | Format | Meaning |
|---|---|---|
| `FIELD_DELIMITER`, `RECORD_DELIMITER` | CSV | Column / row separators (default `,` and newline) |
| `SKIP_HEADER = 1` | CSV | Skip header line(s) |
| **`FIELD_OPTIONALLY_ENCLOSED_BY`** | CSV | Character enclosing fields: `'"'`, `'\''` or **`NONE`** |
| **`NULL_IF`** | CSV | Strings treated as SQL NULL when loading; **on unload, the first value is written for NULL** (e.g. `NULL_IF = ('null')`) |
| `EMPTY_FIELD_AS_NULL` | CSV | Empty fields → NULL |
| `ERROR_ON_COLUMN_COUNT_MISMATCH` | CSV | Fail if a row has a different number of fields (keep column counts consistent) |
| `TRIM_SPACE`, `ESCAPE`, `ESCAPE_UNENCLOSED_FIELD` | CSV | Whitespace and escaping |
| `ENCODING` | CSV | Character set, default **UTF8** |
| `PARSE_HEADER` | CSV | Use the header for column names (with `MATCH_BY_COLUMN_NAME` / `INFER_SCHEMA`) |
| **`STRIP_OUTER_ARRAY`** | JSON | **Removes the outer `[ ]`** so each element loads as a **separate row** |
| **`STRIP_NULL_VALUES`** | JSON | Removes object fields / array elements with **null** values |
| `ALLOW_DUPLICATE`, `REPLACE_INVALID_CHARACTERS` | JSON | Duplicate keys; invalid UTF-8 |
| `STRIP_OUTER_ELEMENT` | XML | Removes the outer XML element |
| `COMPRESSION` | all | `AUTO` (detect / default), `GZIP`, `BZ2`, `BROTLI`, `ZSTD`, `DEFLATE`, `NONE`… |

### 3.1.5 Bulk loading with COPY INTO table

```sql
COPY INTO my_table
  FROM @my_stage/sales/2026/
  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt')
  PATTERN = '.*[.]csv$'
  ON_ERROR = 'CONTINUE'
  PURGE = TRUE;
```

- Runs on a **user-managed virtual warehouse**. The **number of files loaded in parallel** depends on the **warehouse's compute resources** — and can never exceed the number of files.
- **Choosing files** (fastest → slowest): **`FILES = ('a.csv','b.csv')`** (explicit list, max **1,000** files) → **path/prefix** → **`PATTERN`** (regex over all paths; **slow on very large file sets**). Combine a prefix + pattern to restrict the scan.

**Copy options**:

| Option | Meaning |
|---|---|
| **`ON_ERROR`** | **`ABORT_STATEMENT`** (default for bulk COPY), **`CONTINUE`** (skip bad rows), **`SKIP_FILE`** (default for **Snowpipe**), `SKIP_FILE_n`, `SKIP_FILE_n%` |
| **`VALIDATION_MODE`** | **Validate without loading**: `RETURN_n_ROWS` (e.g. `RETURN_10_ROWS`), **`RETURN_ERRORS`**, **`RETURN_ALL_ERRORS`** (also includes files partially loaded earlier with ON_ERROR=CONTINUE). **Not supported with transformations** (COPY with SELECT). |
| **`PURGE = TRUE`** | **Delete source files after a successful load** (best effort) |
| **`FORCE = TRUE`** | **Reload all files**, ignoring load metadata (**can duplicate data**) |
| **`LOAD_UNCERTAIN_FILES = TRUE`** | Load files whose **load status is unknown** (metadata expired) |
| `MATCH_BY_COLUMN_NAME` | Map columns by name (semi-structured, Parquet, CSV with header) |
| `SIZE_LIMIT`, `TRUNCATECOLUMNS` / `ENFORCE_LENGTH`, `RETURN_FAILED_ONLY` | Volume limit, string-length handling, output reporting |

**Load metadata and deduplication**:

- COPY stores the **load status of each file in the target table's metadata for 64 days**. Files already loaded (same name and unchanged content/ETag) are **skipped** → re-running the same COPY **appends only new files**. It does **not** merge/update existing rows.
- After **64 days**, the status becomes **uncertain**; such files are skipped unless `LOAD_UNCERTAIN_FILES = TRUE` (or `FORCE = TRUE`).
- Snowpipe keeps its own history in **pipe metadata for 14 days** (see 3.2).

**Checking loads**:

| Tool | Use |
|---|---|
| **`VALIDATE(t, JOB_ID => '_last')`** | Table function: **all errors of a previous COPY** into `t` (`'_last'` = last load in the current session). Not for transformed loads. |
| **`COPY_HISTORY`** | Table function (INFORMATION_SCHEMA, **14 days**) / ACCOUNT_USAGE view (365 days): **status per file, partial loads, error counts, first error**, for COPY and Snowpipe. |
| `LOAD_HISTORY` | INFORMATION_SCHEMA view (14 days) of COPY loads (not Snowpipe). |
| Snowsight **Copy History** ⚠️ | UI over the same information. |

### 3.1.6 Transforming while loading

COPY can load from a `SELECT` over the staged file:

```sql
COPY INTO customers (id, name, signup_date, src_file)
FROM (SELECT $1::NUMBER, UPPER($3), TO_DATE($2), METADATA$FILENAME
      FROM @my_stage/customers/)
FILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1);
```

- ✅ Supported: **reorder columns**, **omit columns**, **cast / convert data types**, simple functions (e.g. `SUBSTR`, `TO_DATE`), sequences, staged-file **metadata columns**.
- ❌ Not supported: **`WHERE` filtering**, **joins**, **`GROUP BY` / aggregates**, **`ORDER BY`**, **`LIMIT` / `TOP` / `FETCH`**, `FLATTEN`.
- **Metadata columns** of staged files: **`METADATA$FILENAME`** (source file of each row), **`METADATA$FILE_ROW_NUMBER`**, `METADATA$FILE_LAST_MODIFIED`, `METADATA$FILE_CONTENT_KEY`, `METADATA$START_SCAN_TIME`.
- **Query staged files directly** without loading: `SELECT $1, $2 FROM @my_stage (FILE_FORMAT => 'csv_fmt');` — works for internal and external stages.
- **Schema detection**: `INFER_SCHEMA` (column definitions from Parquet/Avro/ORC/JSON/CSV files) and `CREATE TABLE … USING TEMPLATE`; **schema evolution** ⚠️ (`ENABLE_SCHEMA_EVOLUTION`) adds new columns automatically.

### 3.1.7 Loading best practices

- **File size**: about **100–250 MB compressed** (or larger) per file → maximizes **parallel** loading and limits per-file overhead. Not a hard limit (there's no 16 MB file limit for loading).
- **Split very large files** into several; **combine many tiny files**.
- Use **dedicated warehouses** for loading; size them with the number of files in mind.
- Partition staged files by **logical paths** (date, source, region) and load by **prefix**.
- Make data match the format: consistent **column counts**, matching **enclosure/escape** settings, numbers without unhandled **thousands separators**, valid dates.
- Semi-structured: each **VARIANT** value has a size limit ⚠️ (historically 16 MB; raised in recent releases). Large JSON arrays → `STRIP_OUTER_ARRAY`.
- Loading from external cloud storage in another **region** can add **data transfer** costs.

### 3.1.8 Unloading with COPY INTO location

```sql
COPY INTO @my_stage/export/orders_          -- internal or external stage, or 's3://…'
  FROM (SELECT OBJECT_CONSTRUCT(*) FROM orders WHERE year = 2026)
  FILE_FORMAT = (TYPE = JSON)
  MAX_FILE_SIZE = 104857600
  HEADER = TRUE INCLUDE_QUERY_ID = TRUE;
```

- Source: a **table** or any **`SELECT`** query (filters, joins, etc. are fine here).
- Destination: **named internal stage**, **user/table stage**, **named external stage**, or an **external cloud URL**. It **cannot write directly to a local file system**: unload to an internal stage and then **`GET`**, or (recommended for cloud destinations) **unload directly to the cloud location**.
- Formats: **CSV/delimited, JSON, Parquet**.
- Options to remember:

| Option | Default / meaning |
|---|---|
| **`SINGLE`** | **FALSE** by default → **several files** written in **parallel**. `SINGLE = TRUE` → **one file**. |
| **`MAX_FILE_SIZE`** | Default **16 MB (16,777,216 bytes)** per file; can be raised up to **5 GB** for cloud storage. |
| **`COMPRESSION`** | CSV/JSON: **AUTO = gzip** (also BZ2, BROTLI, ZSTD…). **Parquet: AUTO = Snappy**, or **LZO**, SNAPPY, NONE. |
| `HEADER = TRUE` | Write column names (CSV) |
| `OVERWRITE = TRUE` | Replace existing files with the same name |
| **`INCLUDE_QUERY_ID = TRUE`** | Adds a **UUID (the query ID)** to file names — avoids collisions between concurrent unloads |
| `PARTITION BY <expr>` | Split output into paths by an expression (e.g. date) |
| **`VALIDATION_MODE = RETURN_ROWS`** | **Return the query results instead of writing files** (preview) |
| `NULL_IF`, `FIELD_OPTIONALLY_ENCLOSED_BY`, `EMPTY_FIELD_AS_NULL` | CSV text representation |

- **Relational → JSON**: build one VARIANT/OBJECT per row with **`OBJECT_CONSTRUCT`** (e.g. `OBJECT_CONSTRUCT(*)`) and unload with `TYPE = JSON`.
- **Floating-point precision**: unloading FLOAT columns to **CSV/JSON truncates to about (15,9)**; **Parquet** keeps them (DOUBLE) — use Parquet when precision matters.
- The unload **file format** can be set in **`CREATE STAGE`** (stage default) or in **`COPY INTO <location>`** (wins).
- Verify an unload with **`LIST @stage`**.

### 3.1.9 Unstructured data and directory tables

- **Directory table**: an **implicit object layered on a stage** (internal or external) that stores **file-level metadata** — not a separate database object, **no privileges of its own** (access is governed by the stage), doesn't copy the files.
  - Enable at creation or later: `CREATE STAGE s … DIRECTORY = (ENABLE = TRUE);` / `ALTER STAGE s SET DIRECTORY = (ENABLE = TRUE);`
  - Refresh: **manually** `ALTER STAGE s REFRESH;` or **automatically** with cloud event notifications (`AUTO_REFRESH = TRUE`).
  - Query: **`SELECT * FROM DIRECTORY(@s);`** → columns **`RELATIVE_PATH`**, `SIZE`, **`LAST_MODIFIED`**, `MD5`, `ETAG`, **`FILE_URL`**.
- **Three URL types** for staged files:

| URL | Function | Access |
|---|---|---|
| **File URL** | **`BUILD_STAGE_FILE_URL(@stage, 'path')`** | **Permanent**; requires Snowflake **authentication + stage privileges**. Used by **directory tables** (`FILE_URL`). |
| **Scoped URL** | **`BUILD_SCOPED_FILE_URL(@stage, 'path')`** | **Temporary** (24 h ⚠️), encoded, only for the **user who generated it**; good for apps/Streamlit. **Non-deterministic**. |
| **Pre-signed URL** | **`GET_PRESIGNED_URL(@stage, 'path', expiration_time)`** | **Anyone holding it** can download **without logging into Snowflake** (e.g. a non-Snowflake user, BI tool) until **`expiration_time`** (default **3600 s**). Treat as a secret. **Non-deterministic**. |

- Other file functions: `GET_RELATIVE_PATH`, `GET_ABSOLUTE_PATH`, `GET_STAGE_LOCATION`.
- REST endpoint **`GET /api/files/`** retrieves a file through a file or scoped URL (with authentication).
- Processing unstructured files: Java/Python **UDFs and procedures** (`SnowflakeFile`), **external functions** for **third-party SaaS** services, Cortex **AI_PARSE_DOCUMENT / AI_EXTRACT / AI_TRANSCRIBE** (Domain 1.6).

### 3.1.10 Exam traps — 3.1

- ❌ "PUT loads data into a table" → ✅ PUT only **uploads files to an internal stage**; COPY loads rows.
- ❌ "GET downloads from external stages" → ✅ **internal stages only**.
- ❌ "PUT can run in a Snowsight worksheet / SQL API" → ✅ SnowSQL, CLI, drivers.
- ❌ "Three internal stage types: user, table, **database**" → ✅ **user, table, named**.
- ❌ "User and table stages can be altered/dropped" → ✅ only **named** stages.
- ❌ "Dropping an external stage deletes the bucket files" → ✅ files **remain**; internal stage files are purged.
- ❌ "Avro/ORC/XML can be unloaded" → ✅ unload only **CSV, JSON, Parquet**.
- ❌ "A named file format is required" → ✅ optional; default TYPE is **CSV**.
- ❌ "Stage format options win over COPY options" → ✅ **COPY > stage > table**.
- ❌ "ALTER FILE FORMAT … SET TYPE = JSON" → ✅ **CREATE OR REPLACE**.
- ❌ "COPY transformations support WHERE / JOIN / GROUP BY / LIMIT" → ✅ only reorder, omit, cast and simple functions.
- ❌ "Re-running COPY reloads/updates everything" → ✅ already-loaded files are **skipped** (64-day metadata); new files are **appended**.
- ❌ "Load metadata lasts 14 days" → ✅ **64 days** for COPY (14 days = Snowpipe pipe metadata).
- ❌ "FORCE only loads files with expired metadata" → ✅ that's **LOAD_UNCERTAIN_FILES**; FORCE reloads **everything**.
- ❌ "Files must be ≤ 16 MB to load" → ✅ recommended **100–250 MB compressed**; 16 MB is the **unload MAX_FILE_SIZE default**.
- ❌ "PATTERN is the fastest way to select files" → ✅ **FILES list** is fastest; PATTERN is slowest.
- ❌ "VALIDATION_MODE works with transformations" → ✅ not supported.
- ❌ "Unload default compression is Snappy" → ✅ **gzip** (CSV/JSON); Snappy only for Parquet.
- ❌ "Use PARSE_JSON to unload rows as JSON" → ✅ **OBJECT_CONSTRUCT**.
- ❌ "STRIP_OUTER_ARRAY is an unload option" → ✅ **load** option for JSON.
- ❌ "Pre-signed URLs require Snowflake login" / "file URLs work for anyone" → ✅ the opposite.
- ❌ "Directory tables have their own privileges / store file copies" → ✅ neither.

---

## 3.2 Automated ingestion and pipelines

### 3.2.1 Snowpipe (continuous file loading)

- **Snowpipe** loads files **as soon as they arrive** in a stage (micro-batches, latency usually around a minute), instead of scheduled bulk COPY.
- A **pipe** is a schema object that wraps **a single `COPY INTO <table>` statement** (supported COPY transformations allowed; not arbitrary INSERTs or procedure calls).

```sql
CREATE PIPE sales_pipe AUTO_INGEST = TRUE AS
  COPY INTO raw.sales FROM @ext_stage/sales/ FILE_FORMAT = (TYPE = JSON);
```

- **Compute**: **serverless** — Snowflake manages it; **no virtual warehouse** is needed. Billing ⚠️: **credits per GB** ingested (current model).
- **How Snowpipe learns about new files** (two mechanisms):

| Mechanism | How | Stages |
|---|---|---|
| **Automated (auto-ingest)** | **Cloud messaging / event notifications**: S3 → SQS (or SNS), Azure **Event Grid**, GCS **Pub/Sub**. `AUTO_INGEST = TRUE`. | External stages ⚠️ |
| **REST API** | Client calls the **`insertFiles`** endpoint with a list of files (also `insertReport`, `loadHistoryScan`). | **Internal and external** stages |

- Most efficient way to ingest files that arrive **every few minutes** → **Snowpipe with auto-ingest** (cloud notifications).
- **Load history**: kept in **pipe metadata for 14 days** — prevents loading the same file twice. **`CREATE OR REPLACE PIPE` deletes this history** (files could be loaded again).
- Defaults & management:
  - `ON_ERROR` default for Snowpipe = **`SKIP_FILE`**.
  - Pause/resume: `ALTER PIPE p SET PIPE_EXECUTION_PAUSED = TRUE | FALSE;` (privilege **OPERATE**).
  - `ALTER PIPE p REFRESH;` queues files staged in the **last 7 days** that weren't loaded.
  - Status: `SYSTEM$PIPE_STATUS('p')`; history: **`COPY_HISTORY`**, `PIPE_USAGE_HISTORY` (credits).
  - Error notifications through a **notification integration**.
- Load order is **not guaranteed**; keep files 100–250 MB compressed and don't send files more often than once a minute or so for efficiency.

**Bulk COPY vs Snowpipe**:

| | Bulk `COPY INTO` | Snowpipe |
|---|---|---|
| Trigger | Manual / scheduled (task) | File arrival (notification or REST) |
| Compute | **Your warehouse** | **Serverless** |
| Load history | **64 days**, table metadata | **14 days**, pipe metadata |
| Default ON_ERROR | ABORT_STATEMENT | SKIP_FILE |
| Transactions | One transaction per COPY | Files combined/split into several transactions |

### 3.2.2 Snowpipe Streaming and connectors

- **Snowpipe Streaming** ⚠️: ingests **rows** directly (no staged files) through the **Snowpipe Streaming API/SDK** (Java SDK, high-performance architecture) — lowest latency, serverless. Ideal for **telemetry, IoT, Kafka**.
- **Snowflake Connector for Kafka**: reads Kafka topics into tables (columns `RECORD_CONTENT`, `RECORD_METADATA` as VARIANT); runs in **Snowpipe** (files) or **Snowpipe Streaming** mode.
- **Openflow** ⚠️: Snowflake's managed data-integration service (based on **Apache NiFi**) with connectors for many sources (databases, SaaS, streaming, files).
- "Streaming" ≠ "stream": **Snowpipe Streaming ingests rows**; a **stream object** exposes **change data** of an existing object.

### 3.2.3 Streams (change data capture)

- A **stream** records **DML changes** (inserts, updates, deletes) made to a source object since an **offset**; it doesn't copy the table — it uses the source's change-tracking metadata and versioning.
- Sources: **standard tables**, **views** (incl. secure views; change tracking on view and base tables), **dynamic tables**, **Iceberg tables**, **external tables**, **directory tables**, event tables.
- **Stream types**:

| Type | Tracks | Typical source |
|---|---|---|
| **Standard (delta)** | Inserts, updates, deletes (net changes) | Tables, views, dynamic tables |
| **Append-only** | **Inserts only** | Tables, views, dynamic tables (cheaper for ELT) |
| **Insert-only** | **Inserts only** (new files/rows) | **External tables**, externally-managed Iceberg tables |

- Extra columns: **`METADATA$ACTION`** (**`INSERT`** or **`DELETE`**), **`METADATA$ISUPDATE`** (TRUE when the row is part of an UPDATE, which appears as a DELETE + INSERT pair), **`METADATA$ROW_ID`**.
- **Consuming a stream**: the offset **advances only when the stream is used in a DML statement** (`INSERT INTO … SELECT FROM stream`, `MERGE`, `UPDATE … FROM stream`) **that commits**. A plain `SELECT` does **not** advance it.
- **Staleness**: a stream becomes **stale** if its offset falls outside the source's data retention. Snowflake **extends retention** for unconsumed streams up to **`MAX_DATA_EXTENSION_TIME_IN_DAYS`** (default 14). Check `STALE_AFTER` in `SHOW STREAMS`; consume regularly.
- `SYSTEM$STREAM_HAS_DATA('s')` → TRUE when there are changes (used in task `WHEN` conditions).

### 3.2.4 Tasks

- A **task** executes **one SQL statement**, a **`CALL` to a stored procedure**, or a **Snowflake Scripting block** — on a **schedule** or when **triggered**.

```sql
CREATE TASK load_orders
  WAREHOUSE = wh_etl                         -- omit for a serverless task
  SCHEDULE = 'USING CRON 0 * * * * UTC'      -- or '5 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('orders_stream')
AS
  INSERT INTO orders_clean SELECT * FROM orders_stream WHERE METADATA$ACTION = 'INSERT';

ALTER TASK load_orders RESUME;   -- tasks are created SUSPENDED
EXECUTE TASK load_orders;        -- run once manually
```

- **Compute**: **user-managed warehouse** (`WAREHOUSE = …`) or **serverless** (no warehouse; Snowflake sizes it; `USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE` as a hint).
- **Triggered tasks** ⚠️: run when a stream has data, without a fixed schedule.
- **Task graphs (DAGs)**: a **root task** with the schedule and **child tasks** declared with **`AFTER parent`** → run **transformations in a specific order on a schedule**. Optional **finalizer** task. Resume children before the root.
- Privileges: **`CREATE TASK`** on the schema to create; **`EXECUTE TASK`** (account) to run; **`EXECUTE MANAGED TASK`** for serverless tasks; **OPERATE** to suspend/resume someone else's task. Tasks run with the **owner role's** privileges.
- Monitoring: **`TASK_HISTORY`** (table function / ACCOUNT_USAGE), **`CURRENT_TASK_GRAPHS`** (graph runs **currently scheduled or executing**), `COMPLETE_TASK_GRAPHS` (finished runs), `TASK_DEPENDENTS`. `SUSPEND_TASK_AFTER_NUM_FAILURES`.
- **Streams + tasks** = classic incremental pipeline: **the stream exposes changes; the task executes the processing**.

### 3.2.5 Dynamic tables

- **Declarative pipelines**: define the **result** with a query; Snowflake **refreshes** it automatically.

```sql
CREATE DYNAMIC TABLE sales_daily
  TARGET_LAG = '5 minutes' WAREHOUSE = wh_etl
  REFRESH_MODE = AUTO
AS SELECT region, DATE(ts) d, SUM(amount) total FROM raw.sales GROUP BY 1, 2;
```

- **`TARGET_LAG`** = **desired freshness** relative to the source data (not a cron schedule, not a timeout). `DOWNSTREAM` = refresh only when needed by dependent dynamic tables.
- Refresh mode: **AUTO**, **INCREMENTAL** (process only changes) or **FULL**. Uses **your warehouse**.
- Supports joins, aggregations, chains of dynamic tables. **Cannot call stored procedures** or run arbitrary procedural code → use **tasks** for that.
- Manage: `ALTER DYNAMIC TABLE … REFRESH | SUSPEND | RESUME`; monitor `DYNAMIC_TABLE_REFRESH_HISTORY` and the Snowsight graph.

**Which tool?**

| Need | Use |
|---|---|
| Files arriving continuously in cloud storage | **Snowpipe** (auto-ingest) |
| Rows produced continuously, no files | **Snowpipe Streaming** |
| Big batch of files already staged | **COPY INTO** (maybe scheduled with a task) |
| Track changes of a table | **Stream** |
| Run SQL / procedures on a schedule or in order | **Tasks** (task graph) |
| Keep a transformed result fresh declaratively | **Dynamic table** |
| Speed up one repeated single-table query | Materialized view (Domain 1.5) |

### 3.2.6 Loading into Iceberg tables

- **Snowflake-managed Iceberg tables** can be loaded with **`COPY INTO`**, **Snowpipe** and **Snowpipe Streaming** (plus normal DML).

### 3.2.7 Exam traps — 3.2

- ❌ "A pipe needs a dedicated warehouse" → ✅ **serverless**.
- ❌ "Snowpipe REST API only works with external stages" → ✅ internal **and** external.
- ❌ "A pipe can call a procedure or run several statements" → ✅ **one COPY INTO** statement.
- ❌ "Pipes can't be paused" → ✅ `PIPE_EXECUTION_PAUSED`.
- ❌ "Snowpipe history: 64 days" → ✅ **14 days** in pipe metadata (other history views keep longer).
- ❌ "CREATE OR REPLACE PIPE keeps history" → ✅ history is **removed**.
- ❌ "Snowpipe is triggered by email/Snowsight" → ✅ **cloud messaging** or **REST endpoints**.
- ❌ "SELECT from a stream consumes it" → ✅ only **committed DML** using the stream.
- ❌ "METADATA$ACTION can be UPDATE" → ✅ only **INSERT** / **DELETE** (+ `METADATA$ISUPDATE`).
- ❌ "Streams on external tables are standard/append-only" → ✅ **insert-only**.
- ❌ "Streams can be created on schemas/databases/pipes" → ✅ tables, views, dynamic/Iceberg/external/directory tables.
- ❌ "Tasks start running when created" → ✅ created **suspended**; `ALTER TASK … RESUME`.
- ❌ "Streams run processing" / "tasks track changes" → ✅ stream = changes, task = execution.
- ❌ "TARGET_LAG is a schedule/timeout" → ✅ freshness target.
- ❌ "Snowpipe Streaming and streams are the same thing" → ✅ ingestion vs change tracking.
- "Graph runs in progress?" → **CURRENT_TASK_GRAPHS** (not COMPLETE_TASK_GRAPHS).

---

## 3.3 Connectors and integrations

### 3.3.1 Drivers and client libraries

| Component | Key facts |
|---|---|
| **JDBC driver** | **Type 4** driver for Java apps; any JDBC-capable tool can connect if it can load it. **`authenticator` default = `snowflake`** (user/password); `externalbrowser` (SSO in browser), `snowflake_jwt` (key pair), `oauth`… |
| **ODBC driver** | For ODBC tools (Windows, macOS, Linux). |
| **Snowflake Connector for Python** | Implements **Python DB-API 2.0 (PEP 249)**: connections and cursors; pandas support (`write_pandas`). Base of **SnowSQL** and **Snowflake SQLAlchemy**. |
| **Go, Node.js, .NET, PHP PDO** drivers | Native drivers for those languages. |
| **Snowflake SQL API** | **REST** API to submit SQL. Doesn't support PUT/GET. |
| **Snowpark** | DataFrame API (Python/Java/Scala) — Domain 1.6. |
| **Snowflake Python APIs** ⚠️ | Manage Snowflake resources (warehouses, databases, tasks…) as Python objects. |

- **`SELECT CURRENT_CLIENT();`** → version of the **client/driver** in use (JDBC/ODBC version). `CURRENT_VERSION()` → Snowflake **service** version.

### 3.3.2 Connectors and ecosystem

- **Kafka connector** (topics → tables; Snowpipe or Snowpipe Streaming).
- **Spark connector**: Spark DataFrames read/write Snowflake with **query pushdown**.
- **Snowflake connectors** for SaaS/databases (ServiceNow, Google Analytics, MySQL, PostgreSQL…) delivered as **Native Apps** ⚠️, and **Openflow** ⚠️.
- **Partner Connect**: start trials of ETL/BI/ML partners (Fivetran, Matillion, dbt, Tableau…) from Snowsight.
- **SnowCD** (Connectivity Diagnostic tool): **diagnoses and troubleshoots network connectivity** to Snowflake endpoints ⚠️ (reached end of life; `SYSTEM$ALLOWLIST()` returns the hostnames/ports your firewall must allow).

### 3.3.3 Integrations (account-level objects)

An **integration** stores the configuration and identity Snowflake needs to talk to an external system — **no long-lived credentials in every object**. Created by **ACCOUNTADMIN** or a role with `CREATE INTEGRATION`.

| Integration | Purpose |
|---|---|
| **Storage integration** | Lets **external stages** access cloud storage through a cloud **IAM identity** (AWS IAM role, Azure service principal, GCS service account) — **no credentials embedded in stage definitions**. `STORAGE_ALLOWED_LOCATIONS` / `BLOCKED_LOCATIONS`. `DESC INTEGRATION` shows the Snowflake identity (e.g. `STORAGE_AWS_IAM_USER_ARN`, external ID) to trust in your cloud. |
| **Notification integration** | Cloud queues/email/webhooks: Snowpipe auto-ingest (Azure/GCS), error notifications, alerts. |
| **API integration** | Proxy services for **external functions** (`API_PROVIDER`, `API_AWS_ROLE_ARN`…) and **Git repositories** (`API_PROVIDER = git_https_api`). **`API_ALLOWED_PREFIXES`** restricts the endpoints; `ALLOWED_AUTHENTICATION_SECRETS` lists usable secrets. |
| **Security integration** | SAML2 SSO, OAuth, External OAuth, SCIM (Domain 2.1). |
| **External access integration** | Lets Python/Java/Scala **UDFs and procedures** call external network endpoints, using **network rules** + **secrets**. |
| **Catalog integration** | Connects to an external **Iceberg catalog**. **Required whenever Snowflake is not the catalog**: AWS Glue, **files in object storage**, **Iceberg REST catalog**, Snowflake Open Catalog. Not needed for Snowflake-managed Iceberg tables (they only need an **external volume**). |

- **Secret**: schema-level object storing credentials (password, OAuth token, generic string) referenced by integrations, Git repositories and UDFs.
- **External functions** (via API integration) are the documented way to call a **third-party SaaS service** from SQL (e.g. to process unstructured data).

### 3.3.4 Git integration

```sql
CREATE SECRET git_secret TYPE = PASSWORD
  USERNAME = 'my-user' PASSWORD = 'ghp_…';      -- a personal access token
CREATE API INTEGRATION git_api API_PROVIDER = git_https_api
  API_ALLOWED_PREFIXES = ('https://github.com/my-org')
  ALLOWED_AUTHENTICATION_SECRETS = (git_secret) ENABLED = TRUE;
CREATE GIT REPOSITORY project_repo
  API_INTEGRATION = git_api GIT_CREDENTIALS = git_secret
  ORIGIN = 'https://github.com/my-org/project.git';

ALTER GIT REPOSITORY project_repo FETCH;          -- update the clone from the remote
SHOW GIT BRANCHES IN project_repo;                -- list branches
LIST @project_repo/branches/main;                 -- list files of a branch
EXECUTE IMMEDIATE FROM @project_repo/branches/main/deploy.sql;  -- run a SQL file
```

- A **Git repository** object is a **read-only clone** in Snowflake, accessed **like a stage**; supports GitHub, GitLab, Bitbucket, Azure DevOps…
- Store a **personal access token** (not an account password) as the secret's **PASSWORD**.
- Used to bring **version-controlled code** into Snowflake: SQL scripts, procedures/UDF handlers, **Notebooks**, **Streamlit** apps, Snowflake CLI deployments. Git history is **not** a database backup.

### 3.3.5 Network connectivity recap

- **Private connectivity** (AWS PrivateLink, Azure Private Link, GCP Private Service Connect): Business Critical+. From an **on-premises data center**, combine **AWS Direct Connect + AWS PrivateLink**.
- **Network policies** filter IPs but traffic still uses the public internet (Domain 2.1).

### 3.3.6 Exam traps — 3.3

- ❌ "Snowpark / SnowSQL diagnose network problems" → ✅ **SnowCD**.
- ❌ "CURRENT_VERSION() shows the driver version" → ✅ **CURRENT_CLIENT()**.
- ❌ "JDBC default authenticator is externalbrowser/oauth" → ✅ **snowflake**.
- ❌ "SQLAlchemy / Snowpark implement DB-API 2.0" → ✅ the **Python connector**.
- ❌ "Embed AWS keys in every external stage" → ✅ use a **storage integration**.
- ❌ "Snowflake-managed Iceberg tables need a catalog integration" → ✅ only external volume; catalog integration for **external** catalogs/object storage/REST.
- ❌ "ALTER GIT REPOSITORY … PULL/SYNC" → ✅ **FETCH**.
- ❌ "SHOW GIT BRANCHES lists files" → ✅ **`LIST @repo/branches/<branch>`**.
- ❌ "Store the GitHub account password in the secret" → ✅ a **personal access token**.
- ❌ "GIT_CREDENTIALS restricts endpoints" → ✅ **API_ALLOWED_PREFIXES** (in the API integration).
- ❌ "Network policies give a private connection" → ✅ **PrivateLink** (+ Direct Connect from on-prem).
- "Call a third-party SaaS from SQL" → **external functions**.

---

## Rapid-fire self-test (cover the right column)

| # | Obj. | Question | Answer |
|---|---|---|---|
| 1 | 3.1 | Three internal stage types? | User, table, named |
| 2 | 3.1 | Stages allocated automatically? | User stage and table stage |
| 3 | 3.1 | Reference the user stage / table stage? | @~ and @%table |
| 4 | 3.1 | Which stages can be altered or dropped? | Named stages (internal or external) |
| 5 | 3.1 | Drop an external stage — files? | Remain in cloud storage |
| 6 | 3.1 | Drop a named internal stage — files? | Purged |
| 7 | 3.1 | Clouds supported by external stages? | AWS S3, Azure, Google Cloud Storage |
| 8 | 3.1 | Upload local files to an internal stage? | PUT |
| 9 | 3.1 | PUT default compression? | AUTO_COMPRESS = TRUE, gzip |
| 10 | 3.1 | Download internal stage files locally? | GET |
| 11 | 3.1 | Can GET read external stages? | No, internal only |
| 12 | 3.1 | Where can't PUT/GET run? | Snowsight worksheets and the SQL API |
| 13 | 3.1 | List files in a stage? | LIST (alias LS) |
| 14 | 3.1 | Delete staged files? | REMOVE (alias RM) |
| 15 | 3.1 | Default file format TYPE? | CSV |
| 16 | 3.1 | Default CSV encoding? | UTF8 |
| 17 | 3.1 | Is a named file format required? | No |
| 18 | 3.1 | File format precedence? | COPY statement > stage > table |
| 19 | 3.1 | Change a format from CSV to JSON? | CREATE OR REPLACE FILE FORMAT |
| 20 | 3.1 | Semi-structured formats you can load? | JSON, Avro, ORC, Parquet, XML |
| 21 | 3.1 | Formats you can unload? | CSV/delimited, JSON, Parquet |
| 22 | 3.1 | Columnar compressed format? | Parquet |
| 23 | 3.1 | Split a JSON outer array into rows? | STRIP_OUTER_ARRAY |
| 24 | 3.1 | Remove null JSON values on load? | STRIP_NULL_VALUES |
| 25 | 3.1 | Quote-enclosed CSV fields option? | FIELD_OPTIONALLY_ENCLOSED_BY |
| 26 | 3.1 | Valid values when unloading with that option? | A quote character or NONE |
| 27 | 3.1 | Write SQL NULL as 'null' when unloading CSV? | NULL_IF |
| 28 | 3.1 | Command to bulk load staged files? | `COPY INTO <table>` |
| 29 | 3.1 | Recommended file size? | 100–250 MB compressed |
| 30 | 3.1 | Why that size? | Optimize parallel loading |
| 31 | 3.1 | What decides files loaded in parallel? | Warehouse compute resources (and file count) |
| 32 | 3.1 | Fastest way to select files? | FILES list (max 1,000) |
| 33 | 3.1 | Option slow on many files? | PATTERN |
| 34 | 3.1 | Purpose of date-based paths? | Target prefixes, faster loads |
| 35 | 3.1 | Validate files without loading? | VALIDATION_MODE |
| 36 | 3.1 | VALIDATION_MODE values? | RETURN_n_ROWS, RETURN_ERRORS, RETURN_ALL_ERRORS |
| 37 | 3.1 | Errors including earlier partial loads? | RETURN_ALL_ERRORS |
| 38 | 3.1 | VALIDATION_MODE unsupported with? | Transformations (SELECT in COPY) |
| 39 | 3.1 | Errors of the last COPY into t? | VALIDATE(t, JOB_ID => '_last') |
| 40 | 3.1 | Partial loads and error counts? | COPY_HISTORY |
| 41 | 3.1 | Default ON_ERROR for bulk COPY? | ABORT_STATEMENT |
| 42 | 3.1 | Delete files after successful load? | PURGE = TRUE |
| 43 | 3.1 | Reload files regardless of status? | FORCE = TRUE |
| 44 | 3.1 | Load files with expired metadata? | LOAD_UNCERTAIN_FILES = TRUE (or FORCE) |
| 45 | 3.1 | Load metadata location and duration? | Target table metadata, 64 days |
| 46 | 3.1 | Same COPY next day with 10 new files? | Only the new files are appended |
| 47 | 3.1 | COPY transformations supported? | Reorder, omit, cast columns |
| 48 | 3.1 | Not supported in COPY transformation? | WHERE, JOIN, GROUP BY, ORDER BY, LIMIT |
| 49 | 3.1 | Source file of each row? | METADATA$FILENAME |
| 50 | 3.1 | Omit FROM in COPY INTO table when loading from? | The table stage |
| 51 | 3.1 | Query staged files without loading? | SELECT $1… FROM @stage |
| 52 | 3.1 | Unload command? | `COPY INTO <location>` (e.g. `COPY INTO @stage FROM t`) |
| 53 | 3.1 | Can unload use a SELECT? | Yes |
| 54 | 3.1 | Unload into one file? | SINGLE = TRUE |
| 55 | 3.1 | Default unload behavior and why? | Multiple files, for parallel processing |
| 56 | 3.1 | Default MAX_FILE_SIZE / max? | 16 MB; up to 5 GB |
| 57 | 3.1 | Default unload compression (CSV/JSON)? | gzip |
| 58 | 3.1 | Parquet unload compression options? | AUTO (Snappy), LZO, SNAPPY, NONE |
| 59 | 3.1 | UUID in unloaded file names? | INCLUDE_QUERY_ID = TRUE |
| 60 | 3.1 | Preview unload rows without writing? | VALIDATION_MODE = RETURN_ROWS |
| 61 | 3.1 | Relational rows to JSON? | OBJECT_CONSTRUCT |
| 62 | 3.1 | Float precision on CSV/JSON unload? | Truncated to about (15,9) |
| 63 | 3.1 | Format keeping float precision? | Parquet |
| 64 | 3.1 | Where to set unload file format? | CREATE STAGE or `COPY INTO <location>` |
| 65 | 3.1 | Recommended way to unload to cloud storage? | Directly to the cloud location |
| 66 | 3.1 | Unloaded to an internal stage, now local? | GET |
| 67 | 3.1 | What is a directory table? | Implicit object on a stage storing file metadata |
| 68 | 3.1 | Query a directory table? | SELECT * FROM DIRECTORY(@stage) |
| 69 | 3.1 | Directory table columns (examples)? | RELATIVE_PATH, LAST_MODIFIED, FILE_URL |
| 70 | 3.1 | URL type used by directory tables? | File URL |
| 71 | 3.1 | Permanent file URL function? | BUILD_STAGE_FILE_URL |
| 72 | 3.1 | URL for non-Snowflake users? | Pre-signed URL (GET_PRESIGNED_URL) |
| 73 | 3.1 | Pre-signed URL valid until? | expiration_time (default 3600 s) |
| 74 | 3.1 | Non-deterministic file functions? | BUILD_SCOPED_FILE_URL, GET_PRESIGNED_URL |
| 75 | 3.1 | SNOWFLAKE_FULL client-side encryption happens? | Before the file leaves the client |
| 76 | 3.2 | What does a pipe contain? | A single COPY INTO statement |
| 77 | 3.2 | Snowpipe compute? | Serverless, no warehouse |
| 78 | 3.2 | How Snowpipe learns about files? | Cloud messaging (auto-ingest) or REST endpoints |
| 79 | 3.2 | REST API stages? | Internal and external |
| 80 | 3.2 | Files every 5 minutes in cloud storage? | Snowpipe with auto-ingest |
| 81 | 3.2 | Pipe load history retention? | 14 days (pipe metadata) |
| 82 | 3.2 | Effect of CREATE OR REPLACE PIPE? | Removes the pipe's load history |
| 83 | 3.2 | Pause a pipe? | ALTER PIPE … SET PIPE_EXECUTION_PAUSED = TRUE |
| 84 | 3.2 | Snowpipe default ON_ERROR? | SKIP_FILE |
| 85 | 3.2 | Rows without staged files? | Snowpipe Streaming |
| 86 | 3.2 | Object that tracks DML changes? | Stream |
| 87 | 3.2 | METADATA$ACTION values? | INSERT and DELETE |
| 88 | 3.2 | What advances a stream offset? | Committed DML that uses the stream |
| 89 | 3.2 | Stream type for external tables? | Insert-only |
| 90 | 3.2 | Stream sources (two classics)? | Standard tables and views |
| 91 | 3.2 | Parameter limiting retention extension for streams? | MAX_DATA_EXTENSION_TIME_IN_DAYS |
| 92 | 3.2 | What can a task body be? | One SQL statement, a CALL, or a Scripting block |
| 93 | 3.2 | Ordered transformations on a schedule? | Tasks (task graph) |
| 94 | 3.2 | State of a new task? | Suspended |
| 95 | 3.2 | Graph runs currently executing? | CURRENT_TASK_GRAPHS |
| 96 | 3.2 | TARGET_LAG means? | Desired freshness vs source data |
| 97 | 3.2 | Run a procedure in a pipeline? | A task (not a dynamic table) |
| 98 | 3.2 | Load Snowflake-managed Iceberg tables? | COPY INTO, Snowpipe (and Streaming) |
| 99 | 3.3 | Troubleshoot network connectivity? | SnowCD |
| 100 | 3.3 | Driver/client version in use? | SELECT CURRENT_CLIENT() |
| 101 | 3.3 | JDBC default authenticator? | snowflake |
| 102 | 3.3 | Python DB-API 2.0 (PEP 249)? | Snowflake Connector for Python |
| 103 | 3.3 | Java service using JDBC? | Snowflake JDBC driver |
| 104 | 3.3 | External stage access without embedded credentials? | Storage integration |
| 105 | 3.3 | Call a third-party SaaS from SQL? | External functions |
| 106 | 3.3 | When is a catalog integration required? | Iceberg tables with an external catalog, object storage or REST catalog |
| 107 | 3.3 | Update a Git repository clone? | ALTER GIT REPOSITORY … FETCH |
| 108 | 3.3 | List branches / files of a branch? | `SHOW GIT BRANCHES IN repo` / `LIST @repo/branches/<branch>` |
| 109 | 3.3 | Run a SQL file from a Git clone? | EXECUTE IMMEDIATE FROM |
| 110 | 3.3 | Git API integration: restrict endpoints? | API_ALLOWED_PREFIXES |
| 111 | 3.3 | Value for the Git secret PASSWORD? | A personal access token |
| 112 | 3.3 | On-prem data center to Snowflake privately on AWS? | AWS Direct Connect + PrivateLink |

If you can answer all of these without looking and explain the COPY options in your own words, you are ready for Domain 3.
