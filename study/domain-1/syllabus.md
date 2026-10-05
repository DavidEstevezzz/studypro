# Domain 1 — Snowflake AI Data Cloud Features & Architecture

**SnowPro Core (COF-C03) · weight 31% (~31 of 100 questions) · the largest domain**

This syllabus covers the six objectives used by the StudyPro bank:

| Obj. | Topic | Verified questions in the bank |
|---|---|---|
| [1.1](#11-architecture-and-editions) | Architecture, cloud platforms, editions | 43 |
| [1.2](#12-interfaces-and-tools) | Interfaces and tools (Snowsight, CLIs, IDEs) | 10 |
| [1.3](#13-object-hierarchy-object-types-and-session-context) | Object hierarchy, object types, session context, UDFs & procedures | 29 |
| [1.4](#14-virtual-warehouses) | Virtual warehouses | 61 |
| [1.5](#15-storage-micro-partitions-table-types-and-views) | Micro-partitions, clustering, table types, views | 41 |
| [1.6](#16-aiml-and-application-development) | AI/ML (Cortex, Snowflake ML) and app development (Snowpark, Streamlit, Notebooks) | 27 |

How to use it:

- **Bold terms** are the exact English keywords the exam uses. Learn them as written.
- Every section ends with **Exam traps** (wrong options that look right) and the last section is a **rapid-fire self-test**.
- The companion [glossary](glossary.md) defines every keyword alphabetically.
- ⚠️ marks facts that change often (product names, UI menus, limits). The exam is written against the current documentation; when in doubt, choose the answer that describes *behavior*, not menu locations.

---

## 1.1 Architecture and editions

### 1.1.1 What Snowflake is

- Snowflake is a **fully managed, self-managed service** (SaaS) that runs **completely on public cloud infrastructure**.
- There is **no hardware** to select, install or configure and **no software** to install, configure or manage. Snowflake handles **maintenance, management, upgrades, patching and tuning**.
- It **cannot run on private / on-premises infrastructure**. There is no installable version.
- Customers stay responsible for **their data, their access design (users, roles, grants) and how they use the service**.
- Marketing name today: **Snowflake AI Data Cloud** (previously "Data Cloud" / "Cloud Data Platform"). All mean the same platform.

### 1.1.2 Cloud platforms, regions and accounts

- Supported cloud platforms: **Amazon Web Services (AWS)**, **Microsoft Azure** and **Google Cloud Platform (GCP)**. Not Oracle, not Alibaba, not IBM.
- An **account** is hosted on **one cloud platform in one region**. All three layers of that account run on that platform/region.
- An **organization** groups the accounts of one customer. Accounts of one organization can be on **different clouds and regions**.
  - Benefits: **consolidated account management and billing**, view usage across accounts, create accounts, enable replication between accounts.
  - Organization-level administration role: **ORGADMIN** ⚠️ (Snowflake is moving org administration to an *organization account* with the **GLOBALORGADMIN** role).
  - Organizations do **not** enable zero-copy cloning across accounts; cross-account copies use **replication** or **sharing**.
- **Account identifier**:
  - Preferred: `<orgname>-<account_name>` (e.g. `myorg-analytics`).
  - Legacy: **account locator** (e.g. `xy12345`), sometimes with region and cloud (`xy12345.eu-west-1.aws`).
- Snowflake's cross-cloud / cross-region technology layer (used by replication, failover and sharing) is called **Snowgrid**.
- The cloud provider and region affect **pricing** (credit price, storage price) and **data transfer (egress) costs**.

### 1.1.3 The architecture style

- Snowflake is a **hybrid of traditional shared-disk and shared-nothing architectures**:
  - **Shared-disk-like**: one **central data repository** for persisted data, accessible from all compute nodes.
  - **Shared-nothing-like**: queries are processed by **MPP (massively parallel processing) compute clusters**, where each node stores a portion of the data locally.
- The official description: **multi-cluster, shared data** architecture.
- It is a **SQL** database (ANSI SQL, ACID transactions). It is **not NoSQL**, not Hadoop-based, and not a single-node database.

### 1.1.4 The three layers

```
┌──────────────────────────────────────────────────────────────┐
│ CLOUD SERVICES  — the "brain"                                │
│ authentication · access control · metadata · query parsing   │
│ & optimization (compilation, execution plan) · infrastructure│
│ management · transaction management · result cache           │
├──────────────────────────────────────────────────────────────┤
│ QUERY PROCESSING (COMPUTE) — the "muscle"                    │
│ virtual warehouses: independent MPP clusters, local SSD cache│
├──────────────────────────────────────────────────────────────┤
│ DATABASE STORAGE                                             │
│ cloud object storage (S3 / Azure Blob / GCS) · compressed,   │
│ columnar micro-partitions · managed by Snowflake             │
└──────────────────────────────────────────────────────────────┘
```

#### Database Storage layer

- When data is loaded, Snowflake **reorganizes it into its internal optimized, compressed, columnar format** and stores it in the cloud provider's **object storage**.
- Snowflake manages **everything** about storage: organization, file size, structure, compression, metadata and statistics.
- The data objects are **not directly visible or accessible** to customers; they are accessible **only through SQL** operations run in Snowflake.
- Physical unit: **micro-partitions** (see 1.5).
- Billed as **average compressed TB stored per month** (includes Time Travel and Fail-safe data, stages and table data).

#### Query Processing (Compute) layer

- Queries execute here, using **virtual warehouses**.
- Each virtual warehouse is an **MPP compute cluster** of multiple compute nodes allocated from the cloud provider.
- Each warehouse is **independent**: it does **not share compute resources** with other warehouses → **no resource contention** between workloads, and no impact on other warehouses' performance.
- Any warehouse can query **any** table: data is not tied to the warehouse that loaded it.
- Holds the **warehouse (local disk / SSD) cache**, lost when the warehouse is suspended.
- Billed in **credits**, per second (see 1.4).

#### Cloud Services layer

The collection of services that **coordinates activities across Snowflake**; it ties the layers together, from login to query dispatch. It also runs on compute instances that Snowflake provisions from the cloud provider. Services managed here (learn this list by heart):

1. **Authentication**
2. **Infrastructure management**
3. **Metadata management** (object definitions, micro-partition statistics — used for pruning, Time Travel, cloning and sharing)
4. **Query parsing and optimization** (**compilation**, **execution plan**)
5. **Access control** (security and authorization)

Also handled here: **transaction management**, the **query result cache**, **metadata-only operations and DDL** (e.g. `CREATE`, `ALTER`, `SHOW`, `DESCRIBE`).

- Billing of cloud services: credits are charged **only if daily cloud services consumption exceeds 10% of the daily warehouse compute** usage (the **10% adjustment**). Serverless compute does not count toward that 10% baseline.

### 1.1.5 Which layer does what? (very frequent question type)

| Activity | Layer |
|---|---|
| Login, MFA, SSO, OAuth (authentication) | Cloud services |
| Checking privileges (access control) | Cloud services |
| Storing metadata and micro-partition statistics | Cloud services |
| Parsing, compiling, optimizing, building the **query execution plan** | Cloud services |
| Executing the plan: scans, joins, aggregations, sorts | Compute (virtual warehouse) |
| Executing DML (`INSERT`, `UPDATE`, `DELETE`, `MERGE`) and loading (`COPY INTO`) | Compute |
| Holding table data in compressed columnar format | Storage |
| Query result cache | Cloud services |
| Warehouse/local disk cache | Compute |
| DDL (`CREATE TABLE`, `ALTER TABLE ... ADD COLUMN`), `SHOW`, `DESCRIBE`, `LIST @stage` | Cloud services (no warehouse) |

### 1.1.6 Benefits of separating storage and compute

- **Storage expands without adding compute.**
- **Compute scales up/down (or out) without adding storage.**
- **Multiple warehouses access the same data at the same time without contention.**
- Pay for each independently: storage per TB, compute per second only while running.
- Workload isolation: loading, BI, data science and ad hoc users can each have their own warehouse.

### 1.1.7 Snowflake editions

Each edition includes everything of the edition below it.

| Edition | What it adds (exam keywords) |
|---|---|
| **Standard** | Complete SQL data warehouse; **Secure Data Sharing**; Marketplace; **Time Travel up to 1 day**; **Fail-safe 7 days** (permanent tables); **automatic encryption of all data** (at rest and in transit); **object-level access control** (RBAC/DAC); **MFA**, **federated authentication / SSO**, **OAuth**, **network policies**; **external functions**; Snowpark; Streamlit; **database replication**; **ACCOUNT_USAGE**; standard support. |
| **Enterprise** | **Multi-cluster warehouses**; **extended Time Travel up to 90 days** (permanent objects only); **periodic rekeying** of encrypted data; **column-level security** = **Dynamic Data Masking** + **External Tokenization**; **row access policies** (row-level security); **object tagging** / tag-based masking; **data classification**; **materialized views**; **Search Optimization Service**; **Query Acceleration Service**; **ACCESS_HISTORY**; aggregation & projection policies. |
| **Business Critical** | Support for regulated data: **HIPAA (PHI)**, **HITRUST**, **PCI DSS**, ITAR ⚠️ (a **BAA** must be signed before storing PHI); **Tri-Secret Secure** (customer-managed key + Snowflake key); **private connectivity**: **AWS PrivateLink**, **Azure Private Link**, **Google Cloud Private Service Connect** (also to internal stages); **database failover/failback** and **Client Redirect** (business continuity); enhanced security and data protection. |
| **Virtual Private Snowflake (VPS)** | **Highest level of security/isolation** for organizations with the strictest requirements (e.g. financial institutions). A **completely separate Snowflake environment**, isolated from other accounts, with a **dedicated metadata store** and **dedicated compute resources**. |

Minimum-edition questions — memorize:

| Feature | Minimum edition |
|---|---|
| Secure Data Sharing, Fail-safe, encryption, external functions, Time Travel 1 day | Standard |
| Multi-cluster warehouse | Enterprise |
| Time Travel 2–90 days | Enterprise |
| Materialized views | Enterprise |
| Dynamic Data Masking / column-level security | Enterprise |
| Row access policies (row-level security) | Enterprise |
| Search Optimization, Query Acceleration | Enterprise |
| Periodic rekeying | Enterprise |
| PHI / HIPAA / PCI, Tri-Secret Secure, PrivateLink / Private Service Connect | Business Critical |
| Failover/failback, Client Redirect | Business Critical |
| Dedicated metadata store, total isolation | VPS |

> "Premium" is **not** a Snowflake edition. Nor is "Professional" or "Developer".

### 1.1.8 What you pay for (overview — details in Domain 2.3)

- **Storage**: monthly average of compressed bytes (table data, Time Travel, Fail-safe, internal stages). Two pricing models: **On-Demand** (pay as you go) and **Capacity** (pre-purchased).
- **Virtual warehouse compute**: credits per second while running (60-second minimum per start/resume).
- **Serverless compute**: Snowflake-managed compute for features like **Snowpipe, Automatic Clustering, materialized view maintenance, Search Optimization, serverless tasks, replication, Query Acceleration**.
- **Cloud services**: only above the 10% daily adjustment.
- **Data transfer**: egress to another region or cloud (e.g. replication, unloading to another region). Ingress is free.
- AI services (Cortex) are billed by **tokens** or by the service's own unit.

### 1.1.9 Exam traps — 1.1

- ❌ "Metadata is stored in the storage layer" → ✅ **cloud services**.
- ❌ "Query compilation/optimization happens in the warehouse" → ✅ **cloud services**; the warehouse **executes**.
- ❌ "A table can only be queried by the warehouse that loaded it" → ✅ False.
- ❌ "Snowflake can be installed on-premises / in a private data center" → ✅ False.
- ❌ "Shared-nothing" alone or "shared-disk" alone → ✅ **hybrid**; "**multi-cluster, shared data**".
- ❌ "Data is stored row-based" → ✅ **columnar**, compressed.
- ❌ "Standard edition lacks encryption" → ✅ every edition encrypts all data automatically.
- ❌ "Enterprise is the minimum for PHI / PrivateLink / Tri-Secret Secure" → ✅ **Business Critical**.
- ❌ "Data sharing requires Enterprise" → ✅ **Standard**.
- Questions asking for the **minimum** edition: don't pick VPS just because it "also has it".

---

## 1.2 Interfaces and tools

### 1.2.1 Snowsight (web interface)

- **Snowsight** is Snowflake's **web interface** (the old **Classic Console** is retired).
- Main capabilities:
  - **Worksheets**: write and run SQL (and **Python worksheets** using Snowpark). Each worksheet has its own **context**: **role, warehouse, database and schema**.
  - **Workspaces** ⚠️: newer file-based editor (folders, multiple files, Git integration); also hosts **Notebooks in Workspaces**.
  - **Dashboards**: tiles of charts built from queries.
  - **Notebooks**, **Streamlit** apps.
  - Object explorer (databases, schemas, tables, data preview), **Add data** / file upload to stages and tables.
  - **Monitoring**: **Query History** (last **14 days**), copy history, task history, dynamic tables graph, **Query Profile**.
  - Admin: users and roles, warehouses, **cost management**, **Trust Center** (security posture), budgets.
  - **Marketplace** and **listings**; data sharing UI.
  - AI assistant ⚠️ (formerly **Snowflake Copilot**; now part of Snowflake's Cortex AI assistants such as **Snowflake Intelligence**).
- **Sharing**: worksheets and dashboards can be **shared with other users from Snowsight** (share button). Sharing **does not grant access to the data**: recipients still need roles/privileges to run the queries.
- Using Snowsight does **not** prevent the same user from using SQL clients, drivers or the CLI: multiple interfaces are allowed (subject to authentication policies and privileges).
- ⚠️ Menu names change (e.g. *Activity* became *Monitoring*). The exam should test **what** a feature does, not where the menu is.
- **Query History older than 14 days** → use `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY` (**365 days**).
- `PUT` and `GET` **cannot be run from a Snowsight worksheet**; use **SnowSQL, Snowflake CLI or a driver** (Snowsight has its own UI upload instead).

### 1.2.2 Command-line clients

| Tool | What it is |
|---|---|
| **SnowSQL** | The **legacy** command-line **SQL client**, **built on the Python connector**. Runs SQL interactively or in batch, supports `PUT`/`GET`, variables, config file (`~/.snowsql/config`). |
| **Snowflake CLI** (`snow`) | The **newer, open-source** command-line tool for **developer workflows**: run SQL, manage objects, deploy **Snowpark** functions/procedures, **Streamlit** apps, **Native Apps**, **Notebooks**, Snowpark Container Services, Git repositories. Ideal for automation and CI/CD. Connections in `config.toml`. |
| **SnowCD** | Connectivity diagnostic tool — ⚠️ **end of life**. Not a SQL client. |

### 1.2.3 IDEs, drivers, connectors, APIs (details in 3.3)

- **Snowflake extension for Visual Studio Code**: write and run Snowflake SQL (and Snowpark) inside VS Code.
- **Drivers**: **JDBC**, **ODBC**, **Python connector** (DB-API), **Go**, **Node.js**, **.NET**, **PHP PDO**.
- **Connectors**: **Spark connector**, **Kafka connector**, Python connector, connectors for ServiceNow/Google Analytics etc. (Openflow ⚠️).
- **Snowflake SQL API**: a **REST API** to submit SQL statements and get results over HTTP.
- **Snowpark** libraries (Python, Java, Scala): DataFrame API — see 1.6.
- **Partner Connect**: quick-start trials with ecosystem partners (ETL, BI, ML tools) from Snowsight; creates partner objects automatically.
- **Git integration**: **Git repository** object to sync code from GitHub/GitLab/Bitbucket/Azure DevOps (3.3).

### 1.2.4 Exam traps — 1.2

- ❌ "SnowSQL is a SQL dialect" / "SnowSQL is the web UI" → ✅ it's the **CLI client** (built on Python connector).
- ❌ "Snowpark is a CLI" → ✅ it's a **developer API / library**.
- ❌ "Sharing a worksheet grants access to the tables" → ✅ No; privileges are still required.
- ❌ "Dashboards are shared through a share / Data Exchange / listing" → ✅ shared **inside Snowsight**.
- ❌ "Query History in Snowsight keeps 1 year" → ✅ **14 days**; ACCOUNT_USAGE = 365 days.
- "Automation scripts that run SQL **and deploy apps**" → **Snowflake CLI**. "Only a CLI client to run SQL" (when Snowflake CLI isn't an option) → **SnowSQL**.

---

## 1.3 Object hierarchy, object types and session context

### 1.3.1 The hierarchy

```
ORGANIZATION
└── ACCOUNT
    ├── Account-level objects: users, roles, warehouses, resource monitors,
    │   databases, shares, integrations (storage, API, notification,
    │   security, external access, catalog), network policies,
    │   external volumes, compute pools, replication/failover groups,
    │   connections, applications (Native Apps)
    └── DATABASE
        ├── Database roles
        └── SCHEMA
            └── Schema-level objects: tables, views, materialized views,
                dynamic tables, external/Iceberg/hybrid/event tables,
                stages, file formats, sequences, pipes, streams, tasks,
                UDFs, stored procedures, external functions,
                masking & row access policies, tags, secrets,
                network rules, alerts, Git repositories, Streamlit apps,
                notebooks, Cortex Search services, image repositories,
                services, budgets, semantic views, models
```

- Path: **Account → Database → Schema → Table** (or any schema object).
- A **database** contains **one or more schemas**; a **schema** is a **logical grouping of database objects** inside **one** database.
- Every database has two schemas by default: **PUBLIC** and **INFORMATION_SCHEMA**.
- A **namespace** = **database + schema**. Fully qualified name: `database.schema.object`. If the session has no current database/schema, names must be qualified.
- Identifiers: unquoted identifiers are stored and resolved in **UPPERCASE** and are case-insensitive; **double-quoted** identifiers are case-sensitive and can contain special characters.
- Classic trap: **warehouses, users, roles, resource monitors, storage integrations and network policies are account objects**, **not** schema objects. **Pipes, file formats, stages, streams, tasks, sequences, external tables** are **schema objects**.
- Special schemas:
  - **Managed access schema** (`WITH MANAGED ACCESS`): only the **schema owner** (or a role with `MANAGE GRANTS`) can grant privileges on objects in it; object owners cannot.
  - **Transient database/schema**: every table created in it is transient.

### 1.3.2 Metadata: INFORMATION_SCHEMA vs ACCOUNT_USAGE

| | **INFORMATION_SCHEMA** | **SNOWFLAKE.ACCOUNT_USAGE** |
|---|---|---|
| Where | One per database (read-only schema) | Shared `SNOWFLAKE` database |
| Content | Views for objects **in that database** + views for **account-level objects** (roles, warehouses, …) + **table functions** for historical/usage data | Account-wide views of objects and usage |
| Dropped objects | No | **Yes** |
| Latency | None (real time) | **45 minutes to ~3 hours** depending on the view |
| Retention | **7 days to 6 months** depending on the view/function (e.g. `QUERY_HISTORY` table function: 7 days) | **365 days (1 year)** |
| Default access | Any role, filtered by its privileges | **ACCOUNTADMIN** (can be granted to others via `IMPORTED PRIVILEGES` or SNOWFLAKE database roles) |

### 1.3.3 Session context

A session's context = **current role, current (secondary) roles, current warehouse, current database, current schema** + session parameters + session variables.

```sql
USE ROLE analyst;
USE SECONDARY ROLES ALL;
USE WAREHOUSE wh_bi;          -- sets the session warehouse (does NOT create it)
USE DATABASE analytics;       -- changes the current database
USE SCHEMA analytics.sales;   -- or USE analytics.sales
SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();
```

- Users can have **defaults**: `DEFAULT_ROLE`, `DEFAULT_WAREHOUSE`, `DEFAULT_NAMESPACE`, `DEFAULT_SECONDARY_ROLES`.
- Every Snowsight **worksheet** has its own role/warehouse/database/schema context.
- **Session variables**: `SET my_var = 10;` then use `$my_var`; `UNSET my_var;` `SHOW VARIABLES;`.

### 1.3.4 Parameters

Parameters control behavior. Types:

| Type | Set with | Examples |
|---|---|---|
| **Account parameters** | `ALTER ACCOUNT SET` (ACCOUNTADMIN) | `MIN_DATA_RETENTION_TIME_IN_DAYS`, `PERIODIC_DATA_REKEYING`, `NETWORK_POLICY` |
| **Session parameters** | defaults at account, overridden at **user**, then **session** (`ALTER SESSION SET`) | `TIMEZONE`, `QUERY_TAG`, `USE_CACHED_RESULT`, `AUTOCOMMIT`, `STATEMENT_TIMEOUT_IN_SECONDS`, `DATE_INPUT_FORMAT` |
| **Object parameters** | account → **warehouse**, or account → **database → schema → table** | `DATA_RETENTION_TIME_IN_DAYS`, `MAX_CONCURRENCY_LEVEL`, `STATEMENT_QUEUED_TIMEOUT_IN_SECONDS` |

- **Precedence**: the **most specific level wins**. Session > user > account. Table > schema > database > account. An **explicit session value overrides** inherited defaults.
- `SHOW PARAMETERS [IN SESSION | IN ACCOUNT | IN WAREHOUSE x | IN TABLE t];`
- `STATEMENT_TIMEOUT_IN_SECONDS` can be set on both the **session** and the **warehouse**; the **lower** non-zero value applies.

### 1.3.5 SHOW / DESCRIBE / GET_DDL

- `SHOW <objects>` lists objects **the current role has privileges to see** (e.g. `SHOW FILE FORMATS IN ACCOUNT`). Scope (`IN ACCOUNT / DATABASE / SCHEMA`) matters; without it the current context is used.
- `DESCRIBE <object>` shows details of **one** object.
- `SELECT GET_DDL('TABLE','t');` returns the DDL.
- `LIST @stage` lists **staged files** (not formats).
- SHOW/DESCRIBE are metadata operations and **do not need a running warehouse**.

### 1.3.6 User-defined functions (UDFs)

- A **UDF** extends SQL with custom logic; it **returns a value** and is used **inside SQL expressions** (`SELECT my_udf(col) FROM t`).
- **Handler languages**: **SQL, JavaScript, Python, Java, Scala**. (Not Ruby, Perl, C#, Go, R.)
- Kinds:
  - **Scalar UDF**: one output row per input row.
  - **Tabular UDF = UDTF**: returns a set of rows; declared with **`RETURNS TABLE (...)`**; used in the `FROM` clause with `TABLE(...)`.
  - **UDAF** (user-defined aggregate function): Python.
  - **Vectorized** Python UDF/UDTF: process batches as pandas DataFrames.
- **Overloading**: several functions/procedures **with the same name in the same schema** but **different number or types of arguments** (different signature).
- **Secure UDF** (`CREATE SECURE FUNCTION`): hides the definition from non-owners and disables optimizations that could expose data.
- UDFs **cannot run DDL/DML**; they compute values.
- Handler code can be **inline** (in the `AS $$ ... $$` body) or **staged** (a JAR/Python file on a stage, `IMPORTS`).
- Body delimiters: **single quotes** `'...'` or **dollar quotes** `$$ ... $$` (dollar quotes avoid escaping).
- **External function**: a **type of UDF** whose code **executes outside Snowflake** (e.g. AWS Lambda, Azure Function), called through a **proxy service** (e.g. Amazon API Gateway) using an **API integration**. The Snowflake object stores only connection info. Scalar (one value per row). Available in **Standard**. Costs: Snowflake compute + the remote service's cost.
- Do not confuse with **external access integrations**: they let Python/Java/Scala UDFs and procedures call external network endpoints directly (with **network rules** and **secrets**).

### 1.3.7 Stored procedures

- Called with **`CALL proc(args)`**; **cannot** be used inside an expression; a single SQL statement can call **only one stored procedure** (but many UDFs).
- Can execute **DDL and DML**, loops, branching, error handling, dynamic SQL — the right tool for **administrative tasks** and **procedural logic**.
- Languages: **Snowflake Scripting (SQL)**, **JavaScript**, **Python**, **Java**, **Scala**.
- **Rights**:
  - **Owner's rights** (`EXECUTE AS OWNER`, **the default**): runs with the **owner role's privileges**; **inherits the caller's current warehouse**; uses the database/schema **where the procedure was created**; **cannot read, set or unset caller session variables** and cannot change session state. Lets you **delegate** a task without granting the underlying privileges.
  - **Caller's rights** (`EXECUTE AS CALLER`): runs with the **caller's privileges** and **session context**, can access **session variables**.
  - ⚠️ **Restricted caller's rights** (`EXECUTE AS RESTRICTED CALLER`): newer variant limited to privileges the owner allows.
- Can return a value (scalar or table). To query a procedure's output you can use `RESULT_SCAN(LAST_QUERY_ID())`.
- **Snowflake Scripting**: `DECLARE ... BEGIN ... EXCEPTION ... END;` blocks, `EXECUTE IMMEDIATE` for dynamic SQL.
- **`EXECUTE IMMEDIATE FROM @stage/script.sql`** runs a script file from a stage or **Git repository clone**; adding **`USING (var => value)`** renders it as a **Jinja2 template**.

#### UDF vs stored procedure

| | UDF | Stored procedure |
|---|---|---|
| Invocation | Inside a SQL statement (`SELECT f(x)`) | `CALL p(x)` |
| Per statement | Many | One |
| Returns | Value (scalar) or rows (UDTF) — required | Optional value |
| DDL/DML | No | **Yes** |
| Privileges model | — | Owner's or caller's rights |
| Typical use | Calculations, transformations | Administration, multi-step logic |

### 1.3.8 Sequences

- `CREATE SEQUENCE s START = 1 INCREMENT = 1;` → `s.NEXTVAL`.
- Values are **unique** but **gap-free numbering is not guaranteed**; `NEXTVAL` is evaluated every time it's referenced (also in `SELECT`).
- `AUTOINCREMENT` / `IDENTITY` columns use sequences internally. `ORDER` / `NOORDER` controls ordering guarantees.

### 1.3.9 Exam traps — 1.3

- ❌ "A warehouse is a schema object" → ✅ account-level object.
- ❌ "Namespace = account + database" → ✅ **database + schema**.
- ❌ "UDFs can be written in C#/Ruby/Go" → ✅ SQL, JavaScript, Python, Java, Scala.
- ❌ "UDFs can run DDL/DML" → ✅ only **stored procedures** can.
- ❌ "Owner's rights procedures use the caller's database context / can read session variables" → ✅ they **inherit only the caller's warehouse**; session variables need **caller's rights**.
- ❌ "`STRICT` gives access to session variables" → ✅ `STRICT` = returns NULL on NULL input.
- ❌ "External functions return a table" → ✅ scalar, one value per row.
- "Table function keyword" → **`RETURNS TABLE`**.
- `USE WAREHOUSE` **sets** the session warehouse; it doesn't create or grant anything.

---

## 1.4 Virtual warehouses

### 1.4.1 Definition

- A **virtual warehouse** is a **cluster of compute resources** (CPU, memory, temporary storage) used to:
  - run **queries** (`SELECT`),
  - run **DML** (`INSERT`, `UPDATE`, `DELETE`, `MERGE`),
  - **load and unload data** (`COPY INTO <table>`, `COPY INTO <location>`),
  - run **stored procedures** and other statements that process data.
- Operations that do **not** need a warehouse (served by cloud services): **DDL** (`CREATE`, `ALTER`, `DROP`), `SHOW`, `DESCRIBE`, `LIST @stage`, `GET`/`PUT` file transfer, `USE`. A query answered from the **result cache** does not consume warehouse compute.
- ⚠️ Some third-party material claims `COUNT(*)`/`MIN`/`MAX` "never need a warehouse" because of metadata. The warehouse documentation says warehouses are required for **queries and all DML**; don't build answers on that claim.
- One warehouse can be used by many users/sessions; one session uses **one current warehouse** at a time.

### 1.4.2 Warehouse types

| Type | Use | Notes |
|---|---|---|
| **Standard** — **Gen1** | Default general-purpose type | |
| **Standard** — **Gen2** ⚠️ | Same use, newer **hardware + software optimizations** (faster DML, scans, analytics) | Selected with `RESOURCE_CONSTRAINT = STANDARD_GEN_2`. Generation ≠ cluster count. Consumes more credits/hour than Gen1 → **benchmark** elapsed time **and** cost. |
| **Snowpark-optimized** | Workloads with **large memory requirements**: ML training, big UDFs/UDTFs, Snowpark procedures | Much **more memory per node** (16× a standard node by default; configurable memory options with `RESOURCE_CONSTRAINT = MEMORY_1X / MEMORY_16X / MEMORY_64X …`). Higher credit rate. `WAREHOUSE_TYPE = 'SNOWPARK-OPTIMIZED'`. |

### 1.4.3 Sizes and credits (Standard Gen1)

| Size | Credits/hour | | Size | Credits/hour |
|---|---|---|---|---|
| **X-Small** (default in SQL) | 1 | | **2X-Large** | 32 |
| **Small** | 2 | | **3X-Large** | 64 |
| **Medium** | 4 | | **4X-Large** | 128 |
| **Large** | 8 | | **5X-Large** | 256 |
| **X-Large** | 16 | | **6X-Large** | 512 |

- Each step up **doubles compute and credits**. For a query that scales well, double the size ≈ half the time ≈ same cost.
- **Billing**: **per second**, with a **60-second minimum** every time the warehouse **starts or resumes** (and for added resources when resized up). A **suspended** warehouse consumes **no credits**.
- Multi-cluster: credits = size rate × **number of running clusters**.

### 1.4.4 Key properties

```sql
CREATE WAREHOUSE wh_bi WITH
  WAREHOUSE_SIZE      = 'MEDIUM'
  WAREHOUSE_TYPE      = 'STANDARD'
  AUTO_SUSPEND        = 300        -- seconds of inactivity; default 600
  AUTO_RESUME         = TRUE       -- default TRUE
  INITIALLY_SUSPENDED = TRUE       -- default FALSE (starts right after CREATE)
  MIN_CLUSTER_COUNT   = 1          -- multi-cluster (Enterprise+)
  MAX_CLUSTER_COUNT   = 3
  SCALING_POLICY      = 'STANDARD' -- or 'ECONOMY'
  RESOURCE_MONITOR    = rm_bi
  ENABLE_QUERY_ACCELERATION = FALSE;
```

| Property | Meaning / default |
|---|---|
| `WAREHOUSE_SIZE` | X-Small…6X-Large. Default **X-Small** with `CREATE WAREHOUSE` ⚠️ (Snowsight's form proposes a bigger default). |
| `AUTO_SUSPEND` | Seconds of **inactivity** before suspending. Default **600 s (10 min)**. **0 or NULL = never suspends** (not recommended unless the workload is continuous). |
| `AUTO_RESUME` | Resumes automatically when a statement is submitted. Default **TRUE**. |
| `INITIALLY_SUSPENDED` | Whether the warehouse **starts suspended right after `CREATE`**. Default **FALSE**. |
| `MIN_CLUSTER_COUNT` / `MAX_CLUSTER_COUNT` | Multi-cluster limits. |
| `SCALING_POLICY` | `STANDARD` (default) or `ECONOMY`. |
| `MAX_CONCURRENCY_LEVEL` | Concurrent statements per cluster before queuing. Default **8**. |
| `STATEMENT_QUEUED_TIMEOUT_IN_SECONDS` | Time a statement may queue. Default **0 = no timeout**. |
| `STATEMENT_TIMEOUT_IN_SECONDS` | Max run time. Default **172800 s (2 days)**. |
| `RESOURCE_MONITOR` | Credit quota/actions (Domain 2.3). |
| `ENABLE_QUERY_ACCELERATION`, `QUERY_ACCELERATION_MAX_SCALE_FACTOR` | Query Acceleration Service (Enterprise, Domain 4.2). |

- Auto-suspend and auto-resume apply to the **entire warehouse**, not individual clusters.
- States: **STARTED**, **SUSPENDED**, **RESIZING**.
- Commands: `ALTER WAREHOUSE wh SUSPEND;` `ALTER WAREHOUSE wh RESUME [IF SUSPENDED];` `ALTER WAREHOUSE wh ABORT ALL QUERIES;` `ALTER WAREHOUSE wh SET WAREHOUSE_SIZE = 'LARGE' WAIT_FOR_COMPLETION = TRUE;`
- Warehouses can be created and managed with **SQL** and **Snowsight** (and any client that runs SQL, given privileges).

### 1.4.5 Warehouse privileges

| Privilege | Allows |
|---|---|
| **USAGE** | Use the warehouse to run queries (needed to `USE WAREHOUSE` and run statements) |
| **OPERATE** | **Start, stop, suspend, resume**; abort queries |
| **MODIFY** | **Alter properties, including resize**; assign a resource monitor |
| **MONITOR** | View current/past queries and usage on the warehouse |
| **OWNERSHIP** | Full control |
| `CREATE WAREHOUSE` (account privilege) | Create warehouses (SYSADMIN has it by default) |

### 1.4.6 Scaling: up, out, and across

| Strategy | How | Solves | Example |
|---|---|---|---|
| **Scale UP** | Increase **size** (X-Small → X-Large) | **Performance** of **complex/large queries** (more resources per cluster) | `ALTER WAREHOUSE wh SET WAREHOUSE_SIZE='LARGE'` |
| **Scale OUT** | Add **clusters of the same size** (multi-cluster) | **Concurrency**: many users/queries **queuing** | `MAX_CLUSTER_COUNT = 5` |
| **Isolate (separate warehouses)** | One warehouse per workload | **Contention** between workloads (loading vs reporting) | `wh_load`, `wh_bi`, `wh_ds` |

- Rules of thumb:
  - Queries slow because they are big/complex, **spilling** to disk → **scale up**.
  - Queries slow because they **wait in queue** (many concurrent users) → **scale out** (multi-cluster) or **separate warehouses**.
  - Loading interferes with BI → **separate warehouses**.
- Choosing size: **experiment** — run representative queries on different sizes and compare **elapsed time and cost**. Start small.
- Bulk loading performance depends more on the **number and size of files** (parallelism) than on warehouse size; a larger warehouse does not speed up loading **one** big file much.

### 1.4.7 Resizing behavior

- A warehouse can be resized **at any time**: while **running** (even with queries executing) or while **suspended**.
- **Running queries are not affected**; the new size applies to **queued and new** queries once resources are provisioned.
- **Shrinking**: compute resources are removed **only when they are no longer executing current statements**.
- **Resizing a suspended warehouse**: just changes configuration; resources are provisioned **when it next resumes**.
- **`WAIT_FOR_COMPLETION = TRUE`** with `ALTER WAREHOUSE ... SET WAREHOUSE_SIZE` makes the command **return only when the resize has finished** (all resources provisioned).
- Resizing a **multi-cluster** warehouse applies the new size to **all clusters** (running and future). It doesn't change scaling policy, cluster counts or auto-suspend.
- A newly created/resumed/resized warehouse runs statements **once provisioning is complete**.
- Resizing up a warehouse **drops nothing**; but **suspending** a warehouse clears its local disk cache.

### 1.4.8 Multi-cluster warehouses (Enterprise Edition+)

- A **multi-cluster warehouse** has a set of clusters (same size) to handle **concurrency**. Queries are **automatically load-balanced** across clusters; the user **never chooses** a cluster. **One query runs on one cluster** (it is not split across clusters).
- Purpose: **eliminate or reduce queuing** of concurrent queries. It does **not** make a single slow query faster.
- ⚠️ Maximum clusters: historically 10 per warehouse; newer limits are higher for smaller sizes. Don't memorize a single universal number.

**Modes** (determined by min/max):

| Mode | Configuration | Behavior |
|---|---|---|
| **Maximized** | `MIN_CLUSTER_COUNT = MAX_CLUSTER_COUNT` (> 1) | **All clusters start** when the warehouse starts. For steady, known high concurrency. |
| **Auto-scale** | `MIN_CLUSTER_COUNT < MAX_CLUSTER_COUNT` | Snowflake **starts and stops clusters** as load changes, within the limits. |

**Scaling policies** (only meaningful in **auto-scale** mode; they exist **to control the credits** consumed):

| Policy | Starts a new cluster… | Shuts a cluster down… | Favors |
|---|---|---|---|
| **Standard** (default) | **Immediately** when a query is **queued** or the system detects one more query than the running clusters can handle (successive clusters wait ~20 s after the previous) | After **sustained low load**, when the least-loaded cluster's work fits in the others and its running queries finish (older material: 2–3 consecutive checks at 1-min intervals ⚠️) | **Performance**: minimizes queuing |
| **Economy** | Only if the system estimates enough load to keep it **busy for at least 6 minutes** | When it estimates **less than 6 minutes** of work left for it | **Credits**: keeps running clusters **fully loaded**; queries may queue |

- Remember: **Standard/Economy are scaling policies**; **Maximized/Auto-scale are modes**.
- Queuing persists at the maximum cluster count → **increase `MAX_CLUSTER_COUNT`** (within limits), or route work to another warehouse.

### 1.4.9 Concurrency and queuing

- The number of queries a warehouse can process concurrently depends on **the size and complexity of each query** (bigger scans/heavier processing use more resources). `MAX_CONCURRENCY_LEVEL` (default 8) is the cap per cluster.
- When capacity is exhausted and no cluster can be added, new queries **queue** until resources free up, until `STATEMENT_QUEUED_TIMEOUT_IN_SECONDS` expires, or until they're cancelled.

### 1.4.10 Auto-suspend best practices

- Short auto-suspend (e.g. 60–300 s) saves credits for ad hoc/sporadic workloads.
- Keep it longer (or running) for **steady continuous workloads** or **latency-sensitive** workloads that should avoid resume delays — and to preserve the **warehouse cache**.
- Never suspending (`AUTO_SUSPEND = 0`/NULL) keeps consuming credits.

### 1.4.11 Warehouse vs serverless compute

Serverless features run on **Snowflake-managed compute**, not your warehouse: **Snowpipe**, **Automatic Clustering**, **materialized view maintenance**, **Search Optimization**, **Query Acceleration**, **serverless tasks**, **replication**, **Snowpipe Streaming**. In contrast **user-managed tasks** and **dynamic tables** use a warehouse you specify.

### 1.4.12 Exam traps — 1.4

- ❌ "Scaling out improves the performance of one complex query" → ✅ out = **concurrency**; up = **performance**.
- ❌ "Increase size to fix queuing of many small queries" is not the *intended* answer when multi-cluster is offered.
- ❌ "Economy/Standard are modes" → ✅ **policies**. Modes = **Auto-scale/Maximized**.
- ❌ "Auto-scale = min and max equal" → ✅ **different**; equal = Maximized.
- ❌ "Resize requires suspending the warehouse" / "resize kills running queries" → ✅ No / No.
- ❌ "User must pick the cluster" → ✅ automatic.
- ❌ "Multi-cluster in Standard edition" → ✅ **Enterprise+**.
- ❌ "Privilege `ALTER` / `RESIZE`" → ✅ **MODIFY** to resize; **OPERATE** to suspend/resume.
- ❌ "Snowpark-optimized for ad hoc queries / small scans" → ✅ **memory-intensive** workloads.
- `INITIALLY_SUSPENDED` controls state after **create**; `AUTO_RESUME` controls later restarts.
- Default `AUTO_SUSPEND` = **600** seconds.
- Billing minimum = **60 seconds**, then per second.

---

## 1.5 Storage: micro-partitions, table types and views

### 1.5.1 Micro-partitions

- All data in standard Snowflake tables is **automatically divided into micro-partitions**: contiguous units of storage holding **50 MB to 500 MB of uncompressed data** (smaller once stored, because they are always **compressed**).
- Data inside a micro-partition is stored **by column (columnar)**; **each column is compressed independently**, Snowflake chooses the best algorithm.
- Micro-partitioning happens **automatically as data is loaded/inserted**, following the **natural order of insertion**. Users don't define partitions (no `PARTITION BY`) and cannot disable it.
- Micro-partitions are **immutable**: **DML never modifies them in place**; it writes **new micro-partitions** and the old ones are kept for **Time Travel** and **Fail-safe**. This also enables **zero-copy cloning**.
- **Encrypted** always, in every edition.
- **Metadata** stored (in cloud services) for every micro-partition:
  - **range of values (min/max) for each column**,
  - **number of distinct values**,
  - additional properties used for optimization (e.g. NULL count).
- This metadata enables **query pruning**: the optimizer skips micro-partitions whose value ranges can't match the filter → **less I/O from object storage to the warehouse**. Pruning works on the columns referenced; Snowflake scans only those columns (columnar).
- Benefits (exam wording): automatically derived (no maintenance), small size → efficient DML and **fine-grained pruning**, overlapping value ranges reduce skew, columnar storage scans only needed columns, **immutability supports Time Travel**, independent compression per column.

### 1.5.2 Clustering

- **Clustering** = **the way data is grouped together and stored within micro-partitions** (how values are distributed across micro-partitions).
- **Natural clustering**: data loaded in date order is naturally well clustered by date.
- Measures (use `SYSTEM$CLUSTERING_INFORMATION('t','(col)')` and `SYSTEM$CLUSTERING_DEPTH`):
  - **Clustering depth**: the average depth of overlapping micro-partitions for a column set. **Smaller is better** (1 = perfect, for a populated table).
  - **average_overlaps**: average number of micro-partitions that overlap (have overlapping value ranges) with each micro-partition.
  - **Constant micro-partition**: all rows have the same value for the key → can't be improved further.
- **Clustering key**: one or more columns/expressions designated to **co-locate** related rows in the same micro-partitions on **very large tables**.
  ```sql
  CREATE TABLE t (...) CLUSTER BY (event_date, region);
  ALTER TABLE t CLUSTER BY (event_date);
  ALTER TABLE t DROP CLUSTERING KEY;
  ALTER TABLE t SUSPEND RECLUSTER;  ALTER TABLE t RESUME RECLUSTER;
  ```
- **Automatic Clustering**: once a key is defined, Snowflake reclusters **in the background** using **serverless compute** (credits) **without blocking DML**; it writes **new** micro-partitions (also increases storage through Time Travel/Fail-safe of replaced partitions).
- **When** to define one (it is **not** best practice on every table):
  - table is **very large (multi-terabyte)**, many micro-partitions;
  - queries are **selective** and filter/join/sort on the same columns;
  - query performance degraded over time / poor pruning;
  - table is queried often and **changes infrequently** (high churn = high reclustering cost).
- Choosing keys: **up to 3–4 columns**; prioritize columns used in **filters**, then joins; order columns from **lower to higher cardinality**; for very high cardinality use an expression (e.g. `TO_DATE(ts)`, `SUBSTRING`).
- A clustering key is **not an index** (no B-tree). Dropping it doesn't rewrite existing micro-partitions.

### 1.5.3 Table types

| Type | Persists | Time Travel | Fail-safe | Notes |
|---|---|---|---|---|
| **Permanent** (default) | Until dropped | **0–1 day** (Standard); **0–90 days** (Enterprise+); default 1 | **7 days** | Highest storage cost (TT + Fail-safe). |
| **Transient** | **Until explicitly dropped**; visible to all users with privileges | **0 or 1 day** (default 1) | **None** | For data that **must survive sessions** but can be **reconstructed** (staging, ETL intermediates). `CREATE TRANSIENT TABLE`. |
| **Temporary** | **Only for the session** that created it; dropped at session end; **visible only to that session** | **0 or 1 day** (ends with the session) | **None** | Session-scoped work. Can have the **same name as a permanent table** and then **hides** it in that session. `CREATE TEMPORARY TABLE`. |
| **External** | Metadata in Snowflake; data in **external stage** files | No | No | **Read-only**; columns `VALUE` (VARIANT), `METADATA$FILENAME`; refresh metadata manually (`ALTER EXTERNAL TABLE ... REFRESH`) or automatically via cloud event notifications. Can be the base of a materialized view. |
| **Apache Iceberg™** | Data (Parquet) + metadata in **your cloud storage** via an **external volume** | Yes (Snowflake-managed) ⚠️ | No (storage is yours) | **Open table format**, interoperable with other engines (Spark, Trino…). See 1.5.4. |
| **Hybrid** (Unistore) | Until dropped | Limited ⚠️ | — | **Row-based** storage for **low-latency, high-concurrency point reads/writes** (transactional + analytical). **Primary key required and enforced**, indexes, enforced FKs/unique. |
| **Dynamic** | Until dropped | Yes | Yes | **Declarative pipeline**: stores the result of a query and **refreshes automatically** to meet a **`TARGET_LAG`**, using a specified **warehouse**. Refresh mode `AUTO`/`FULL`/`INCREMENTAL`. (Domain 3.2.) |
| **Event table** | Until dropped | — | — | Stores **logs, traces, metrics** from UDFs, procedures, apps. |
| **Directory table** | Attached to a **stage** | — | — | Not a separate object: catalog of **files** in a stage (file URL, size, ETag…). |

Key facts:

- Both **transient and temporary** tables have **no Fail-safe** → the two mechanisms to **reduce storage cost for short-lived data**. They still pay active storage and (up to 1 day) Time Travel.
- **The type cannot be changed after creation** (e.g. permanent → transient): recreate with `CREATE TABLE ... AS SELECT` / `CLONE` into the desired type.
- **Transient databases/schemas** make every child table transient.
- Extended Time Travel (> 1 day) applies only to **permanent** objects.
- **Constraints**: on standard tables only **NOT NULL** is enforced; **PRIMARY KEY, UNIQUE, FOREIGN KEY** are **informational** (not enforced) — except on **hybrid tables**, where they are enforced.
- A table is a **logical** structure; its rows are physically stored in micro-partitions. Tables are **owned by roles**, not users.

### 1.5.4 Apache Iceberg tables

- **External volume**: account-level object that stores the identity/credentials and location of your cloud storage (S3, GCS, Azure). **One external volume can support one or more Iceberg tables**. A **default external volume** can be set at **account, database or schema** level; then `CREATE ICEBERG TABLE` can omit `EXTERNAL_VOLUME`.
- **Catalog** (who manages the Iceberg metadata):
  - **Snowflake as the catalog** (`CATALOG = 'SNOWFLAKE'`): **Snowflake-managed** Iceberg table, **full read/write** support, Snowflake features (clustering, Time Travel…). Other engines can read via **Snowflake Horizon Catalog / Open Catalog** ⚠️.
  - **External catalog** (AWS Glue, object storage metadata files, an **Iceberg REST catalog**, **Snowflake Open Catalog** (managed Apache Polaris)): needs a **catalog integration**; ⚠️ read access plus limited/conditional write.
  - An externally-managed Iceberg table **can be converted** to use **Snowflake as the catalog**.
- Storage is billed by **your cloud provider**, not by Snowflake; compute (warehouses) is billed by Snowflake.
- Use case: **interoperability** with other engines without copying data; data lakehouse.

### 1.5.5 Views

| View type | Stores data? | Edition | Key points |
|---|---|---|---|
| **Standard (non-materialized) view** | No — only the **definition**; query runs at access time | All | Changing columns/logic = **recreate** (`CREATE OR REPLACE VIEW`). `ALTER VIEW` only renames, sets/unsets `SECURE`, comment, tags, policies. |
| **Secure view** | No | All | `CREATE SECURE VIEW`. **Definition hidden** from users who don't own it (visible only to the owner role / authorized roles). The optimizer **avoids certain optimizations** that could expose underlying data (e.g. pushing user predicates before security filters) → can be **slower**. Used for **data privacy** and **data sharing**. `IS_SECURE` column in `SHOW VIEWS` / INFORMATION_SCHEMA.VIEWS / ACCOUNT_USAGE. |
| **Materialized view** | **Yes** — stores a **pre-computed result** | **Enterprise+** | **Maintained automatically** by a **background serverless service** (credits + storage). Data is **always current**: if maintenance lags, Snowflake combines up-to-date parts with newer base-table data. Best for **expensive queries** repeated often on data that **changes rarely**. Limitations: **one base table only (no joins)**, no window functions, no `HAVING`, no `ORDER BY`, no nondeterministic functions, no UDFs ⚠️. Can be **secure**, can have a **clustering key**, can be built on an **external table**. If maintenance is **suspended**, the view **cannot be queried** until resumed. Base-table changes like dropping a used column also suspend/invalidate it. |
| **Recursive view** | No | All | Uses a recursive CTE. |

- Objects that **consume storage**: tables (permanent/transient/temporary), **materialized views**, dynamic tables, stages (internal), Time Travel/Fail-safe copies. A **standard view** stores only its definition; external and Iceberg table data is in **your** storage.
- **Materialized view vs dynamic table vs view**:
  - **View**: no storage, computed every time.
  - **Materialized view**: single table, serverless automatic maintenance, always current, query rewrite possible.
  - **Dynamic table**: any query (joins, aggregations, multiple tables), refreshed to a **target lag** with **your warehouse**; best for **transformation pipelines**.
- Sharing: views shared to consumers should be **secure views** (shares only accept secure objects by default — `SECURE_OBJECTS_ONLY`).

### 1.5.6 Exam traps — 1.5

- ❌ "Micro-partitions are 16 MB / 1 GB / user-defined" → ✅ **50–500 MB uncompressed**, automatic.
- ❌ "DML updates micro-partitions in place" → ✅ immutable; new ones are written.
- ❌ "Metadata stores a B-tree / per-row index" → ✅ per-column **ranges** and **distinct counts** per micro-partition.
- ❌ "Define a clustering key on every table" → ✅ only on very large tables with a clear benefit.
- ❌ "Remove key with `ALTER TABLE ... REMOVE/PURGE CLUSTERING KEY`" → ✅ **`DROP CLUSTERING KEY`**.
- ❌ "Temporary tables persist across sessions" → ✅ that's **transient**.
- ❌ "Transient tables have 7-day Fail-safe / up to 90 days Time Travel" → ✅ **no Fail-safe**, **0 or 1 day**.
- ❌ "`ALTER VIEW` can change the SELECT" → ✅ recreate it.
- ❌ "Materialized views need manual REFRESH / return stale data" → ✅ automatic, always current.
- ❌ "Materialized views are in Standard" → ✅ **Enterprise**.
- ❌ "Materialized views support joins" → ✅ single table (use a **dynamic table** for joins).
- ❌ "Secure views make queries faster" → ✅ they can be **slower** (fewer optimizations).
- "Layered view", "embedded view", "external view" → **not** view types.
- "Provisional table" → **not** a table type.

---

## 1.6 AI/ML and application development

### 1.6.1 Snowpark

- **Snowpark** = developer framework/libraries to write data pipelines and apps in **Python, Java and Scala** that **execute inside Snowflake, close to the data**.
- **DataFrame API**: operations are **lazily evaluated** and translated (**pushed down**) to **SQL** executed in a **virtual warehouse**. No need to export data or run a separate Spark cluster.
- With Snowpark you can create **UDFs, UDTFs, UDAFs and stored procedures** in Python/Java/Scala.
  - Snowpark library languages: **Python, Java, Scala**. (JavaScript and SQL are UDF languages via `CREATE FUNCTION`, **not** Snowpark libraries.)
- Python packages come from the **Snowflake Anaconda channel** (or uploaded to a stage / Artifact Repository ⚠️).
- **Snowpark pandas API** (modin-based) to run pandas code at scale in Snowflake.
- **Snowpark-optimized warehouses** for memory-heavy Snowpark/ML.
- **Python worksheets** in Snowsight run Snowpark code (handler `main(session)`).
- **Snowpark Container Services (SPCS)**: run **containerized** apps/services (any language, including GPUs) inside Snowflake. Objects: **compute pool** (account-level), **image repository**, **service**, **job service**. Images from an OCI registry pushed to the Snowflake image repository.

### 1.6.2 Streamlit in Snowflake

- **Streamlit** = open-source **Python** framework for **interactive data apps**.
- **Streamlit in Snowflake (SiS)**: build, deploy and share Streamlit apps **hosted inside Snowflake**; data never leaves; governed by **RBAC**; apps run with **owner's rights**; need a warehouse (or container runtime ⚠️) to run queries. Apps are schema objects.
- Hosting the app doesn't replace data permissions or compute requirements.

### 1.6.3 Snowflake Notebooks

- **Notebooks**: interactive development in Snowsight combining **SQL, Python and Markdown cells**; integrated with **Snowpark**, **Cortex AI functions**, **Streamlit** visualizations and **Git repositories** for version control.
- Run on a **warehouse runtime** or a **container runtime** (Snowpark Container Services, CPU/GPU, for ML).
- Can be created from a Git file: `CREATE NOTEBOOK nb FROM '@repo/branches/main/path' MAIN_FILE = 'nb.ipynb';`
- ⚠️ Moving to **Notebooks in Workspaces**.

### 1.6.4 Snowflake Cortex AI

**Snowflake Cortex** = fully managed AI/LLM capabilities inside Snowflake; models are **hosted by Snowflake** (Snowflake models and partners' such as Mistral, Meta Llama, Anthropic Claude, OpenAI ⚠️), data stays in Snowflake's governance boundary.

#### Cortex AISQL functions (AI Functions)

Called from SQL (or Python); **task-specific** functions need **no prompt engineering and no infrastructure**. They run on text, and many on **images, audio, documents** via **`TO_FILE`**.

| Function | Purpose |
|---|---|
| **AI_COMPLETE** | General **LLM completion** for text or images with a chosen model; the **recommended function for most generative tasks**; updated version of `COMPLETE` (legacy `SNOWFLAKE.CORTEX.COMPLETE`). Signature: `AI_COMPLETE('<model>', '<prompt>')` — **first argument = model**. |
| **AI_CLASSIFY** | Classify text/images into **user-defined categories**. |
| **AI_FILTER** | Returns **TRUE/FALSE** for a natural-language condition → filter/join rows. |
| **AI_AGG** | Aggregate a text column across rows with a **prompt** (insights), not limited by context window. |
| **AI_SUMMARIZE_AGG** | **Summarize** a text column **across many rows**. |
| **AI_SENTIMENT** | Sentiment score (overall and per aspect). |
| **AI_EXTRACT** | Extract structured information/fields from text or documents (successor of EXTRACT_ANSWER / Document AI ⚠️). |
| **AI_TRANSLATE** | Translate between languages. |
| **AI_EMBED** | Create an **embedding vector** for text or an image (similarity search, clustering, classification). |
| **AI_SIMILARITY** | **Embedding similarity** between two inputs directly (no manual vectors). |
| **AI_TRANSCRIBE** | Transcribe **audio/video** in a stage (text, timestamps, speakers). |
| **AI_PARSE_DOCUMENT** | Extract text (**OCR** mode) or text + structure (**LAYOUT** mode) from documents in a stage. |
| **AI_REDACT** | Remove **PII** from text. |
| **AI_COUNT_TOKENS** | Count tokens of an input for a model/function (stay within limits). |
| **TO_FILE** | Build a reference to a **staged file** for AI functions. |
| **PROMPT** | Build a prompt object with placeholders (e.g. combining text and files). |
| Legacy (`SNOWFLAKE.CORTEX.*`) ⚠️ | `COMPLETE`, `SUMMARIZE`, `SENTIMENT`, `TRANSLATE`, `EXTRACT_ANSWER`, `EMBED_TEXT_768/1024`, `CLASSIFY_TEXT`, `TRY_COMPLETE` |

- **VECTOR** data type stores embeddings; similarity with **`VECTOR_COSINE_SIMILARITY`**, `VECTOR_L2_DISTANCE`, `VECTOR_INNER_PRODUCT`.
- Access: the **`SNOWFLAKE.CORTEX_USER`** database role (granted to PUBLIC by default ⚠️; admins can revoke and grant selectively). Cross-region inference via the account parameter `CORTEX_ENABLED_CROSS_REGION`.
- Cost: billed by **tokens processed** (input and output depending on function). The query itself runs on a warehouse; Snowflake recommends **no larger than Medium** — a bigger warehouse doesn't speed up the LLM.
- AISQL functions are optimized for **batch throughput** over many rows. For **interactive, latency-sensitive single calls** use the **Cortex REST API** (Complete, Embed, Agents).

#### Cortex services

| Service | Use it when… |
|---|---|
| **Cortex Search** | **Hybrid (vector + keyword) search** over **unstructured text** — the retrieval engine for **RAG** chatbots and enterprise search (e.g. "search product manuals"). Object: Cortex Search service. |
| **Cortex Analyst** | Business users ask questions in **natural language** about **structured data** and get **SQL-based answers** (text-to-SQL), using a **semantic model / semantic view** describing governed metrics. |
| **Cortex Agents** | Orchestrate across **Cortex Search, Cortex Analyst** and tools to plan and answer complex requests. |
| **Snowflake Intelligence** ⚠️ | Conversational agent experience for business users, built on Cortex Agents. |
| **Cortex Fine-tuning** | Fine-tune supported LLMs on your data (serverless). |
| **Cortex Guard** | Filter unsafe/harmful LLM responses (option of COMPLETE). |
| **Document AI** ⚠️ | Extract data from documents (legacy, replaced by `AI_EXTRACT`). |

### 1.6.5 Snowflake ML

- **Snowflake ML** = integrated capabilities to **develop, train, deploy and manage ML models in Snowflake**:
  - **Snowflake ML Python library** (`snowflake-ml-python`): modeling (scikit-learn, XGBoost, LightGBM wrappers), distributed preprocessing.
  - **Feature Store**: create, store, manage features.
  - **Model Registry**: store, version, govern and deploy models; inference in warehouses or SPCS.
  - **ML Jobs / Container Runtime** for distributed training on CPU/GPU; ML Observability, Experiments, Datasets ⚠️.
- **ML Functions** (SQL, no code ML): **FORECAST** (time series), **ANOMALY_DETECTION**, **TOP_INSIGHTS** (contribution explorer), **CLASSIFICATION**.

### 1.6.6 Other application-development features

- **Native Apps Framework**: package data + logic as **applications** shared/sold through listings/Marketplace (Domain 5.3).
- **Git repository** object for CI/CD (Domain 3.3).
- **External functions** vs **external access integrations** (see 1.3.6).
- **JavaScript** handlers are allowed in **UDFs and stored procedures** (not in tasks or views).

### 1.6.7 Exam traps — 1.6

- ❌ "Snowpark supports JavaScript/R/C++" → ✅ **Python, Java, Scala**.
- ❌ "Snowpark exports data to a Spark cluster" → ✅ processing runs **in Snowflake**, pushed down as SQL.
- ❌ "AI_SIMILARITY generates embeddings" → ✅ that's **AI_EMBED**; AI_SIMILARITY **compares** two inputs.
- ❌ "AI_SUMMARIZE_AGG works row by row" → ✅ aggregates **across rows**.
- ❌ "Cortex Analyst searches PDFs/manuals" → ✅ that's **Cortex Search**; Analyst = **structured** data/text-to-SQL.
- ❌ "Task-specific AI functions need an external provider integration / GPU compute pool" → ✅ managed functions with Snowflake-hosted models.
- ❌ "The first argument of AI_COMPLETE is the prompt/warehouse" → ✅ the **model**.
- "Interactive low-latency app" → **Cortex REST API**; "batch over millions of rows" → **AISQL functions**.
- "Interactive Python app hosted in Snowflake" → **Streamlit in Snowflake**. "SQL + Python + Markdown cells" → **Notebooks**. "Develop, train, deploy models" → **Snowflake ML**.

---

## Rapid-fire self-test (cover the right column)

| # | Obj. | Question | Answer |
|---|---|---|---|
| 1 | 1.1 | Three layers of Snowflake? | Database storage, compute (query processing), cloud services |
| 2 | 1.1 | Architecture name? | Multi-cluster, shared data (hybrid shared-disk + shared-nothing) |
| 3 | 1.1 | Where is metadata stored? | Cloud services |
| 4 | 1.1 | Where is the execution plan created? | Cloud services |
| 5 | 1.1 | Which layer executes joins/scans? | Compute (virtual warehouses) |
| 6 | 1.1 | Five cloud services listed in the docs? | Authentication, infrastructure mgmt, metadata mgmt, query parsing & optimization, access control |
| 7 | 1.1 | Cloud services billed when? | Only above 10% of daily warehouse compute |
| 8 | 1.1 | Supported clouds? | AWS, Azure, GCP |
| 9 | 1.1 | Minimum edition for data sharing? | Standard |
| 10 | 1.1 | Minimum for multi-cluster warehouses? | Enterprise |
| 11 | 1.1 | Minimum for 90-day Time Travel? | Enterprise |
| 12 | 1.1 | Minimum for materialized views? | Enterprise |
| 13 | 1.1 | Minimum for Dynamic Data Masking / row access policies? | Enterprise |
| 14 | 1.1 | Minimum for PHI/HIPAA, Tri-Secret Secure, PrivateLink? | Business Critical |
| 15 | 1.1 | Edition with dedicated metadata store? | Virtual Private Snowflake |
| 16 | 1.1 | Features in all editions (two classics)? | Automatic encryption; object-level access control |
| 17 | 1.1 | Benefit of organizations? | Consolidated account management and billing |
| 18 | 1.2 | Snowsight Query History window? | 14 days |
| 19 | 1.2 | CLI built on the Python connector? | SnowSQL |
| 20 | 1.2 | Newer CLI to deploy apps from scripts? | Snowflake CLI |
| 21 | 1.3 | Hierarchy for a table? | Account → Database → Schema → Table |
| 22 | 1.3 | Namespace = ? | Database + schema |
| 23 | 1.3 | Two schema objects among pipe/warehouse/file format/resource monitor? | Pipe, file format |
| 24 | 1.3 | UDF languages? | SQL, JavaScript, Python, Java, Scala |
| 25 | 1.3 | Keyword for a tabular UDF? | RETURNS TABLE |
| 26 | 1.3 | Overloading? | Same name, different number/types of arguments |
| 27 | 1.3 | Object that runs DDL + DML? | Stored procedure |
| 28 | 1.3 | Owner's-rights procedure inherits what from caller? | The current warehouse |
| 29 | 1.3 | Needed to read session variables in a procedure? | Caller's rights |
| 30 | 1.3 | Statements per CALL? | One procedure per SQL statement |
| 31 | 1.3 | External function runs where? | Outside Snowflake (via proxy + API integration) |
| 32 | 1.3 | INFORMATION_SCHEMA vs ACCOUNT_USAGE retention? | 7 days–6 months, no latency vs 365 days, 45 min–3 h latency |
| 33 | 1.3 | Parameter precedence? | Most specific wins (session > user > account) |
| 34 | 1.4 | Scale up solves? | Performance of complex queries |
| 35 | 1.4 | Scale out solves? | Concurrency / queuing |
| 36 | 1.4 | Auto-scale mode config? | MIN < MAX clusters |
| 37 | 1.4 | Maximized mode config? | MIN = MAX (> 1) |
| 38 | 1.4 | Policy minimizing queuing? | Standard |
| 39 | 1.4 | Policy conserving credits? | Economy (6-minute rule) |
| 40 | 1.4 | Why scaling policies exist? | To control credits of auto-scale multi-cluster warehouses |
| 41 | 1.4 | Default AUTO_SUSPEND? | 600 s |
| 42 | 1.4 | AUTO_SUSPEND = 0? | Never suspends |
| 43 | 1.4 | Start suspended after CREATE? | INITIALLY_SUSPENDED = TRUE |
| 44 | 1.4 | Wait until resize finishes? | WAIT_FOR_COMPLETION = TRUE |
| 45 | 1.4 | Effect of resize on running queries? | None; new size for queued/new queries |
| 46 | 1.4 | Resize a suspended warehouse? | Allowed; provisioned at next resume |
| 47 | 1.4 | Privilege to resize? | MODIFY |
| 48 | 1.4 | Privilege to suspend/resume? | OPERATE |
| 49 | 1.4 | Billing granularity? | Per second, 60-second minimum per start/resume |
| 50 | 1.4 | X-Large credits/hour? | 16 |
| 51 | 1.4 | Snowpark-optimized warehouse for? | Large memory requirements (ML, big UDFs) |
| 52 | 1.4 | Loading interferes with BI? | Separate warehouses |
| 53 | 1.4 | How to choose a size? | Experiment with representative queries |
| 54 | 1.5 | Micro-partition size? | 50–500 MB uncompressed |
| 55 | 1.5 | Micro-partition mutability? | Immutable |
| 56 | 1.5 | Micro-partition metadata? | Value range per column, distinct values, etc. |
| 57 | 1.5 | Clustering is…? | How data is grouped/stored within micro-partitions |
| 58 | 1.5 | Remove a clustering key? | ALTER TABLE … DROP CLUSTERING KEY |
| 59 | 1.5 | average_overlaps means? | Avg number of micro-partitions with overlapping value ranges |
| 60 | 1.5 | Three classic table types? | Permanent, transient, temporary |
| 61 | 1.5 | Session-scoped table? | Temporary |
| 62 | 1.5 | Persists, no Fail-safe? | Transient |
| 63 | 1.5 | Transient Time Travel? | 0 or 1 day |
| 64 | 1.5 | Fail-safe duration (permanent)? | 7 days |
| 65 | 1.5 | Reduce storage for short-lived data? | Temporary and transient tables |
| 66 | 1.5 | Change a view's columns? | Recreate it |
| 67 | 1.5 | Column that says a view is secure? | IS_SECURE |
| 68 | 1.5 | Who maintains materialized views? | Background serverless service (Snowflake compute) |
| 69 | 1.5 | MV queried before maintenance catches up? | Returns current data |
| 70 | 1.5 | MV maintenance suspended? | Cannot query it until resumed |
| 71 | 1.5 | Objects using storage: table, MV, view, external table? | Table, materialized view |
| 72 | 1.5 | Open table format? | Apache Iceberg |
| 73 | 1.5 | Snowflake as Iceberg catalog value? | CATALOG = 'SNOWFLAKE' |
| 74 | 1.5 | Tables per external volume? | One or more |
| 75 | 1.5 | Object that stores and refreshes a query result to a lag? | Dynamic table |
| 76 | 1.6 | Snowpark languages? | Python, Java, Scala |
| 77 | 1.6 | Generic LLM function? | AI_COMPLETE |
| 78 | 1.6 | Classify into custom categories? | AI_CLASSIFY |
| 79 | 1.6 | Remove PII? | AI_REDACT |
| 80 | 1.6 | Audio/video to text? | AI_TRANSCRIBE |
| 81 | 1.6 | OCR/LAYOUT documents? | AI_PARSE_DOCUMENT |
| 82 | 1.6 | Embeddings? | AI_EMBED (+ VECTOR_COSINE_SIMILARITY) |
| 83 | 1.6 | Summarize many rows? | AI_SUMMARIZE_AGG |
| 84 | 1.6 | Count tokens? | AI_COUNT_TOKENS |
| 85 | 1.6 | Reference a staged file for AI? | TO_FILE |
| 86 | 1.6 | Low-latency interactive AI? | Cortex REST API |
| 87 | 1.6 | RAG retrieval over manuals? | Cortex Search |
| 88 | 1.6 | Natural-language questions on metrics? | Cortex Analyst |
| 89 | 1.6 | Interactive Python data app in Snowflake? | Streamlit in Snowflake |
| 90 | 1.6 | SQL + Python + Markdown cells? | Snowflake Notebooks |

If you can answer all 90 without looking, and you can explain *why* the traps in each section are wrong, you are well prepared for Domain 1.
