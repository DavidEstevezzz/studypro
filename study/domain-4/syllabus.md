# Domain 4 — Performance Optimization, Querying & Transformation

**SnowPro Core (COF-C03) · weight 21% (~21 of 100 questions)**

This syllabus covers the four objectives used by the StudyPro bank:

| Obj. | Topic | Verified questions in the bank |
|---|---|---|
| [4.1](#41-evaluating-query-performance) | Query History, Query Profile, spilling, pruning, EXPLAIN, queuing, Query Insights | 47 |
| [4.2](#42-optimizing-query-performance) | Clustering, search optimization, materialized views, query acceleration | 30 |
| [4.3](#43-caching) | Metadata cache, persisted query results, warehouse cache, RESULT_SCAN | 16 |
| [4.4](#44-data-transformation) | Data types, semi-structured data, FLATTEN, SQL functions, sampling, UDFs, procedures, Snowflake Scripting | 69 |

How to use it:

- **Bold terms** are the exact English keywords the exam uses. Learn them as written.
- 4.4 is the **biggest objective of the domain**: semi-structured data (VARIANT, colon notation, FLATTEN) alone produces a large share of the questions.
- In 4.1–4.2 the exam asks **"which symptom → which tool"**. Memorize the decision table in 4.2.1 and the comparison in 4.2.7.
- Every section ends with **Exam traps** and the last section is a **rapid-fire self-test**.
- ⚠️ marks facts that change often (new monitoring features, limits, eligibility rules).

---

## 4.1 Evaluating query performance

### 4.1.1 How a query runs

```
 client ──SQL──▶ CLOUD SERVICES ───────────────────────────▶ VIRTUAL WAREHOUSE
                 parse · optimize · prune with metadata        execute the plan
                 check result cache / metadata answers         (scan, join, aggregate)
                       │                                              │
                       └──────────── result (persisted 24 h) ◀────────┘
```

- **Compilation** happens in the **cloud services layer**: parsing, optimization and **pruning** (micro-partition metadata decides which files must be read).
- **Execution** happens in the **virtual warehouse**. If the warehouse is busy, the query waits in the **queue**.
- **Total elapsed time = compilation + queued time + execution time** (plus provisioning when a warehouse is resuming).
- Query states you will see: **Queued**, **Queued (provisioning)** (warehouse starting/resizing), **Blocked** (waiting for a lock held by another transaction), **Running**, **Succeeded**, **Failed**.
- Some queries **never reach a warehouse**: answered from **metadata** or from the **persisted query result** (see 4.3).

### 4.1.2 Query History

**Snowsight → Monitoring → Query History** ⚠️ lists queries with filters (user, warehouse, status, duration, query tag, session…). Selecting a query opens:

- **Query Details**: status, **start and end time**, **duration**, **warehouse** and **warehouse size**, **query ID**, **query tag**, **client driver**, **session ID**, user and role. It does **not** show where the data came from, file formats or policy bodies.
- **Query Profile** tab: the execution plan with statistics (4.1.3).
- **Query results** (only for **your own** queries).

| Source | Retention | Latency | Notes |
|---|---|---|---|
| Snowsight **Query History** | **14 days** | near real time | Grouped Query History ⚠️ aggregates repeated queries by **parameterized hash** |
| `INFORMATION_SCHEMA.QUERY_HISTORY` (table functions `QUERY_HISTORY`, `QUERY_HISTORY_BY_SESSION`, `_BY_USER`, `_BY_WAREHOUSE`) | **7 days** | none | Scoped to what your role can see |
| `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY` view | **365 days** | up to **45 minutes** | Whole account; best for **long-running query** analysis (`TOTAL_ELAPSED_TIME`, `EXECUTION_TIME`, `QUEUED_OVERLOAD_TIME`, `BYTES_SPILLED_TO_*`, `PARTITIONS_SCANNED`, `PARTITIONS_TOTAL`) |

- Viewing **other users'** queries requires privileges on their warehouse (e.g. **MONITOR**) or a role such as **ACCOUNTADMIN**. Seeing a query in the history does **not** give access to its **result rows**: results are visible only to the user who ran it.
- **`QUERY_TAG`** (session/user/account parameter) labels queries for filtering and cost attribution.

### 4.1.3 Query Profile — anatomy

**Query Profile** is a **graphical representation of the main components of the processing plan** of a query, with **statistics for each component** and for the query overall. Available for completed (and running) queries from the last **14 days**; also queryable with the table function **`GET_QUERY_OPERATOR_STATS(query_id)`**.

| Element | What it shows |
|---|---|
| **Operator tree** | The graph of **operator nodes** and the **relationships** (data flow) between them |
| **Operator node** | Operator type, **% of time** it consumed; the **orange bar** = fraction of the step's time spent in that operator |
| **Steps** | Multi-step queries show one tab per step |
| **Most expensive nodes** | Operators ranked by time share: first place to look |
| **Profile overview — execution time** | **Processing** (CPU), **Local Disk I/O**, **Remote Disk I/O**, **Network Communication**, **Synchronization**, **Initialization** |
| **Statistics** | Grouped as below |

Statistics groups (memorize the names):

| Group | Statistics |
|---|---|
| **IO** | Scan progress, **Bytes scanned**, **Percentage scanned from cache**, Bytes written, Bytes written to result, Bytes read from result, External bytes scanned |
| **DML** | Number of rows inserted / updated / deleted / unloaded |
| **Pruning** | **Partitions scanned**, **Partitions total** |
| **Spilling** | **Bytes spilled to local storage**, **Bytes spilled to remote storage** |
| **Network** | Bytes sent over the network |
| **External functions** | **Total invocations**, rows sent/received, bytes sent/received, retries due to transient errors, average latency per call |

- **Remote Disk I/O** = time processing was **blocked by remote disk access** (reading table data from storage *or* remote spilling). Look at the spill bytes before concluding "not enough memory".
- **Percentage scanned from cache** = share of scanned data served by the **warehouse local cache**, not the result cache.
- For **secure views/UDFs**, the profile **hides the internals** of the secure object.

### 4.1.4 Query Profile operators

| Operator | Meaning |
|---|---|
| **TableScan** | Access to a **single table**; holds the **pruning** statistics (partitions scanned vs total) |
| **ExternalScan** | Access to data in a **stage** or external source |
| **InternalObject** | Access to an internal object (e.g. an Information Schema table, a previous result) |
| **ValuesClause** | Rows from a `VALUES` list |
| **Generator** | Rows produced by the `GENERATOR` table function |
| **Filter** | Applies a predicate (`WHERE`, `HAVING`, `QUALIFY`) |
| **Join** / **CartesianJoin** | Combines inputs on a condition; **CartesianJoin** = no join condition (cross product) |
| **JoinFilter** | Removes probe-side rows that cannot match the join (runtime optimization) |
| **Aggregate** / **GroupingSets** | `GROUP BY`, `ROLLUP`, `CUBE`, `GROUPING SETS` |
| **WindowFunction** | Window functions (`OVER (…)`) |
| **Sort** / **SortWithLimit** | `ORDER BY` / `ORDER BY … LIMIT` |
| **Flatten** | The `FLATTEN` table function (expands compound values) |
| **UnionAll** | Concatenates inputs (`UNION ALL`, also the first part of `UNION`) |
| **Result** | Returns the result |
| **Insert**, **Update**, **Delete**, **Merge** | **DML operators**. A load with `COPY INTO` a table appears as **Insert** |
| **Unload** | **DML operator** for `COPY INTO` a stage/location (unloading); attribute = stage location |

### 4.1.5 Common problems the Query Profile reveals

| Problem | How it looks in the profile | Typical fix |
|---|---|---|
| **Exploding join** | A **Join** outputs far more rows than it receives; missing/incorrect condition → **CartesianJoin** | Fix **join predicates**, check the **cardinality** of matching keys; do not just add compute |
| **UNION without ALL** | **UnionAll** followed by an **extra Aggregate** (duplicate elimination) | Use **`UNION ALL`** when duplicates are impossible or acceptable |
| **Queries too large to fit in memory** | **Bytes spilled to local / remote storage** | Larger warehouse, **smaller batches / less intermediate data** |
| **Inefficient pruning** | **Partitions scanned ≈ Partitions total** on a selective query | Better filters, **clustering key**, search optimization |

### 4.1.6 Spilling

- When **intermediate results do not fit in warehouse memory**, they are written to **local disk** (SSD) first and then to **remote storage**. This is **spilling**.
- **Remote spilling** is the strongest symptom: much slower, a sign the query is **too large for the warehouse**.
- Remedies (choose what the measurements justify):
  1. **Use a larger warehouse** (**scale up**): more memory and local disk per cluster.
  2. **Process the data in smaller batches** / reduce the working set: filter earlier, select fewer columns, fix exploding joins, aggregate before joining.
- **Not** a remedy: adding clusters (**scale out**, multi-cluster) — that helps **concurrency**, not a single big query. Longer auto-suspend keeps cache, not memory.

### 4.1.7 Pruning

- Every micro-partition has **metadata**: **min/max value per column**, number of distinct values, NULL count. The optimizer uses it to **skip micro-partitions that cannot contain matching rows**. This is **pruning** (also called **query pruning** or **partition pruning**).
- It is **automatic**: Snowflake does **not** use user-created indexes (B-tree) on standard tables. Collecting metadata ("statistics") exists **to enable efficient pruning** based on filters.
- Measure it: **Partitions scanned vs Partitions total** (TableScan, `QUERY_HISTORY.PARTITIONS_SCANNED` / `PARTITIONS_TOTAL`, EXPLAIN `partitionsAssigned`). Scanned < total proves *some* pruning, not *optimal* pruning.
- Pruning is weak when:
  - the filtered column is **not correlated with the physical order** of the data (values spread over every micro-partition);
  - the predicate wraps the column in a function or cast that prevents the min/max comparison;
  - there is **no selective filter** at all.
- Pruning also works on **join** predicates at runtime (join filters) and on **semi-structured** paths that Snowflake has columnarized.

### 4.1.8 EXPLAIN

```sql
EXPLAIN USING TABULAR SELECT ...;   -- TABULAR (default) | JSON | TEXT
```

- **EXPLAIN compiles** the statement and returns the **logical plan** **without executing it** → no running warehouse needed and no warehouse credits (compilation uses cloud services).
- Shows operations, objects and **GlobalStats**: `partitionsTotal`, `partitionsAssigned`, `bytesAssigned` → an estimate of pruning **before** running.
- Shows whether the optimizer **uses a materialized view**.
- Advantage over Query Profile: **analysis without running the query**. Limitation: **no runtime data** (no elapsed times, no spilling).
- Related: `SYSTEM$EXPLAIN_PLAN_JSON`, `SYSTEM$EXPLAIN_JSON_TO_TEXT`.

### 4.1.9 Concurrency, queuing and timeouts

- A warehouse runs a limited number of queries at once (based on resources and **`MAX_CONCURRENCY_LEVEL`**, default **8**). Excess queries **queue**.
- Symptom of contention: high **queued load** while each query's execution time is normal → **many short queries with high end-to-end latency**.

| Parameter | Effect | Default |
|---|---|---|
| **`STATEMENT_QUEUED_TIMEOUT_IN_SECONDS`** | Cancels a statement that **waits in the queue** too long | **0** (no limit) |
| **`STATEMENT_TIMEOUT_IN_SECONDS`** | Cancels a statement that **runs** too long | **172800** (2 days) |
| **`MAX_CONCURRENCY_LEVEL`** | Concurrency level of a warehouse (not a timeout) | **8** |
| **`LOCK_TIMEOUT`** | How long a statement waits for a **lock** (Blocked) | 43200 (12 h) |

- The timeouts can be set on the **warehouse** and in the **account → user → session** hierarchy; when both warehouse and session set a value, the **lowest non-zero** wins.
- Load metrics: **`WAREHOUSE_LOAD_HISTORY`** (Information Schema table function, 14 days; also an Account Usage view) with **`AVG_RUNNING`**, **`AVG_QUEUED_LOAD`**, **`AVG_QUEUED_PROVISIONING`**, **`AVG_BLOCKED`**. Snowsight shows the same in the warehouse **activity** chart.
- Fixes for queuing: **multi-cluster warehouse** (scale out, Enterprise+), **separate warehouses per workload**, or a queue timeout to fail fast.

### 4.1.10 Query Insights and query attribution ⚠️

- **Query Insights**: Snowflake-generated **observations about conditions that hurt a query, with recommended next steps** (e.g. **exploding join**, unselective or missing filter, **remote spilling**, inefficient `LIMIT`). Shown in the Query Profile and in **`ACCOUNT_USAGE.QUERY_INSIGHTS`**. Recommendations still need to be validated against the workload.
- **`ACCOUNT_USAGE.QUERY_ATTRIBUTION_HISTORY`**: **compute credits attributed to each query** (`CREDITS_ATTRIBUTED_COMPUTE`, plus `CREDITS_USED_QUERY_ACCELERATION`). Group by `QUERY_TAG`, user or `QUERY_PARAMETERIZED_HASH` for chargeback.
  - The sum is **lower than the warehouse bill**: **idle time is not attributed** (and very short queries are excluded ⚠️).
- **`WAREHOUSE_METERING_HISTORY`** = credits per warehouse (the actual bill for compute).

### 4.1.11 Monitoring cheat sheet

| Question | Where to look |
|---|---|
| Which queries ran long / spilled / scanned all partitions? | `ACCOUNT_USAGE.QUERY_HISTORY` (365 d) |
| What happened inside one query? | **Query Profile** / `GET_QUERY_OPERATOR_STATS` |
| Plan without running it? | **EXPLAIN** |
| Is the warehouse overloaded (queuing)? | **`WAREHOUSE_LOAD_HISTORY`** |
| Credits per warehouse? | `WAREHOUSE_METERING_HISTORY` |
| Credits per query? | **`QUERY_ATTRIBUTION_HISTORY`** |
| Snowflake's own diagnosis? | **Query Insights** ⚠️ |
| Queries that would benefit from QAS? | `QUERY_ACCELERATION_ELIGIBLE` / `SYSTEM$ESTIMATE_QUERY_ACCELERATION` |
| Cost of serverless optimizations? | `AUTOMATIC_CLUSTERING_HISTORY`, `SEARCH_OPTIMIZATION_HISTORY`, `MATERIALIZED_VIEW_REFRESH_HISTORY`, `QUERY_ACCELERATION_HISTORY` |

### 4.1.12 Exam traps — 4.1

- "Query too large to fit in memory" → **spilling**, specifically **to remote storage**. Not "an aggregate node" or "scanning all partitions".
- Pruning statistics are **Partitions scanned + Partitions total** (TableScan). Not bytes sent over the network, not percentage scanned from cache.
- Common problems listed by Snowflake: **exploding joins**, **UNION without ALL**, **queries too large for memory**, **inefficient pruning**. "Cartesian product" is an exploding join variant.
- **UnionAll + Aggregate on top = UNION without ALL.**
- Loading with COPY shows as **Insert**; unloading shows as **Unload**. There is **no "COPY" operator**.
- **Merge** is a DML operator; Flatten, Sort, ExternalScan are not DML.
- **Total invocations** is the statistic **specific to external functions**.
- **EXPLAIN** = no execution; **Query Profile** = after (or during) execution with real statistics.
- Queue timeout = **STATEMENT_QUEUED_TIMEOUT_IN_SECONDS**; run timeout = **STATEMENT_TIMEOUT_IN_SECONDS**; MAX_CONCURRENCY_LEVEL is **not** a timeout.
- Fix spilling by **scaling up** or **reducing the data**; fix queuing by **scaling out**. Do not swap them.
- **ACCOUNT_USAGE.QUERY_HISTORY** for long-running queries (with latency); per-query credits → **QUERY_ATTRIBUTION_HISTORY**, which **excludes idle time**.
- **AVG_QUEUED_LOAD** lives in **WAREHOUSE_LOAD_HISTORY**, not in metering views.
- Snowflake uses **pruning**, not indexes or MapReduce, to limit micro-partitions scanned.

---

## 4.2 Optimizing query performance

### 4.2.1 Symptom → tool

| Symptom (measured) | First tool to consider |
|---|---|
| Spilling to local/remote storage | **Larger warehouse** or **smaller batches** |
| Many queries **queued** | **Multi-cluster warehouse** / separate warehouses |
| Large table, recurring **range/selective filters**, poor pruning | **Clustering key** (Automatic Clustering) |
| **Point lookups** returning few rows from a huge table (equality, `IN`, substring, VARIANT fields, geospatial) | **Search Optimization Service** |
| Same **expensive aggregation** on one slowly changing table, queried often | **Materialized view** |
| **Outlier** queries with **large scans and selective filters**, ad hoc analytics | **Query Acceleration Service** |
| Same query repeated on unchanged data | **Result cache** (free, automatic) |
| Exploding join / UNION without ALL | **Rewrite the SQL** |

Always: measure, change one thing, compare cost vs benefit. None of the paid services is "always on is better".

### 4.2.2 Warehouse levers (recap from Domain 1)

- **Scale up** (bigger size) = more compute and memory per cluster → faster **complex/large** queries, less spilling. Resizing affects **new** queries; running ones finish on the old resources.
- **Scale out** (multi-cluster, **Enterprise+**) = more clusters → more **concurrency**, no speed-up for one query.
- **Separate warehouses** per workload (ETL vs BI vs data science) avoid contention and allow right-sizing.
- **Auto-suspend** trade-off: suspending saves credits but **drops the warehouse cache**.
- **Snowpark-optimized warehouses**: much more memory per node, for memory-intensive ML/UDF work.

### 4.2.3 Clustering

**Natural clustering**: data is stored in micro-partitions in the order it was loaded. Over time, DML scatters values and pruning degrades.

**Clustering information** — measures how well a table is clustered **for given columns**:

- **Overlap**: number of micro-partitions whose value ranges overlap.
- **Clustering depth**: **average depth of overlapping micro-partitions** for the columns. **The smaller, the better clustered** (minimum **1**; empty table = 0). A large depth on a large table whose queries slow down = candidate for a clustering key.
- **Constant micro-partitions**: only one value for the columns; cannot improve further.
- Functions: **`SYSTEM$CLUSTERING_INFORMATION('t', '(c1)')`** (JSON: `cluster_by_keys`, `total_partition_count`, `total_constant_partition_count`, `average_overlaps`, `average_depth`, `partition_depth_histogram`) and **`SYSTEM$CLUSTERING_DEPTH`**.

**Clustering key** — columns or expressions that Snowflake uses to **co-locate similar rows in the same micro-partitions**:

```sql
CREATE TABLE sales (...) CLUSTER BY (sale_date, region);
ALTER TABLE sales CLUSTER BY (TO_DATE(sale_ts), region);
ALTER TABLE sales DROP CLUSTERING KEY;
ALTER TABLE sales SUSPEND RECLUSTER;  -- / RESUME RECLUSTER
```

- Defined with **CREATE TABLE** or **ALTER TABLE** (`CLUSTER BY`). **Multiple columns** allowed; recommended **max 3–4**.
- Order columns from **lowest to highest cardinality**.
- Choose columns **most actively used in selective filters** (`WHERE`), then join predicates. Columns only in the `SELECT` list do not help.
- **Cardinality**: avoid **very high** (unique IDs, nanosecond timestamps) → cluster on an **expression** (`TO_DATE(ts)`, `SUBSTRING(code, 1, 4)`); **very low** (boolean) gives little pruning.
- Data types: **any except GEOGRAPHY, VARIANT, OBJECT, ARRAY** (a VARIANT can participate through a path expression **cast to a type**). BINARY and GEOMETRY are fine.
- **When**: **very large tables (multi-terabyte)**, queries that are **selective** or **sort** on the key, table **queried often** and **changed relatively rarely**. Not for small tables.
- **Benefit**: **better pruning → higher scan efficiency**; also better compression.

**Automatic Clustering** (serverless):

- After a key is defined, Snowflake **automatically reclusters in the background when it determines the table will benefit**. No warehouse, no schedule to manage; manual reclustering is deprecated.
- **Costs**: **serverless credits** + **storage** (reclustering rewrites micro-partitions; the old ones stay in Time Travel/Fail-safe). More DML = more reclustering cost.
- Suspend/resume per table (`SUSPEND RECLUSTER`). A **clone** of a clustered table starts with Automatic Clustering **suspended**.
- History: **`AUTOMATIC_CLUSTERING_HISTORY`**.
- Rows are not physically sorted perfectly: clustering **co-locates**, it does not guarantee order.

### 4.2.4 Search Optimization Service (Enterprise+)

- Builds and maintains a **persistent data structure** called the **search access path**, which records **which micro-partitions may contain which values**. Queries then **skip micro-partitions** that cannot match.
- Designed for **selective point lookup queries**: a **few rows** from a **large table** with **highly selective filters**.
- Supported predicates (per column, by method):

```sql
ALTER TABLE t ADD SEARCH OPTIMIZATION;                              -- whole table (equality)
ALTER TABLE t ADD SEARCH OPTIMIZATION ON EQUALITY(c1), SUBSTRING(c2), GEO(c3);
ALTER TABLE t DROP SEARCH OPTIMIZATION;
```

| Method | Speeds up |
|---|---|
| **EQUALITY** | `=`, **`IN`**, equality on VARIANT fields |
| **SUBSTRING** | `LIKE`, `ILIKE`, `RLIKE`/regex, `CONTAINS`, `STARTSWITH`… |
| **GEO** | **GEOGRAPHY** predicates such as `ST_INTERSECTS`, `ST_CONTAINS`, `ST_WITHIN`, `ST_DWITHIN` |
| **FULL_TEXT** ⚠️ | `SEARCH` function |

- Also: **conjunctions (AND)** and disjunctions of supported predicates; **equality join predicates** (conjunctions with AND) on the lookup side.
- Not a fit / not supported: **range** scans (clustering is better), external tables, columns with **COLLATE**, **concatenated** columns, arbitrary analytical expressions.
- **Privileges**: **OWNERSHIP** on the table and **ADD SEARCH OPTIMIZATION** on the schema.
- **Costs**: **storage** for the access path + **serverless compute** to build and maintain it (more with frequent DML). Estimate with **`SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COSTS`**. `SHOW TABLES` shows `SEARCH_OPTIMIZATION` and `SEARCH_OPTIMIZATION_PROGRESS`.

### 4.2.5 Materialized views (Enterprise+)

- A **materialized view** stores the **precomputed result** of a query **and keeps it up to date automatically** (background **serverless** maintenance).
- Queries against it **always return current data**: if maintenance is behind, Snowflake combines the stored result with the newest base-table changes.
- The optimizer can **automatically rewrite** a query on the **base table** to use the MV. **EXPLAIN** (and the Query Profile) shows whether the MV was used.
- Best when: the query is **expensive** (aggregation, filtering, projection of a few columns), **results are used often** and the **base table changes rarely**. Works on **external tables** too (fast queries over data lake files).
- **Limitations** (frequently asked):
  - **One table only**: **no JOINs** (not even self-joins). A query may *join the MV* to other tables, but the definition cannot.
  - No **UDFs**, no **window functions**, no **HAVING**, no **ORDER BY**, no **LIMIT**, no nested MVs, no **non-deterministic** functions (`CURRENT_TIMESTAMP`…), only a subset of aggregate functions.
- **Cost drivers**: storage of the results + maintenance credits, which depend on **how often the base table changes** and on **whether the MV has a clustering key** (MVs can be clustered independently). Querying frequency does **not** trigger refreshes.
- Can be **secure** (`CREATE SECURE MATERIALIZED VIEW`). Suspend with `ALTER MATERIALIZED VIEW … SUSPEND`. History: `MATERIALIZED_VIEW_REFRESH_HISTORY`.
- **Standard view vs MV**: prefer a **standard view** when **results change often** or the view is rarely used (an MV would be expensive to maintain). Use a **dynamic table** when the logic needs joins or a pipeline (Domain 3).

### 4.2.6 Query Acceleration Service (Enterprise+)

- **Offloads portions of eligible queries** (mainly **scans with filters** and aggregations) to **shared, serverless compute resources**, so **outlier, larger-than-average queries** do not slow down the warehouse.
- Typical beneficiaries: **ad hoc analytics**, **unpredictable data volumes**, **large scans with selective filters**.
- **Not eligible / little gain**: not enough partitions to scan, filters that are not selective, **high-cardinality GROUP BY**, non-deterministic functions in filters ⚠️.

```sql
ALTER WAREHOUSE wh SET ENABLE_QUERY_ACCELERATION = TRUE
                       QUERY_ACCELERATION_MAX_SCALE_FACTOR = 8;  -- default 8; 0 = no limit
SELECT SYSTEM$ESTIMATE_QUERY_ACCELERATION('query_id');
```

- Enabled **per warehouse**. **Scale factor** = cost cap, a multiplier of the warehouse size for the extra compute it may lease.
- Find candidates: **`ACCOUNT_USAGE.QUERY_ACCELERATION_ELIGIBLE`**, **`SYSTEM$ESTIMATE_QUERY_ACCELERATION`**. Cost: **`QUERY_ACCELERATION_HISTORY`** (serverless credits).
- Query Profile shows "Query Acceleration" statistics (partitions scanned by the service, scans selected for acceleration).

### 4.2.7 Comparison of the optimization features

| | Clustering | Search optimization | Materialized view | Query acceleration |
|---|---|---|---|---|
| **Edition** | All (Standard+) | **Enterprise+** | **Enterprise+** | **Enterprise+** |
| **Enabled on** | Table (`CLUSTER BY`) | Table / columns (`ADD SEARCH OPTIMIZATION`) | New object (`CREATE MATERIALIZED VIEW`) | Warehouse (`ENABLE_QUERY_ACCELERATION`) |
| **Mechanism** | Co-locates rows → better pruning | Search access path → skip partitions | Stores precomputed results | Offloads scan work to shared compute |
| **Best for** | **Range/selective filters** on multi-TB tables | **Point lookups**, few rows | Repeated **expensive aggregations** on one table | **Outlier** queries, large scans + selective filters |
| **Cost** | Serverless reclustering + storage | Serverless maintenance + storage | Serverless refresh + storage | Serverless credits (capped by scale factor) |

### 4.2.8 SQL-level best practices

- **Select only the columns you need** (columnar storage: fewer columns = fewer bytes scanned). Avoid `SELECT *` on wide tables.
- **Filter early and selectively**; keep filter columns "naked" (no functions around them) so pruning works.
- Use **`UNION ALL`** instead of `UNION` when duplicates do not matter.
- Check **join keys** (avoid exploding joins and accidental cartesian products).
- Use **`QUALIFY`** to filter window-function results instead of an extra subquery.
- Use **approximate functions** on huge data when an estimate is acceptable: **`APPROX_COUNT_DISTINCT` / HLL**, `APPROX_TOP_K`, `APPROX_PERCENTILE`.
- Use **`LIMIT`/`SAMPLE`** for exploration.
- **Store typed data in typed columns**: dates as DATE, not strings inside VARIANT (4.4.2).
- Use **transient/temporary tables** for intermediate results in pipelines.

### 4.2.9 Exam traps — 4.2

- **Search optimization ≠ clustering**: SOS = **point lookups/equality/substring/geo**; clustering = **range and selective filters on very large tables**. SOS does **not** target range searches.
- SOS creates a **persistent** structure (**search access path**), not a cache and not an index you query.
- Minimum table size for a clustering key: **multi-terabyte** range (some sources say "≥ 1 TB").
- Clustering key columns: those **most used in selective filters/joins**, not the most-selected columns, not unique IDs.
- Unsupported clustering types: **GEOGRAPHY, VARIANT, OBJECT, ARRAY**.
- Reclustering is triggered by **Snowflake's determination** that the table benefits, not by a user schedule or a warehouse.
- **Clustering depth**: smaller = better. It is a **metric**, the clustering key is the **definition**.
- MV: **no JOIN in the definition**; cost depends on **base-table change rate** and **MV clustering**, not on how often it is queried.
- MV, SOS and QAS need **Enterprise**; clustering does not.
- **Standard view** preferable when **results change often**.
- QAS offloads to **shared compute**; multi-cluster adds **dedicated clusters for concurrency**.
- QAS candidates: **large scans with selective filters**; high-cardinality GROUP BY is **not** a good candidate.
- EXPLAIN reveals **MV usage**; SHOW/DESCRIBE do not.

---

## 4.3 Caching

### 4.3.1 The three caches

| | **Metadata cache** | **Result cache** (persisted query results) | **Warehouse cache** (local disk cache) |
|---|---|---|---|
| **Layer** | **Cloud services** | **Cloud services** (results stored by Snowflake) | **Virtual warehouse** (local SSD/memory) |
| **Holds** | Object metadata: row counts, **min/max per micro-partition**, distinct counts, object definitions | The **output of executed queries** | **Table data read** by previous queries (micro-partition files) |
| **Warehouse needed?** | **No** | **No** | Yes (it *is* the warehouse) |
| **Lifetime** | Always maintained | **24 h** after last use, renewed on each reuse up to **31 days** from first execution | Until the warehouse is **suspended** (lost) or **resized down** (partly lost) |
| **Shared by** | Everyone | Any user/role with the **required privileges** | Queries on **the same warehouse** |
| **Cost** | Free (cloud services) | Free | Part of warehouse credits |

### 4.3.2 Metadata-answered queries

- Queries such as **`SELECT COUNT(*) FROM t`** (no filter), **`MIN`/`MAX`** on numeric/date columns, `SHOW …`, `DESCRIBE …` and context functions (`CURRENT_ROLE()`…) are answered **from metadata**, **without an active warehouse**.
- The Query Profile shows a single **"METADATA-BASED RESULT"** node.

### 4.3.3 Result cache (persisted query results)

Snowflake reuses a persisted result **when all conditions hold**:

1. The new query **matches the previous query text** exactly (adding/removing a column or changing an alias = different query).
2. The **underlying table data has not changed** (no DML; also **reclustering or consolidation** changes micro-partitions and invalidates the result).
3. The **role has the required privileges** on all objects in the query.
4. The query has **no functions evaluated at execution time**: `CURRENT_TIMESTAMP()`, `RANDOM()`, `UUID_STRING()`… (**`CURRENT_DATE()` is an exception**: still reusable). No UDFs or external functions; no hybrid tables.
5. The result is **still retained** (24 h window).
6. Settings that affect the result have not changed.

- The **warehouse does not have to be the same**, and **no warehouse runs** when the result is reused (the cloud services layer coordinates it).
- **`USE_CACHED_RESULT = FALSE`** (session/user/account) disables reuse — handy for benchmarking.
- Meeting every condition still **does not guarantee** reuse.

### 4.3.4 RESULT_SCAN and LAST_QUERY_ID

```sql
SHOW WAREHOUSES;
SELECT "name", "size"
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "state" = 'SUSPENDED';
```

- **`RESULT_SCAN(query_id)`** is a **table function** that returns the **result set of a previous query** (within 24 h) **as a table** for further processing. Great for post-processing **SHOW/DESCRIBE** output (column names are lower-case and must be **double-quoted**).
- Access: for a manually executed query, **only the user who ran it** can use RESULT_SCAN on it, **even ACCOUNTADMIN cannot**. For a task, the **owner role** of the task.
- **`LAST_QUERY_ID(n)`**: no argument / **`-1`** = most recent query of the session; **negative** = count back from the latest; **positive** = count from the **start of the session** (`LAST_QUERY_ID(2)` = second query of the session).
- Persisted results are **not** views: a standard view stores a **definition**, not data.

### 4.3.5 Warehouse cache in practice

- The cache holds **table data** (not results) read by that warehouse; later queries reading the same data avoid remote reads → **Percentage scanned from cache** in the profile.
- **Suspending** the warehouse **drops** the cache; it is **not available upon restart** and is rebuilt by later reads.
- **Resizing down** removes compute resources and the cache they held (part of the cache is lost). Resizing up starts new nodes with an empty cache.
- Trade-off: **BI / dashboards** → longer auto-suspend to keep a warm cache; **batch ETL** → suspend quickly to save credits.

### 4.3.6 Exam traps — 4.3

- Result cache: **24 hours**, renewed on reuse, **max 31 days**. Not "until the warehouse suspends".
- Reuse needs **same query text**, **unchanged data**, **privileges**, **no runtime functions**. Same warehouse is **not** required.
- **Clustering/reclustering** the underlying table can invalidate the result cache (micro-partitions change).
- Suspended warehouse → **warehouse cache lost**, **result cache still there**.
- Result cache and metadata answers **do not need a running warehouse**.
- Which cache stores **query output**? **Result cache**. Which stores **table data**? **Warehouse cache**.
- **`COUNT(*)` on a big table without filters** → **metadata**, no warehouse.
- **RESULT_SCAN** (not "RESULTS_SCAN") = post-process a previous result, including **SHOW** output.
- Another user's manual result via RESULT_SCAN: **No**, even with ACCOUNTADMIN.
- Resizing to a smaller size **may** lose cached data.

---

## 4.4 Data transformation

### 4.4.1 Data types

| Category | Types | Notes |
|---|---|---|
| **Numeric** | **NUMBER(p,s)** (default 38,0) = DECIMAL = NUMERIC; INT, INTEGER, BIGINT, SMALLINT, TINYINT, BYTEINT = NUMBER(38,0) | Fixed-point, exact |
| **Floating point** | **FLOAT** = FLOAT4 = FLOAT8 = **DOUBLE** = DOUBLE PRECISION = **REAL** | All 64-bit; approximate; supports `'NaN'`, `'inf'`, `'-inf'` |
| **String** | **VARCHAR** = STRING = TEXT; CHAR/CHARACTER (= VARCHAR(1) by default) | Max length 16 MB, raised to 128 MB ⚠️; length does not affect storage |
| **Binary** | **BINARY** = VARBINARY | Use instead of **BLOB** |
| **Logical** | **BOOLEAN** | TRUE / FALSE / NULL |
| **Date & time** | **DATE**, **TIME**, **TIMESTAMP_NTZ** (default for TIMESTAMP), **TIMESTAMP_LTZ**, **TIMESTAMP_TZ** | `TIMESTAMP_TYPE_MAPPING` controls the alias |
| **Semi-structured** | **VARIANT**, **OBJECT**, **ARRAY** | See 4.4.2 |
| **Structured** ⚠️ | `ARRAY(INT)`, `OBJECT(name VARCHAR, age INT)`, `MAP(VARCHAR, INT)` | Typed elements; Iceberg and standard tables |
| **Geospatial** | **GEOGRAPHY** (round Earth, WGS 84), **GEOMETRY** (planar, SRID) | Input/output WKT, WKB, GeoJSON |
| **Vector** | **VECTOR(FLOAT \| INT, dimension)** | Stores **embeddings** natively for **vector similarity search** (`VECTOR_COSINE_SIMILARITY`, `VECTOR_L2_DISTANCE`, `VECTOR_INNER_PRODUCT`) |

- **Not supported**: **BLOB → use BINARY**, **CLOB → use VARCHAR**, ENUM, user-defined types. **JSON and XML are formats, not SQL types** (they go into VARIANT).
- **Constraints**: **only NOT NULL is enforced** on standard tables. **PRIMARY KEY, UNIQUE, FOREIGN KEY** are accepted as **metadata** (documentation, BI tools, optimizer with **RELY**) but not enforced. (Hybrid tables do enforce them.)
- **Conversion**: `CAST(x AS type)`, **`x::type`**, **`TRY_CAST`** / `TRY_TO_…` (return **NULL** instead of an error). **`TO_BOOLEAN`** maps `'true'`, `'t'`, **`'yes'`**, `'y'`, **`'on'`**, `'1'` → TRUE and `'false'`, `'f'`, `'no'`, `'n'`, `'off'`, `'0'` → FALSE (case-insensitive).
- Sequences and **AUTOINCREMENT/IDENTITY** generate unique numbers, **not gap-free**.

### 4.4.2 Semi-structured data: types and storage

- **VARIANT**: can hold **a value of any type, including OBJECT and ARRAY**, keeping each value's native type (it "can store more than one type of data structure"). Max size of one value: **128 MB uncompressed** ⚠️ (older material says 16 MB).
- **OBJECT**: set of **key-value pairs** (keys are VARCHAR, values VARIANT) — like a JSON object.
- **ARRAY**: **ordered list** accessed by **0-based position**; elements are VARIANT; can be sparse.
- Semi-structured formats you can load: **JSON, Avro, ORC, Parquet, XML** → stored in VARIANT (Domain 3).
- **Recommendation**: if you are **not sure what operations** will be performed, load into a **VARIANT** column. Snowflake automatically **extracts frequent elements into hidden columnar sub-columns**, so querying VARIANT is usually efficient and prunable.
- **But**: values that are **not native JSON types** — **dates and timestamps stored as strings**, numbers inside strings, and **arrays** — are kept as strings/compound values and are **not** columnarized well → **slower queries and more storage**. For best performance with lots of dates and arrays, **flatten** the data into **typed relational columns**.
- **Why VARIANT instead of VARCHAR?** VARIANT keeps the **hierarchy and native types** and can be traversed with path notation; a string column is just text.

**Two kinds of NULL**:

| | SQL NULL | **JSON null** (VARIANT null) |
|---|---|---|
| Meaning | Missing / unknown value | An explicit `null` stored in the document |
| Displayed as | `NULL` | `null` |
| Test with | `IS NULL` | **`IS_NULL_VALUE(v)`** |
| Convert | — | **`STRIP_NULL_VALUE(v)`** → SQL NULL (other values unchanged) |

- **`PARSE_JSON(NULL)`** → **SQL NULL**; **`PARSE_JSON('null')`** → VARIANT **JSON null**.
- **`STRIP_NULL_VALUES = TRUE`** is a **file format option** (load time) that removes object fields whose value is null. Do not confuse it with the **function** `STRIP_NULL_VALUE`.
- **`OBJECT_CONSTRUCT`** omits pairs whose value is **SQL NULL** (use `OBJECT_CONSTRUCT_KEEP_NULL` to keep them).

### 4.4.3 Querying semi-structured data

Assume `src` is a VARIANT column holding:

```json
{"customer": {"name": "Ana", "phone number": "555-1234"},
 "elements": [{"name": "pen", "qty": 2}, {"name": "ink", "qty": 1}]}
```

| Goal | Expression |
|---|---|
| First-level element | **`src:customer`** (colon after the column) |
| Nested element | **`src:customer.name`** (dot notation) |
| Bracket notation | `src['customer']['name']` |
| Array element (0-based) | **`src:elements[0].name`** → `"pen"` |
| Name with spaces/special characters | **`src:customer."phone number"`** |
| Typed value | `src:customer.name::STRING` → `Ana` (without the cast you get the VARIANT `"Ana"` with quotes) |
| Functions | `GET(src, 'customer')`, **`GET_PATH(src, 'customer.name')`**, `GET_IGNORE_CASE` |

**Case rules** (very common question): the **column name is case-insensitive** (unquoted SQL identifier) but **element names are case-sensitive**.

- `src:customer.name` ≡ `SRC:customer.name` ≡ `Src:customer.name`.
- `src:Customer.name` is a **different** path (returns NULL here).
- For `{"Employee":{"name":"John"}}` use `DATA:Employee.name` (capital E).

**FLATTEN** — the table function that **converts semi-structured data to a relational representation**: it **expands compound values (VARIANT, OBJECT, ARRAY) into rows** (a **lateral view**).

```sql
SELECT s.src:customer.name::STRING AS customer,
       f.index, f.value:name::STRING AS item, f.value:qty::INT AS qty
FROM sales s,
     LATERAL FLATTEN(INPUT => s.src:elements) f;
```

| Argument | Meaning |
|---|---|
| **`INPUT =>`** | The expression to expand (required) |
| `PATH =>` | Path inside INPUT to the element to flatten |
| **`OUTER => TRUE`** | Also emit a row (with NULLs) when the input is empty/NULL — like a left join. Default FALSE |
| **`RECURSIVE => TRUE`** | Expand **all nested levels**, not just the first. Default FALSE |
| `MODE =>` | `'OBJECT'`, `'ARRAY'` or `'BOTH'` (default) |

Output columns: **`SEQ`**, **`KEY`** (object key; NULL for arrays), **`PATH`**, **`INDEX`** (array position; NULL for objects), **`VALUE`**, **`THIS`**.

- **`LATERAL`** joins each flattened row with the **outer row it came from** (information outside the object).
- **Distinct key names at all levels**: `SELECT DISTINCT f.key FROM t, LATERAL FLATTEN(src, RECURSIVE => TRUE) f WHERE f.key IS NOT NULL;`

### 4.4.4 Semi-structured functions

| Purpose | Functions |
|---|---|
| **Parse text** | **`PARSE_JSON`** (string → VARIANT; **use it to insert JSON strings**), `TRY_PARSE_JSON`, **`PARSE_XML`** |
| **Validate** | **`CHECK_JSON`**, **`CHECK_XML`**: return **NULL if valid**, an **error message** if invalid |
| **Build** | **`OBJECT_CONSTRUCT`** (`OBJECT_CONSTRUCT(*)` = one OBJECT per row from all columns), `OBJECT_CONSTRUCT_KEEP_NULL`, `ARRAY_CONSTRUCT`, **`ARRAY_AGG`**, `OBJECT_AGG`, `TO_VARIANT`, `TO_ARRAY`, `TO_OBJECT` |
| **Modify** | `OBJECT_INSERT`, `OBJECT_DELETE`, `OBJECT_PICK`, `ARRAY_APPEND`, `ARRAY_CAT`, `ARRAY_COMPACT` |
| **Inspect** | **`TYPEOF`** (returns the type name stored in a VARIANT), `ARRAY_SIZE`, `ARRAY_CONTAINS`, `OBJECT_KEYS` |
| **Type predicates** | **`IS_ARRAY`**, **`IS_OBJECT`**, `IS_INTEGER`, `IS_DECIMAL`, `IS_VARCHAR`, `IS_BOOLEAN`, `IS_DATE`/`IS_DATE_VALUE`, `IS_TIMESTAMP_*`, **`IS_NULL_VALUE`** → Boolean: **is this VARIANT value of type X?** |
| **Cast VARIANT** | `AS_VARCHAR`, `AS_INTEGER`, `AS_OBJECT`… (or `::type`) |
| **Serialize** | `TO_JSON`, `TO_XML`; **`XMLGET`** extracts an XML element |
| **Nulls** | **`STRIP_NULL_VALUE`**, `IS_NULL_VALUE` |

- **Inserting JSON**: `INSERT INTO t (v) SELECT PARSE_JSON('{"a":1}');` — `PARSE_JSON` cannot be used in a plain `VALUES` list, use `INSERT … SELECT`. **`TO_VARIANT('{"a":1}')`** would store a **string**, not the parsed object.
- `OBJECT_CONSTRUCT(*)` builds one object **per row**; to get one value for all rows, wrap it in `ARRAY_AGG`.
- Shorthand constants: `SELECT {'key': {'subkey': 'value'}} AS c;` builds an OBJECT; `[1, 2, 3]` builds an ARRAY.

### 4.4.5 Transforming structured data with SQL

**Set operators**

| Operator | Returns |
|---|---|
| **`UNION ALL`** | All rows of both queries (duplicates kept, cheapest) |
| **`UNION`** | All rows **without duplicates** (extra aggregation) |
| **`INTERSECT`** | Rows present in **both** queries (deduplicated) |
| **`MINUS`** = **`EXCEPT`** | Rows of the first query **not** in the second |

**DML for transformation**

- **`MERGE`**: one statement that **updates/deletes matching rows and inserts non-matching rows** (`WHEN MATCHED THEN UPDATE | DELETE`, `WHEN NOT MATCHED THEN INSERT`). **There is no `UPSERT` statement.** Several source rows matching one target row → nondeterministic → error by default (`ERROR_ON_NONDETERMINISTIC_MERGE`).
- **Multi-table insert**: `INSERT ALL` / `INSERT FIRST … WHEN … THEN INTO t1 … ELSE INTO t2 … SELECT …`.
- `INSERT OVERWRITE` (truncate + insert in one statement), `UPDATE … FROM`, `DELETE … USING`, **CTAS** (`CREATE TABLE … AS SELECT`), `CREATE TABLE … LIKE`, `CLONE`.
- **Joins**: INNER, LEFT/RIGHT/FULL OUTER, CROSS, NATURAL, **LATERAL**, **ASOF JOIN** (match each row to the closest earlier/later row in time, e.g. trades to quotes).

**Concurrency and transactions**

- **`INSERT` and `COPY` are not blocking**: they only write **new micro-partitions** and can run in parallel with each other.
- **`UPDATE`, `DELETE`, `MERGE` take locks**: they generally cannot run in parallel with other UPDATE/DELETE/MERGE on the same table/rows. Waiting statements show as **Blocked** until **`LOCK_TIMEOUT`**.
- **AUTOCOMMIT** is on by default; explicit transactions with `BEGIN` … `COMMIT`/`ROLLBACK`. **DDL commits implicitly** (it ends the open transaction). `SHOW TRANSACTIONS`, `SHOW LOCKS`, `SYSTEM$ABORT_TRANSACTION`.

**Window functions**

```sql
SELECT employee, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
FROM employees
QUALIFY rnk <= 3;
```

- A window function computes over **related rows while keeping one output row per input row** (GROUP BY would collapse them).
- **`OVER`** sub-clauses: **`PARTITION BY`**, **`ORDER BY`** and, for some functions, a **window frame** (`ROWS`/`RANGE BETWEEN …`). GROUP BY, LIMIT or UNION are **not** OVER sub-clauses.
- Ranking: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`, `PERCENT_RANK`, `CUME_DIST`. Offset: `LAG`, `LEAD`, `FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE`. Aggregates as windows: `SUM(...) OVER (...)` for running totals.
- **`QUALIFY`** filters on window function results (as `HAVING` does for GROUP BY).
- Logical order: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → window functions → **`QUALIFY`** → `DISTINCT` → `ORDER BY` → `LIMIT`.

**Grouping and reshaping**: `GROUP BY ROLLUP`, `CUBE`, `GROUPING SETS`, **`GROUP BY ALL`** (groups by all non-aggregate select items), **`PIVOT`** / **`UNPIVOT`**.

**Hierarchical (recursive) queries** — for a hierarchy **whose depth is unknown in advance**:

- **`CONNECT BY`** with `START WITH` and `PRIOR` (e.g. employee → manager).
- **Recursive CTE**: `WITH RECURSIVE cte AS (anchor UNION ALL recursive part) SELECT …`. An ordinary `WITH` is not recursive. Watch termination/cycles.

### 4.4.6 Useful built-in functions

**Strings**

| Function | Notes |
|---|---|
| `SPLIT(str, delim)` | Returns an **ARRAY** |
| **`SPLIT_PART(str, delim, n)`** | Returns part *n*; **out of range → empty string**; 0 is treated as 1; negative counts from the end |
| **`SPLIT_TO_TABLE(str, delim)`** | **Table function**: one **row per part** (`SEQ`, `INDEX`, `VALUE`). Call as **`SELECT * FROM TABLE(SPLIT_TO_TABLE('a.b.c', '.'))`** or with `LATERAL` |
| `STRTOK`, `STRTOK_SPLIT_TO_TABLE` | Tokenize by any of several delimiter characters |
| `REGEXP_LIKE`/`RLIKE`, `REGEXP_SUBSTR`, `REGEXP_REPLACE`, `LIKE`, **`ILIKE`** (case-insensitive) | Pattern matching |
| **`EDITDISTANCE`** | Levenshtein distance (number of edits) |
| **`JAROWINKLER_SIMILARITY`** | Similarity **0–100** (integer) |
| `SOUNDEX`, `SOUNDEX_P123` | Phonetic codes |
| `CONCAT` / `\|\|`, `TRIM`, `LPAD`, `INITCAP`, `COLLATE` | Formatting and collation |

**Estimation (approximate) functions** — fast on huge tables:

| Need | Function | Algorithm |
|---|---|---|
| **Distinct count** on trillions of rows | **`APPROX_COUNT_DISTINCT`** = **`HLL`** | **HyperLogLog** (~1.6% average relative error) |
| Most frequent values | `APPROX_TOP_K` | Space-Saving |
| Percentiles / median | `APPROX_PERCENTILE` | t-Digest |
| Similarity of two sets | `MINHASH` + `APPROXIMATE_SIMILARITY` | MinHash (Jaccard) |

**Context and session**

- `CURRENT_USER()`, `CURRENT_ROLE()`, `CURRENT_WAREHOUSE()`, `CURRENT_DATABASE()`, `CURRENT_SCHEMA()`, `CURRENT_SESSION()`, `CURRENT_ACCOUNT()`, `CURRENT_REGION()`, **`LAST_QUERY_ID()`**.
- **Session variables**: `SET my_var = 10;` `SET (a, b) = (1, 2);` reference with **`$`**: `SELECT $my_var;` `UNSET my_var;` `SHOW VARIABLES;`. Use **`IDENTIFIER($tbl)`** to use a variable as an object name. String values up to **256 bytes**. (`@` is for **stages**; Snowflake Scripting variables use `:var` inside SQL.)

**Table functions** — return a **set of rows**, used in the **FROM** clause, usually as **`TABLE(…)`**: `FLATTEN`, `SPLIT_TO_TABLE`, **`RESULT_SCAN`**, **`GENERATOR`** (`ROWCOUNT =>`, with `SEQ4()`, `UNIFORM()`, `RANDOM()`), `INFER_SCHEMA`, `VALIDATE`, Information Schema functions, user **UDTFs**.

### 4.4.7 Sampling

```sql
SELECT * FROM t SAMPLE (10);                     -- ~10% of rows (BERNOULLI by default)
SELECT * FROM t TABLESAMPLE BERNOULLI (10);      -- same: each row has a 10% chance
SELECT * FROM t SAMPLE SYSTEM (10) SEED (42);    -- ~10% of blocks, repeatable
SELECT * FROM t SAMPLE (10 ROWS);                -- exactly 10 rows (if the table has ≥ 10)
```

- **`SAMPLE`** and **`TABLESAMPLE`** are **synonyms**; they return a **random subset** without scanning the whole table (block sampling).
- Methods:
  - **`BERNOULLI` = `ROW`** (default): **each row** is included with probability *p*%. The count is approximate (10% of 1000 rows ≈ 100, not exactly 100).
  - **`SYSTEM` = `BLOCK`**: each **block of rows (micro-partition)** is included with probability *p*%. Faster, less random on small tables.
- **Percentage** `0`–`100`: **`SAMPLE (0)` → empty**, **`SAMPLE (100)` → whole table**. `SAMPLE (0.1)` = 0.1 percent, not 10%.
- **Fixed size** `SAMPLE (n ROWS)` (0 to 1,000,000): returns **exactly n rows** (or all rows if the table is smaller); **only ROW/BERNOULLI**, **no SEED**, different rows each run.
- **`SEED (n)`** / **`REPEATABLE (n)`**: same sample on unchanged data (percentage sampling). Without a seed, results can differ between executions.

### 4.4.8 User-defined functions (UDFs)

| Type | Returns | Used in |
|---|---|---|
| **Scalar UDF** | **One value per input row** | `SELECT` list, `WHERE` |
| **UDTF** (user-defined **table** function) | **A set of rows** (one or more columns) **per input row** | **`FROM`** clause, `TABLE(…)` |
| **UDAF** ⚠️ (Python) | One value per group | Aggregation |

- **Handler languages**: **SQL, JavaScript, Python, Java, Scala**. (Not C#, Ruby, Go…)
  - **SQL and JavaScript**: handler **inline** only.
  - **Python, Java, Scala**: inline or **staged** (`IMPORTS = ('@stage/lib.jar')`); Python packages from the **Snowflake Anaconda channel** (`PACKAGES = ('numpy')`); **vectorized Python UDFs** process batches as pandas DataFrames.
- **`VOLATILE`** (default: may return different values for the same input) vs **`IMMUTABLE`** (same input → same output). **`MEMOIZABLE`** scalar SQL UDFs cache results.
- **Secure UDF** (`CREATE SECURE FUNCTION`) hides the definition and internals from non-owners.
- **Overloading**: same name, different argument signatures.
- **Unqualified object names** in a UDF body resolve **only in the UDF's own database and schema**, not in the session's current schema.
- A UDF **cannot run DDL/DML** (an SQL UDF can only contain a query expression). Use a stored procedure for that.
- **External functions** (Domain 3) are UDFs whose code runs **outside Snowflake** through an API integration.

### 4.4.9 Stored procedures and Snowflake Scripting

| | **UDF** | **Stored procedure** |
|---|---|---|
| Called with | Inside a SQL expression (`SELECT f(x)`) | **`CALL proc(x)`** |
| Returns | Value per row (or rows for UDTF) | **One value** (optional) or a table |
| Database operations (DDL/DML) | **No** | **Yes** (via SQL or the Snowpark/JavaScript API) |
| Typical use | Calculate a value | **Administrative tasks**, ETL logic, loops over objects |
| Languages | SQL, JavaScript, Python, Java, Scala | **SQL (Snowflake Scripting)**, JavaScript, Python, Java, Scala |

- **Owner's rights** (**`EXECUTE AS OWNER`, the default**): runs with the **owner's privileges**; the caller cannot see its code; **cannot access the caller's session variables**, and some session-related commands are restricted.
- **Caller's rights** (**`EXECUTE AS CALLER`**): runs with the **caller's privileges and session context**. ⚠️ `EXECUTE AS RESTRICTED CALLER` is newer.
- **Anonymous block**: a Snowflake Scripting block **executed without creating a named procedure** — `EXECUTE IMMEDIATE $$ … $$` (or `BEGIN … END` directly in Snowsight). `CALL` is for named procedures. `WITH … AS PROCEDURE … CALL` creates a temporary one.

**Snowflake Scripting structure**

```sql
DECLARE
  total INTEGER DEFAULT 0;
  c1 CURSOR FOR SELECT amount FROM orders;
BEGIN
  FOR rec IN c1 DO
    total := total + rec.amount;
  END FOR;
  RETURN total;
EXCEPTION
  WHEN STATEMENT_ERROR THEN RETURN SQLERRM;
END;
```

| Loop | Condition | Runs at least once? |
|---|---|---|
| **`FOR`** | Counter range or cursor/RESULTSET rows | No |
| **`WHILE`** | **Checked before** each iteration; runs **while** TRUE | No |
| **`REPEAT … UNTIL`** | **Checked after** each iteration; **stops when TRUE** ("iterates until a condition is true") | **Yes** |
| **`LOOP`** | **No built-in condition or bound**: exit with **`BREAK`** (or `RETURN`) | — |

- `BREAK`/`EXIT` leaves a loop, `CONTINUE`/`ITERATE` skips to the next iteration.
- Variables: declared in `DECLARE` or with `LET`; assign with `:=`; inside SQL statements reference them as **`:var`**.
- **Cursors** and **RESULTSET** (`LET rs RESULTSET := (SELECT …)`) iterate over query results; `RETURN TABLE(rs)` returns a table.
- Branching: `IF … ELSEIF … ELSE … END IF`, `CASE`.
- Exceptions: `EXCEPTION WHEN STATEMENT_ERROR | EXPRESSION_ERROR | OTHER`, custom exceptions with **`RAISE`**; info in **`SQLCODE`**, **`SQLERRM`**, **`SQLSTATE`**. After DML: **`SQLROWCOUNT`**, `SQLFOUND`, `SQLNOTFOUND`, **`SQLID`** (query ID of the last statement).

### 4.4.10 Other transformation options

- **Views**: standard (stores a definition), **secure** (hides definition and internals; some optimizations are skipped, so they can be slower), **materialized** (4.2.5).
- **Dynamic tables**, **streams + tasks** for pipelines (Domain 3).
- **Snowpark**: DataFrame API in **Python, Java, Scala**; **lazy evaluation**, the operations are **pushed down** and executed as SQL in a **warehouse** (no data leaves Snowflake).
- **Snowflake Notebooks**, dbt projects ⚠️ and Cortex AI SQL functions (Domain 1) can also transform data.

### 4.4.11 Exam traps — 4.4

- Native type for JSON = **VARIANT**. Semi-structured types = **VARIANT, OBJECT, ARRAY**. "JSON", "XML", "STRUCT", "VARRAY", "BLOB", "CLOB" are **not** Snowflake types.
- A VARIANT stores **OBJECT** and **ARRAY** (and scalars). Recommended column when operations are unknown: **VARIANT**.
- Dates/timestamps as strings in VARIANT → **slower queries + more storage** → **flatten into typed columns**.
- Path rules: **column case-insensitive, element names case-sensitive**; arrays are **0-based**; spaces need **double quotes**.
- `FLATTEN` output: **SEQ, KEY, PATH, INDEX, VALUE, THIS**. `LATERAL` joins with the outer row; `RECURSIVE => TRUE` for all levels.
- **PARSE_JSON** (string → VARIANT) vs **OBJECT_CONSTRUCT** (build from key/value pairs) vs **TO_VARIANT** (stores the string as a string).
- JSON null → SQL NULL: **`STRIP_NULL_VALUE`** (function). `STRIP_NULL_VALUES` is the **file format option**.
- `PARSE_JSON(NULL)` = **SQL NULL**; `PARSE_JSON('null')` = **JSON null**.
- **CHECK_JSON / CHECK_XML**: **NULL = valid**.
- **TYPEOF** returns the type; **IS_…** type predicates return a Boolean.
- Only **NOT NULL** is enforced.
- FLOAT synonyms: **DOUBLE, DOUBLE PRECISION, REAL, FLOAT4, FLOAT8**. DECIMAL/NUMERIC are **NUMBER** synonyms (fixed point).
- BLOB → **BINARY**; CLOB → **VARCHAR**.
- **VECTOR** stores embeddings; GEOGRAPHY = round Earth, GEOMETRY = planar.
- `SAMPLE (10)` = **10% probability per row**, not exactly 10% of rows; `SAMPLE (10 ROWS)` = **exactly 10 rows**; `SAMPLE (0)` → **empty**; fixed size works only with **ROW/BERNOULLI**.
- Unseeded **BLOCK** sampling can return different rows on each run.
- `LAST_QUERY_ID(2)` = **second** query of the session; `LAST_QUERY_ID(-2)` = the one before the last.
- **INSERT and COPY are not blocking**; UPDATE/DELETE/MERGE lock.
- No **UPSERT**: use **MERGE**.
- **INTERSECT** = values present in both tables.
- Window function: **OVER (PARTITION BY … ORDER BY …)**; filter with **QUALIFY**.
- Recursive: **CONNECT BY** or **recursive CTE** (`WITH RECURSIVE`).
- **HyperLogLog** = approximate distinct count.
- **JAROWINKLER_SIMILARITY** = 0–100; **EDITDISTANCE** = number of edits.
- **SPLIT_PART** out of range → **empty string**; **SPLIT_TO_TABLE** is a table function → `TABLE(...)`.
- **UDTF** in the `FROM` clause; **scalar UDF** = one value per row.
- UDF languages: **SQL, JavaScript, Python, Java, Scala**.
- UDF **cannot** do DML/DDL; **stored procedure can**. Default procedure rights: **owner's**.
- Loops: **REPEAT** = until TRUE (post-test), **WHILE** = pre-test, **LOOP** = no condition (needs BREAK).
- Session variable prefix: **`$`**; stage prefix: **`@`**.

---

## Rapid-fire self-test (cover the right column)

| # | Obj. | Question | Answer |
|---|---|---|---|
| 1 | 4.1 | Where does query compilation and pruning happen? | Cloud services layer |
| 2 | 4.1 | Query Profile in one sentence? | Graphical representation of the processing plan with statistics per operator |
| 3 | 4.1 | Query Profile symptom of "too large for memory"? | Bytes spilled to local/remote storage |
| 4 | 4.1 | Worst kind of spilling? | Spilling to remote storage |
| 5 | 4.1 | Two remedies for spilling? | Larger warehouse; smaller batches / less intermediate data |
| 6 | 4.1 | Does multi-cluster fix spilling? | No, it fixes concurrency |
| 7 | 4.1 | Statistics that show pruning efficiency? | Partitions scanned vs Partitions total |
| 8 | 4.1 | Operator that holds pruning statistics? | TableScan |
| 9 | 4.1 | Definition of pruning? | Skipping micro-partitions that cannot contain matching rows |
| 10 | 4.1 | Does Snowflake use B-tree indexes on standard tables? | No, metadata-based pruning |
| 11 | 4.1 | UnionAll with an Aggregate on top means? | UNION without ALL |
| 12 | 4.1 | Join outputs far more rows than inputs? | Exploding join → check join predicates |
| 13 | 4.1 | Join with no condition shows as? | CartesianJoin |
| 14 | 4.1 | Four common problems Query Profile reveals? | Exploding joins, UNION without ALL, too large for memory, inefficient pruning |
| 15 | 4.1 | Operator for COPY INTO a table? | Insert |
| 16 | 4.1 | Operator for unloading to a stage? | Unload |
| 17 | 4.1 | Which is a DML operator: Merge, Flatten, Sort? | Merge |
| 18 | 4.1 | Statistic specific to external functions? | Total invocations |
| 19 | 4.1 | Percentage scanned from cache refers to? | Warehouse local cache |
| 20 | 4.1 | Remote Disk I/O means? | Time blocked by remote disk access |
| 21 | 4.1 | Six execution-time categories? | Processing, Local Disk I/O, Remote Disk I/O, Network, Synchronization, Initialization |
| 22 | 4.1 | Orange bar on an operator? | Share of the step's time spent in that operator |
| 23 | 4.1 | Element showing relationships between nodes? | Operator tree |
| 24 | 4.1 | Query Profile data with SQL? | GET_QUERY_OPERATOR_STATS |
| 25 | 4.1 | Plan without executing the query? | EXPLAIN |
| 26 | 4.1 | Does EXPLAIN need a running warehouse? | No |
| 27 | 4.1 | EXPLAIN output formats? | TABULAR (default), JSON, TEXT |
| 28 | 4.1 | Check if a materialized view is used? | EXPLAIN (or Query Profile) |
| 29 | 4.1 | Query Details shows? | Status, start/end, duration, warehouse size, query ID, tag, driver, session |
| 30 | 4.1 | Snowsight Query History retention? | 14 days |
| 31 | 4.1 | INFORMATION_SCHEMA.QUERY_HISTORY retention? | 7 days |
| 32 | 4.1 | ACCOUNT_USAGE.QUERY_HISTORY retention / latency? | 365 days / up to 45 min |
| 33 | 4.1 | View to find long-running queries? | ACCOUNT_USAGE.QUERY_HISTORY |
| 34 | 4.1 | QUERY_HISTORY columns for pruning? | PARTITIONS_SCANNED, PARTITIONS_TOTAL |
| 35 | 4.1 | Max time a query may wait in the queue? | STATEMENT_QUEUED_TIMEOUT_IN_SECONDS |
| 36 | 4.1 | Max running time of a statement? | STATEMENT_TIMEOUT_IN_SECONDS (default 2 days) |
| 37 | 4.1 | MAX_CONCURRENCY_LEVEL default? | 8 |
| 38 | 4.1 | Function with AVG_QUEUED_LOAD? | WAREHOUSE_LOAD_HISTORY |
| 39 | 4.1 | Many short queries, high queued load → diagnosis? | Concurrency contention |
| 40 | 4.1 | Fix for queuing? | Multi-cluster warehouse / separate warehouses |
| 41 | 4.1 | Snowflake-generated observations with next steps? | Query Insights |
| 42 | 4.1 | Credits attributed to individual queries? | QUERY_ATTRIBUTION_HISTORY |
| 43 | 4.1 | Why attributed credits < warehouse bill? | Idle time is not attributed |
| 44 | 4.1 | Purpose of micro-partition statistics? | Efficient pruning based on filters |
| 45 | 4.1 | Spilling term definition? | Intermediate results written to disk because memory is full |
| 46 | 4.1 | Can you see another user's query results? | No, only their history (with privileges) |
| 47 | 4.2 | Feature for selective point lookups? | Search Optimization Service |
| 48 | 4.2 | Persistent structure built by SOS? | Search access path |
| 49 | 4.2 | SOS methods? | EQUALITY, SUBSTRING, GEO (FULL_TEXT ⚠️) |
| 50 | 4.2 | Does SOS help range scans? | Not its target; clustering does |
| 51 | 4.2 | Geospatial SOS support? | GEOGRAPHY predicates such as ST_INTERSECTS |
| 52 | 4.2 | Join predicates supported by SOS? | Equality conjunctions (AND) |
| 53 | 4.2 | Privileges to add SOS? | OWNERSHIP on table + ADD SEARCH OPTIMIZATION on schema |
| 54 | 4.2 | Estimate SOS cost? | SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COSTS |
| 55 | 4.2 | Core benefit of clustering? | Better pruning → scan efficiency |
| 56 | 4.2 | Table size to consider a clustering key? | Multi-terabyte |
| 57 | 4.2 | Commands to set a clustering key? | CREATE TABLE / ALTER TABLE … CLUSTER BY |
| 58 | 4.2 | Multiple columns in a clustering key? | Yes (recommended max 3–4) |
| 59 | 4.2 | Order of clustering columns? | Lowest to highest cardinality |
| 60 | 4.2 | Best clustering key columns? | Most used in selective filters (then joins) |
| 61 | 4.2 | Types not allowed in clustering keys? | GEOGRAPHY, VARIANT, OBJECT, ARRAY |
| 62 | 4.2 | Unique ID / ns timestamp as key? | Too high cardinality → use an expression (TO_DATE) |
| 63 | 4.2 | Metric of how well a table is clustered? | Clustering depth (smaller = better) |
| 64 | 4.2 | Functions returning clustering metrics? | SYSTEM$CLUSTERING_INFORMATION, SYSTEM$CLUSTERING_DEPTH |
| 65 | 4.2 | What triggers Automatic Clustering? | Snowflake determines the table will benefit |
| 66 | 4.2 | Cost of Automatic Clustering? | Serverless credits + storage of new micro-partitions |
| 67 | 4.2 | Stop reclustering one table? | ALTER TABLE … SUSPEND RECLUSTER |
| 68 | 4.2 | Clustering on a clone? | Starts suspended |
| 69 | 4.2 | Object storing precomputed, auto-maintained results? | Materialized view |
| 70 | 4.2 | Main MV limitation? | One table only, no JOIN |
| 71 | 4.2 | Other MV limitations? | No UDF, window functions, HAVING, ORDER BY, LIMIT, non-deterministic functions |
| 72 | 4.2 | MV maintenance cost depends on? | Base table change rate + MV clustering key |
| 73 | 4.2 | MV on an external table? | Yes, supported |
| 74 | 4.2 | Standard view preferable when? | Results change often |
| 75 | 4.2 | Can the optimizer use an MV for a base-table query? | Yes, automatic rewrite |
| 76 | 4.2 | Feature offloading outlier query work to shared compute? | Query Acceleration Service |
| 77 | 4.2 | QAS minimum edition? | Enterprise |
| 78 | 4.2 | Queries that benefit from QAS? | Large scans with selective filters, ad hoc analytics |
| 79 | 4.2 | Bad QAS candidate? | High-cardinality GROUP BY |
| 80 | 4.2 | Enable QAS? | ALTER WAREHOUSE … SET ENABLE_QUERY_ACCELERATION = TRUE |
| 81 | 4.2 | QAS cost cap parameter? | QUERY_ACCELERATION_MAX_SCALE_FACTOR (default 8) |
| 82 | 4.2 | Check a query's QAS eligibility? | SYSTEM$ESTIMATE_QUERY_ACCELERATION / QUERY_ACCELERATION_ELIGIBLE |
| 83 | 4.2 | Optimization features that need Enterprise? | SOS, MV, QAS (clustering does not) |
| 84 | 4.3 | Three cache layers? | Metadata, result (persisted results), warehouse |
| 85 | 4.3 | Cache storing query output? | Result cache |
| 86 | 4.3 | Cache storing table data? | Warehouse (local disk) cache |
| 87 | 4.3 | Result cache lifetime? | 24 h, renewed on reuse, max 31 days |
| 88 | 4.3 | Result cache needs a running warehouse? | No |
| 89 | 4.3 | Metadata queries need a warehouse? | No (e.g. COUNT(*) without filter) |
| 90 | 4.3 | Layer coordinating result reuse? | Cloud services |
| 91 | 4.3 | Conditions for result reuse? | Same query text, unchanged data, privileges, no runtime functions, within retention |
| 92 | 4.3 | Removing a column from the SELECT → reuse? | No, query text changed |
| 93 | 4.3 | Must the warehouse be the same for reuse? | No |
| 94 | 4.3 | Can reclustering invalidate the result cache? | Yes, micro-partitions change |
| 95 | 4.3 | Runtime function still allowing reuse? | CURRENT_DATE() |
| 96 | 4.3 | Disable result reuse? | USE_CACHED_RESULT = FALSE |
| 97 | 4.3 | Warehouse suspended → warehouse cache? | Dropped, not available on restart |
| 98 | 4.3 | Resizing a warehouse down → cache? | Part of it may be lost |
| 99 | 4.3 | Query a previous result as a table? | RESULT_SCAN |
| 100 | 4.3 | Post-process SHOW output? | RESULT_SCAN(LAST_QUERY_ID()) |
| 101 | 4.3 | Can ACCOUNTADMIN RESULT_SCAN another user's manual query? | No |
| 102 | 4.4 | Native type for JSON? | VARIANT |
| 103 | 4.4 | Semi-structured types? | VARIANT, OBJECT, ARRAY |
| 104 | 4.4 | Container types inside VARIANT? | OBJECT and ARRAY |
| 105 | 4.4 | Max size of one VARIANT value? | 128 MB uncompressed ⚠️ |
| 106 | 4.4 | Column type when operations are unknown? | VARIANT |
| 107 | 4.4 | JSON with many dates and arrays, best performance? | Flatten into typed columns |
| 108 | 4.4 | Dates as strings in VARIANT cause? | Slower queries, more storage |
| 109 | 4.4 | Two kinds of NULL? | SQL NULL and JSON (VARIANT) null |
| 110 | 4.4 | JSON null → SQL NULL? | STRIP_NULL_VALUE |
| 111 | 4.4 | PARSE_JSON(NULL) vs PARSE_JSON('null')? | SQL NULL vs JSON null |
| 112 | 4.4 | String → VARIANT parsing JSON? | PARSE_JSON |
| 113 | 4.4 | Insert a JSON string into a VARIANT column? | INSERT … SELECT PARSE_JSON('…') |
| 114 | 4.4 | One OBJECT per row from all columns? | OBJECT_CONSTRUCT(*) |
| 115 | 4.4 | Name of the first element of array `elements`? | `src:elements[0].name` |
| 116 | 4.4 | Case rules in paths? | Column case-insensitive, element names case-sensitive |
| 117 | 4.4 | `{"Employee":{"name":"John"}}` path? | DATA:Employee.name |
| 118 | 4.4 | Element name with a space? | src:customer."phone number" |
| 119 | 4.4 | Expand arrays/objects into rows? | FLATTEN |
| 120 | 4.4 | FLATTEN output columns? | SEQ, KEY, PATH, INDEX, VALUE, THIS |
| 121 | 4.4 | What does LATERAL add? | Joins each flattened row with its source row |
| 122 | 4.4 | Distinct keys at all nested levels? | FLATTEN with RECURSIVE => TRUE |
| 123 | 4.4 | Keep rows with empty arrays in FLATTEN? | OUTER => TRUE |
| 124 | 4.4 | Type of a value in a VARIANT? | TYPEOF |
| 125 | 4.4 | Test whether a VARIANT is an array? | IS_ARRAY (type predicate) |
| 126 | 4.4 | Validate XML text? | CHECK_XML (NULL = valid) |
| 127 | 4.4 | Dedicated geospatial types? | GEOGRAPHY, GEOMETRY |
| 128 | 4.4 | Type for embeddings? | VECTOR |
| 129 | 4.4 | FLOAT synonyms? | DOUBLE, DOUBLE PRECISION, REAL, FLOAT4, FLOAT8 |
| 130 | 4.4 | Replacement for BLOB / CLOB? | BINARY / VARCHAR |
| 131 | 4.4 | Only enforced constraint? | NOT NULL |
| 132 | 4.4 | Strings TO_BOOLEAN maps to TRUE? | true, t, yes, y, on, 1 |
| 133 | 4.4 | Update matches and insert non-matches in one statement? | MERGE |
| 134 | 4.4 | Non-blocking DML? | INSERT and COPY |
| 135 | 4.4 | Values present in both tables? | INTERSECT |
| 136 | 4.4 | OVER clause sub-clauses? | PARTITION BY, ORDER BY (+ frame) |
| 137 | 4.4 | Rank rows within a group without collapsing them? | Window function, e.g. RANK() OVER (PARTITION BY …) |
| 138 | 4.4 | Filter on a window function result? | QUALIFY |
| 139 | 4.4 | Recursive query constructs? | CONNECT BY, recursive CTE |
| 140 | 4.4 | Approximate distinct count on trillions of rows? | HyperLogLog (APPROX_COUNT_DISTINCT / HLL) |
| 141 | 4.4 | String similarity 0–100? | JAROWINKLER_SIMILARITY |
| 142 | 4.4 | SPLIT_PART with part out of range? | Empty string |
| 143 | 4.4 | Split a string into rows? | SPLIT_TO_TABLE in TABLE(…) |
| 144 | 4.4 | Prefix of a session variable? | $ |
| 145 | 4.4 | Random subset of rows? | SAMPLE / TABLESAMPLE |
| 146 | 4.4 | SAMPLE (10) on 1000 rows? | Each row 10% probability (~100 rows) |
| 147 | 4.4 | SAMPLE (0)? | Empty result |
| 148 | 4.4 | Exactly 10 random rows? | SAMPLE (10 ROWS) |
| 149 | 4.4 | BERNOULLI vs SYSTEM sampling? | Per row vs per block |
| 150 | 4.4 | Repeatable sample? | SEED / REPEATABLE (not with fixed ROWS) |
| 151 | 4.4 | Query ID of the 2nd query of the session? | LAST_QUERY_ID(2) |
| 152 | 4.4 | Function used in FROM returning rows? | UDTF (table function) |
| 153 | 4.4 | UDF returning one value per row? | Scalar UDF |
| 154 | 4.4 | UDF handler languages? | SQL, JavaScript, Python, Java, Scala |
| 155 | 4.4 | Unqualified names inside a UDF resolve in? | The UDF's own schema |
| 156 | 4.4 | Default UDF volatility? | VOLATILE |
| 157 | 4.4 | UDF vs procedure: who can run DML? | Stored procedure |
| 158 | 4.4 | Default stored procedure rights? | Owner's rights |
| 159 | 4.4 | Run a scripting block without creating a procedure? | Anonymous block (EXECUTE IMMEDIATE) |
| 160 | 4.4 | Loop that iterates until a condition is true? | REPEAT |
| 161 | 4.4 | Loop with no condition or bound? | LOOP (exit with BREAK) |
| 162 | 4.4 | Rows affected by the last DML in Scripting? | SQLROWCOUNT |

If you can answer all of these without looking and explain the symptom → tool table of 4.2.1 in your own words, you are ready for Domain 4.
