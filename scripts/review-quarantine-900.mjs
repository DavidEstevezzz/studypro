// First batch taken from the quarantined pool (not from the pending queue): the 9 questions that need a
// missing image, the 31 with a concrete diagnosis recorded at screening, and 60 of the 2.1 block.
// IDs frozen in audit/quarantine-900-ids.json. Decisions: conservar_revisada, corregir, archivar, apartar.
export const quarantine900 = [];
function keep(i, objective, path, e, reason) {
  quarantine900.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,e,decision:'conservar_revisada',reason});
}
function fix(i, objective, path, q, o, c, e, reason) {
  quarantine900.push({i,objective,r:`https://docs.snowflake.com/en/${path}`,q,o,c,n:c.length,e,decision:'corregir',reason});
}
function archive(i,reason){quarantine900.push({i,decision:'archivar',reason});}
function hold(i,reason){quarantine900.push({i,decision:'apartar',reason});}

// --- Conservadas: la sospecha del cribado no se confirma ---
keep(82,'2.1','sql-reference/sql/create-task',
 'Creating a task requires the CREATE TASK privilege on the schema that will contain it, plus the usual access to that database and schema. Running tasks additionally requires EXECUTE TASK on the account (and EXECUTE MANAGED TASK for serverless tasks). CREATE TASK is not a global privilege and is not restricted to ACCOUNTADMIN.',
 'Privilegios comprobados en los requisitos de control de acceso de CREATE TASK; se añade EXECUTE TASK para la ejecución.');
keep(140,'5.1','user-guide/object-clone',
 'Cloning a database clones its existing child objects, and those clones inherit the privileges granted on the corresponding source objects, such as the schemas. The clone of the container itself does not inherit the privileges granted on the source database, and future objects are not created by the clone operation.',
 'Confirmado con la sección de privilegios de objetos clonados; la sospecha del cribado no se sostiene.');
keep(184,'2.1','user-guide/organizations',
 'ORGADMIN operates at the organization level and is the role that can view, create and manage accounts across regions and cloud platforms. ACCOUNTADMIN is the top-level role inside one account, SECURITYADMIN manages users, roles and grants, and SYSADMIN manages databases and warehouses.',
 'Alcance de ORGADMIN confirmado en la introducción a organizaciones; explicación en inglés.');
keep(223,'2.1','user-guide/security-access-control-considerations',
 'Snowflake recommends requiring multi-factor authentication for every user with the ACCOUNTADMIN role and assigning that role to at least two users, while keeping the number as small as possible. Nothing requires ACCOUNTADMIN users to be owned by that role or to also hold SECURITYADMIN. Note that Snowflake is rolling out mandatory MFA for all human users, beyond this recommendation.',
 'Ambas recomendaciones figuran literalmente en las buenas prácticas de control de acceso; se añade el contexto del despliegue de MFA obligatoria.');
keep(263,'3.1','sql-reference/sql/copy-into-location',
 'For a Parquet unload the COMPRESSION option accepts AUTO, LZO, SNAPPY or NONE, and AUTO uses Snappy. Among the listed choices only LZO is valid; Brotli, gzip and Zstandard are compression methods for other formats, not options of a Parquet unload.',
 'Opciones de compresión de Parquet comprobadas en COPY INTO <location>; se aclara que SNAPPY es el valor por defecto vía AUTO.');
keep(274,'2.1','user-guide/search-optimization/enabling',
 'Adding, configuring or removing search optimization requires OWNERSHIP of the table and the ADD SEARCH OPTIMIZATION privilege on the schema that contains it. MODIFY or SELECT on the table are not enough, and no system role is required as such.',
 'Privilegios confirmados literalmente en la página de activación del servicio.');
keep(316,'4.3','user-guide/querying-persisted-results',
 'Reusing a persisted result requires, among other conditions, that the role running the query has the necessary privileges on the underlying objects and that the query runs within the 24-hour cache window. The warehouse used does not have to be the same, and non-deterministic functions prevent reuse. Meeting every condition still does not guarantee reuse.',
 'Condiciones confirmadas en la página de resultados persistidos; la sospecha del cribado no se sostiene.');
keep(325,'5.2','sql-reference/sql/grant-privilege-share',
 'REFERENCE_USAGE must be granted on each database whose objects a shared secure view references, and it must be granted before SELECT on the secure view is granted to the share. CREATE SHARE is an account privilege for creating shares, and SELECT on the base tables is not what enables cross-database references.',
 'Privilegio y orden de concesión confirmados en GRANT … TO SHARE.');
keep(370,'2.1','user-guide/security-access-control-considerations',
 'Snowflake recommends that the first ACCOUNTADMIN user create at least one additional user with the USERADMIN role, and that the remaining users be created by that role. USERADMIN holds the privileges to create and manage users and roles. PUBLIC is granted to everyone, ORGADMIN works at organization level and SYSADMIN manages objects.',
 'Recomendación confirmada en las buenas prácticas de control de acceso; se retira la sospecha del cribado.');
keep(400,'2.1','user-guide/admin-user-management',
 'When creating a user, Snowflake supports forcing a password change on first sign-in (MUST_CHANGE_PASSWORD) and assigning a default role. Snowflake also advises never to make ACCOUNTADMIN the default role. Disabling the user, fixed unlock times or expiring access are not part of that guidance.',
 'Ambas prácticas figuran en la página de gestión de usuarios; explicación en inglés y aviso sobre el rol por defecto.');
keep(409,'2.1','user-guide/security-access-control-overview',
 'ACCOUNTADMIN encapsulates SYSADMIN and SECURITYADMIN and is documented as the top-level role of the account. ORGADMIN is a separate organization-level role rather than a parent of the account hierarchy.',
 'Jerarquía confirmada con la descripción de los roles del sistema; se aclara el papel de ORGADMIN.');
keep(410,'5.2','user-guide/data-sharing-provider',
 'Creating a share and adding consumer accounts requires ACCOUNTADMIN or a role granted the global CREATE SHARE privilege, so ACCOUNTADMIN is the role that can do it by default. SECURITYADMIN and ORGADMIN do not receive that privilege by default and SHAREADMIN does not exist.',
 'Rol confirmado en la página de creación de shares; se añade la alternativa mediante el privilegio CREATE SHARE.');
keep(461,'2.1','user-guide/security-access-control-considerations',
 'Snowflake recommends building a hierarchy of custom roles aligned with business functions and ultimately granting those roles to SYSADMIN, so that system administrators can manage all objects. Granting custom roles directly to ACCOUNTADMIN is discouraged.',
 'Recomendación confirmada literalmente en las buenas prácticas; explicación en inglés.');
keep(470,'2.1','sql-reference/sql/use-secondary-roles',
 'USE SECONDARY ROLES accepts ALL, which activates every role granted to the user in addition to the primary role, and NONE, which disables secondary roles so that authorization comes only from the primary role. RESUME, SUSPEND and ADD are not part of the syntax.',
 'Sintaxis confirmada en USE SECONDARY ROLES; explicación en inglés.');
keep(571,'5.1','user-guide/data-time-travel',
 'Restoring a dropped object requires OWNERSHIP of the object, as dropping it does, plus the CREATE privilege for that object type in the database or schema where it is restored. UNDROP is the command, not a privilege, and UPDATE or MODIFY do not apply.',
 'Requisitos confirmados en la página de Time Travel; explicación en inglés.');
keep(604,'2.1','user-guide/security-access-control-overview',
 'SYSADMIN is documented as the role with privileges to create warehouses, databases and database objects such as schemas, tables and views. PUBLIC only allows login and basic access, SECURITYADMIN manages grants, users and roles, and USERADMIN manages users and roles.',
 'Alcance de SYSADMIN confirmado en la descripción de los roles del sistema.');
keep(707,'2.1','user-guide/network-policies',
 'MINS_TO_BYPASS_NETWORK_POLICY temporarily exempts a user from the active network policy, and the documentation states that only Snowflake can set this property: the value must be requested from Snowflake Support. It can be viewed with DESCRIBE USER.',
 'Confirmado literalmente en la sección de excepción de políticas de red; la sospecha del cribado no se sostiene.');
keep(733,'5.3','collaboration/consumer-becoming',
 'To get data from a listing a role needs CREATE DATABASE and IMPORT SHARE, which is why ACCOUNTADMIN can do it out of the box; paying for a paid listing also requires PURCHASE DATA EXCHANGE LISTING. OWNERSHIP, REFERENCE_USAGE and USAGE are not the privileges involved.',
 'Privilegios confirmados en la guía del consumidor de listings; se añade el privilegio de compra.');
keep(811,'5.1','sql-reference/functions/system_global_account_set_parameter',
 'An organization administrator calls SYSTEM$GLOBAL_ACCOUNT_SET_PARAMETER for an account to enable replication and failover features; the documentation states that the function enables Replication and Client Redirect for that account. Clustering, Fail-safe and search optimization are not enabled this way.',
 'Función confirmada en su página de referencia; se sustituye la nota en español por una explicación contrastada.');
keep(813,'2.1','sql-reference/sql/create-network-policy',
 'Network policies are created by SECURITYADMIN or a higher role, or by a role granted the global CREATE NETWORK POLICY privilege, which only SECURITYADMIN holds by default. Activating a policy for the account with ALTER ACCOUNT must also be done with SECURITYADMIN, so it is the role Snowflake points to for this task.',
 'Rol confirmado en CREATE NETWORK POLICY y en la activación a nivel de cuenta; explicación en inglés.');
keep(819,'2.1','user-guide/security-access-control-overview',
 'System-defined roles cannot be dropped, and the privileges that Snowflake grants to them cannot be revoked. That is what distinguishes them from custom roles, whose grants can be modified.',
 'Confirmado literalmente en la descripción de los roles del sistema.');
keep(871,'4.2','user-guide/tables-clustering-keys',
 'A clustering key can use columns or expressions of any data type except GEOGRAPHY, VARIANT, OBJECT and ARRAY, so BINARY and GEOMETRY are valid. A VARIANT column can still take part through an expression that provides the path and the target type.',
 'Tipos excluidos confirmados literalmente; se aclara el uso de expresiones sobre VARIANT.');
keep(881,'2.1','user-guide/organizations',
 'ORGADMIN manages the organization: it can create accounts and view usage information for every account in the organization. It does not edit or delete the data of those accounts, and it cannot query the data stored in their tables.',
 'Actividades confirmadas en la introducción a organizaciones; explicación en inglés.');
keep(886,'2.1','user-guide/security-access-control-overview',
 'Snowflake grants no access to a securable object until a privilege on it is granted to a role, in line with least privilege. Read, write or full access only exist once granted.',
 'Principio confirmado en la visión general del control de acceso; explicación en inglés.');
keep(891,'2.1','user-guide/admin-security-fed-auth-overview',
 'The documentation lists two SSO workflows enabled by federated authentication: logging into Snowflake and logging out of Snowflake. Session initiation happens as part of the login workflow, and authorization or role selection are not SSO workflows.',
 'Flujos confirmados literalmente en la lista de workflows SSO admitidos.');
keep(1056,'3.1','user-guide/data-load-considerations-stage',
 'Organizing staged files into logical paths, for example by source, date or region, lets a COPY statement target a fraction of the data and improves load performance. Browsing, compression and encryption are not the purpose of that partitioning.',
 'Propósito confirmado en la página de preparación de archivos en stage; explicación en inglés.');

// --- Correcciones ---
fix(308,'2.1','sql-reference/sql/grant-privilege',
 'Which commands grant a role SELECT on all current tables of schema DB1.SCHEMA and on tables created there later, without granting privileges on other schemas of the database? (Choose two.)',
 ['grant USAGE on all tables in schema DB1.SCHEMA to role MYROLE;','grant USAGE on future tables in schema DB1.SCHEMA to role MYROLE;','grant SELECT on all tables in schema DB1.SCHEMA to role MYROLE;','grant SELECT on future tables in schema DB1.SCHEMA to role MYROLE;','grant SELECT on all tables in database DB1 to role MYROLE;','grant SELECT on future tables in database DB1 to role MYROLE;'],[2,3],
 'ON ALL covers the tables that exist now and ON FUTURE covers the ones created later, so both statements are needed. USAGE is not the privilege for reading table data. The database-level forms are valid syntax, but they grant beyond the requested schema.',
 'Las variantes con IN DATABASE también son sintaxis válida y cumplían el enunciado original; se acota el escenario al esquema para dejar una sola pareja correcta.');
fix(318,'2.1','user-guide/security-access-control-privileges',
 'A role must be able to create materialized views in the schema MYDB.MYSCHEMA. What does it need?',
 ['Only the CREATE MATERIALIZED VIEW privilege, granted to the user instead of the role',
  'The CREATE MATERIALIZED VIEW privilege on the schema, together with usage privileges on the database and the schema',
  'Only OWNERSHIP of the database',
  'Only the SELECT privilege on the tables used by the view'],[1],
 'CREATE MATERIALIZED VIEW is a schema-level privilege granted to a role. Operating on an object in a schema also requires at least one privilege on the parent database and on the parent schema, which is why USAGE is granted as well. Privileges are granted to roles, not directly to users, in this model.',
 'El original daba por correcta solo la concesión de CREATE MATERIALIZED VIEW, pero para operar en el esquema hacen falta además privilegios sobre la base de datos y el esquema; la opción que los incluía quedaba marcada como incorrecta.');
fix(341,'3.1','user-guide/data-load-considerations-load',
 'The bulk data load history that is available upon completion of the COPY statement is stored where and for how long?',
 ['In the metadata of the target table for 14 days','In the metadata of the pipe for 14 days','In the metadata of the target table for 64 days','In the metadata of the pipe for 64 days'],[2],
 'COPY records the load status of each file in the metadata of the target table, and that load metadata expires after 64 days; this is what prevents reloading the same file. The 14-day window belongs to the pipe metadata used by Snowpipe. Files whose metadata has expired can be loaded with LOAD_UNCERTAIN_FILES.',
 'Clave incorrecta: los metadatos de carga masiva viven 64 días en la tabla de destino; los 14 días son del pipe de Snowpipe. La propia explicación del original ya decía 64.');
fix(361,'2.3','sql-reference/info-schema/table_storage_metrics',
 'Data storage for individual tables can be monitored using which commands and/or objects? (Choose two.)',
 ['SHOW STORAGE BY TABLE;','SHOW TABLES;','Information Schema -> TABLE_HISTORY','Information Schema -> TABLE_FUNCTION','Information Schema -> TABLE_STORAGE_METRICS'],[1,4],
 'SHOW TABLES returns a bytes column with the storage of each table, and the TABLE_STORAGE_METRICS view breaks storage down into active, Time Travel, Fail-safe and retained-for-clone bytes. SHOW STORAGE BY TABLE is not a Snowflake command, and TABLE_HISTORY or TABLE_FUNCTION are not Information Schema storage objects.',
 'La clave incluía SHOW STORAGE BY TABLE, comando que no existe; se sustituye por SHOW TABLES y el comando inexistente queda como distractor.');
fix(459,'1.4','user-guide/warehouses-tasks',
 'What happens to statements that are already executing when the size of a virtual warehouse is changed?',
 ['They are not impacted; the new size applies to queued and new statements','They are aborted and have to be resubmitted by the user','They are aborted and are automatically resubmitted','They are moved to the new configuration and finish there'],[0],
 'Resizing adds or removes compute resources, but it does not affect statements that are already executing: when the warehouse grows, the additional resources serve queued and new statements, and when it shrinks, resources are released only once they are no longer executing statements.',
 'Clave incorrecta: la documentación dice que redimensionar no afecta a las sentencias en ejecución. El enunciado y las opciones se acotan a ese caso.');
fix(553,'2.1','user-guide/network-policies',
 'What does a role need in order to activate a network policy for an individual user?',
 ['The EXECUTE TASK privilege','The global ATTACH POLICY privilege','OWNERSHIP of the role that created the network policy','OWNERSHIP of the user and USAGE on the network policy'],[3],
 'The documentation states that a role with the OWNERSHIP privilege on the user and the USAGE privilege on the network policy, or a higher role, can activate a network policy for that user. Owning the policy alone, or owning the role that created it, is not what grants this.',
 'La clave exigía OWNERSHIP sobre usuario y política; la documentación pide OWNERSHIP sobre el usuario y USAGE sobre la política.');
fix(627,'3.1','user-guide/data-unload-considerations',
 'When floating-point number columns are unloaded to CSV or JSON files, Snowflake truncates the values to approximately which precision and scale?',
 ['(12,2)','(10,4)','(14,8)','(15,9)'],[3],
 'Unloading floating-point columns to CSV or JSON truncates the values to approximately (15,9). Unloading the same columns to Parquet does not truncate them, which is one reason to prefer Parquet when precision matters.',
 'Enunciado dañado: arrastraba las opciones «A. … D.» dentro del texto. Se limpia y se añade el matiz de Parquet.');
fix(704,'1.3','sql-reference/info-schema',
 'What does the INFORMATION_SCHEMA of each database contain? (Choose two.)',
 ['Views for the objects contained in that database, plus views for account-level objects such as roles and warehouses',
  'Views that return one year of historical usage for the account',
  'Table functions for historical and usage data across the account',
  'Table functions that create or modify account-level objects',
  'A writable copy of the ACCOUNT_USAGE schema'],[0,2],
 'Each database has its own INFORMATION_SCHEMA with views for the objects in that database and for account-level objects, plus table functions that return historical and usage data for the account. One year of history belongs to ACCOUNT_USAGE, which is read-only, and these table functions return information rather than modifying objects.',
 'El original oponía «objetos de la base de datos» y «objetos de la cuenta» cuando la documentación describe ambos; reformulado con esa redacción y con distractores reales.');
fix(730,'1.3','developer-guide/stored-procedures-vs-udfs',
 'How does calling a Snowflake stored procedure compare to calling a User-Defined Function (UDF)?',
 ['A single SQL statement can call only one stored procedure, while it can call multiple UDFs',
  'A single SQL statement can call only two stored procedures, while it can call multiple UDFs',
  'A single SQL statement can call multiple stored procedures, while each UDF needs its own statement',
  'Both stored procedures and UDFs can be called as part of any expression'],[0],
 'The documentation states that a single SQL statement can call multiple UDFs but only one stored procedure. A procedure is also called with CALL and cannot be used inside an expression, whereas a UDF returns a value that the statement consumes.',
 'Clave incorrecta: el original decía «dos stored procedures». La documentación dice una sola por sentencia.');
fix(747,'2.2','user-guide/security-column-ddm-use',
 'A masking policy already exists. Which statement applies it to a column of a table?',
 ['ALTER MASKING POLICY email_mask SET BODY -> ...','ALTER TABLE user_info MODIFY COLUMN email SET MASKING POLICY email_mask','CREATE MASKING POLICY email_mask AS ...','GRANT APPLY MASKING POLICY ON ACCOUNT TO ROLE masking_admin'],[1],
 'A policy is attached to a column with ALTER TABLE ... MODIFY COLUMN ... SET MASKING POLICY (ALTER VIEW for a view). ALTER MASKING POLICY changes the body of the policy itself, CREATE MASKING POLICY defines it, and APPLY MASKING POLICY is the privilege a role needs to attach policies.',
 'La clave (ALTER MASKING POLICY) modifica la política, no la aplica a una columna; se sustituyen las opciones por sentencias reales.');
fix(874,'1.4','user-guide/warehouses-multicluster',
 'Under the Economy scaling policy, what condition does Snowflake apply before starting another cluster?',
 ['It starts the cluster as soon as a query is queued',
  'It starts the cluster only if it estimates there is enough load to keep it busy for at least 6 minutes',
  'It starts the cluster after exactly 6 minutes of queuing',
  'It never starts more than one additional cluster'],[1],
 'Economy conserves credits by keeping running clusters fully loaded, so it starts another cluster only when the system estimates at least 6 minutes of work for it, and it marks a cluster for shutdown when it estimates less than 6 minutes of work left. The Standard policy is the one that starts clusters as soon as queries queue.',
 'El original interpretaba los 6 minutos como una espera garantizada en cola; la documentación los usa como estimación de carga para arrancar o apagar clústeres.');
fix(896,'2.2','user-guide/views-secure',
 'Which privilege lets a user see the definition of a secure view through commands such as GET_DDL or SHOW VIEWS?',
 ['OWNERSHIP of the view, that is, being granted the role that owns it','MODIFY on the view','CREATE VIEW on the schema','USAGE on the schema'],[0],
 'The definition of a secure view is only exposed to authorized users, meaning those granted the role that owns the view; for everyone else the text is hidden. Separately, roles with IMPORTED PRIVILEGES on the SNOWFLAKE database, ACCOUNTADMIN or the SNOWFLAKE.OBJECT_VIEWER database role can read secure view definitions from the ACCOUNT_USAGE VIEWS view.',
 'Acotado a la visibilidad de la definición (no al acceso a los datos) y añadidas las vías documentadas por ACCOUNT_USAGE, que el original ignoraba.');
fix(1037,'1.5','user-guide/views-materialized',
 'What happens if maintenance of a materialized view is suspended?',
 ['The view cannot be queried until maintenance is resumed','Queries on the view return the last stored data','Queries on the view return data using Time Travel','Queries on the view return the data with a warning message'],[0],
 'The documentation states that if you suspend maintenance of a materialized view you cannot query the view until you resume maintenance. Certain changes to the base table, such as dropping or altering a column the view uses, also suspend the view, and in most of those cases it has to be recreated.',
 'Clave incorrecta: la documentación dice que la vista no se puede consultar hasta reanudar el mantenimiento, no que devuelva datos con aviso.');
fix(1081,'2.1','user-guide/network-policies',
 'A network policy is activated for the account, for a user and for a security integration. Which one takes effect for a connection through that integration?',
 ['The security integration policy, because the most specific policy overrides the more general ones',
  'The account policy, because it is the most general one',
  'The user policy, because it always overrides the others',
  'All three are combined and only requests allowed by every policy succeed'],[0],
 'Snowflake applies the most specific activated network policy: a security integration policy overrides both the user and the account policies, and a user policy overrides the account policy. Only one policy can be activated at each of those levels.',
 'Ninguna opción del original era correcta: la precedencia documentada de mayor a menor es integración de seguridad, usuario y cuenta, y el original la invertía.');
fix(1229,'3.3','developer-guide/jdbc/jdbc-parameters',
 'What is the default value of the authenticator parameter in a Snowflake JDBC connection?',
 ['externalbrowser','snowflake','username_password_mfa','snowflake_jwt'],[1],
 'The JDBC driver uses snowflake as the default authenticator, which validates the credentials supplied in the connection. If the connection string supplies a key pair and authenticator is unset or set to snowflake, key pair authentication is used. externalbrowser triggers browser-based SSO and snowflake_jwt must be requested explicitly.',
 'Clave incorrecta: el autenticador por defecto es snowflake, tal como decía la propia explicación del original, no snowflake_jwt.');
fix(1304,'1.3','developer-guide/stored-procedure/stored-procedures-rights',
 "Which statement is true when an owner's rights stored procedure is called within a session?",
 ['It runs with the privileges of the caller','It can set the caller\'s session variables','It inherits the current warehouse of the caller','It uses the database and schema that the caller is currently using'],[2],
 "An owner's rights procedure runs with the owner's privileges, inherits the caller's current warehouse, and uses the database and schema where the procedure was created. It cannot view, set or unset the caller's session variables, and it is not allowed to change session state.",
 'Clave incorrecta: un procedimiento de owner no puede ver ni fijar las variables de sesión del caller; lo que sí hereda es el warehouse activo.');

// --- Apartadas: siguen sin evidencia suficiente ---
hold(421,'La documentación distingue USERADMIN (crea y gestiona roles) de SYSADMIN (padre de los roles personalizados en la jerarquía recomendada). «Qué roles se usan para crear roles personalizados» no tiene una respuesta de dos opciones respaldada: falta una fuente que fije esa pareja.');
hold(464,'La primera clave (crear objetos con un rol personalizado concedido a SYSADMIN) está documentada, pero no se ha encontrado respaldo actual para la segunda (esquemas de acceso gestionado como norma para objetos de ACCOUNTADMIN). Se mantiene apartada hasta localizar esa fuente.');
hold(480,'No se ha localizado en la documentación vigente la lista de tareas asociadas al privilegio CREATE DATA EXCHANGE LISTING con la que validar las dos opciones marcadas.');
hold(583,'Las reglas sobre el rol al iniciar sesión (fallo de login sin rol por defecto, rol no concedido que se ignora) no aparecen así en la documentación actual, que solo describe el rol por defecto y PUBLIC. Requiere una fuente que fije el comportamiento.');
hold(594,'No se ha encontrado en la documentación vigente la lista de valores admitidos para el tipo del parámetro SAML_IDENTITY_PROVIDER; hoy se describen Okta y Entra ID como nativos y el resto como proveedores SAML 2.0 personalizados.');

// --- Archivadas: imagen o recurso ausente ---
archive(167,'El enunciado se apoya en una gráfica de utilización del warehouse que no está en el banco; sin ella no se puede justificar la respuesta.');
archive(185,'Pide elegir entre cuatro diagramas de micro-particiones que no existen en el banco.');
archive(220,'Depende del JSON mostrado en una imagen: sin él no se puede saber si la clave del objeto está en minúsculas, que es lo que decide la respuesta.');
archive(270,'Pregunta por la categoría de partner situada en un diagrama que no está en el banco.');
archive(350,'Los pasos de configuración de la cuenta de lectura aparecían en una imagen ausente; además el enunciado tiene siete opciones y varias podrían ser ciertas.');
archive(691,'Depende de una tabla con el JSON de origen: sin ella no se puede saber la grafía real de los elementos, que es lo que distingue las opciones.');
archive(745,'El enunciado remite a una captura del Query Profile alojada fuera del banco (enlace privado de SharePoint) y sin ella no hay forma de responder.');
archive(879,'Los importes de los resource monitors estaban en un diagrama ausente; sin él no se puede calcular el máximo de créditos.');
archive(1238,'Depende de la salida de la consulta mostrada en una imagen; la regla que evalúa (nombres de elementos sensibles a mayúsculas y entrecomillado) ya se contrasta en el ID 1341.');

// --- Archivadas: material obsoleto ---
archive(45,'Los límites actuales no fijan un tamaño máximo de fila comprimida de 16 MB: la documentación describe 128 MB sin comprimir para un valor VARIANT y admite objetos mayores de 16 MB en columnas ARRAY, OBJECT y VARIANT.');
archive(434,'El límite de 16 MB comprimidos para VARIANT ya no figura en la documentación: el valor documentado es de hasta 128 MB sin comprimir, contrastado en el ID 582.');
archive(758,'Repite el supuesto límite de 16 MB del tipo VARIANT, sustituido en la documentación por 128 MB sin comprimir (ID 582).');
archive(954,'Mismo límite obsoleto de 16 MB para VARIANT; la propia explicación del original ya señalaba la contradicción con los 128 MB documentados.');
archive(441,'La documentación no designa un formato de carga universalmente más rápido; la elección depende del volumen, la compresión y la estructura de los archivos. Además citaba un artículo de la comunidad, no la documentación.');
archive(445,'Duplica la pregunta anterior sobre el formato «más eficiente» y comparte el mismo problema: no hay una respuesta universal documentada.');
archive(50,'La documentación no publica un número fijo de servidores por talla de warehouse; solo indica que los recursos de cómputo se duplican con cada incremento de tamaño.');
archive(254,'Mismo supuesto no documentado de servidores por talla; además repite el ID 50.');
archive(387,'La MFA de Snowflake admite hoy passkeys, aplicaciones de autenticación (TOTP) y Duo, y recomienda passkeys, así que ya no se necesita una aplicación concreta. Los métodos actuales se contrastan en el ID 1296.');
archive(650,'Duo es uno de los tres métodos admitidos, no el servicio que da soporte a la MFA; contenido actualizado en el ID 1296.');
archive(773,'Repite la atribución de la MFA a Duo Security, superada por los métodos actuales (passkeys, TOTP y Duo) del ID 1296.');
archive(601,'El enunciado sobre datos «en streaming» ya no se resuelve solo con Snowpipe: Snowflake documenta Snowpipe Streaming para la ingesta de filas, contrastado en los IDs 3010 y 3011.');
archive(1146,'La premisa es falsa: DOUBLE es un tipo de coma flotante aproximado y pierde precisión decimal, como advierte la propia documentación de tipos numéricos. El matiz ya se evalúa en el ID 552.');
archive(526,'La documentación ya no mantiene la página de Partner Connect con ese nombre: redirige a las pruebas de aplicaciones SaaS desde listings.');
archive(596,'Repite el rol de Partner Connect, cuya documentación ha sido sustituida por la de pruebas de aplicaciones SaaS desde listings.');
archive(777,'Clave incompleta y desactualizada: las políticas de red usan reglas de red que admiten IPv4, IPv6 y puntos de enlace privados. El control por políticas de red ya se evalúa en los IDs 548, 401 y 669.');
archive(406,'Clave engañosa: el modo auto-scale habilita clústeres adicionales, pero lo que evita la espera es la política Standard, ya contrastada en el ID 1332.');

// --- Archivadas: duplicados de preguntas ya contrastadas ---
archive(70,'Repite la recomendación de MFA para ACCOUNTADMIN, ya contrastada en el ID 223 de esta tanda.');
archive(546,'Repite la recomendación de MFA para ACCOUNTADMIN (ID 223).');
archive(735,'Repite las dos buenas prácticas de ACCOUNTADMIN (MFA y al menos dos usuarios) del ID 223.');
archive(169,'Repite los niveles de aplicación de las políticas de red, ya contrastados en el ID 401.');
archive(519,'Repite los niveles de aplicación de las políticas de red (ID 401).');
archive(422,'Repite los servicios de la capa de cloud services, ya contrastados en los IDs 152, 215 y 381.');
archive(551,'Repite ORGADMIN como rol de organización, ya contrastado en los IDs 184 y 881 de esta tanda.');
archive(638,'Repite ORGADMIN para habilitar la replicación de cuentas, cubierto por los IDs 184, 881 y 811 de esta tanda.');
archive(793,'Duplica el ID 881 (actividades de ORGADMIN) con las mismas respuestas de uso y replicación.');
archive(868,'Repite ORGADMIN como rol que habilita la replicación entre cuentas (IDs 184 y 811).');
archive(918,'Repite ORGADMIN para operaciones sobre cuentas, ya contrastado en los IDs 184 y 881.');
archive(921,'Repite ORGADMIN como titular de SYSTEM$GLOBAL_ACCOUNT_SET_PARAMETER, función ya contrastada en el ID 811.');
archive(761,'Repite ACCOUNTADMIN como rol que crea shares por defecto, ya contrastado en el ID 410 de esta tanda.');
archive(820,'Repite ACCOUNTADMIN para gestionar shares del Data Exchange (ID 410).');
archive(911,'Repite los objetos que pueden añadirse a un share (tablas y funciones seguras), ya contrastado en los IDs 222, 373 y 593.');
archive(508,'Duplica el ID 140 sobre privilegios en objetos clonados y su redacción («child schema objects») no distingue con claridad de «child objects», que es la documentada.');
archive(784,'Duplica el ID 140: el clon hereda los privilegios de todos los objetos hijos, no solo de esquemas y tablas, así que las opciones no discriminan.');
archive(718,'Repite el privilegio ADD SEARCH OPTIMIZATION sobre el esquema, ya contrastado en el ID 274 de esta tanda.');
archive(1243,'Repite los privilegios para restaurar un objeto (ID 571) y además sitúa CREATE TABLE en la base de datos, cuando es un privilegio de esquema.');
archive(628,'Confunde el acceso a los datos de una vista segura con la visibilidad de su definición; esta última se evalúa, ya acotada, en el ID 896 de esta tanda.');
archive(844,'Repite el propósito de la autenticación federada, ya contrastado en los IDs 269 y 1321.');
archive(877,'Ambigua: además de ACCOUNTADMIN y SECURITYADMIN, cualquier rol propietario del esquema puede conceder privilegios en un esquema de acceso gestionado, como se evalúa en los IDs 564 y 3063.');
archive(329,'Ambigua por el mismo motivo: tanto la propiedad del esquema como el privilegio global MANAGE GRANTS permiten decidir las concesiones (IDs 564 y 3063).');
archive(937,'Repite la combinación DAC y RBAC del modelo de control de acceso, ya contrastada en los IDs 241 y 1331.');
archive(910,'Repite la autenticación por par de claves como método de conexión, ya contrastada en los IDs 356, 788 y 3015.');
archive(592,'Es un subconjunto del ID 733 de esta tanda, que exige CREATE DATABASE e IMPORT SHARE para consumir un listing.');
archive(72,'Repite que los resultados de una consulta solo son accesibles para quien la ejecutó, ya contrastado en el ID 859.');
