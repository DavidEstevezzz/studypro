# Primera tanda de apartadas (100 de 455)

Cerrada la cola de pendientes, esta tanda ataca el bloque apartado. No se eligió por ID, sino por dónde más se nota el resultado:

- **9 preguntas que citan una imagen** o una configuración que nunca estuvo en el banco.
- **31 con diagnóstico concreto** ya anotado en el cribado (clave sospechosa, límite histórico, sintaxis inexistente).
- **60 del objetivo 2.1** (modelo de seguridad y control de acceso), el dominio con más material apartado.

Lista congelada en quarantine-900-ids.json.

**26 conservadas, 16 corregidas o reformuladas, 53 archivadas y 5 que siguen apartadas.** Estar apartada nunca significó ser falsa: una de cada cuatro resultó correcta tal cual.

Banco resultante: 823 contrastadas, 0 pendientes, 360 apartadas y 299 archivadas. En total, 241 preguntas originales corregidas. Versión del banco: `cof-c03-2026-09-23-q900`; solo las 16 corregidas aquí reciben esa `contentRevision`.

## Claves incorrectas encontradas

Seis preguntas daban por buena una respuesta que la documentación contradice. En varias, la propia explicación del banco ya decía lo contrario que su clave:

- **459.** Al redimensionar un warehouse, las sentencias en ejecución **no se ven afectadas**; los recursos nuevos sirven a las encoladas y a las siguientes. La clave decía que migran a la nueva configuración y terminan allí.
- **341.** El historial de carga masiva vive **64 días** en los metadatos de la tabla de destino. Los 14 días son del pipe de Snowpipe.
- **730.** Una sentencia SQL puede llamar a **un solo** stored procedure y a varias UDF. La clave decía dos procedimientos.
- **1037.** Si se suspende el mantenimiento de una vista materializada, **no se puede consultar** hasta reanudarlo. La clave decía que devuelve datos con un aviso.
- **1229.** El autenticador por defecto del driver JDBC es **snowflake**, no snowflake_jwt.
- **1304.** Un procedimiento con derechos de propietario **no puede ver ni fijar** las variables de sesión del llamante; lo que sí hereda es su warehouse activo.

## Otras correcciones

- **1081.** Ninguna de las cuatro opciones era correcta: la precedencia documentada, de mayor a menor, es integración de seguridad, usuario y cuenta, y el original la invertía. Reformulada por completo.
- **553.** Activar una política de red para un usuario exige OWNERSHIP sobre el usuario y **USAGE** sobre la política, no propiedad de ambos.
- **361.** La clave incluía `SHOW STORAGE BY TABLE`, un comando que no existe; ahora la pareja correcta es `SHOW TABLES` y `TABLE_STORAGE_METRICS`, y el comando inventado queda como distractor.
- **747.** Aplicar una política de enmascaramiento ya creada se hace con `ALTER TABLE … MODIFY COLUMN … SET MASKING POLICY`; `ALTER MASKING POLICY` cambia la política, no la aplica.
- **874.** Los 6 minutos de la política Economy son una **estimación de carga** para arrancar o apagar un clúster, no una espera garantizada en cola.
- **704, 308, 318, 896, 627.** Ambigüedades acotadas: el contenido real de INFORMATION_SCHEMA, el alcance esquema frente a base de datos en los grants, los privilegios completos para crear una vista materializada, la visibilidad de la definición de una vista segura y un enunciado que arrastraba las opciones dentro del texto.

## Qué se archivó y por qué

- **9 por imagen ausente.** Incluye la 745, que remitía a una captura alojada en un SharePoint privado. Sin el recurso no hay forma de responder, así que no son recuperables.
- **17 por material obsoleto.** El límite de 16 MB del tipo VARIANT (hoy 128 MB sin comprimir) en cuatro preguntas; la MFA atribuida a Duo cuando ya se admiten passkeys y aplicaciones TOTP, en tres; el formato de carga «más rápido», que la documentación no designa, en dos; el número fijo de servidores por talla de warehouse, en dos; Partner Connect, cuya página ha sido sustituida; y la carga «en streaming» resuelta solo con Snowpipe, ahora que existe Snowpipe Streaming.
- **27 por duplicar preguntas ya contrastadas.** Sobre todo el bloque 2.1: seis preguntas distintas cuya respuesta era ORGADMIN, tres sobre MFA y ACCOUNTADMIN, dos sobre los niveles de las políticas de red y dos sobre quién crea shares.

## Las cinco que siguen apartadas

No se ha forzado su validación: **421, 464, 480, 583 y 594**. En todas falta una fuente vigente que fije la respuesta (por ejemplo, los valores admitidos del tipo en `SAML_IDENTITY_PROVIDER`, o las reglas de elección de rol al iniciar sesión). Cada una conserva su motivo concreto en el registro, así que la próxima revisión sabe qué buscar.

Objetivos de las 42 contrastadas: 2.1 (20), 3.1 (4), 1.3 (3), 5.1 (3), 1.4 (2), 2.2 (2), 5.2 (2), 1.5, 2.3, 3.3, 4.2, 4.3 y 5.3 (1 cada uno).

## Cambios en el generador

El generador ya aceptaba tandas de pendientes; ahora el bucle se ha convertido en una función `applyBatch` con un parámetro de estado de partida, de modo que una tanda puede exigir `pending` o `quarantine`. Una decisión desconocida sigue deteniendo la generación. Los tests distinguen ambos tipos de tanda y contemplan que una tanda posterior rescate una pregunta que otra dejó apartada, como ocurre con la 1056.

## Registro por pregunta

| ID | Decisión | Referencia o motivo |
|---|---|---|
| 45 | Archivar | Los límites actuales no fijan un tamaño máximo de fila comprimida de 16 MB: la documentación describe 128 MB sin comprimir para un valor VARIANT y admite objetos mayores de 16 MB en columnas ARRAY, OBJECT y VARIANT. |
| 50 | Archivar | La documentación no publica un número fijo de servidores por talla de warehouse; solo indica que los recursos de cómputo se duplican con cada incremento de tamaño. |
| 70 | Archivar | Repite la recomendación de MFA para ACCOUNTADMIN, ya contrastada en el ID 223 de esta tanda. |
| 72 | Archivar | Repite que los resultados de una consulta solo son accesibles para quien la ejecutó, ya contrastado en el ID 859. |
| 82 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-task). Privilegios comprobados en los requisitos de control de acceso de CREATE TASK; se añade EXECUTE TASK para la ejecución. |
| 140 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/object-clone). Confirmado con la sección de privilegios de objetos clonados; la sospecha del cribado no se sostiene. |
| 167 | Archivar | El enunciado se apoya en una gráfica de utilización del warehouse que no está en el banco; sin ella no se puede justificar la respuesta. |
| 169 | Archivar | Repite los niveles de aplicación de las políticas de red, ya contrastados en el ID 401. |
| 184 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/organizations). Alcance de ORGADMIN confirmado en la introducción a organizaciones; explicación en inglés. |
| 185 | Archivar | Pide elegir entre cuatro diagramas de micro-particiones que no existen en el banco. |
| 220 | Archivar | Depende del JSON mostrado en una imagen: sin él no se puede saber si la clave del objeto está en minúsculas, que es lo que decide la respuesta. |
| 223 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-considerations). Ambas recomendaciones figuran literalmente en las buenas prácticas de control de acceso; se añade el contexto del despliegue de MFA obligatoria. |
| 254 | Archivar | Mismo supuesto no documentado de servidores por talla; además repite el ID 50. |
| 263 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location). Opciones de compresión de Parquet comprobadas en COPY INTO <location>; se aclara que SNAPPY es el valor por defecto vía AUTO. |
| 270 | Archivar | Pregunta por la categoría de partner situada en un diagrama que no está en el banco. |
| 274 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization/enabling). Privilegios confirmados literalmente en la página de activación del servicio. |
| 308 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege). Las variantes con IN DATABASE también son sintaxis válida y cumplían el enunciado original; se acota el escenario al esquema para dejar una sola pareja correcta. |
| 316 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/querying-persisted-results). Condiciones confirmadas en la página de resultados persistidos; la sospecha del cribado no se sostiene. |
| 318 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges). El original daba por correcta solo la concesión de CREATE MATERIALIZED VIEW, pero para operar en el esquema hacen falta además privilegios sobre la base de datos y el esquema; la opción que los incluía quedaba marcada como incorrecta. |
| 325 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege-share). Privilegio y orden de concesión confirmados en GRANT … TO SHARE. |
| 329 | Archivar | Ambigua por el mismo motivo: tanto la propiedad del esquema como el privilegio global MANAGE GRANTS permiten decidir las concesiones (IDs 564 y 3063). |
| 341 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-load). Clave incorrecta: los metadatos de carga masiva viven 64 días en la tabla de destino; los 14 días son del pipe de Snowpipe. La propia explicación del original ya decía 64. |
| 350 | Archivar | Los pasos de configuración de la cuenta de lectura aparecían en una imagen ausente; además el enunciado tiene siete opciones y varias podrían ser ciertas. |
| 361 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/info-schema/table_storage_metrics). La clave incluía SHOW STORAGE BY TABLE, comando que no existe; se sustituye por SHOW TABLES y el comando inexistente queda como distractor. |
| 370 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-considerations). Recomendación confirmada en las buenas prácticas de control de acceso; se retira la sospecha del cribado. |
| 387 | Archivar | La MFA de Snowflake admite hoy passkeys, aplicaciones de autenticación (TOTP) y Duo, y recomienda passkeys, así que ya no se necesita una aplicación concreta. Los métodos actuales se contrastan en el ID 1296. |
| 400 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/admin-user-management). Ambas prácticas figuran en la página de gestión de usuarios; explicación en inglés y aviso sobre el rol por defecto. |
| 406 | Archivar | Clave engañosa: el modo auto-scale habilita clústeres adicionales, pero lo que evita la espera es la política Standard, ya contrastada en el ID 1332. |
| 409 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview). Jerarquía confirmada con la descripción de los roles del sistema; se aclara el papel de ORGADMIN. |
| 410 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-provider). Rol confirmado en la página de creación de shares; se añade la alternativa mediante el privilegio CREATE SHARE. |
| 421 | Mantener apartada | La documentación distingue USERADMIN (crea y gestiona roles) de SYSADMIN (padre de los roles personalizados en la jerarquía recomendada). «Qué roles se usan para crear roles personalizados» no tiene una respuesta de dos opciones respaldada: falta una fuente que fije esa pareja. |
| 422 | Archivar | Repite los servicios de la capa de cloud services, ya contrastados en los IDs 152, 215 y 381. |
| 434 | Archivar | El límite de 16 MB comprimidos para VARIANT ya no figura en la documentación: el valor documentado es de hasta 128 MB sin comprimir, contrastado en el ID 582. |
| 441 | Archivar | La documentación no designa un formato de carga universalmente más rápido; la elección depende del volumen, la compresión y la estructura de los archivos. Además citaba un artículo de la comunidad, no la documentación. |
| 445 | Archivar | Duplica la pregunta anterior sobre el formato «más eficiente» y comparte el mismo problema: no hay una respuesta universal documentada. |
| 459 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks). Clave incorrecta: la documentación dice que redimensionar no afecta a las sentencias en ejecución. El enunciado y las opciones se acotan a ese caso. |
| 461 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-considerations). Recomendación confirmada literalmente en las buenas prácticas; explicación en inglés. |
| 464 | Mantener apartada | La primera clave (crear objetos con un rol personalizado concedido a SYSADMIN) está documentada, pero no se ha encontrado respaldo actual para la segunda (esquemas de acceso gestionado como norma para objetos de ACCOUNTADMIN). Se mantiene apartada hasta localizar esa fuente. |
| 470 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/use-secondary-roles). Sintaxis confirmada en USE SECONDARY ROLES; explicación en inglés. |
| 480 | Mantener apartada | No se ha localizado en la documentación vigente la lista de tareas asociadas al privilegio CREATE DATA EXCHANGE LISTING con la que validar las dos opciones marcadas. |
| 508 | Archivar | Duplica el ID 140 sobre privilegios en objetos clonados y su redacción («child schema objects») no distingue con claridad de «child objects», que es la documentada. |
| 519 | Archivar | Repite los niveles de aplicación de las políticas de red (ID 401). |
| 526 | Archivar | La documentación ya no mantiene la página de Partner Connect con ese nombre: redirige a las pruebas de aplicaciones SaaS desde listings. |
| 546 | Archivar | Repite la recomendación de MFA para ACCOUNTADMIN (ID 223). |
| 551 | Archivar | Repite ORGADMIN como rol de organización, ya contrastado en los IDs 184 y 881 de esta tanda. |
| 553 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies). La clave exigía OWNERSHIP sobre usuario y política; la documentación pide OWNERSHIP sobre el usuario y USAGE sobre la política. |
| 571 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-time-travel). Requisitos confirmados en la página de Time Travel; explicación en inglés. |
| 583 | Mantener apartada | Las reglas sobre el rol al iniciar sesión (fallo de login sin rol por defecto, rol no concedido que se ignora) no aparecen así en la documentación actual, que solo describe el rol por defecto y PUBLIC. Requiere una fuente que fije el comportamiento. |
| 592 | Archivar | Es un subconjunto del ID 733 de esta tanda, que exige CREATE DATABASE e IMPORT SHARE para consumir un listing. |
| 594 | Mantener apartada | No se ha encontrado en la documentación vigente la lista de valores admitidos para el tipo del parámetro SAML_IDENTITY_PROVIDER; hoy se describen Okta y Entra ID como nativos y el resto como proveedores SAML 2.0 personalizados. |
| 596 | Archivar | Repite el rol de Partner Connect, cuya documentación ha sido sustituida por la de pruebas de aplicaciones SaaS desde listings. |
| 601 | Archivar | El enunciado sobre datos «en streaming» ya no se resuelve solo con Snowpipe: Snowflake documenta Snowpipe Streaming para la ingesta de filas, contrastado en los IDs 3010 y 3011. |
| 604 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview). Alcance de SYSADMIN confirmado en la descripción de los roles del sistema. |
| 627 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations). Enunciado dañado: arrastraba las opciones «A. … D.» dentro del texto. Se limpia y se añade el matiz de Parquet. |
| 628 | Archivar | Confunde el acceso a los datos de una vista segura con la visibilidad de su definición; esta última se evalúa, ya acotada, en el ID 896 de esta tanda. |
| 638 | Archivar | Repite ORGADMIN para habilitar la replicación de cuentas, cubierto por los IDs 184, 881 y 811 de esta tanda. |
| 650 | Archivar | Duo es uno de los tres métodos admitidos, no el servicio que da soporte a la MFA; contenido actualizado en el ID 1296. |
| 691 | Archivar | Depende de una tabla con el JSON de origen: sin ella no se puede saber la grafía real de los elementos, que es lo que distingue las opciones. |
| 704 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/info-schema). El original oponía «objetos de la base de datos» y «objetos de la cuenta» cuando la documentación describe ambos; reformulado con esa redacción y con distractores reales. |
| 707 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies). Confirmado literalmente en la sección de excepción de políticas de red; la sospecha del cribado no se sostiene. |
| 718 | Archivar | Repite el privilegio ADD SEARCH OPTIMIZATION sobre el esquema, ya contrastado en el ID 274 de esta tanda. |
| 730 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedures-vs-udfs). Clave incorrecta: el original decía «dos stored procedures». La documentación dice una sola por sentencia. |
| 733 | Conservar | [Documentación](https://docs.snowflake.com/en/collaboration/consumer-becoming). Privilegios confirmados en la guía del consumidor de listings; se añade el privilegio de compra. |
| 735 | Archivar | Repite las dos buenas prácticas de ACCOUNTADMIN (MFA y al menos dos usuarios) del ID 223. |
| 745 | Archivar | El enunciado remite a una captura del Query Profile alojada fuera del banco (enlace privado de SharePoint) y sin ella no hay forma de responder. |
| 747 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-column-ddm-use). La clave (ALTER MASKING POLICY) modifica la política, no la aplica a una columna; se sustituyen las opciones por sentencias reales. |
| 758 | Archivar | Repite el supuesto límite de 16 MB del tipo VARIANT, sustituido en la documentación por 128 MB sin comprimir (ID 582). |
| 761 | Archivar | Repite ACCOUNTADMIN como rol que crea shares por defecto, ya contrastado en el ID 410 de esta tanda. |
| 773 | Archivar | Repite la atribución de la MFA a Duo Security, superada por los métodos actuales (passkeys, TOTP y Duo) del ID 1296. |
| 777 | Archivar | Clave incompleta y desactualizada: las políticas de red usan reglas de red que admiten IPv4, IPv6 y puntos de enlace privados. El control por políticas de red ya se evalúa en los IDs 548, 401 y 669. |
| 784 | Archivar | Duplica el ID 140: el clon hereda los privilegios de todos los objetos hijos, no solo de esquemas y tablas, así que las opciones no discriminan. |
| 793 | Archivar | Duplica el ID 881 (actividades de ORGADMIN) con las mismas respuestas de uso y replicación. |
| 811 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/system_global_account_set_parameter). Función confirmada en su página de referencia; se sustituye la nota en español por una explicación contrastada. |
| 813 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-network-policy). Rol confirmado en CREATE NETWORK POLICY y en la activación a nivel de cuenta; explicación en inglés. |
| 819 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview). Confirmado literalmente en la descripción de los roles del sistema. |
| 820 | Archivar | Repite ACCOUNTADMIN para gestionar shares del Data Exchange (ID 410). |
| 844 | Archivar | Repite el propósito de la autenticación federada, ya contrastado en los IDs 269 y 1321. |
| 868 | Archivar | Repite ORGADMIN como rol que habilita la replicación entre cuentas (IDs 184 y 811). |
| 871 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-keys). Tipos excluidos confirmados literalmente; se aclara el uso de expresiones sobre VARIANT. |
| 874 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster). El original interpretaba los 6 minutos como una espera garantizada en cola; la documentación los usa como estimación de carga para arrancar o apagar clústeres. |
| 877 | Archivar | Ambigua: además de ACCOUNTADMIN y SECURITYADMIN, cualquier rol propietario del esquema puede conceder privilegios en un esquema de acceso gestionado, como se evalúa en los IDs 564 y 3063. |
| 879 | Archivar | Los importes de los resource monitors estaban en un diagrama ausente; sin él no se puede calcular el máximo de créditos. |
| 881 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/organizations). Actividades confirmadas en la introducción a organizaciones; explicación en inglés. |
| 886 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview). Principio confirmado en la visión general del control de acceso; explicación en inglés. |
| 891 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview). Flujos confirmados literalmente en la lista de workflows SSO admitidos. |
| 896 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-secure). Acotado a la visibilidad de la definición (no al acceso a los datos) y añadidas las vías documentadas por ACCOUNT_USAGE, que el original ignoraba. |
| 910 | Archivar | Repite la autenticación por par de claves como método de conexión, ya contrastada en los IDs 356, 788 y 3015. |
| 911 | Archivar | Repite los objetos que pueden añadirse a un share (tablas y funciones seguras), ya contrastado en los IDs 222, 373 y 593. |
| 918 | Archivar | Repite ORGADMIN para operaciones sobre cuentas, ya contrastado en los IDs 184 y 881. |
| 921 | Archivar | Repite ORGADMIN como titular de SYSTEM$GLOBAL_ACCOUNT_SET_PARAMETER, función ya contrastada en el ID 811. |
| 937 | Archivar | Repite la combinación DAC y RBAC del modelo de control de acceso, ya contrastada en los IDs 241 y 1331. |
| 954 | Archivar | Mismo límite obsoleto de 16 MB para VARIANT; la propia explicación del original ya señalaba la contradicción con los 128 MB documentados. |
| 1037 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized). Clave incorrecta: la documentación dice que la vista no se puede consultar hasta reanudar el mantenimiento, no que devuelva datos con aviso. |
| 1056 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-stage). Propósito confirmado en la página de preparación de archivos en stage; explicación en inglés. |
| 1081 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies). Ninguna opción del original era correcta: la precedencia documentada de mayor a menor es integración de seguridad, usuario y cuenta, y el original la invertía. |
| 1146 | Archivar | La premisa es falsa: DOUBLE es un tipo de coma flotante aproximado y pierde precisión decimal, como advierte la propia documentación de tipos numéricos. El matiz ya se evalúa en el ID 552. |
| 1229 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/developer-guide/jdbc/jdbc-parameters). Clave incorrecta: el autenticador por defecto es snowflake, tal como decía la propia explicación del original, no snowflake_jwt. |
| 1238 | Archivar | Depende de la salida de la consulta mostrada en una imagen; la regla que evalúa (nombres de elementos sensibles a mayúsculas y entrecomillado) ya se contrasta en el ID 1341. |
| 1243 | Archivar | Repite los privilegios para restaurar un objeto (ID 571) y además sitúa CREATE TABLE en la base de datos, cuando es un privilegio de esquema. |
| 1304 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights). Clave incorrecta: un procedimiento de owner no puede ver ni fijar las variables de sesión del caller; lo que sí hereda es el warehouse activo. |

Cambios completos en quarantine-900-decisions.json. Originales y versiones finales, en review-ledger.json. Fuentes en sources.json (10 referencias nuevas).

## Comprobaciones

`npm run audit` y `npm test` pasan: 17 pruebas. Solo cambiaron las 100 preguntas de la tanda y solo las 16 corregidas cambiaron de revisión. Sin navegador ni compilación. Los tests comprueban estructura y comportamiento, no la exactitud semántica de las respuestas.

## Qué queda

**360 apartadas**, casi todas con motivo genérico de cribado. Si el ritmo se mantiene, son unas cuatro tandas más. A la vista de esta, conviene esperar que entre un quinto y un cuarto se recuperen tal cual, que la mitad larga se archive por duplicada u obsoleta, y que aparezca alguna clave incorrecta más.
