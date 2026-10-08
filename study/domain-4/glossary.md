# Domain 4 Glossary — Performance Optimization, Querying & Transformation (COF-C03)

Alphabetical list of the keywords used in Domain 4 questions. Each entry has the **English term** (as written in the exam), a short Spanish equivalent in *italics* when it helps, the objective it belongs to (see the [syllabus](syllabus.md)), and a one- or two-line definition.

⚠️ = name, limit or interface that changes frequently.

---

## A

- **Aggregate (operator)** · 4.1 — Query Profile operator for GROUP BY and aggregations; an extra Aggregate on top of UnionAll reveals a UNION without ALL.
- **Anonymous block** — *bloque anónimo* · 4.4 — Snowflake Scripting block executed without creating a named procedure (EXECUTE IMMEDIATE $$ … $$ or BEGIN … END in Snowsight).
- **APPROX_COUNT_DISTINCT** · 4.4 — Estimates the number of distinct values with HyperLogLog; synonym of HLL. Much faster than COUNT(DISTINCT) on huge tables.
- **APPROX_PERCENTILE** · 4.4 — Approximate percentile/median using the t-Digest algorithm.
- **APPROX_TOP_K** · 4.4 — Approximate most frequent values (Space-Saving algorithm).
- **ARRAY** · 4.4 — Semi-structured type: ordered list of VARIANT elements accessed by 0-based index; can be sparse.
- **ARRAY_AGG** · 4.4 — Aggregate function that collects values of a group into an ARRAY.
- **ARRAY_CONSTRUCT** · 4.4 — Builds an ARRAY from its arguments.
- **ARRAY_SIZE** · 4.4 — Returns the number of elements of an ARRAY.
- **AS_VARCHAR / AS_INTEGER** · 4.4 — Functions that cast a VARIANT value to a specific SQL type (equivalent to ::type for matching values).
- **ASOF JOIN** · 4.4 — Join that matches each row with the closest earlier or later row in time (e.g. trades to quotes).
- **AUTOINCREMENT / IDENTITY** · 4.4 — Column default that generates unique increasing numbers; values are not guaranteed gap-free.
- **Automatic Clustering** — *clustering automático* · 4.2 — Serverless service that reclusters a table with a clustering key when Snowflake determines it will benefit; billed in credits plus storage.
- **AUTOMATIC_CLUSTERING_HISTORY** · 4.2 — View/table function with the credits and bytes reclustered by Automatic Clustering.
- **AVG_QUEUED_LOAD** · 4.1 — WAREHOUSE_LOAD_HISTORY measure of the average number of queries queued because the warehouse was overloaded.

## B

- **BERNOULLI sampling** — *muestreo por filas* · 4.4 — Default sampling method (synonym ROW): each row is included with probability p%. Supports fixed-size samples.
- **BINARY** · 4.4 — Type for byte strings (synonym VARBINARY); Snowflake's replacement for BLOB.
- **BLOCK sampling** — *muestreo por bloques* · 4.4 — Sampling method (synonym SYSTEM) that includes whole blocks/micro-partitions with probability p%; faster, less random; no fixed ROWS size.
- **Blocked (query state)** · 4.1 — The query waits for a lock held by another transaction (UPDATE/DELETE/MERGE); limited by LOCK_TIMEOUT.
- **BOOLEAN** · 4.4 — Logical type: TRUE, FALSE or NULL.
- **Bytes scanned** · 4.1 — Query Profile IO statistic: amount of data read; together with partitions scanned it shows how much pruning helped.
- **Bytes spilled to local storage** · 4.1 — Intermediate data written to the warehouse's local disk because it did not fit in memory.
- **Bytes spilled to remote storage** — *volcado a almacenamiento remoto* · 4.1 — Intermediate data written to remote storage after local disk filled up; strongest sign the query is too large for the warehouse.

## C

- **CALL** · 4.4 — Statement that executes a named stored procedure.
- **Caller's rights** — *derechos del llamante* · 4.4 — Procedure option EXECUTE AS CALLER: runs with the caller's privileges and session context.
- **CartesianJoin** · 4.1 — Query Profile operator for a join without a condition (cross product); typical cause of exploding row counts.
- **CHECK_JSON** · 4.4 — Validates JSON text: returns NULL if valid, an error message if invalid.
- **CHECK_XML** · 4.4 — Validates XML text: returns NULL if valid (or input NULL), an error message if invalid.
- **CLUSTER BY** · 4.2 — Clause of CREATE TABLE / ALTER TABLE (and MVs) that defines the clustering key.
- **Clustering depth** — *profundidad de clustering* · 4.2 — Average depth of overlapping micro-partitions for given columns; smaller = better clustered (minimum 1, empty table 0).
- **Clustering key** — *clave de clustering* · 4.2 — Columns or expressions used to co-locate similar rows in micro-partitions to improve pruning; for very large (multi-TB) tables; max 3–4 columns recommended.
- **Compilation time** · 4.1 — Time spent in cloud services parsing, optimizing and pruning before execution.
- **CONNECT BY** · 4.4 — Clause for hierarchical/recursive queries with START WITH and PRIOR.
- **Constant micro-partition** · 4.2 — Micro-partition holding a single value for the clustering columns; cannot be improved by reclustering.
- **Constraints** — *restricciones* · 4.4 — PRIMARY KEY, UNIQUE and FOREIGN KEY are informational on standard tables; only NOT NULL is enforced.
- **CREDITS_ATTRIBUTED_COMPUTE** · 4.1 — QUERY_ATTRIBUTION_HISTORY column with the warehouse credits attributed to one query; excludes idle time.
- **CURRENT_DATE (result reuse)** · 4.3 — Exception among runtime functions: queries that use CURRENT_DATE() can still reuse persisted results.
- **Cursor** · 4.4 — Snowflake Scripting object that iterates over the rows of a query (DECLARE c CURSOR FOR …; FOR r IN c DO …).

## D

- **Data type conversion** — *conversión de tipos* · 4.4 — CAST(x AS t), x::t, TRY_CAST and TO_… / TRY_TO_… functions; TRY_ versions return NULL instead of an error.
- **DATE** · 4.4 — Calendar date type; store dates in DATE columns rather than strings for pruning and storage.
- **DECIMAL / NUMERIC** · 4.4 — Synonyms of NUMBER (fixed-point, exact), not of FLOAT.
- **DML operators** · 4.1 — Query Profile operators that modify data: Insert, Update, Delete, Merge, Unload.
- **DOUBLE / REAL** · 4.4 — Synonyms of FLOAT (64-bit floating point), together with DOUBLE PRECISION, FLOAT4 and FLOAT8.

## E

- **EDITDISTANCE** · 4.4 — Levenshtein distance: number of single-character edits between two strings.
- **ENABLE_QUERY_ACCELERATION** · 4.2 — Warehouse property that turns on the Query Acceleration Service.
- **EQUALITY (search optimization)** · 4.2 — Search optimization method for =, IN and equality on VARIANT fields.
- **Estimation functions** — *funciones de aproximación* · 4.4 — Approximate functions for huge data: HLL/APPROX_COUNT_DISTINCT, APPROX_TOP_K, APPROX_PERCENTILE, MINHASH.
- **EXCEPTION (Scripting)** · 4.4 — Section of a block that handles errors: WHEN STATEMENT_ERROR | EXPRESSION_ERROR | OTHER THEN …
- **EXECUTE AS OWNER** · 4.4 — Default procedure rights: runs with the owner's privileges; cannot access the caller's session variables.
- **EXECUTE IMMEDIATE** · 4.4 — Runs a SQL string or an anonymous Scripting block.
- **Execution time** · 4.1 — Time the warehouse spent processing the query, broken down into Processing, Local/Remote Disk I/O, Network, Synchronization and Initialization.
- **EXPLAIN** · 4.1 — Compiles a statement and returns its logical plan without executing it (no warehouse needed); shows partitionsAssigned and MV usage. Formats TABULAR, JSON, TEXT.
- **Exploding join** — *join explosivo* · 4.1 — Join that produces many more rows than it consumes, usually from a missing or wrong join condition.
- **ExternalScan** · 4.1 — Query Profile operator that reads data from a stage or external source.

## F

- **FLATTEN** · 4.4 — Table function that expands VARIANT, OBJECT or ARRAY values into rows (lateral view). Output: SEQ, KEY, PATH, INDEX, VALUE, THIS.
- **Flatten (operator)** · 4.1 — Query Profile operator for the FLATTEN table function; not a DML operator.
- **FLOAT** · 4.4 — Approximate 64-bit floating-point type; supports NaN and inf.
- **FOR loop** · 4.4 — Scripting loop over a counter range or the rows of a cursor/RESULTSET.

## G

- **GENERATOR** · 4.4 — Table function that creates rows (ROWCOUNT, TIMELIMIT); used with SEQ4, UNIFORM, RANDOM for test data.
- **GEO (search optimization)** · 4.2 — Search optimization method for GEOGRAPHY predicates such as ST_INTERSECTS and ST_CONTAINS.
- **GEOGRAPHY** · 4.4 — Geospatial type for points/lines/polygons on the round Earth (WGS 84). Not allowed in clustering keys.
- **GEOMETRY** · 4.4 — Geospatial type for a planar (Euclidean) coordinate system with an SRID.
- **GET_PATH** · 4.4 — Extracts a value from semi-structured data by path; the colon operator is its shorthand.
- **GET_QUERY_OPERATOR_STATS** · 4.1 — Table function that returns Query Profile operator statistics for a query ID.
- **GROUP BY ALL** · 4.4 — Groups by every non-aggregate expression of the SELECT list.
- **GROUPING SETS / ROLLUP / CUBE** · 4.4 — GROUP BY extensions that compute several grouping levels in one query.

## H

- **HLL (HyperLogLog)** · 4.4 — Algorithm/function for approximate distinct counts on very large datasets (~1.6% average error).

## I

- **IMMUTABLE** · 4.4 — UDF property: same input always returns the same output (the default is VOLATILE).
- **Inefficient pruning** — *poda ineficiente* · 4.1 — Partitions scanned close to partitions total on a selective query; fix with filters, clustering or search optimization.
- **Initialization** · 4.1 — Execution-time category: time spent setting up query processing.
- **Insert (operator)** · 4.1 — DML operator; also shown for loads with COPY INTO a table.
- **INSERT ALL / INSERT FIRST** · 4.4 — Multi-table insert that routes rows of one SELECT into several tables, optionally with WHEN conditions.
- **INSERT OVERWRITE** · 4.4 — Replaces the content of the target table with the result of the insert in one statement.
- **InternalObject** · 4.1 — Query Profile operator for access to an internal object such as an Information Schema table.
- **INTERSECT** · 4.4 — Set operator returning rows present in both queries, without duplicates.
- **IS_NULL_VALUE** · 4.4 — Returns TRUE if a VARIANT holds a JSON null.

## J

- **JAROWINKLER_SIMILARITY** · 4.4 — String similarity score as an integer from 0 to 100.
- **JoinFilter** · 4.1 — Query Profile operator that removes rows that cannot match a join, before the join.
- **JSON null** · 4.4 — Explicit null value stored inside a VARIANT (shown as null); distinct from SQL NULL.

## L

- **LAST_QUERY_ID** · 4.3/4.4 — Returns a query ID of the session: -1/default = most recent, negative counts back, positive counts from the session start (2 = second query).
- **LATERAL** · 4.4 — Lets a table expression (e.g. FLATTEN) reference columns of preceding tables, joining each output row with its source row.
- **LIKE / ILIKE / RLIKE** · 4.4 — Pattern matching: case-sensitive, case-insensitive, regular expression.
- **Local Disk I/O** · 4.1 — Execution-time category: time blocked by local disk access (cache or local spilling).
- **LOCK_TIMEOUT** · 4.4 — Seconds a statement waits for a lock before failing (default 43200).
- **LOOP** · 4.4 — Scripting loop with no condition or iteration bound; exit with BREAK or RETURN.

## M

- **Materialized view** — *vista materializada* · 4.2 — Enterprise+ object storing a precomputed query result over one table, kept current by serverless maintenance; no joins, UDFs or window functions.
- **MATERIALIZED_VIEW_REFRESH_HISTORY** · 4.2 — Credits consumed by materialized view maintenance.
- **MAX_CONCURRENCY_LEVEL** · 4.1 — Warehouse parameter for the number of concurrent queries (default 8); not a timeout.
- **MEMOIZABLE** · 4.4 — Scalar SQL UDF option that caches results for reuse.
- **MERGE** · 4.4 — One statement that updates/deletes matching target rows and inserts non-matching ones; Snowflake has no UPSERT command.
- **Merge (operator)** · 4.1 — DML operator for a MERGE statement in the Query Profile.
- **Metadata cache** — *caché de metadatos* · 4.3 — Cloud services metadata (row counts, min/max per micro-partition) that answers queries like COUNT(*) without a warehouse.
- **METADATA-BASED RESULT** · 4.3 — Query Profile node shown when a query was answered from metadata only.
- **Micro-partition statistics** · 4.1 — Min/max, distinct and NULL counts per column per micro-partition, collected to enable pruning.
- **MINHASH / APPROXIMATE_SIMILARITY** · 4.4 — Estimate the similarity (Jaccard) of two sets without comparing them fully.
- **MINUS / EXCEPT** · 4.4 — Set operator returning rows of the first query not present in the second.
- **Most expensive nodes** · 4.1 — Query Profile list of operators ranked by time share; first place to find the bottleneck.
- **Multi-cluster warehouse** · 4.1/4.2 — Enterprise+ warehouse that adds clusters to handle concurrency (queuing); does not speed up one large query.

## N

- **Natural clustering** — *clustering natural* · 4.2 — Order in which data was loaded; good for date-ordered loads, degraded by DML over time.
- **Network communication** · 4.1 — Execution-time category: time waiting for data transfer between nodes.
- **NOT NULL** · 4.4 — The only constraint enforced on standard tables; inserts with NULL fail.
- **NUMBER** · 4.4 — Fixed-point numeric type NUMBER(p,s), default (38,0); INT, INTEGER, BIGINT… are NUMBER(38,0).

## O

- **OBJECT** · 4.4 — Semi-structured type: set of key-value pairs with VARCHAR keys and VARIANT values.
- **OBJECT_CONSTRUCT** · 4.4 — Builds an OBJECT from key/value arguments; OBJECT_CONSTRUCT(*) builds one per row from all columns; omits SQL NULL values.
- **OBJECT_CONSTRUCT_KEEP_NULL** · 4.4 — Like OBJECT_CONSTRUCT but keeps pairs with SQL NULL values as JSON null.
- **Operator tree** — *árbol de operadores* · 4.1 — Query Profile graph showing operator nodes and the relationships between them.
- **OUTER (FLATTEN)** · 4.4 — FLATTEN argument: TRUE emits a row with NULLs when the input is empty, like a left join.
- **OVER clause** · 4.4 — Defines the window of a window function: PARTITION BY, ORDER BY and an optional frame.
- **Overlap** · 4.2 — Number of micro-partitions whose value ranges for the clustering columns overlap.
- **Owner's rights** — *derechos del propietario* · 4.4 — Default for stored procedures: the procedure runs with its owner's privileges.

## P

- **PARSE_JSON** · 4.4 — Interprets a string as JSON and returns a VARIANT; PARSE_JSON(NULL) = SQL NULL, PARSE_JSON('null') = JSON null.
- **PARSE_XML** · 4.4 — Interprets XML text and returns an OBJECT in a VARIANT.
- **Partitions scanned** · 4.1 — Micro-partitions actually read by a TableScan; compare with partitions total.
- **Partitions total** · 4.1 — All micro-partitions of the scanned table; the denominator of pruning efficiency.
- **Percentage scanned from cache** · 4.1/4.3 — Query Profile IO statistic: share of data read from the warehouse local cache.
- **Persisted query results** — *resultados persistidos* · 4.3 — Official name of the result cache: query outputs kept 24 h (renewed up to 31 days) for reuse.
- **PIVOT / UNPIVOT** · 4.4 — Rotate rows into columns and columns into rows.
- **Point lookup query** — *consulta puntual* · 4.2 — Highly selective query returning one or a few rows from a large table; target of search optimization.
- **Processing** · 4.1 — Execution-time category: CPU time spent processing data.
- **Pruning** — *poda* · 4.1 — Skipping micro-partitions whose metadata shows they cannot match the query's filters; Snowflake's alternative to indexes.

## Q

- **QUALIFY** · 4.4 — Filters rows on the result of window functions, as HAVING does for aggregates.
- **Query Acceleration Service (QAS)** — *servicio de aceleración de consultas* · 4.2 — Enterprise+ service that offloads parts of eligible outlier queries (large scans with selective filters) to shared serverless compute.
- **Query Details** · 4.1 — Snowsight panel of an executed query: status, start/end, duration, warehouse and size, query ID, tag, client driver, session ID.
- **Query Insights** ⚠️ · 4.1 — Snowflake-generated observations about conditions hurting a query plus recommendations; view QUERY_INSIGHTS.
- **Query Profile** — *perfil de consulta* · 4.1 — Graphical representation of a query's processing plan with statistics per operator and overall.
- **QUERY_ACCELERATION_ELIGIBLE** · 4.2 — Account Usage view listing queries that would benefit from QAS.
- **QUERY_ACCELERATION_MAX_SCALE_FACTOR** · 4.2 — Warehouse property capping QAS compute as a multiple of the warehouse size (default 8, 0 = no limit).
- **QUERY_ATTRIBUTION_HISTORY** · 4.1 — Account Usage view with compute credits attributed to each query (no idle time).
- **QUERY_HISTORY** · 4.1 — Query execution records: Account Usage view (365 days, ≤45 min latency) and Information Schema table functions (7 days).
- **QUERY_TAG** · 4.1 — Session/user/account parameter that labels queries for filtering and cost attribution.
- **Queued time** · 4.1 — Time a query waited for warehouse resources (overload or provisioning).

## R

- **RECURSIVE (FLATTEN)** · 4.4 — FLATTEN argument: TRUE expands all nested levels, e.g. to list every key name.
- **Recursive CTE** — *CTE recursiva* · 4.4 — WITH RECURSIVE cte AS (anchor UNION ALL recursive part): traverses hierarchies of unknown depth.
- **Remote Disk I/O** · 4.1 — Execution-time category: time blocked by remote disk access (reading table data or remote spilling).
- **REPEAT** · 4.4 — Scripting loop that tests its condition after the body and stops when it becomes true (runs at least once).
- **Result cache** — *caché de resultados* · 4.3 — Persisted output of queries, reused without a warehouse when the query text, data and privileges match.
- **RESULT_SCAN** · 4.3/4.4 — Table function returning a previous query's result (≤24 h) as a table; used to post-process SHOW output. Only the user who ran it.
- **RESULTSET** · 4.4 — Scripting data type holding a query result; iterate with a cursor or return with TABLE(rs).

## S

- **Scalar UDF** — *UDF escalar* · 4.4 — User-defined function returning one value per input row.
- **Scale factor** · 4.2 — See QUERY_ACCELERATION_MAX_SCALE_FACTOR: the cost cap of query acceleration.
- **Scale out** · 4.1/4.2 — Add clusters (multi-cluster) to absorb concurrency and queuing.
- **Scale up** · 4.1/4.2 — Increase warehouse size for more memory and compute per query; reduces spilling.
- **Search access path** — *ruta de acceso de búsqueda* · 4.2 — Persistent data structure of search optimization recording which micro-partitions may contain each value.
- **Search Optimization Service (SOS)** — *servicio de optimización de búsqueda* · 4.2 — Enterprise+ serverless feature that speeds up selective point lookups (equality, IN, substring, VARIANT, geospatial).
- **SEARCH_OPTIMIZATION_HISTORY** · 4.2 — Credits consumed by building and maintaining search access paths.
- **Secure UDF** · 4.4 — Function whose definition and internals are hidden from non-owners; created with CREATE SECURE FUNCTION.
- **Secure view** — *vista segura* · 4.2/4.4 — View whose definition is hidden; the Query Profile hides its internals and some optimizations are skipped.
- **SEED / REPEATABLE** · 4.4 — Sampling clause that makes a percentage sample repeatable on unchanged data; not allowed with fixed ROWS.
- **Session variable** — *variable de sesión* · 4.4 — Value set with SET name = value and referenced with $name; strings up to 256 bytes.
- **Set operators** · 4.4 — UNION, UNION ALL, INTERSECT, MINUS/EXCEPT: combine the results of queries.
- **Spilling** — *volcado a disco* · 4.1 — Writing intermediate results to local and then remote disk because they do not fit in warehouse memory.
- **SPLIT** · 4.4 — Splits a string by a delimiter and returns an ARRAY.
- **SPLIT_PART** · 4.4 — Returns one part of a split string; out-of-range part returns an empty string.
- **SPLIT_TO_TABLE** · 4.4 — Table function that splits a string and returns one row per part (SEQ, INDEX, VALUE); call with TABLE(…).
- **SQL NULL** · 4.4 — Missing/unknown value of SQL; tested with IS NULL; distinct from JSON null.
- **SQLCODE / SQLERRM / SQLSTATE** · 4.4 — Scripting variables describing the exception being handled.
- **SQLROWCOUNT / SQLID** · 4.4 — Scripting variables with the rows affected by and the query ID of the last DML statement.
- **STATEMENT_QUEUED_TIMEOUT_IN_SECONDS** · 4.1 — Cancels a statement that waits in the warehouse queue longer than this (default 0 = no limit).
- **STATEMENT_TIMEOUT_IN_SECONDS** · 4.1 — Cancels a running statement after this time (default 172800 = 2 days).
- **Stored procedure** — *procedimiento almacenado* · 4.4 — Named routine invoked with CALL that can run DDL/DML and procedural logic; owner's or caller's rights.
- **STRIP_NULL_VALUE** · 4.4 — Function converting a JSON null in a VARIANT into SQL NULL; other values pass through.
- **STRIP_NULL_VALUES** · 4.4 — File format option (JSON loading) that removes object fields containing null; not the function.
- **Structured types** ⚠️ · 4.4 — Typed ARRAY(type), OBJECT(field type, …) and MAP(key, value) columns.
- **SUBSTRING (search optimization)** · 4.2 — Search optimization method for LIKE, ILIKE, RLIKE, CONTAINS and other substring/regex predicates.
- **Synchronization** · 4.1 — Execution-time category: time spent coordinating parallel processes.
- **SYSTEM$CLUSTERING_DEPTH** · 4.2 — Returns the average clustering depth of a table for given columns.
- **SYSTEM$CLUSTERING_INFORMATION** · 4.2 — Returns JSON with clustering metrics: total partitions, constant partitions, average overlaps, average depth, depth histogram.
- **SYSTEM$ESTIMATE_QUERY_ACCELERATION** · 4.2 — Estimates whether and how much a past query would benefit from QAS.
- **SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COSTS** · 4.2 — Estimates storage and compute costs of adding search optimization.

## T

- **Table function** — *función de tabla* · 4.4 — Function returning a set of rows, used in FROM with TABLE(…): FLATTEN, SPLIT_TO_TABLE, RESULT_SCAN, GENERATOR, UDTFs.
- **TABLESAMPLE / SAMPLE** · 4.4 — Synonymous clauses that return a random subset of a table by percentage or fixed number of rows.
- **TableScan** · 4.1 — Query Profile operator for access to a single table; holds partitions scanned/total (pruning).
- **TIMESTAMP_NTZ / LTZ / TZ** · 4.4 — Timestamp variants without time zone, with local session time zone, and with stored offset.
- **TO_BOOLEAN** · 4.4 — Converts strings: true/t/yes/y/on/1 → TRUE; false/f/no/n/off/0 → FALSE (case-insensitive).
- **TO_VARIANT** · 4.4 — Converts any value to VARIANT; a JSON string stays a string (use PARSE_JSON to parse).
- **Total invocations** · 4.1 — Query Profile statistic specific to external functions: number of remote calls.
- **TRY_CAST** · 4.4 — Cast that returns NULL instead of an error when the conversion fails.
- **Type predicates** — *predicados de tipo* · 4.4 — IS_ARRAY, IS_OBJECT, IS_INTEGER, IS_DATE… test whether a VARIANT value has a given type.
- **TYPEOF** · 4.4 — Returns the type name of the value stored in a VARIANT (INTEGER, VARCHAR, OBJECT, ARRAY…).

## U

- **UDF** — *función definida por el usuario* · 4.4 — User-defined function in SQL, JavaScript, Python, Java or Scala; cannot run DML/DDL.
- **UDTF** — *función de tabla definida por el usuario* · 4.4 — User-defined table function returning rows; used in the FROM clause.
- **UNION vs UNION ALL** · 4.1/4.4 — UNION removes duplicates (extra Aggregate); UNION ALL keeps all rows and is cheaper.
- **Unload (operator)** · 4.1 — DML operator for COPY INTO a stage/location; attribute = stage location.
- **USE_CACHED_RESULT** · 4.3 — Parameter (default TRUE) that allows reuse of persisted query results; set FALSE to benchmark.

## V

- **VARCHAR** · 4.4 — Text type (STRING, TEXT); replacement for CLOB; length does not affect storage.
- **VARIANT** · 4.4 — Universal semi-structured type holding any value including OBJECT and ARRAY with native types; up to 128 MB uncompressed ⚠️.
- **VECTOR** · 4.4 — Type that stores embeddings natively, VECTOR(FLOAT|INT, dimension), for similarity search (VECTOR_COSINE_SIMILARITY…).
- **VOLATILE** · 4.4 — Default UDF property: the function may return different results for the same input.

## W

- **Warehouse cache** — *caché del warehouse* · 4.3 — Table data cached on the warehouse's local disk; lost when the warehouse is suspended, partly lost when resized down.
- **WAREHOUSE_LOAD_HISTORY** · 4.1 — Table function/view with AVG_RUNNING, AVG_QUEUED_LOAD, AVG_QUEUED_PROVISIONING and AVG_BLOCKED per interval.
- **WHILE** · 4.4 — Scripting loop that tests its condition before each iteration.
- **Window function** — *función de ventana* · 4.4 — Computes over related rows (OVER clause) while keeping one row per input row: RANK, ROW_NUMBER, LAG, running SUM.

## X

- **XMLGET** · 4.4 — Extracts an element from an XML OBJECT.
