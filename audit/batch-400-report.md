# Cuarta tanda de 100 pendientes

Primeras 100 pendientes por orden de ID tras la tercera tanda: selección entre IDs 653 y 814, congelada en batch-400-ids.json. Antes de empezar se comprobó que las 100 seguían con `review.status === 'pending'` y que eran exactamente las 100 primeras pendientes.

**44 conservadas con explicación revisada, 11 corregidas o reformuladas y 45 archivadas.** Ninguna de estas 100 queda pendiente ni apartada.

Banco resultante: 564 contrastadas, 391 pendientes, 454 apartadas y 73 archivadas. En total, 157 preguntas originales corregidas o reformuladas. Versión del banco: `cof-c03-2026-09-21-batch400`. Solo las 11 corregidas de esta tanda reciben esa `contentRevision`; las revisiones de tandas anteriores se conservan.

Contraste realizado con la guía oficial COF-C03 (objetivos y pesos) y la documentación vigente de Snowflake. Las 23 referencias nuevas que usan las preguntas contrastadas se han añadido a sources.json.

## Por qué hay tantas archivadas

Este tramo del banco repite mucho material ya contrastado. Se archivaron:

- **36 casi duplicados**: la misma pregunta y la misma respuesta que una contrastada (o que otra conservada en esta tanda). En varios casos, además, había una alternativa ambigua. Cuando dos preguntas solo tratan el mismo tema, pero preguntan otra cosa o tienen otra respuesta, se conservaron ambas.
- **7 por dependencia de la interfaz**: el área *Activity* de Snowsight ahora figura como *Monitoring* (IDs 675, 677, 689 y 801), la ubicación del menú de usuario (802), los tipos de gráficos (742, mismo criterio que ID 442) y un límite de descarga que no aparece en la documentación vigente (804).
- **2 obsoletas o imprecisas**: la 659 trata un archivo de configuración de SnowSQL, cliente heredado que no aparece en la guía, y su clave es ambigua. La 723 tenía una clave imprecisa sobre las vistas compartidas.

Archivar conserva el original y el motivo en el registro. No afirma que la pregunta fuese falsa.

## Hallazgos principales

- **ID 762**: MAX_CONCURRENCY_LEVEL también es un parámetro de objeto (warehouse) que controla la concurrencia, así que el original tenía tres respuestas plausibles. Reformulada para preguntar por los límites de tiempo (STATEMENT_TIMEOUT_IN_SECONDS y STATEMENT_QUEUED_TIMEOUT_IN_SECONDS).
- **IDs 781 y 723**: la documentación vigente permite compartir vistas no seguras si el share se crea o modifica con `SECURE_OBJECTS_ONLY = FALSE`. «Solo vistas seguras» es el comportamiento por defecto. La 781 se acota a ese caso y la 723 se archiva.
- **ID 782**: en Snowsight, lo que ve y puede hacer un usuario depende del rol primario junto con los roles secundarios activados, no solo del «rol activo».
- **ID 796**: el distractor «HTTPS URL» era ambiguo, porque una URL prefirmada es una URL HTTPS. La explicación estaba en español y no justificaba la respuesta.
- **ID 729**: tenía una pseudosintaxis marcada como «inventada» en su nota. Ahora usa sentencias reales: `COPY INTO @my_stage FROM my_table;` frente a la carga inversa y a PUT.
- **IDs 753 y 763**: un distractor de los metadatos de micro-particiones («recuento de valores» o «valores nulos») podía ser verdadero, porque la documentación menciona propiedades adicionales sin enumerarlas. Se corrige la 753 y se archiva la 763 por duplicada.
- **ID 756**: el distractor «restaurar tablas eliminadas de un share» era ambiguo, porque Time Travel sí restaura tablas eliminadas. Se sustituye por un límite de retención de las tablas transitorias.
- **ID 703**: el distractor sobre clonar una tabla transitoria como permanente no tiene respaldo en la documentación vigente para tablas estándar. Se sustituye y se mantienen las claves.
- **ID 690**: confundía la pestaña Query Details con Query Profile.
- **IDs 746 y 749**: la 746 precisa que el mantenimiento lo hace un servicio en segundo plano con cómputo de Snowflake. La 749 repetía la limitación de una sola tabla (ID 212) y ahora evalúa que los datos de una vista materializada están siempre al día.
- **ID 738**: la explicación afirmaba que ACCESS_HISTORY registra direcciones IP. Se corrige la explicación; la pregunta se conserva.
- **ID 786**: la recomendación de usar JDBC/ODBC para herramientas no listadas ya no aparece en la documentación de ecosistema, que ahora remite a la web de partners. Además repetía las IDs 34, 3061 y 3062.
- Se sustituyen explicaciones en español o con notas de procedencia («DUDOSA», «inventada») por explicaciones en inglés con referencia oficial.

Objetivos de las 55 contrastadas en esta tanda: 1.1 (1), 1.3 (2), 1.4 (1), 1.5 (5), 1.6 (1), 2.1 (5), 2.2 (6), 2.3 (2), 3.1 (12), 3.2 (1), 3.3 (1), 4.1 (5), 4.4 (5), 5.1 (2), 5.2 (5) y 5.3 (1). Es una asignación editorial: no acredita cobertura completa de esos objetivos.

## Hallazgo fuera de esta tanda (sin modificar)

- **ID 487** (contrastada en la tercera tanda) usa «A non-secure standard view» como distractor de los objetos que se pueden compartir. Con `SECURE_OBJECTS_ONLY = FALSE` una vista no segura sí puede añadirse a un share. No se modifica aquí para no alterar revisiones de tandas anteriores; conviene revisarla aparte, acotándola al share por defecto y con su propia `contentRevision`.

## Registro por pregunta

| ID | Decisión | Referencia o motivo |
|---|---|---|
| 653 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/snowpark/index) |
| 655 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/operators-query) |
| 657 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url) |
| 658 | Archivar | Repite la identificación del search optimization service para búsquedas selectivas, ya contrastada en IDs 144, 221, 414 y 3043. |
| 659 | Archivar | SnowSQL es un cliente heredado que no figura en la guía COF-C03, y la clave es ambigua: los archivos snowsql.cnf también son ubicaciones de configuración documentadas. |
| 663 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 665 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-prepare) |
| 669 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies) |
| 670 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tag-based-masking-policies) |
| 673 | Archivar | Repite ARRAY y VARIANT como tipos para datos semiestructurados, ya contrastado en ID 623. |
| 675 | Archivar | Memoriza páginas del antiguo área Activity de Snowsight, que hoy figura como Monitoring; mismo criterio que ID 476. |
| 676 | Archivar | Repite cuándo evitar la suspensión automática (carga estable y sin latencia de reanudación), ya contrastado en ID 76. |
| 677 | Archivar | Depende del antiguo área Activity de Snowsight (hoy Monitoring); el análisis de consultas ya se evalúa con preguntas funcionales de Query History y Query Profile. |
| 678 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 679 | Archivar | Repite seguridad y gestión de metadatos como servicios de cloud services, ya contrastado en IDs 152 y 215. |
| 682 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/ddl-database) |
| 683 | Archivar | Repite el derrame a almacenamiento local o remoto como señal de falta de memoria, ya contrastado en IDs 143, 282 y 413. |
| 685 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-transform) |
| 687 | Archivar | Repite los motivos para usar vistas seguras (proteger datos sensibles y ocultar la definición), ya contrastados en ID 586. |
| 688 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 689 | Archivar | Depende del antiguo área Activity de Snowsight (hoy Monitoring) y de qué vistas ofrece la interfaz, que cambian con el tiempo; mismo criterio que ID 476. |
| 690 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity). El original confundía la sección de detalles con Query Profile y usaba como distractor el rol, dato que la documentación no sitúa en Query Details; reformulado sobre la información documentada. |
| 692 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory) |
| 693 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 695 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/semistructured-considerations) |
| 696 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/udf-stored-procedure-naming-conventions) |
| 699 | Archivar | Duplica ID 657 con un distractor ambiguo: BUILD_SCOPED_FILE_URL también genera una URL de Snowflake a partir del stage y la ruta relativa. |
| 700 | Archivar | Repite OBJECT_CONSTRUCT para descargar datos relacionales como JSON, ya contrastado en ID 517 (mismo criterio que ID 554). |
| 701 | Archivar | Repite la URL prefirmada como acceso sin autenticación, ya contrastada en ID 388. |
| 702 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/semistructured-considerations) |
| 703 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-temp-transient). Sustituido el distractor sobre clonar tablas transitorias como permanentes: la documentación vigente no enuncia esa regla para tablas estándar. Claves conservadas. |
| 705 | Archivar | Repite las claves de clustering para tablas muy grandes (IDs 1, 186 y 305) y admite otra respuesta plausible: las vistas materializadas también pueden acelerar consultas. |
| 706 | Archivar | Repite la capa de cómputo a la que pertenecen los warehouses, ya contrastada en ID 424. |
| 710 | Archivar | Repite Time Travel como acceso a datos históricos (ID 136); además, «mantenimiento de datos históricos» también podría atribuirse a Fail-safe. |
| 712 | Archivar | Repite los warehouses multiclúster para resolver concurrencia, ya contrastados en IDs 201, 597 y 614. |
| 713 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/client-redirect) |
| 714 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/classify-intro) |
| 715 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/object-tagging/introduction) |
| 717 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/scim-intro) |
| 719 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-load) |
| 721 | Archivar | Repite GET_PRESIGNED_URL para acceder a archivos sin cuenta de Snowflake, ya contrastado en ID 500. |
| 723 | Archivar | Clave imprecisa: con SECURE_OBJECTS_ONLY = FALSE un share puede incluir vistas no seguras. La regla por defecto se reformula en ID 781 y el resto de afirmaciones ya se evalúa en IDs 228 y 379. |
| 726 | Archivar | Repite la limitación de las vistas materializadas a una sola tabla sin joins, ya contrastada en ID 212. |
| 727 | Archivar | Repite la URL prefirmada como acceso sin autenticación, ya contrastada en ID 388. |
| 729 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location). Sustituida una pseudosintaxis (COPY INTO @STAGE FROM TABLE) por sentencias reales; la nota del original advertía que era una versión inventada. |
| 731 | Archivar | Repite COPY INTO para descargar filas de una tabla a un stage, ya contrastado en ID 584 y en la sintaxis corregida del ID 729. |
| 732 | Archivar | Repite COPY INTO para descargar datos de una tabla o consulta a un stage, ya contrastado en ID 584. |
| 738 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/access-history) |
| 739 | Archivar | Repite FORCE = TRUE para volver a cargar archivos ya cargados, ya contrastado en ID 587. |
| 740 | Archivar | Repite la pérdida de acceso al recrear objetos compartidos sin volver a concederlos al share, ya contrastada en ID 520. |
| 741 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 742 | Archivar | Trivia sobre tipos de gráficos de Snowsight, una interfaz cambiante; mismo criterio que ID 442. |
| 743 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 744 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables) |
| 746 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized). Precisada la clave: el mantenimiento lo hace un servicio en segundo plano con cómputo de Snowflake, no un warehouse del usuario. |
| 749 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized). La clave original (una sola tabla, sin joins) repetía la pregunta 212; reformulada sobre la vigencia de los datos, que el original trataba en un distractor. |
| 752 | Archivar | Repite el uso de ACCESS_HISTORY para analizar el uso de tablas, ya contrastado en IDs 474 y 589. |
| 753 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions). Sustituido un distractor que podía ser verdadero (recuento de valores, posible propiedad adicional de los metadatos) por otro claramente falso. |
| 754 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-provider) |
| 755 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/typeof) |
| 756 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-time-travel). Sustituido el distractor sobre restaurar tablas eliminadas de un share, ambiguo porque Time Travel sí restaura tablas eliminadas. Clave conservada. |
| 757 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables) |
| 759 | Archivar | Repite la lista de servicios de cloud services (IDs 152, 163, 215 y 381); además, el distractor de enmascaramiento dinámico es discutible porque cloud services incluye el control de acceso. |
| 762 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/parameters). MAX_CONCURRENCY_LEVEL también es un parámetro de objeto (warehouse) que controla la concurrencia: el original tenía tres respuestas plausibles. Acotado a los límites de tiempo. |
| 763 | Archivar | Duplica ID 753 y su distractor «Null values» no es claramente falso: la documentación menciona propiedades adicionales de los metadatos sin enumerarlas. |
| 764 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions-window-syntax) |
| 765 | Archivar | Repite la tabla de directorio como almacén de metadatos de los archivos del stage, ya contrastada en ID 369 y en los IDs 744 y 757 de esta tanda. |
| 766 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-privileges) |
| 769 | Archivar | Repite LIST sobre un stage con nombre, ya contrastado en ID 279. |
| 770 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse) |
| 771 | Archivar | Repite ARRAY y VARIANT como tipos para datos semiestructurados, ya contrastado en ID 623. |
| 774 | Archivar | Repite la diferencia entre Notify & Suspend y Notify & Suspend Immediately, ya contrastada en IDs 298 y 1049. |
| 775 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-exchange-marketplace-privileges) |
| 778 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-prepare) |
| 779 | Archivar | Repite el escalado vertical del warehouse para una consulta compleja, ya contrastado en IDs 17 y 137. |
| 781 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege-share). La documentación vigente permite compartir vistas no seguras si el share usa SECURE_OBJECTS_ONLY = FALSE; se acota el escenario al comportamiento por defecto. |
| 782 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-gs). La documentación actual atribuye la visibilidad al rol primario junto con los roles secundarios activados, no solo al «rol activo». |
| 785 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/access-history) |
| 786 | Archivar | La recomendación citada ya no figura en la documentación vigente (el ecosistema remite a la web de partners) y la conexión mediante drivers estándar ya se evalúa en IDs 34, 3061 y 3062. |
| 788 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/key-pair-auth) |
| 790 | Archivar | Repite STRIP_OUTER_ARRAY para cargar cada elemento en una fila, ya contrastado en ID 335. |
| 791 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/cost-understanding-data-storage) |
| 792 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 794 | Archivar | Repite quién puede conceder privilegios en un esquema de acceso gestionado, ya contrastado en IDs 564 y 3063. |
| 795 | Archivar | Repite las recomendaciones ante el derrame de memoria (ID 600) e incluye un distractor plausible: leer solo las columnas necesarias también puede reducir memoria. |
| 796 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/unstructured-data-sharing). Eliminado el distractor «HTTPS URL», ambiguo porque una URL prefirmada es una URL HTTPS; la explicación original estaba en español y sin justificación. |
| 797 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 799 | Archivar | Repite autenticación y análisis/optimización de consultas como servicios de cloud services, ya contrastado en ID 381. |
| 800 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 801 | Archivar | Depende del antiguo área Activity de Snowsight (hoy Monitoring); Query History y Query Profile ya se evalúan con preguntas funcionales. |
| 802 | Archivar | Memoriza la ubicación de opciones del menú de usuario de Snowsight; mismo criterio que ID 476. |
| 803 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-file-format) |
| 804 | Archivar | Trivia de interfaz: el límite de descarga de 100 MB no figura en la documentación vigente y compartir worksheets ya se evalúa en ID 204. |
| 805 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/get_presigned_url) |
| 806 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro) |
| 808 | Archivar | Repite External Tokenization como característica de seguridad a nivel de columna, ya contrastada en IDs 156 y 577. |
| 809 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 810 | Archivar | Repite la ausencia de Fail-safe en tablas temporales y transitorias, ya contrastada en ID 164. |
| 812 | Archivar | Repite las características de las tablas de directorio con datos no estructurados, ya contrastadas en ID 369 y en el ID 757 de esta tanda. |
| 814 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage) |

Cambios completos en batch-400-decisions.json. Originales y versiones finales, en review-ledger.json. Fuentes consultadas, en sources.json.

## Comprobaciones

`npm run audit` (nuevo alias de `audit:build`) y `npm test` pasan: 12 pruebas. Las nuevas comprueban lo siguiente:

- que las 100 IDs de la tanda tienen una sola decisión aplicada;
- que las tandas siguen la regla de las siguientes 100 pendientes por ID;
- que cada `contentRevision` pertenece solo a las corregidas de su tanda;
- que el registro conserva el original de cada pregunta de esta tanda.

Tras regenerar, solo cambiaron las 100 preguntas de la tanda, y solo las 11 corregidas cambiaron de revisión.

No se repitieron pruebas de navegador ni la compilación, porque solo cambia contenido. No se ejecutaron consultas en una cuenta real de Snowflake. Los tests comprueban estructura y comportamiento, no la exactitud semántica de las respuestas. «Corregir/reformular» incluye mejoras de precisión aunque la clave original no fuese falsa.
