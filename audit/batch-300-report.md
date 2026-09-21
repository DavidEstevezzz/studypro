# Tercera tanda de 100 pendientes

Primeras 100 pendientes por orden de ID tras la segunda tanda: selección entre IDs 452 y 652, congelada en batch-300-ids.json.

**56 conservadas con explicación revisada, 38 corregidas o reformuladas y 6 archivadas.** Ninguna de estas 100 queda pendiente.

Banco resultante: 509 contrastadas, 491 pendientes, 454 apartadas y 28 archivadas. Se conservan originales y revisiones previas.

## Cambios destacados

- ID 455: acotado a RBAC; Snowflake también admite privilegios concedidos directamente a usuarios bajo las condiciones de UBAC.
- ID 478: eliminado un resultado numérico de secuencia presentado como garantizado sin suficientes condiciones; se evalúa NEXTVAL y la ausencia de garantía de números sin huecos.
- ID 481: MAX_DATA_EXTENSION_TIME_IN_DAYS limita la extensión, no impide indefinidamente que un stream quede obsoleto.
- ID 570: cifrado cliente antes de PUT acotado a SNOWFLAKE_FULL; se distingue SNOWFLAKE_SSE.
- ID 582: 128 MB es el límite superior documentado de VARIANT sin comprimir; overhead y forma del objeto reducen el tamaño práctico.
- ID 586: los roles con privilegios específicos sí pueden consultar definiciones de vistas seguras.
- ID 614: tanto añadir clústeres como distribuir nuevas consultas a otro warehouse pueden ayudar ante concurrencia.
- ID 641: QUERY_HISTORY también sirve para investigar esperas; reformulado para preguntar por los indicadores agregados de WAREHOUSE_LOAD_HISTORY.

## Registro por pregunta

| ID | Decisión | Referencia o motivo |
|---|---|---|
| 452 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-reader-create) |
| 453 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 455 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 457 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 458 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 460 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-encryption-manage) |
| 463 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 465 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/resource-monitors) |
| 469 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 473 | Archivar | Repite el contraste caller/owner rights ya validado en ID 174; se conserva el original. |
| 476 | Archivar | Memorización de la ubicación de un menú cambiante; el uso de Query History ya se evalúa con preguntas funcionales. |
| 477 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowsql) |
| 478 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/querying-sequences) |
| 481 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 482 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 483 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights) |
| 484 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-procedure) |
| 485 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/querying-approximate-cardinality) |
| 486 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-tag) |
| 487 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 491 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 496 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-tasks) |
| 500 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/unstructured-intro) |
| 503 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/unstructured-intro) |
| 504 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-clone) |
| 510 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-considerations-load) |
| 513 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables-query) |
| 517 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 520 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 521 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/rest_event_history) |
| 540 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-materialized) |
| 541 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 544 | Archivar | Repite la transferencia de ownership al eliminar un rol, ya contrastada en ID 55. |
| 547 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/constructs/sample) |
| 552 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-numeric) |
| 554 | Archivar | Repite OBJECT_CONSTRUCT para descarga JSON, cubierto en ID 517 de esta tanda. |
| 555 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/tables-temp-transient) |
| 556 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-file-format) |
| 558 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/flatten) |
| 562 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 563 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/put) |
| 564 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-access-control-overview) |
| 567 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/grant-privilege) |
| 569 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables-query) |
| 570 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-stage) |
| 572 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 573 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/network-policies) |
| 576 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/list) |
| 577 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/security-column-intro) |
| 578 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/udf/udf-overview) |
| 579 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/querying-persisted-results) |
| 580 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/warehouse_load_history) |
| 581 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-editions) |
| 582 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 584 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 585 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables-query) |
| 586 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/views-secure) |
| 587 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-table) |
| 589 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 590 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/queries-hierarchical) |
| 591 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/account-usage/access_history) |
| 593 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-sharing-intro) |
| 595 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-share) |
| 597 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 598 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions) |
| 600 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/performance-query-warehouse-memory) |
| 603 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/get) |
| 606 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/tables-temp-transient) |
| 609 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 610 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/constructs/sample) |
| 612 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/streams-intro) |
| 613 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/ui-snowsight-activity) |
| 614 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 616 | Archivar | Repite los 14 días de metadatos del pipe, ya acotados y contrastados en ID 200. |
| 619 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-multicluster) |
| 620 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/snowflake-scripting/loops) |
| 621 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/alter-warehouse) |
| 622 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/security-mfa) |
| 623 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 624 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-failsafe) |
| 625 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/system_clustering_information) |
| 630 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 631 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables-query) |
| 632 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/snowcd) |
| 633 | Archivar | Repite la función de los streams, conservada en ID 612 de esta tanda. |
| 634 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 635 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/desc-network-policy) |
| 636 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/functions-file) |
| 637 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/search-optimization-service) |
| 639 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-unload-considerations) |
| 640 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) |
| 641 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/sql-reference/functions/warehouse_load_history) |
| 643 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-stream) |
| 644 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/copy-into-location) |
| 646 | Conservar | [Documentación](https://docs.snowflake.com/en/sql-reference/sql/create-function) |
| 647 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/warehouses-considerations) |
| 648 | Corregir/reformular | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-unstructured-rest-api) |
| 649 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/data-load-dirtables-query) |
| 651 | Conservar | [Documentación](https://docs.snowflake.com/en/user-guide/intro-key-concepts) |
| 652 | Conservar | [Documentación](https://docs.snowflake.com/en/developer-guide/stored-procedure/stored-procedures-rights) |

Cambios completos en batch-300-decisions.json; originales y versiones finales en review-ledger.json. Fuentes consultadas en sources.json.

Nueve pruebas breves pasan: decisiones completas, claves/referencias, cuotas, integridad del original y conservación de revisiones. Sin pruebas de navegador ni ejecución en una cuenta real de Snowflake. Corregir/reformular incluye mejoras de precisión aunque la clave original no fuese falsa.
