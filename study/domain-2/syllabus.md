# Domain 2 — Account Management & Data Governance

**SnowPro Core (COF-C03) · weight 20% (~20 of 100 questions)**

This syllabus covers the three objectives used by the StudyPro bank:

| Obj. | Topic | Verified questions in the bank |
|---|---|---|
| [2.1](#21-security-model-and-access-control) | Authentication, network security, encryption, roles and privileges | 108 |
| [2.2](#22-data-governance) | Masking, row access, tags, classification, Access History, Trust Center | 45 |
| [2.3](#23-monitoring-and-cost-management) | Billing model, resource monitors, budgets, usage views | 51 |

How to use it:

- **Bold terms** are the exact English keywords the exam uses. Learn them as written.
- 2.1 is the objective with the **most questions in the whole bank**: roles, privileges and `SHOW GRANTS` appear constantly. Learn the tables in 2.1.6–2.1.10 by heart.
- Every section ends with **Exam traps** and the last section is a **rapid-fire self-test**.
- ⚠️ marks facts that change often (MFA rollout, new policy types, product names). Choose the answer that describes *behavior*.

---

## 2.1 Security model and access control

### 2.1.1 Authentication vs authorization

- **Authentication** = proving **who** you are (password, MFA, SSO, key pair, OAuth…).
- **Authorization** = deciding **what** you can do (roles, privileges, ownership).
- MFA, SSO and network policies **never grant privileges**. Grants never authenticate anyone.

### 2.1.2 Authentication methods

| Method | Key facts |
|---|---|
| **Password** | Governed by **password policies** (length, complexity, age, retries). `MUST_CHANGE_PASSWORD = TRUE` forces a change at first login. |
| **Multi-factor authentication (MFA)** | **Built into Snowflake**; no extra licence. Methods: **Duo** (push/passcode), **passkeys**, **authenticator apps (TOTP)** ⚠️. Users **enroll** themselves; enrollment ≠ enforcement. Works **with or without SSO**. Supported by **Snowsight, SnowSQL, JDBC, ODBC, Python connector** and other clients. ⚠️ Snowflake is rolling out **mandatory MFA for human users who sign in with a password**. |
| **MFA token caching** | Account parameter **`ALLOW_CLIENT_MFA_CACHING`** (set at **account** level). A cached token is valid for up to **4 hours**. |
| **Federated authentication / SSO** | Users authenticate with an external **identity provider (IdP)** using **SAML 2.0** (Okta, Microsoft Entra ID/ADFS, …). Snowflake acts as the **service provider (SP)**. Configured with **`CREATE SECURITY INTEGRATION ... TYPE = SAML2`**. Enables two workflows: **logging into** and **logging out of** Snowflake. Available in **all editions**. Snowflake does **not** receive or store the IdP password. |
| **OAuth** | Token-based access for apps/tools. **Snowflake OAuth** or **External OAuth** (Okta, Entra ID, PingFederate…). Configured with a **security integration** (`TYPE = OAUTH` / `EXTERNAL_OAUTH`). |
| **Key-pair authentication** | RSA key pair (min. 2048-bit). Public key assigned with `ALTER USER u SET RSA_PUBLIC_KEY = 'MIIBIjANBg...'` — **the key body without the `-----BEGIN/END PUBLIC KEY-----` delimiters**. `RSA_PUBLIC_KEY_2` allows **rotation** without downtime. Private key stays with the client (optionally passphrase-protected). Used by **SnowSQL, Snowflake CLI, Python connector, JDBC, ODBC, Kafka/Spark connectors** — not Snowsight. |
| **Programmatic access tokens** ⚠️ | Tokens generated for a user to authenticate tools/scripts. |
| **Workload identity federation** ⚠️ | Services in AWS/Azure/GCP authenticate with their cloud identity, no stored secret. |

**User types** (`TYPE` property):

- **PERSON** (human, default): can use password + MFA, SSO…
- **SERVICE**: for **unattended applications**; **cannot use a password** (nor MFA); use **key-pair**, OAuth or workload identity.
- **LEGACY_SERVICE** ⚠️: deprecated transitional type that still allows passwords.

**Policies that control sign-in** (schema-level objects, assigned to the account or users):

| Policy | Controls |
|---|---|
| **Authentication policy** | **Which authentication methods** (password, SAML, OAuth, key pair…), clients and MFA requirements users may use. |
| **Password policy** | Password complexity, length, age, lockout. |
| **Session policy** | **Idle session timeout** (Snowsight and clients). |
| **Network policy** | **Which IPs / network identifiers** can connect (see 2.1.4). |

**SCIM** (System for Cross-domain Identity Management):

- Lets the IdP **provision and manage users and groups** in Snowflake; groups become **roles**. Configured with a **security integration** (`TYPE = SCIM`).
- SCIM does **not** authenticate users and does not manage network/session policies.
- Audit SCIM API requests with the table function **`REST_EVENT_HISTORY`**.

**Login auditing**:

- **`SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY`**: every login attempt, **user, client IP, client type, success/failure, error** — **365 days**.
- `INFORMATION_SCHEMA.LOGIN_HISTORY()` table function: last **7 days**.

### 2.1.3 Encryption

- **All data is encrypted, always, in every edition**: **at rest** (**AES-256**) and **in transit** (**TLS 1.2+**). No configuration needed — part of **Continuous Data Protection**.
- **Hierarchical key model** (keys stored in a cloud **HSM**): **root key → account master keys → table master keys → file keys**. Each level encrypts the level below, limiting the scope of each key.
- **Key rotation** (automatic, **all editions**): active keys are retired and replaced when they are **more than 30 days old**. Retired keys are only used to decrypt.
- **Periodic rekeying** (**Enterprise+**, opt-in with `PERIODIC_DATA_REKEYING`): data encrypted with a key **older than 1 year** is **re-encrypted** with a new key; the old key is destroyed.
- **Tri-Secret Secure** (**Business Critical+**): a **customer-managed key** (in the cloud provider's KMS) + a **Snowflake-managed key** form a **composite master key**. Revoking the customer key makes the data unreadable.
- Stages: internal stage files are encrypted automatically; **client-side encryption** is supported for external stages.

### 2.1.4 Network security

#### Network policies

- Restrict **inbound access** to Snowflake by **IP address / network identifier**. Available in **all editions**.
- Contents: **`ALLOWED_IP_LIST`** and **`BLOCKED_IP_LIST`** (legacy style), or **`ALLOWED_NETWORK_RULE_LIST` / `BLOCKED_NETWORK_RULE_LIST`** referencing **network rules** (modern style: IPv4 ranges, VPC endpoint IDs, private link IDs).
- **An IP in both lists is blocked** (block wins). If an allowed list exists, every IP not in it is blocked.
- Can be activated for the **account**, a **user**, or a **security integration** — **never** for roles, databases or warehouses.
- **Only one** network policy per account, per user and per integration at a time.
- **Precedence: most specific wins** → **security integration > user > account**. A user-level policy **overrides** (doesn't merge with) the account policy.
- Who:
  - **Create**: **SECURITYADMIN** or higher, or a role with the global **`CREATE NETWORK POLICY`** privilege (by default only SECURITYADMIN, and ACCOUNTADMIN through inheritance).
  - **Activate for the account**: `ALTER ACCOUNT SET NETWORK_POLICY = p;` — best practice **SECURITYADMIN**.
  - **Activate for a user**: a role with **OWNERSHIP on the user + USAGE on the network policy** (or higher).
- If a policy is activated for a user who is **already logged in** from a now-disallowed IP, the user **cannot execute further queries**.
- **`MINS_TO_BYPASS_NETWORK_POLICY`**: **user** property for a temporary bypass that **only Snowflake Support can set** (you can view it with `DESCRIBE USER`).
- Commands: `CREATE NETWORK POLICY`, `ALTER NETWORK POLICY`, **`SHOW NETWORK POLICIES`** (list), **`DESCRIBE NETWORK POLICY`** (see allowed/blocked lists).

```sql
CREATE NETWORK POLICY corp_only
  ALLOWED_IP_LIST = ('192.168.1.0/24')
  BLOCKED_IP_LIST = ('192.168.1.99');
ALTER ACCOUNT SET NETWORK_POLICY = corp_only;   -- account level
ALTER USER etl_svc SET NETWORK_POLICY = etl_ips; -- user level, overrides
```

#### Private connectivity

- **AWS PrivateLink**, **Azure Private Link**, **Google Cloud Private Service Connect**: a **direct, private connection to Snowflake that does not traverse the public internet**. **Business Critical+**.
- To connect an **on-premises data center**, combine it with **AWS Direct Connect** / Azure ExpressRoute.

### 2.1.5 Access control models

Snowflake combines:

| Model | Idea |
|---|---|
| **Discretionary Access Control (DAC)** | **Each object has an owner** (a role) who can grant access to it. |
| **Role-Based Access Control (RBAC)** | **Privileges are granted to roles**, and **roles are granted to users** (and to other roles). |
| **User-Based Access Control (UBAC)** ⚠️ | Privileges granted **directly to users** in documented cases (e.g. Streamlit/notebook scenarios). |

Key concepts:

- **Securable object**: an entity to which access can be granted (database, table, warehouse…). **Default access: none** until granted.
- **Privilege**: a **defined level of access** to an object (SELECT, USAGE, OPERATE…).
- **Role**: entity that receives privileges and is granted to users or other roles.
- **User**: identity (person or program).
- **Ownership**: every object is owned by **a role, not a user** — by default **the primary role that created it**. Owning grants full control (OWNERSHIP privilege).
- Object hierarchy matters: to use an object you need privileges on its **containers** too.

### 2.1.6 System-defined roles

```
                  ORGADMIN  (organization level, separate)
                  ACCOUNTADMIN
                  /          \
          SECURITYADMIN     SYSADMIN
               |              |   \
           USERADMIN     custom roles…
                \            /
                    PUBLIC  (granted to every user and role)
```

| Role | Purpose / default powers |
|---|---|
| **ORGADMIN** ⚠️ | **Organization** level: **create accounts**, view accounts and **usage across the organization**, enable replication. Cannot read the data inside accounts. (Moving to **GLOBALORGADMIN** in an organization account.) |
| **ACCOUNTADMIN** | **Top-level role of the account**: encapsulates **SYSADMIN + SECURITYADMIN**. Account parameters, **billing and usage**, **resource monitors** (only role that can create them by default), reader accounts. |
| **SECURITYADMIN** | **`MANAGE GRANTS` globally** (grant/revoke any privilege), **inherits USERADMIN**, creates and activates **network policies**. |
| **USERADMIN** | **User and role management**: `CREATE USER`, `CREATE ROLE`. Owns the users/roles it creates. |
| **SYSADMIN** | **Warehouses, databases and all database objects** (schemas, tables, views…). **All custom roles should roll up to SYSADMIN.** |
| **PUBLIC** | Automatically granted to every user and every role. Objects owned by PUBLIC are accessible to everyone. |

- System-defined roles **cannot be dropped**, and the privileges Snowflake grants them **cannot be revoked**.
- **Need extra privileges for an admin task?** Grant them to a **custom role**, not to system roles.

**ACCOUNTADMIN best practices**:

- Assign it to **at least two users**, but **as few as possible**.
- Require **MFA** for every ACCOUNTADMIN user.
- **Never** make it a user's **default role**; don't use it to create objects or for daily work.
- The first ACCOUNTADMIN user should create at least one user with **USERADMIN** to handle user management.

**SNOWFLAKE database roles** (read access to ACCOUNT_USAGE by topic): **OBJECT_VIEWER** (object metadata), **USAGE_VIEWER** (usage/cost), **GOVERNANCE_VIEWER** (**policies**, tags, access history), **SECURITY_VIEWER** (security info). Alternative to granting `IMPORTED PRIVILEGES` on the whole SNOWFLAKE database.

### 2.1.7 Role hierarchy, custom roles, database roles

- **Hierarchy is created by granting a role to another role**: `GRANT ROLE analyst TO ROLE lead;` → **lead inherits analyst's privileges**. Privileges flow **upwards**, never down, and not between siblings.
- Granting a role **to a user** gives membership; it doesn't build hierarchy.
- **Custom roles**:
  - Created by **USERADMIN** (or any role with **`CREATE ROLE`**). The **creating role owns** the new role.
  - Best practice: build a hierarchy aligned with business functions and **grant its top to SYSADMIN** (so SYSADMIN can manage everything). **Not** directly to ACCOUNTADMIN.
- **Dropping a role**: ownership of the objects it owned **transfers to the role that executed `DROP ROLE`** (not to SYSADMIN, not to a user).
- **Database roles**: defined **inside a database** (`CREATE DATABASE ROLE db.r`), privileges limited to that database. Granted to **account roles** (or other database roles of the same database). **Cannot be activated directly** in a session (`USE ROLE` doesn't work for them). Ideal to package privileges for **data sharing** and apps.
- **Instance roles / application roles**: roles inside Native Apps or class instances ⚠️.

### 2.1.8 Primary and secondary roles

- **Primary role**: the session's active role — `USE ROLE reporting_role;` Its privileges authorize **CREATE** statements, and it **owns** what is created.
- **Secondary roles**: `USE SECONDARY ROLES ALL;` activates all other granted roles; `USE SECONDARY ROLES NONE;` disables them (also a list of roles). Their privileges are added for **every other** operation (SELECT, INSERT…).
- In **Snowsight**, what you can see and do = **primary role + active secondary roles**.
- `DEFAULT_SECONDARY_ROLES` user property ⚠️ (default `('ALL')` for new users).

### 2.1.9 Privileges

**Global (account-level) privileges** — granted `ON ACCOUNT`:

| Privilege | Allows |
|---|---|
| `CREATE DATABASE`, `CREATE WAREHOUSE` | Create those objects (SYSADMIN) |
| `CREATE USER`, `CREATE ROLE` | User/role management (USERADMIN) |
| **`MANAGE GRANTS`** | Grant/revoke privileges on **any** object (SECURITYADMIN). **Global only.** |
| **`MANAGE WAREHOUSES`** | Equivalent to **MODIFY + MONITOR + OPERATE on all warehouses** (not USAGE). |
| **`MONITOR USAGE`** | View **usage and billing** information (lets non-ACCOUNTADMIN roles see consumption). |
| `CREATE NETWORK POLICY` | Create network policies (SECURITYADMIN) |
| `EXECUTE TASK` / `EXECUTE MANAGED TASK` | Run (serverless) tasks owned by the role |
| `APPLY MASKING POLICY`, `APPLY ROW ACCESS POLICY`, `APPLY TAG` | Set/unset those policies/tags on any object (governance) |
| `CREATE SHARE`, `IMPORT SHARE` | Data sharing (Domain 5) |

**Object privileges** (most asked):

| Object | Privileges |
|---|---|
| **Warehouse** | **USAGE** (run queries), **OPERATE** (start/**resume**/suspend, **abort queries**), **MODIFY** (alter properties, **resize**, assign resource monitor), **MONITOR** (view usage, **load statistics/charts**), OWNERSHIP |
| **Database / Schema** | **USAGE** (required to access anything inside), `CREATE SCHEMA` (db), `CREATE TABLE`, `CREATE VIEW`, `CREATE MATERIALIZED VIEW`, `CREATE TASK`, `CREATE STAGE`… (schema), `ADD SEARCH OPTIMIZATION` (schema), MODIFY, MONITOR, OWNERSHIP |
| **Table** | SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, OWNERSHIP |
| **View** | SELECT, REFERENCES, OWNERSHIP |
| **Stage** | Internal: **READ**, **WRITE**; external: **USAGE** |
| **Pipe** | **OPERATE** (**pause/resume**), MONITOR, OWNERSHIP |
| **Task** | **OPERATE** (**suspend/resume**), MONITOR, OWNERSHIP |
| **UDF / stored procedure** | **USAGE** (call it), OWNERSHIP |
| **Resource monitor** | **MONITOR** (view), **MODIFY** (change), OWNERSHIP |
| **Masking / row access policy, tag** | **APPLY**, OWNERSHIP |
| **Network policy** | USAGE (to activate for a user), OWNERSHIP |

**Minimum chain to query a table**: `USAGE` on the **database** + `USAGE` on the **schema** + `SELECT` on the **table** + `USAGE` on a **warehouse**.

Special cases worth remembering:

- **Create a task**: `CREATE TASK` on the schema (+ USAGE on db/schema); running it needs **`EXECUTE TASK`** on the account (+ `EXECUTE MANAGED TASK` for serverless).
- **Create a materialized view**: `CREATE MATERIALIZED VIEW` on the schema + USAGE on database and schema.
- **Add/remove search optimization**: **OWNERSHIP of the table + `ADD SEARCH OPTIMIZATION` on the schema**.

### 2.1.10 GRANT, REVOKE and SHOW GRANTS

```sql
GRANT USAGE ON DATABASE db1 TO ROLE analyst;
GRANT USAGE ON SCHEMA db1.sales TO ROLE analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA db1.sales TO ROLE analyst;    -- existing
GRANT SELECT ON FUTURE TABLES IN SCHEMA db1.sales TO ROLE analyst; -- created later
GRANT ROLE analyst TO USER jdoe;
GRANT ROLE analyst TO ROLE sysadmin;          -- hierarchy
GRANT OWNERSHIP ON TABLE t TO ROLE r COPY CURRENT GRANTS;
REVOKE ROLE analyst FROM USER jdoe;           -- removes a role grant
```

- **`ON ALL`** = objects that **exist now**; **`ON FUTURE`** = objects **created later**. You usually need **both**. Database-level forms (`IN DATABASE`) also exist but grant more broadly. If both schema-level and database-level future grants exist, **schema-level wins**.
- `USE ROLE` / `USE SECONDARY ROLES` only change what's active; they don't remove grants (`REVOKE` does).

| Command | Shows |
|---|---|
| **`SHOW GRANTS TO ROLE r`** | **Privileges and roles granted to** role r |
| **`SHOW GRANTS TO USER u`** | **Roles granted to** user u |
| **`SHOW GRANTS OF ROLE r`** | **Users and roles that have been granted** role r |
| **`SHOW GRANTS ON <object>`** | All privileges granted **on** that object (e.g. `ON SCHEMA db.s`) |
| `SHOW FUTURE GRANTS IN SCHEMA s` | Future grants defined in a schema |

Memory hook: **TO** = what it *received*; **OF** = who *received it*; **ON** = what's granted *on the object*.

### 2.1.11 Managed access schemas

- `CREATE SCHEMA app WITH MANAGED ACCESS;`
- **Object owners lose the ability to grant** access on their objects: only the **schema owner** or a role with **`MANAGE GRANTS`** can grant privileges on objects in the schema → **centralized privilege management**.
- Ownership itself doesn't change: a table created there is still owned by the role that created it.

### 2.1.12 User management

```sql
CREATE USER jdoe
  PASSWORD = '…' MUST_CHANGE_PASSWORD = TRUE
  DEFAULT_ROLE = analyst DEFAULT_WAREHOUSE = wh_bi
  DEFAULT_NAMESPACE = db1.sales TYPE = PERSON;
GRANT ROLE analyst TO USER jdoe;   -- the default role must also be granted
```

- Best practices: **force a password change** at first login, **set a default role** (never ACCOUNTADMIN), use **SERVICE** users for automation.
- `SHOW USERS`, `DESCRIBE USER`, `ALTER USER` (e.g. `SET DISABLED = TRUE`, unlock), `DROP USER` — performed by USERADMIN/SECURITYADMIN (or the user's owner) and inherited by ACCOUNTADMIN.

### 2.1.13 Exam traps — 2.1

- ❌ "Objects are owned by the user who created them" → ✅ by the **role** (primary role) that created them.
- ❌ "Custom roles should be granted to ACCOUNTADMIN" → ✅ roll up to **SYSADMIN**.
- ❌ "Add privileges to system roles" → ✅ use a **custom role**.
- ❌ "SYSADMIN creates users" → ✅ **USERADMIN** (and SECURITYADMIN through inheritance).
- ❌ "USERADMIN manages grants globally" → ✅ **SECURITYADMIN** (`MANAGE GRANTS`).
- ❌ "After DROP ROLE, its objects go to SYSADMIN" → ✅ to the role that **executed** the drop.
- ❌ "Privileges flow down to child roles" → ✅ **up** to parent roles.
- ❌ "Network policies can be applied to roles/warehouses" → ✅ **account, user, security integration**.
- ❌ "Account and user network policies are combined" → ✅ the **user** policy **overrides**.
- ❌ "An IP in allowed and blocked lists is allowed" → ✅ **blocked**.
- ❌ "Network policies require Business Critical" → ✅ **all editions** (PrivateLink is Business Critical).
- ❌ "SECURITYADMIN can set `MINS_TO_BYPASS_NETWORK_POLICY`" → ✅ **only Snowflake Support**.
- ❌ "MFA requires SSO" / "SSO imports passwords into Snowflake" → ✅ both false.
- ❌ "SCIM / TLS / OCSP are login methods" → ✅ login methods: password, MFA, federated/SSO, OAuth, key pair.
- ❌ "Paste the full PEM including BEGIN/END lines into RSA_PUBLIC_KEY" → ✅ **without delimiters**.
- ❌ "SHOW GRANTS TO ROLE shows who has the role" → ✅ that's **OF ROLE**.
- ❌ "OPERATE lets you resize" → ✅ **MODIFY** resizes; **OPERATE** resumes/suspends/aborts; **MONITOR** sees load.
- ❌ "Key rotation requires Enterprise" → ✅ rotation (30 days) is **all editions**; **periodic rekeying** (1 year) is **Enterprise**.
- ❌ "A table owner in a managed access schema can grant SELECT on it" → ✅ only schema owner / MANAGE GRANTS.
- ❌ "Database roles can be activated with USE ROLE" → ✅ they are granted to account roles.

---

## 2.2 Data governance

### 2.2.1 Overview

Governance in Snowflake (umbrella name **Snowflake Horizon** ⚠️) = knowing **what** data you have, **who** can see **which** parts of it, and **who** accessed it.

| Need | Feature | Edition |
|---|---|---|
| Hide / partially show **column values** by role | **Dynamic Data Masking** (masking policies) | Enterprise |
| Replace values with tokens **before loading** | **External Tokenization** | Enterprise |
| Show only **some rows** per role | **Row access policies** | Enterprise |
| Label objects for tracking, cost, protection | **Object tagging** | Enterprise |
| **Find** sensitive data automatically | **Sensitive data classification** | Enterprise |
| Audit **who read/wrote which objects/columns** | **Access History** (`ACCESS_HISTORY`) | Enterprise |
| Allow only aggregates / block columns in output | **Aggregation** / **projection policies** ⚠️ | Enterprise |
| Differential privacy | **Privacy policies** ⚠️ | Enterprise |
| Hide view definitions and internals | **Secure views / secure UDFs** | All |
| Detect security risks in the account | **Trust Center** | All ⚠️ |

**Column-level security** = **Dynamic Data Masking + External Tokenization**. **Row-level security** = **row access policies**.

### 2.2.2 Dynamic Data Masking

- A **masking policy** is a **schema-level object** that decides, **at query time**, what value a user sees in a column (full, partial, masked, NULL…). Data in storage is **not changed**.
- Applied to **columns** of **tables, views, materialized views and external tables** (including the `VALUE` column and virtual columns of external tables). Not to streams, pipes or procedures.
- **One masking policy per column**; the same policy can be reused on many columns.

```sql
CREATE MASKING POLICY email_mask AS (val STRING) RETURNS STRING ->
  CASE WHEN IS_ROLE_IN_SESSION('PII_READER') THEN val
       ELSE REGEXP_REPLACE(val, '.+@', '*****@') END;

ALTER TABLE user_info MODIFY COLUMN email SET MASKING POLICY email_mask;
ALTER TABLE user_info MODIFY COLUMN email UNSET MASKING POLICY;
SELECT GET_DDL('POLICY', 'email_mask');          -- see the CREATE definition
```

- **Conditional masking**: the policy receives **additional column arguments**, so the result can depend on **another column's value** (e.g. mask email unless `visibility = 'public'`).
- Privileges:
  - `CREATE MASKING POLICY` on the **schema** to create.
  - To set/unset on a column: global **`APPLY MASKING POLICY`**, or **`APPLY` on the policy** (plus ownership of the table/view).
  - **Owning the table is not enough** to unset or change a masking policy → the table owner keeps seeing masked data. This **separation of duties** is the point.
- Management approaches: **centralized** (security team owns and applies policies) or **hybrid/decentralized**.
- Inventory views: `ACCOUNT_USAGE.MASKING_POLICIES` (definitions) and **`POLICY_REFERENCES`** (which columns use which policy).

### 2.2.3 External Tokenization

- Sensitive values are **tokenized before loading** into Snowflake by a third-party **tokenization provider**.
- At query time a **masking policy** calls an **external function** to **detokenize** for authorized roles.
- Part of column-level security; Enterprise+.

### 2.2.4 Tag-based masking

- Assign masking policies **to a tag**; every column with that tag is protected automatically.
- A tag can have **one masking policy per data type** (e.g. one for STRING, one for NUMBER).
- While a policy is assigned to a tag, neither can be dropped.

### 2.2.5 Row access policies

- Schema-level object that returns **BOOLEAN** for each row → rows where it's FALSE are **filtered out** for that user. Often uses a **mapping table** (role ↔ allowed region).

```sql
CREATE ROW ACCESS POLICY region_rap AS (region VARCHAR) RETURNS BOOLEAN ->
  IS_ROLE_IN_SESSION('GLOBAL_SALES')
  OR EXISTS (SELECT 1 FROM security.region_map m
             WHERE m.role_name = CURRENT_ROLE() AND m.region = region);

CREATE TABLE sales (...) WITH ROW ACCESS POLICY region_rap ON (region);   -- at creation
ALTER TABLE sales ADD ROW ACCESS POLICY region_rap ON (region);            -- afterwards
ALTER TABLE sales DROP ROW ACCESS POLICY region_rap;
```

- **One row access policy per table/view**.
- If a table has both, the **row access policy is evaluated first**, then masking policies.
- Privileges: `CREATE ROW ACCESS POLICY` on schema; global `APPLY ROW ACCESS POLICY` or `APPLY` on the policy.
- View: `ACCOUNT_USAGE.ROW_ACCESS_POLICIES`.

### 2.2.6 Secure views and secure UDFs

- `CREATE SECURE VIEW` / `CREATE SECURE MATERIALIZED VIEW` / `CREATE SECURE FUNCTION` — the **`SECURE` modifier** is supported by **views, materialized views and UDFs** (and procedures).
- The **definition** is visible only to users granted the **role that owns** the view (`GET_DDL`, `SHOW VIEWS`). Roles with `IMPORTED PRIVILEGES` on SNOWFLAKE / **OBJECT_VIEWER** / ACCOUNTADMIN can read definitions in `ACCOUNT_USAGE.VIEWS`.
- Disables optimizations that could leak data. `IS_SECURE` column flags them.

### 2.2.7 Object tagging

- A **tag** is a **schema-level object**; assigning it to an object sets a **string value** (key = value), optionally restricted with `ALLOWED_VALUES`.
- Can be assigned to almost anything: **warehouses, databases, schemas, tables, views, columns, users, roles**…
- **Inheritance**: a tag on a parent flows down the hierarchy (**database → schema → table → column**) unless overridden.
- Uses: track **sensitive data** (compliance, discovery, protection), **cost attribution** (tag warehouses by cost center), **tag-based masking**.
- DDL: `CREATE TAG`, **`ALTER TAG`**, **`DROP TAG`**, `UNDROP TAG`, `SHOW TAGS`. Assign with `ALTER TABLE t SET TAG cost_center = 'finance';` / `ALTER TABLE t MODIFY COLUMN c SET TAG pii = 'email';`
- Read: `SYSTEM$GET_TAG(...)`, `ACCOUNT_USAGE.TAG_REFERENCES`, `INFORMATION_SCHEMA.TAG_REFERENCES()`.
- Privileges: `CREATE TAG` on schema; global **`APPLY TAG`** or `APPLY` on the tag.
- A tag is **metadata**: by itself it does **not** grant or deny access.

### 2.2.8 Sensitive data classification

- **Automatically discovers sensitive data** (names, emails, national IDs, phone numbers…) in columns and suggests/applies **system tags**:
  - **`SNOWFLAKE.CORE.SEMANTIC_CATEGORY`** (e.g. NAME, EMAIL, US_SSN),
  - **`SNOWFLAKE.CORE.PRIVACY_CATEGORY`**: **IDENTIFIER**, **QUASI_IDENTIFIER**, **SENSITIVE**.
- Run manually (`SYSTEM$CLASSIFY` ⚠️) or **automatically** with a **classification profile** on a database ⚠️.
- **Enterprise+**. Works on most data types (VARCHAR, NUMBER, FLOAT, DATE…) but **not** BINARY, GEOGRAPHY, VECTOR, UUID, DECFLOAT; for semi-structured only JSON-like content ⚠️.
- Classification **finds** data; masking/row access policies **protect** it.

### 2.2.9 Access History

- View **`SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY`** — **Enterprise+**, **365 days** retention, latency up to **3 hours**.
- Records for each query: **user**, query ID, time, **objects and columns read** (`DIRECT_OBJECTS_ACCESSED`, `BASE_OBJECTS_ACCESSED`) and **objects modified** by writes (`OBJECTS_MODIFIED`), including **column lineage** (how data flowed **from source to target** columns in a write).
- Documented benefits:
  - **Data discovery** — find **unused data** to archive or delete.
  - Track **how sensitive data moves**.
  - **Compliance auditing** — identify **who performed a write** on a table or stage **and when**.
- It does **not** contain login IPs (→ `LOGIN_HISTORY`), loads (→ `COPY_HISTORY`), or grants (→ `GRANTS_TO_USERS`).
- **Data lineage** in Snowsight ⚠️ shows upstream/downstream dependencies for **impact analysis**; `OBJECT_DEPENDENCIES` view lists object references.

### 2.2.10 Trust Center, alerts and notifications

- **Trust Center**: evaluates the account's **security posture** with **scanner packages** (e.g. **CIS Benchmarks**, Security Essentials, Threat Intelligence ⚠️) and reports **findings** with **recommended remediation** (overly privileged roles, users without MFA, missing network policies…). A finding must be **investigated and remediated**; detection is not remediation.
- **Alerts**: schema object that **evaluates a condition on a schedule** and **runs an action** when it's true.
  ```sql
  CREATE ALERT big_spend WAREHOUSE = wh_admin SCHEDULE = '60 MINUTE'
    IF (EXISTS (SELECT 1 FROM ... WHERE credits > 100))
    THEN CALL SYSTEM$SEND_EMAIL('ops_email', 'ops@corp.com', 'Alert', 'High spend');
  ```
- **Notification integration**: account-level object describing **how notifications reach a destination** (email, cloud queue like SNS/Event Grid/PubSub, webhook).

### 2.2.11 Continuous Data Protection (CDP)

Set of features that protect data across its lifecycle: **encryption**, **network policies**, **access control**, **Time Travel**, **Fail-safe**, replication… Those working **with no configuration**: **encryption** and **Time Travel** (default 1 day) — and **Fail-safe** for permanent tables. Masking, row access policies and tokenization need to be created and assigned.

### 2.2.12 Exam traps — 2.2

- ❌ "Row access policies hide column values" → ✅ they filter **rows**; **masking** hides values.
- ❌ "Masking changes stored data" → ✅ applied **at query time**.
- ❌ "Table owner can unset a masking policy" → ✅ needs **APPLY** / policy ownership.
- ❌ "Masking policies apply to streams/pipes/procedures" → ✅ tables, views, **materialized views**, external tables.
- ❌ "Masking policies are database- or account-level objects" → ✅ **schema-level**.
- ❌ "ALTER MASKING POLICY attaches the policy" → ✅ `ALTER TABLE … MODIFY COLUMN … SET MASKING POLICY`.
- ❌ "See a policy's definition with DESCRIBE/SHOW" → ✅ **`GET_DDL`** returns the CREATE statement.
- ❌ "Column-level security = masking + row access" → ✅ **masking + external tokenization**.
- ❌ "A tag can have several masking policies for STRING" → ✅ **one per data type**.
- ❌ "Classification protects data" → ✅ it **discovers**; policies protect.
- ❌ "ACCESS_HISTORY has the client IP / is available in Standard / keeps 90 days" → ✅ no IP, **Enterprise**, **365 days**.
- ❌ "LOGIN_HISTORY shows which tables were read" → ✅ **ACCESS_HISTORY**.
- ❌ "Policy inventory: QUERY_HISTORY" → ✅ **MASKING_POLICIES** + **POLICY_REFERENCES**.
- ❌ "Snowflake rotates keys every year" → ✅ rotation > **30 days**; rekeying > **1 year** (Enterprise).
- "Read policy-related ACCOUNT_USAGE views without full imported privileges" → **GOVERNANCE_VIEWER**.

---

## 2.3 Monitoring and cost management

### 2.3.1 What you pay for

| Category | Billed as |
|---|---|
| **Virtual warehouse compute** | **Credits** = size rate × **running clusters** × **running time**, **per second** with a **60-second minimum** each time it starts/resumes (and for added clusters/resize up). Suspended = 0. |
| **Serverless compute** | Credits **per second** × a **size Snowflake chooses automatically** (no warehouse to pick, no 60-s minimum): Snowpipe, Automatic Clustering, MV maintenance, Search Optimization, serverless tasks, QAS, replication, etc. |
| **Snowpipe** ⚠️ | Current model: **volume-based, credits per GB** ingested (uncompressed size for text files). |
| **Cloud services** | Only the part of **daily** cloud services usage **exceeding 10% of daily warehouse credits** (the **daily adjustment**). |
| **Storage** | **Average daily compressed bytes** per month, flat **rate per TB** that depends on **region** and **purchase model** (**On-Demand** vs **Capacity**). Includes active data, **Time Travel**, **Fail-safe**, **internal stages**, clones' unique data. |
| **Data transfer** | **Egress** to another **region or cloud** (replication, unloading, external functions…). **Ingress is free**; same-region transfer generally free. |
| AI services ⚠️ | Tokens / service-specific units. |

#### Billing calculations (practice these!)

- Runs 30 s, suspended → billed **60 s**.
- Runs 61 s, stops, restarts, runs 30 s → 61 + 60 = **121 s**.
- Runs 90 s, stops, restarts, runs 30 s → 90 + 60 = **150 s**.
- Query 3 min + 10 min idle until auto-suspend + new resume for a 10-s query (manually suspended) → 3 + 10 + 1 = **14 min**.
- Cloud services: 50 warehouse credits → allowance **5**; cloud services 10 → **5 billed**. 200 → allowance 20; 26 used → **6 billed**. 100 → allowance 10; 9 used → **0 billed**.

#### Storage facts

- You keep paying for deleted data **until it leaves Fail-safe** (Time Travel + 7 days).
- **Transient/temporary** tables eliminate **Fail-safe** storage cost (not active or Time Travel storage).
- **Fail-safe costs apply only to permanent tables**.
- **No premium for semi-structured data** — storage is just bytes.
- **External stages**: files are stored and billed by **your cloud provider**, not Snowflake. Internal stages count as Snowflake storage.
- Clones share micro-partitions; data deleted from a source but still referenced by a clone appears as **`RETAINED_FOR_CLONE_BYTES`**.
- DDL that only touches metadata (e.g. `CREATE TABLE ... LIKE`, which copies structure without rows) **uses no warehouse and no storage** — at most cloud services.

### 2.3.2 Resource monitors

- Object that **tracks credit usage of user-managed warehouses** and acts at thresholds. Only **ACCOUNTADMIN can create** them (by default).
- Properties: **`CREDIT_QUOTA`**, **`FREQUENCY`** (DAILY, WEEKLY, MONTHLY, YEARLY, NEVER), `START_TIMESTAMP`, `END_TIMESTAMP`, **triggers**.
- **Trigger actions** at a % of quota:

| Action | Effect |
|---|---|
| **NOTIFY** | Send notification only |
| **SUSPEND** (Notify & Suspend) | Suspend the warehouses **after running statements finish** |
| **SUSPEND_IMMEDIATE** (Notify & Suspend Immediately) | Suspend and **cancel running statements** |

```sql
CREATE RESOURCE MONITOR rm_bi WITH CREDIT_QUOTA = 100 FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATELY
  TRIGGERS ON 75 PERCENT DO NOTIFY
           ON 100 PERCENT DO SUSPEND
           ON 110 PERCENT DO SUSPEND_IMMEDIATE;
ALTER WAREHOUSE wh_bi SET RESOURCE_MONITOR = rm_bi;   -- warehouse level
ALTER ACCOUNT SET RESOURCE_MONITOR = rm_account;     -- account level
```

- Levels: **account** (only **one** account-level monitor) and **warehouse** (each warehouse can be assigned to **only one** monitor; one monitor can control **many** warehouses). Not databases, schemas or users.
- Both an account monitor and a warehouse monitor can affect the same warehouse.
- **They do not control serverless features** (Snowpipe, clustering, serverless tasks…) — not a universal spending cap. Use **budgets** for those.
- Privileges for other roles: **MONITOR** (view) and **MODIFY** (change).
- Thresholds are checked periodically — not a hard real-time guarantee; with SUSPEND, running queries may push usage slightly over.
- Views: `ACCOUNT_USAGE.RESOURCE_MONITORS` and `READER_ACCOUNT_USAGE.RESOURCE_MONITORS` (for **reader accounts** of a provider).

### 2.3.3 Budgets ⚠️

- Define a **monthly spending limit (in credits)** and **notify** (email, cloud queue, webhook) when spending is projected to exceed it.
- **Account budget** (whole account) and **custom budgets** (a group of objects or a **tag**).
- Unlike resource monitors, budgets cover **serverless features** too, but they **notify**, they don't suspend warehouses by themselves.

### 2.3.4 Where to look: usage views and functions

**`SNOWFLAKE.ACCOUNT_USAGE`** (365 days, 45 min–3 h latency, includes dropped objects):

| View | Use it for |
|---|---|
| **`METERING_HISTORY`** | **Hourly credit usage for the account**, by service type (warehouses, serverless, cloud services) |
| `METERING_DAILY_HISTORY` | Daily credits **including the cloud services adjustment** (what's billed) |
| **`WAREHOUSE_METERING_HISTORY`** | **Hourly credits per warehouse** |
| `WAREHOUSE_LOAD_HISTORY` | Running/queued load per warehouse (sizing decisions) |
| `WAREHOUSE_EVENTS_HISTORY` | Warehouse resume/suspend/resize events |
| **`QUERY_HISTORY`** | Every query (365 days) |
| `QUERY_ATTRIBUTION_HISTORY` ⚠️ | Compute cost attributed to each query |
| **`LOGIN_HISTORY`** | Logins, **IP**, success/failure |
| **`ACCESS_HISTORY`** | Objects/columns read and written (Enterprise) |
| `STORAGE_USAGE` | Daily **account** storage totals (tables, stages, Fail-safe) |
| `DATABASE_STORAGE_USAGE_HISTORY` | Daily storage **per database** |
| **`STAGE_STORAGE_USAGE_HISTORY`** | Daily storage of **internal stages** |
| **`TABLE_STORAGE_METRICS`** | **Per table**: `ACTIVE_BYTES`, `TIME_TRAVEL_BYTES`, `FAILSAFE_BYTES`, **`RETAINED_FOR_CLONE_BYTES`**, `CLONE_GROUP_ID`; includes **dropped tables** still retained |
| `AUTOMATIC_CLUSTERING_HISTORY`, `MATERIALIZED_VIEW_REFRESH_HISTORY`, `SEARCH_OPTIMIZATION_HISTORY`, `PIPE_USAGE_HISTORY`, `SERVERLESS_TASK_HISTORY`, `REPLICATION_USAGE_HISTORY` | Credits of each **serverless** feature |
| `DATA_TRANSFER_HISTORY` | Data egress |
| `RESOURCE_MONITORS` | Resource monitors and quotas |
| `GRANTS_TO_ROLES`, `GRANTS_TO_USERS` | Grants inventory |
| `MASKING_POLICIES`, `ROW_ACCESS_POLICIES`, `POLICY_REFERENCES`, `TAG_REFERENCES` | Governance inventory |

**`INFORMATION_SCHEMA`** (per database, real time, short retention): table functions `QUERY_HISTORY()` (**7 days**), `LOGIN_HISTORY()` (7 days), `WAREHOUSE_LOAD_HISTORY()` (14 days), `WAREHOUSE_METERING_HISTORY()` (6 months), `COPY_HISTORY()` (14 days), `REST_EVENT_HISTORY()`; views such as **`TABLE_STORAGE_METRICS`**, and account-level views **`DATABASE_STORAGE_USAGE_HISTORY`** and **`STAGE_STORAGE_USAGE_HISTORY`** (storage for **databases** and **internal stages**).

**Other schemas of the SNOWFLAKE database**: **`ORGANIZATION_USAGE`** (all accounts of the organization, usage in currency, remaining balance ⚠️) and **`READER_ACCOUNT_USAGE`** (reader accounts).

**Per-table storage quick checks**: `SHOW TABLES` (column `bytes`) and `TABLE_STORAGE_METRICS` (ACCOUNT_USAGE or INFORMATION_SCHEMA).

**Who can see usage**:

- `ACCOUNT_USAGE` views: **ACCOUNTADMIN** by default → grant **`IMPORTED PRIVILEGES` ON DATABASE SNOWFLAKE** or a **SNOWFLAKE database role** (USAGE_VIEWER, GOVERNANCE_VIEWER…).
- Billing/usage in Snowsight and usage functions for non-admins → global **`MONITOR USAGE`** privilege.
- Snowsight **Cost Management** ⚠️ (Admin area): consumption by service/warehouse, budgets, resource monitors.

### 2.3.5 Controls and optimization

- **Statement controls**: **`STATEMENT_TIMEOUT_IN_SECONDS`** (max run time) and **`STATEMENT_QUEUED_TIMEOUT_IN_SECONDS`** (max queue time), on account/user/session/warehouse.
- **Attribution**: `QUERY_TAG` session parameter; **object tags** on warehouses (cost center); separate warehouses per team.
- **Lower compute credits**: **auto-suspend + auto-resume** (the classic answer), right-size by testing, separate workloads, resource monitors/budgets, avoid always-on warehouses, use multi-cluster auto-scale with Economy when queuing is acceptable.
- **Lower storage**: transient/temporary tables for reproducible data, shorter **Time Travel** retention, drop unused tables (find them via **ACCESS_HISTORY**), purge internal stages after loading, watch clones and clustering churn.

### 2.3.6 Exam traps — 2.3

- ❌ "Minimum billing is 5 minutes / 1 hour" → ✅ **60 seconds**, then per second.
- ❌ "Cloud services are always billed" → ✅ only above **10% of daily warehouse credits** (daily, not per query).
- ❌ "Warehouse credits depend on the number of users / rows / data volume" → ✅ **size, running clusters, time** (and type/generation).
- ❌ "Resource monitors can be assigned to databases/users" → ✅ **account or warehouses**.
- ❌ "Several resource monitors per warehouse" → ✅ **one** (and one at account level).
- ❌ "Resource monitors stop Snowpipe/serverless spend" → ✅ only **user-managed warehouses**.
- ❌ "SYSADMIN/SECURITYADMIN creates resource monitors" → ✅ **ACCOUNTADMIN**.
- ❌ "SUSPEND cancels running queries" → ✅ that's **SUSPEND_IMMEDIATE**.
- ❌ "Storage charges stop when the table is dropped" → ✅ when data **leaves Fail-safe**.
- ❌ "Semi-structured data costs more to store" → ✅ no premium.
- ❌ "External stage files are billed by Snowflake" → ✅ by the **cloud provider**.
- ❌ "Storage rate depends on warehouse size / data format" → ✅ **region + On-Demand/Capacity**.
- ❌ "METERING_HISTORY shows the remaining contract balance" → ✅ **hourly credit usage**; balance is in ORGANIZATION_USAGE.
- ❌ "Query from 90 days ago: INFORMATION_SCHEMA.QUERY_HISTORY" → ✅ **ACCOUNT_USAGE.QUERY_HISTORY**.
- ❌ "Any role can query ACCOUNT_USAGE by default" → ✅ **ACCOUNTADMIN**; others need imported privileges / database roles.
- "Billing info for a non-ACCOUNTADMIN role" → **MONITOR USAGE**.

---

## Rapid-fire self-test (cover the right column)

| # | Obj. | Question | Answer |
|---|---|---|---|
| 1 | 2.1 | Two access control models combined by Snowflake? | DAC and RBAC (plus UBAC in some cases) |
| 2 | 2.1 | Who owns a new object? | The role (primary role) that created it |
| 3 | 2.1 | Default access to a securable object? | None until granted |
| 4 | 2.1 | Top-level role of the account? | ACCOUNTADMIN |
| 5 | 2.1 | Role dedicated to users and roles? | USERADMIN |
| 6 | 2.1 | Role with global MANAGE GRANTS? | SECURITYADMIN |
| 7 | 2.1 | Role recommended to create databases/warehouses? | SYSADMIN |
| 8 | 2.1 | Role granted to everyone? | PUBLIC |
| 9 | 2.1 | Role that creates accounts in an organization? | ORGADMIN |
| 10 | 2.1 | Where should custom roles roll up? | SYSADMIN |
| 11 | 2.1 | Where to add extra admin privileges? | A custom role |
| 12 | 2.1 | Can system roles be dropped? | No, and their Snowflake grants can't be revoked |
| 13 | 2.1 | ACCOUNTADMIN best practices (two)? | MFA for all its users; at least two users but as few as possible |
| 14 | 2.1 | Who owns a dropped role's objects? | The role that executed DROP ROLE |
| 15 | 2.1 | How is a role hierarchy built? | Granting a role to another role |
| 16 | 2.1 | Direction of privilege inheritance? | Upwards: parent inherits from child |
| 17 | 2.1 | Change the primary role? | USE ROLE |
| 18 | 2.1 | Activate all other granted roles? | USE SECONDARY ROLES ALL |
| 19 | 2.1 | Which role authorizes CREATE and owns the result? | The primary role |
| 20 | 2.1 | Role type scoped to one database? | Database role |
| 21 | 2.1 | Privileges of SELECT on existing + future tables? | GRANT … ON ALL TABLES + ON FUTURE TABLES |
| 22 | 2.1 | Minimum grants to read a table (besides warehouse)? | USAGE on database and schema + SELECT on table |
| 23 | 2.1 | Show privileges granted to a role? | SHOW GRANTS TO ROLE |
| 24 | 2.1 | Show roles granted to a user? | SHOW GRANTS TO USER |
| 25 | 2.1 | Show who has a role? | SHOW GRANTS OF ROLE |
| 26 | 2.1 | Show grants on a schema? | SHOW GRANTS ON SCHEMA |
| 27 | 2.1 | Remove a role from a user? | REVOKE ROLE |
| 28 | 2.1 | Warehouse privilege to resize? | MODIFY |
| 29 | 2.1 | Warehouse privilege to resume / abort queries? | OPERATE |
| 30 | 2.1 | Warehouse privilege to see load charts? | MONITOR |
| 31 | 2.1 | MANAGE WAREHOUSES equals? | MODIFY + MONITOR + OPERATE on all warehouses |
| 32 | 2.1 | Pause/resume a pipe or task? | OPERATE |
| 33 | 2.1 | Privileges on stored procedures? | USAGE and OWNERSHIP |
| 34 | 2.1 | Add search optimization requires? | Table OWNERSHIP + ADD SEARCH OPTIMIZATION on schema |
| 35 | 2.1 | Scope of MANAGE GRANTS? | Global (account) |
| 36 | 2.1 | Who grants in a managed access schema? | Schema owner or MANAGE GRANTS role |
| 37 | 2.1 | Three login methods (not SCIM/TLS)? | Federated/SSO, key pair, OAuth (and password+MFA) |
| 38 | 2.1 | Configure SAML SSO with? | CREATE SECURITY INTEGRATION (TYPE = SAML2) |
| 39 | 2.1 | SSO workflows enabled? | Logging in and logging out |
| 40 | 2.1 | Does MFA require SSO? | No |
| 41 | 2.1 | MFA token cache parameter / level / duration? | ALLOW_CLIENT_MFA_CACHING, account, 4 hours |
| 42 | 2.1 | Authentication for TYPE=SERVICE users? | Key pair (no password) |
| 43 | 2.1 | RSA_PUBLIC_KEY value? | Public key without PEM delimiters |
| 44 | 2.1 | Policy controlling allowed login methods? | Authentication policy |
| 45 | 2.1 | SCIM manages? | Users and roles (groups) |
| 46 | 2.1 | Check SCIM requests? | REST_EVENT_HISTORY |
| 47 | 2.1 | Failed logins / client IP? | ACCOUNT_USAGE.LOGIN_HISTORY |
| 48 | 2.1 | Network policies available in? | All editions |
| 49 | 2.1 | Network policies apply to? | Account, user, security integration |
| 50 | 2.1 | IP in allowed and blocked lists? | Blocked |
| 51 | 2.1 | Which network policy wins? | Most specific: integration > user > account |
| 52 | 2.1 | Policies per account / per user? | One each |
| 53 | 2.1 | Activate a policy for a user requires? | OWNERSHIP on user + USAGE on policy |
| 54 | 2.1 | Who sets MINS_TO_BYPASS_NETWORK_POLICY? | Only Snowflake Support |
| 55 | 2.1 | See a policy's IP lists? | DESCRIBE NETWORK POLICY |
| 56 | 2.1 | Key rotation threshold? | Keys older than 30 days (all editions) |
| 57 | 2.1 | Periodic rekeying edition / age? | Enterprise; data keys older than 1 year |
| 58 | 2.1 | Customer-managed key + Snowflake key? | Tri-Secret Secure (Business Critical) |
| 59 | 2.2 | Column-level security features? | Dynamic Data Masking + External Tokenization |
| 60 | 2.2 | Show PII partially to some roles? | Dynamic data masking (masking policy) |
| 61 | 2.2 | Scope of a masking policy object? | Schema |
| 62 | 2.2 | Apply a masking policy to a column? | ALTER TABLE … MODIFY COLUMN … SET MASKING POLICY |
| 63 | 2.2 | Privilege to set a masking policy? | APPLY (on policy) / APPLY MASKING POLICY (global) |
| 64 | 2.2 | Can a table owner unmask data? | No, policy ownership/APPLY needed |
| 65 | 2.2 | Masking depends on another column? | Conditional masking policy |
| 66 | 2.2 | See CREATE text of a policy? | GET_DDL |
| 67 | 2.2 | Views for masking details? | MASKING_POLICIES + POLICY_REFERENCES |
| 68 | 2.2 | Tokenize before loading? | External Tokenization |
| 69 | 2.2 | Filter rows per role? | Row access policy |
| 70 | 2.2 | Attach a row access policy? | CREATE TABLE … WITH ROW ACCESS POLICY or ALTER TABLE … ADD ROW ACCESS POLICY |
| 71 | 2.2 | Masking policies per tag? | One per data type |
| 72 | 2.2 | Tag DDL commands? | CREATE / ALTER / DROP TAG |
| 73 | 2.2 | Tag inheritance path? | Database → schema → table → column |
| 74 | 2.2 | Find sensitive data automatically? | Sensitive data classification |
| 75 | 2.2 | Who read which table (365 days)? | ACCESS_HISTORY |
| 76 | 2.2 | ACCESS_HISTORY minimum edition? | Enterprise |
| 77 | 2.2 | Column lineage of writes? | ACCESS_HISTORY |
| 78 | 2.2 | Objects supporting SECURE? | Views, materialized views, UDFs |
| 79 | 2.2 | Database role for policy views? | GOVERNANCE_VIEWER |
| 80 | 2.2 | Detect insecure settings / over-privileged roles? | Trust Center |
| 81 | 2.2 | Scheduled condition + action? | Alert |
| 82 | 2.2 | CDP features with no configuration? | Encryption and Time Travel |
| 83 | 2.3 | Warehouse billing minimum? | 60 seconds per start, then per second |
| 84 | 2.3 | 61 s + restart 30 s billed? | 121 seconds |
| 85 | 2.3 | When are cloud services billed? | Above 10% of daily warehouse credits |
| 86 | 2.3 | Serverless billing? | Per second × automatic size |
| 87 | 2.3 | Snowpipe billing (current)? | Credits per GB loaded |
| 88 | 2.3 | Storage rate depends on? | Region and On-Demand vs Capacity |
| 89 | 2.3 | Paying for deleted data until? | It leaves Fail-safe |
| 90 | 2.3 | Storage cost removed by transient tables? | Fail-safe |
| 91 | 2.3 | Who pays for external stage files? | The cloud storage provider |
| 92 | 2.3 | Limit warehouse credits? | Resource monitor |
| 93 | 2.3 | Who creates resource monitors? | ACCOUNTADMIN |
| 94 | 2.3 | Resource monitor levels? | Account (one) and warehouses |
| 95 | 2.3 | Monitors per warehouse? | One |
| 96 | 2.3 | Action that cancels running queries? | SUSPEND_IMMEDIATE |
| 97 | 2.3 | Do resource monitors cap serverless? | No (use budgets to notify) |
| 98 | 2.3 | Hourly account credit usage view? | METERING_HISTORY |
| 99 | 2.3 | Hourly credits per warehouse? | WAREHOUSE_METERING_HISTORY |
| 100 | 2.3 | Per-table active/TT/Fail-safe/clone bytes? | TABLE_STORAGE_METRICS |
| 101 | 2.3 | Internal stage storage history? | STAGE_STORAGE_USAGE_HISTORY |
| 102 | 2.3 | Query from 90 days ago? | ACCOUNT_USAGE.QUERY_HISTORY |
| 103 | 2.3 | Billing access for non-ACCOUNTADMIN? | MONITOR USAGE |
| 104 | 2.3 | Execution and queue time limits? | STATEMENT_TIMEOUT_IN_SECONDS, STATEMENT_QUEUED_TIMEOUT_IN_SECONDS |
| 105 | 2.3 | Classic way to lower compute credits? | Auto-suspend and auto-resume |

If you can answer all of these without looking, and calculate billing scenarios quickly, you are ready for Domain 2.
