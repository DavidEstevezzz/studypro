# Domain 2 Glossary — Account Management & Data Governance (COF-C03)

Alphabetical list of the keywords used in Domain 2 questions. Each entry has the **English term** (as written in the exam), a short Spanish equivalent in *italics* when it helps, the objective it belongs to (see the [syllabus](syllabus.md)), and a one- or two-line definition.

⚠️ = name, limit or interface that changes frequently.

---

## A

- **Access control** — *control de acceso* · 2.1 — Deciding what an authenticated user can do: ownership (DAC), roles and privileges (RBAC).
- **ACCESS_HISTORY** · 2.2 — ACCOUNT_USAGE view (Enterprise+, 365 days, ≤3 h latency) recording which user read or wrote which objects and columns, with column lineage.
- **Account budget** ⚠️ · 2.3 — Budget covering the spending of the whole account; notifies when the monthly limit is projected to be exceeded.
- **ACCOUNTADMIN** · 2.1 — Top-level role of the account; encapsulates SYSADMIN and SECURITYADMIN; billing, usage, resource monitors. Few users, always with MFA, never a default role.
- **Aggregation policy** ⚠️ · 2.2 — Policy that only allows queries returning aggregated groups of a minimum size.
- **Alert** — *alerta* · 2.2 — Schema object that evaluates a condition on a schedule and runs an action when it is true.
- **ALLOW_CLIENT_MFA_CACHING** · 2.1 — Account parameter that lets supported clients cache an MFA token (valid up to 4 hours).
- **ALLOWED_IP_LIST / BLOCKED_IP_LIST** · 2.1 — Network policy lists of permitted and denied IPs; an IP in both is blocked.
- **APPLY (privilege)** · 2.2 — Privilege on a masking/row access policy or tag that allows setting it on objects.
- **APPLY MASKING POLICY / APPLY ROW ACCESS POLICY / APPLY TAG** · 2.2 — Global privileges to set or unset those policies or tags on any object.
- **Authentication** — *autenticación* · 2.1 — Verifying identity (password, MFA, SSO, OAuth, key pair). Does not grant privileges.
- **Authentication policy** · 2.1 — Policy that restricts which authentication methods and clients users may use, and MFA requirements.
- **Authorization** — *autorización* · 2.1 — Deciding what an identity may do, through privileges and roles.
- **Auto-suspend / auto-resume** · 2.3 — Warehouse settings that stop idle compute and restart it on demand: the classic way to lower credit consumption.

## B

- **Billing minimum (60 seconds)** · 2.3 — Each time a warehouse starts or resumes it is billed at least 60 seconds, then per second.
- **Budget** ⚠️ · 2.3 — Monthly credit spending limit that sends notifications; covers serverless features; does not suspend warehouses by itself.

## C

- **Capacity / On-Demand** · 2.3 — Purchase models; together with the region they determine credit and storage rates.
- **CIS Benchmarks** ⚠️ · 2.2 — Security best-practice checks run as a Trust Center scanner package.
- **Classification profile** ⚠️ · 2.2 — Settings that make Snowflake classify sensitive data in a database automatically.
- **Cloud services adjustment (10%)** — *ajuste diario de servicios cloud* · 2.3 — Cloud services credits are billed only for the part above 10% of daily warehouse credits.
- **Column lineage** · 2.2 — Record (in ACCESS_HISTORY) of how data flowed from source columns to target columns in a write.
- **Column-level security** · 2.2 — Dynamic Data Masking + External Tokenization (Enterprise+).
- **Composite master key** · 2.1 — Key formed from a customer-managed key and a Snowflake key in Tri-Secret Secure.
- **Conditional masking policy** · 2.2 — Masking policy that takes extra column arguments, so the result can depend on another column's value.
- **Continuous Data Protection (CDP)** · 2.2 — Features protecting data over its lifecycle (encryption, access control, Time Travel, Fail-safe…); encryption and Time Travel work with no configuration.
- **CREATE NETWORK POLICY** · 2.1 — Global privilege to create network policies (SECURITYADMIN by default).
- **CREATE ROLE / CREATE USER** · 2.1 — Global privileges to create roles and users (USERADMIN by default).
- **Credit quota** · 2.3 — Number of credits a resource monitor allows per interval (`CREDIT_QUOTA`).
- **Custom budget** ⚠️ · 2.3 — Budget for a group of objects or a tag.
- **Custom role** · 2.1 — User-created role (by USERADMIN or a role with CREATE ROLE); best practice: hierarchy rolled up to SYSADMIN.

## D

- **DAC (Discretionary Access Control)** · 2.1 — Model where each object has an owner (a role) that can grant access to it.
- **Data classification (sensitive data classification)** — *clasificación de datos* · 2.2 — Automatic discovery of sensitive data that assigns semantic and privacy category tags; Enterprise+.
- **Data lineage** ⚠️ · 2.2 — View of upstream and downstream dependencies of data, used for impact analysis.
- **Data transfer (egress)** · 2.3 — Charges for moving data to another region or cloud (replication, unloading); ingress is free.
- **Database role** · 2.1 — Role defined inside a database, granted to account roles; cannot be activated directly with USE ROLE.
- **DATABASE_STORAGE_USAGE_HISTORY** · 2.3 — View/function with daily storage per database.
- **DEFAULT_ROLE** · 2.1 — User property with the role activated at login; never ACCOUNTADMIN.
- **DESCRIBE NETWORK POLICY** · 2.1 — Shows a network policy's properties, including allowed and blocked lists.
- **Differential privacy** ⚠️ · 2.2 — Technique (privacy policies) that adds noise so aggregates can't reveal individual contributions.
- **Duo Security** · 2.1 — One of the MFA methods built into Snowflake.
- **Dynamic Data Masking** · 2.2 — Masking policies that decide at query time which value each role sees in a column; Enterprise+.

## E

- **Encryption at rest / in transit** · 2.1 — All data is encrypted with AES-256 at rest and TLS 1.2+ in transit, in every edition.
- **Enrollment (MFA)** · 2.1 — A user registering a second factor; distinct from enforcement rules.
- **EXECUTE TASK / EXECUTE MANAGED TASK** · 2.1 — Global privileges needed to run tasks (serverless tasks need the managed variant).
- **External OAuth** · 2.1 — OAuth where tokens come from an external authorization server (Okta, Entra ID…), configured with a security integration.
- **External Tokenization** · 2.2 — Sensitive values tokenized by a third-party provider before loading; masking policies call an external function to detokenize for authorized roles.

## F

- **Federated authentication** — *autenticación federada* · 2.1 — SSO in which an external identity provider authenticates users via SAML 2.0; all editions.
- **FREQUENCY (resource monitor)** · 2.3 — Interval at which a monitor's usage resets: DAILY, WEEKLY, MONTHLY, YEARLY or NEVER.
- **Future grants** · 2.1 — `GRANT … ON FUTURE <objects> IN SCHEMA/DATABASE` — privileges applied automatically to objects created later.

## G

- **GET_DDL** · 2.2 — Returns the CREATE statement of an object, e.g. a masking policy.
- **GOVERNANCE_VIEWER** · 2.2 — SNOWFLAKE database role giving access to governance views (policies, tags, access history).
- **GRANT OWNERSHIP** · 2.1 — Transfers ownership of an object to another role (`COPY CURRENT GRANTS` keeps existing grants).
- **GRANTS_TO_ROLES / GRANTS_TO_USERS** · 2.1 — ACCOUNT_USAGE views listing privilege grants to roles and role grants to users.

## H

- **Hierarchical key model** · 2.1 — Root key → account master keys → table master keys → file keys, held in an HSM.

## I

- **Identity provider (IdP)** · 2.1 — External service (Okta, Entra ID, ADFS) that authenticates users for SSO and can provision them with SCIM.
- **IMPORTED PRIVILEGES** · 2.3 — Privilege on the SNOWFLAKE database that lets a role query ACCOUNT_USAGE views.
- **IS_ROLE_IN_SESSION** · 2.2 — Function used in policies to check whether a role is active (primary or secondary) — preferred over CURRENT_ROLE.

## K

- **Key-pair authentication** · 2.1 — Login with an RSA private key; the public key is set in RSA_PUBLIC_KEY without PEM delimiters; used by SnowSQL, CLI, connectors, drivers.
- **Key rotation** · 2.1 — Automatic retirement of encryption keys older than 30 days; all editions.

## L

- **LEGACY_SERVICE** ⚠️ · 2.1 — Deprecated user type for services that still use passwords.
- **Least privilege** — *mínimo privilegio* · 2.1 — Grant only the privileges needed; Snowflake starts with no access.
- **LOGIN_HISTORY** · 2.1 — ACCOUNT_USAGE view (365 days) and INFORMATION_SCHEMA function (7 days) of login attempts with IP, client and success/failure.

## M

- **Managed access schema** · 2.1 — Schema `WITH MANAGED ACCESS`: only the schema owner or MANAGE GRANTS can grant privileges on its objects.
- **MANAGE GRANTS** · 2.1 — Global privilege to grant and revoke privileges on any object (SECURITYADMIN).
- **MANAGE WAREHOUSES** · 2.1 — Global privilege equal to MODIFY, MONITOR and OPERATE on all warehouses (not USAGE).
- **Masking policy** — *política de enmascaramiento* · 2.2 — Schema-level object returning the value a user sees in a column at query time.
- **MASKING_POLICIES** · 2.2 — ACCOUNT_USAGE view listing masking policy definitions.
- **METERING_DAILY_HISTORY** · 2.3 — Daily credits including the cloud services adjustment (what is billed).
- **METERING_HISTORY** · 2.3 — Hourly credit usage for the account by service type.
- **MFA (multi-factor authentication)** — *autenticación multifactor* · 2.1 — Second factor built into Snowflake (Duo, passkeys, authenticator apps); not tied to SSO ⚠️ mandatory for human password users.
- **MINS_TO_BYPASS_NETWORK_POLICY** · 2.1 — User property for a temporary network-policy bypass; only Snowflake Support can set it.
- **MODIFY** · 2.1/2.3 — Privilege to change an object's properties (warehouse resize, resource monitor settings).
- **MONITOR** · 2.1/2.3 — Privilege to view an object's activity (warehouse load, resource monitor, task/pipe status).
- **MONITOR USAGE** · 2.3 — Global privilege to view account usage and billing information without ACCOUNTADMIN.
- **MUST_CHANGE_PASSWORD** · 2.1 — User property forcing a password change at next login.

## N

- **Network policy** — *política de red* · 2.1 — Restricts inbound access by IP/network identifier; account, user or security integration level; all editions.
- **Network rule** · 2.1 — Schema object grouping network identifiers (IP ranges, VPC endpoints) referenced by network policies.
- **NOTIFY / SUSPEND / SUSPEND_IMMEDIATE** · 2.3 — Resource monitor actions: notify only; suspend after running statements finish; suspend and cancel running statements.
- **Notification integration** · 2.2 — Account object describing how notifications reach a destination (email, cloud queue, webhook).

## O

- **OAuth** · 2.1 — Token-based authentication for applications; Snowflake OAuth or External OAuth via a security integration.
- **OBJECT_VIEWER / USAGE_VIEWER / SECURITY_VIEWER** · 2.1/2.3 — SNOWFLAKE database roles giving topic-specific access to ACCOUNT_USAGE views.
- **Object tagging** — *etiquetado de objetos* · 2.2 — Assigning tags (key = string value) to objects for tracking, compliance, protection and cost attribution.
- **OPERATE** · 2.1 — Privilege to start/resume/suspend a warehouse and abort its queries, or pause/resume pipes and suspend/resume tasks.
- **ORGADMIN** ⚠️ · 2.1 — Organization-level role: creates accounts and views usage across the organization; cannot read account data.
- **ORGANIZATION_USAGE** · 2.3 — SNOWFLAKE schema with usage and billing across all accounts of the organization.
- **Ownership** — *propiedad* · 2.1 — Full control of an object, always held by a role; default owner is the creating primary role.

## P

- **Passkey** ⚠️ · 2.1 — Supported MFA method based on device credentials.
- **Password policy** · 2.1 — Policy governing password length, complexity, age and lockout.
- **Periodic rekeying** · 2.1 — Re-encryption of data whose key is older than one year; Enterprise+.
- **Primary role** · 2.1 — Active session role (USE ROLE); authorizes CREATE and owns new objects.
- **PRIVACY_CATEGORY** · 2.2 — System tag set by classification: IDENTIFIER, QUASI_IDENTIFIER or SENSITIVE.
- **Privacy policy** ⚠️ · 2.2 — Policy applying differential privacy to protect individual contributions.
- **Private connectivity** · 2.1 — AWS PrivateLink, Azure Private Link, Google Private Service Connect: access without the public internet; Business Critical+.
- **Privilege** — *privilegio* · 2.1 — A defined level of access to an object (SELECT, USAGE, OPERATE…).
- **Programmatic access token** ⚠️ · 2.1 — Token generated for a user so scripts and tools can authenticate.
- **Projection policy** ⚠️ · 2.2 — Policy that prevents a column from appearing in query output while still allowing its use in filters/joins.
- **PUBLIC** · 2.1 — System role automatically granted to every user and role.

## Q

- **QUERY_ATTRIBUTION_HISTORY** ⚠️ · 2.3 — ACCOUNT_USAGE view attributing warehouse compute cost to individual queries.
- **QUERY_HISTORY** · 2.3 — ACCOUNT_USAGE view (365 days) or INFORMATION_SCHEMA function (7 days) of executed queries.
- **QUERY_TAG** · 2.3 — Session parameter that labels queries for attribution and monitoring.

## R

- **RBAC (Role-Based Access Control)** · 2.1 — Privileges granted to roles, roles granted to users and to other roles.
- **READER_ACCOUNT_USAGE** · 2.3 — SNOWFLAKE schema to monitor reader accounts (includes RESOURCE_MONITORS).
- **Resource monitor** · 2.3 — Object that tracks warehouse credits against a quota and notifies/suspends at thresholds; created by ACCOUNTADMIN; account or warehouse level.
- **REST_EVENT_HISTORY** · 2.1 — Table function returning SCIM REST API requests sent by the identity provider.
- **RETAINED_FOR_CLONE_BYTES** · 2.3 — TABLE_STORAGE_METRICS column: deleted bytes still kept because clones reference them.
- **REVOKE** · 2.1 — Removes a privilege or role grant (`REVOKE ROLE r FROM USER u`).
- **Role** — *rol* · 2.1 — Entity that receives privileges and is granted to users or other roles.
- **Role hierarchy** · 2.1 — Built by granting roles to roles; parents inherit privileges of children.
- **Row access policy** — *política de acceso a filas* · 2.2 — Schema-level policy returning BOOLEAN per row to filter rows by role; one per table/view; Enterprise+.
- **ROW_ACCESS_POLICIES** · 2.2 — ACCOUNT_USAGE view listing row access policies.
- **RSA_PUBLIC_KEY / RSA_PUBLIC_KEY_2** · 2.1 — User properties holding public keys for key-pair authentication (second one for rotation).

## S

- **SAML 2.0** · 2.1 — Standard used for federated authentication between the IdP and Snowflake.
- **SCIM** · 2.1 — Standard API that lets an IdP provision users and groups (roles) in Snowflake.
- **Secondary roles** · 2.1 — `USE SECONDARY ROLES ALL | NONE`: add privileges of other granted roles to the session (except for CREATE).
- **Securable object** · 2.1 — Entity to which access can be granted; no access by default.
- **Secure view / secure UDF** · 2.2 — Objects created with SECURE whose definition is hidden from non-owners and whose optimizations are restricted.
- **SECURITYADMIN** · 2.1 — Role with global MANAGE GRANTS, inherits USERADMIN, manages network policies.
- **Security integration** · 2.1 — Account object configuring SAML2 SSO, OAuth, External OAuth or SCIM.
- **SEMANTIC_CATEGORY** · 2.2 — System tag set by classification describing the kind of data (NAME, EMAIL, US_SSN…).
- **Serverless billing** · 2.3 — Snowflake-managed compute billed per second multiplied by an automatically chosen size.
- **SERVICE (user type)** · 2.1 — User for unattended applications; cannot use passwords; uses key pair, OAuth or workload identity.
- **Session policy** · 2.1 — Policy that sets idle session timeouts.
- **SHOW GRANTS OF ROLE** · 2.1 — Lists users and roles that have been granted a role.
- **SHOW GRANTS ON <object>** · 2.1 — Lists privileges granted on a specific object.
- **SHOW GRANTS TO ROLE** · 2.1 — Lists privileges and roles granted to a role.
- **SHOW GRANTS TO USER** · 2.1 — Lists roles granted to a user.
- **SHOW NETWORK POLICIES** · 2.1 — Lists the network policies in the account.
- **Snowflake Horizon** ⚠️ · 2.2 — Umbrella name for Snowflake's governance, compliance and security capabilities.
- **Snowpipe billing** ⚠️ · 2.3 — Current model charges credits per GB of data loaded.
- **SSO (single sign-on)** · 2.1 — One set of IdP credentials to sign into several applications, including Snowflake.
- **STAGE_STORAGE_USAGE_HISTORY** · 2.3 — Daily storage used by internal stages.
- **STATEMENT_QUEUED_TIMEOUT_IN_SECONDS** · 2.3 — Maximum time a statement may wait in a warehouse queue.
- **STATEMENT_TIMEOUT_IN_SECONDS** · 2.3 — Maximum execution time of a statement.
- **STORAGE_USAGE** · 2.3 — ACCOUNT_USAGE view with daily account-wide storage totals.
- **SYSADMIN** · 2.1 — Role that creates warehouses, databases and objects; custom roles should roll up to it.
- **System-defined roles** · 2.1 — ORGADMIN, ACCOUNTADMIN, SECURITYADMIN, USERADMIN, SYSADMIN, PUBLIC; cannot be dropped.

## T

- **Tag** — *etiqueta* · 2.2 — Schema-level object assigned to objects with a string value; inherited down the hierarchy; doesn't grant access by itself.
- **Tag-based masking** · 2.2 — Masking policy assigned to a tag (one per data type) and applied to every tagged column.
- **TAG_REFERENCES** · 2.2 — View/function listing where tags are assigned.
- **TABLE_STORAGE_METRICS** · 2.3 — View (ACCOUNT_USAGE and INFORMATION_SCHEMA) with per-table active, Time Travel, Fail-safe and retained-for-clone bytes.
- **TLS** · 2.1 — Protocol encrypting data in transit (not a login method).
- **Tri-Secret Secure** · 2.1 — Customer-managed key combined with a Snowflake key into a composite master key; Business Critical+.
- **Trust Center** · 2.2 — Evaluates account security with scanners and reports findings with remediation guidance.

## U

- **UBAC (User-Based Access Control)** ⚠️ · 2.1 — Granting privileges directly to users in supported scenarios.
- **USAGE** · 2.1 — Privilege to use a container or object: database, schema, warehouse, function/procedure, external stage, network policy.
- **USE ROLE** · 2.1 — Changes the session's primary role.
- **USERADMIN** · 2.1 — Role dedicated to creating and managing users and roles.

## W

- **WAREHOUSE_LOAD_HISTORY** · 2.3 — Running and queued load per warehouse.
- **WAREHOUSE_METERING_HISTORY** · 2.3 — Hourly credit usage per warehouse.
- **WITH MANAGED ACCESS** · 2.1 — Clause that creates a managed access schema.
- **Workload identity federation** ⚠️ · 2.1 — Cloud workloads authenticate with their cloud identity instead of stored secrets.
