# Cobertura y siguientes revisiones

La selección contrastada permite practicar los 19 objetivos, pero **no cubre exhaustivamente sus subtemas**. El número de preguntas tampoco mide profundidad: muchas evalúan reconocimiento, mientras el examen puede plantear escenarios. Los pesos del simulacro representan los cinco dominios; no existe una ponderación oficial publicada para cada subobjetivo.

| Objetivo | Ampliación prioritaria |
|---|---|
| 1.1 | Ediciones reforzadas con esta tanda; faltan más decisiones de arquitectura por escenario. |
| 1.2 | Más uso de Snowsight, CLI e IDE; ahora siete preguntas contrastadas. La navegación de Snowsight cambia (Activity pasó a Monitoring): evaluar funciones, no ubicaciones de menús. |
| 1.3 | Jerarquía y ámbito de más objetos y parámetros; UDF frente a procedimientos. |
| 1.4 | Snowpark-optimized, políticas de escalado y elección Gen1/Gen2 según carga. |
| 1.5 | Iceberg, vistas materializadas/seguras y clustering en escenarios. |
| 1.6 | AISQL y elección entre servicios Cortex; permisos, costes y limitaciones. |
| 2.1 | SSO, OAuth, key-pair y políticas de red; evitar memorizar reglas MFA antiguas. |
| 2.2 | Cifrado, clasificación, etiquetas, privacidad y continuidad/replicación. |
| 2.3 | ACCOUNT_USAGE frente a INFORMATION_SCHEMA; costes serverless. |
| 3.1 | Combinaciones de COPY, errores, formatos, cifrado y directory tables. |
| 3.2 | Escenarios integrados de tasks/streams/dynamic tables/Streaming. Openflow requiere comprobar disponibilidad general y alcance de la guía vigente. |
| 3.3 | Añadidas preguntas de Python DB-API y JDBC. Faltan escenarios de configuración, autenticación y API integrations. |
| 4.1 | Interpretar perfiles completos con capturas propias; las preguntas originales sin imagen quedan apartadas. |
| 4.2 | Elección entre QAS, SOS, clustering y vistas materializadas con costes. |
| 4.3 | Invalidación y reutilización de cachés en escenarios combinados. |
| 4.4 | Transformaciones SQL más complejas y datos no estructurados. |
| 5.1 | Matices de replicación/failover, clonación y recuperación según edición/objeto. |
| 5.2 | Secure sharing y clean rooms con permisos y restricciones. Las vistas no seguras pueden compartirse con SECURE_OBJECTS_ONLY = FALSE: revisar aparte el ID 487. |
| 5.3 | Ampliado a ocho preguntas de listings y Native Apps. Faltan escenarios de permisos, instalación y ciclo de actualización. |

## Cómo continuar

1. Validar las pendientes por objetivo, empezando por estos huecos. Una coincidencia de palabras clave no basta para asignar cobertura.
2. Para cada pregunta revisar enunciado, todas las opciones, clave, explicación y referencia vigente. Corregir ambigüedades antes de habilitarla.
3. Revisar las apartadas por prioridad: claves contradictorias, imágenes ausentes, afirmaciones absolutas y límites/precios/interfaces que cambian. Estar apartada no significa necesariamente ser incorrecta.
4. Añadir escenarios originales cuando validar una pregunta antigua no resuelva el hueco. Evitar preguntas recordadas de exámenes o promesas de frecuencia de aparición.
5. Practicar con documentación y ejercicios reales además del banco. Con 564 contrastadas, sucesivos simulacros repetirán muchas preguntas: el porcentaje puede reflejar memoria.

La fuente de verdad es la guía oficial COF-C03 y la documentación de Snowflake, no la procedencia comercial ni la frecuencia de una pregunta en webs de preparación. Revalidar el banco cuando cambie la guía o antes de reservar el examen.

## Tanda acotada adicional

IDs 3061–3070: diez preguntas originales sobre Python/JDBC, permisos en esquemas administrados, jerarquía y contexto de roles, paquetes Native App y listings privados. Referencias consultadas registradas en sources.json. Esta tanda amplía contenido; no reduce el número de preguntas antiguas pendientes de validación.

La tanda de 100 pendientes (ver batch-100-report.md) valida 93 y archiva 7. Permanecen 691 pendientes y 454 apartadas; las últimas requieren una revisión separada.

Segunda tanda de 100 pendientes (batch-200-report.md): otras 97 validadas y 3 archivadas. Estado actual: 415 contrastadas, 591 pendientes y 454 apartadas. Se refuerzan permisos, funciones externas, directorios, costes, replicación y rendimiento; sigue sin afirmarse cobertura exhaustiva.

Tercera tanda de 100 pendientes (batch-300-report.md): 94 validadas y 6 archivadas. Estado actual: 509 contrastadas, 491 pendientes y 454 apartadas. Refuerzo de datos no estructurados, seguridad, secuencias, streams, SQL y rendimiento; no implica cobertura exhaustiva.

Cuarta tanda de 100 pendientes (batch-400-report.md): 55 validadas (44 conservadas y 11 corregidas) y 45 archivadas, sobre todo casi duplicados de preguntas ya contrastadas y preguntas que dependen de la interfaz de Snowsight. Estado actual: 564 contrastadas, 391 pendientes, 454 apartadas y 73 archivadas. Queda por revisar aparte el ID 487 (vistas no seguras en shares). No implica cobertura exhaustiva.


## Actualización batch 500 — 2026-09-23

Revisadas las siguientes 100 pendientes tras el batch 400: 36 conservadas, 24 corregidas y 40 archivadas. Estado acumulado: 624 contrastadas, 291 pendientes, 454 apartadas y 113 archivadas. Esta tanda depura material existente; no añade preguntas ni acredita cobertura exhaustiva de los objetivos. Véase [informe de la tanda](batch-500-report.md).


## Actualización batch 600 — 2026-09-23

100 decisiones: 28 conservadas, 24 corregidas, 47 archivadas y 1 apartada. Totales: 676 contrastadas, 191 pendientes, 455 apartadas y 160 archivadas. Se aplican cambios mínimos y distractores de familias reales; las notas sin cambio de contenido no reinician el progreso. No se añaden preguntas ni se acredita cobertura exhaustiva. [Informe](batch-600-report.md).


## Batch 700 — 2026-09-23

31 conservadas, 15 corregidas y 54 archivadas. Estado: 722 contrastadas, 91 pendientes, 455 apartadas y 214 archivadas. No se añaden preguntas ni se declara cobertura exhaustiva. [Informe](batch-700-report.md).
