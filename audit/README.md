# Auditoría SnowPro Core — 2026-09-23

Banco original: 1412 preguntas. SHA-256: `8d8b5dc37811eb438f0e09542665619e3820d85810a4cd7fff8727b065f33492`.

Se conserva intacto en [original/snowpro-core.json](original/snowpro-core.json). No se ha verificado independientemente la procedencia comercial.

## Alcance y resultados

Cribado editorial de enunciados y claves del banco, controles estructurales y revisión documental de una selección. No es una certificación de exactitud de las 1412 preguntas ni una revisión documental exhaustiva de cada distractor original.

- Contrastadas: **823**, incluyendo **70 originales nuevas**.
- Pendientes de validación documental: **0**.
- Apartadas para revisión prioritaria: **360**. Una sospecha no equivale a demostrar que la pregunta es falsa.
- Archivadas (duplicados exactos o casi exactos, consejos, trivia o dependencia de una interfaz antigua): **299**.
- Reformuladas/corregidas: **241**.

El simulacro y la práctica predeterminada usan solo contrastadas. La práctica ampliada permite pendientes con aviso; nunca incluye apartadas ni archivadas. Todo el original sigue en el registro.

## Guía y pesos

[Guía oficial](https://publish-p93462-e887935.adobeaemcloud.com/content/dam/snowpro-sg/SnowProCoreStudyGuideC03.pdf). Pesos: 31/20/18/21/10. El 31% es arquitectura y funcionalidades, no IA sola. No se atribuyen pesos inventados a subobjetivos. Git se ubica en 3.3, IA/aplicaciones en 1.6.

## Mapa por objetivo

| Objetivo | Preguntas contrastadas | IDs |
|---|---:|---|
| 1.1 Architecture and editions | 38 | 16, 23, 36, 62, 86, 95, 97, 117, 138, 141, 148, 152, 159, 163, 168, 176, 179, 183, 214, 215, 218, 225, 253, 261, 283, 313, 381, 402, 424, 430, 581, 609, 651, 678, 977, 1003, 1210, 1293 |
| 1.2 Interfaces and tools | 9 | 7, 87, 204, 446, 477, 1088, 1152, 3001, 3002 |
| 1.3 Object hierarchy and types; session context | 29 | 12, 98, 129, 171, 174, 240, 336, 355, 384, 425, 431, 478, 483, 484, 550, 578, 646, 652, 682, 696, 704, 730, 959, 1044, 1304, 1316, 2042, 3038, 3039 |
| 1.4 Virtual warehouses | 55 | 2, 17, 26, 29, 41, 61, 63, 64, 73, 76, 78, 85, 99, 103, 112, 120, 127, 137, 139, 146, 201, 209, 237, 252, 296, 319, 347, 357, 362, 417, 433, 457, 459, 466, 472, 475, 514, 523, 597, 614, 619, 621, 647, 770, 825, 833, 845, 874, 882, 1117, 1328, 1332, 3003, 3004, 3060 |
| 1.5 Storage, table types and views | 39 | 1, 10, 28, 42, 44, 93, 101, 116, 186, 255, 287, 294, 309, 340, 399, 419, 426, 429, 463, 527, 535, 555, 586, 598, 625, 703, 741, 746, 749, 753, 1037, 1330, 2023, 2025, 2028, 2030, 3005, 3033, 3059 |
| 1.6 AI/ML and application development | 27 | 653, 904, 1116, 1153, 2001, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2015, 2016, 2019, 2020, 2021, 2044, 2045, 2050, 2057, 3027, 3028, 3029, 3030, 3031, 3032 |
| 2.1 Security model and access control | 107 | 4, 19, 52, 55, 59, 79, 82, 108, 109, 128, 134, 184, 213, 223, 234, 239, 241, 257, 264, 269, 272, 273, 274, 280, 291, 308, 318, 342, 356, 366, 367, 370, 390, 398, 400, 401, 409, 412, 420, 455, 461, 470, 521, 525, 534, 541, 548, 553, 562, 564, 567, 573, 604, 622, 635, 669, 707, 717, 766, 782, 788, 813, 819, 851, 852, 855, 881, 885, 886, 891, 926, 927, 928, 942, 948, 952, 957, 978, 983, 994, 1042, 1046, 1050, 1074, 1081, 1085, 1091, 1104, 1138, 1155, 1174, 1202, 1237, 1247, 1269, 1273, 1296, 1321, 1331, 3014, 3015, 3016, 3045, 3046, 3063, 3064, 3065 |
| 2.2 Data governance | 40 | 156, 158, 195, 205, 216, 311, 368, 460, 474, 486, 577, 589, 591, 663, 670, 714, 715, 738, 747, 785, 896, 929, 956, 992, 1068, 1087, 1094, 1122, 1130, 1139, 1143, 1173, 1185, 1309, 3012, 3013, 3017, 3018, 3036, 3037 |
| 2.3 Monitoring and cost management | 44 | 8, 9, 20, 102, 105, 106, 121, 162, 289, 298, 312, 317, 326, 327, 351, 360, 361, 380, 389, 450, 465, 482, 496, 498, 572, 688, 791, 816, 865, 933, 996, 1049, 1069, 1093, 1123, 1179, 1187, 1230, 1275, 1277, 1344, 1347, 3011, 3047 |
| 3.1 Data loading and unloading | 131 | 5, 6, 11, 22, 27, 35, 77, 81, 88, 111, 118, 122, 126, 135, 145, 147, 151, 161, 165, 180, 182, 189, 191, 202, 206, 211, 217, 230, 248, 251, 263, 267, 275, 279, 284, 301, 302, 303, 320, 331, 335, 341, 346, 352, 354, 363, 364, 369, 378, 388, 395, 408, 423, 427, 436, 437, 439, 454, 467, 469, 491, 500, 503, 510, 513, 517, 532, 542, 556, 563, 569, 570, 576, 584, 585, 587, 603, 627, 631, 634, 636, 639, 644, 645, 649, 657, 665, 685, 719, 725, 729, 744, 757, 778, 789, 800, 803, 805, 814, 836, 841, 846, 856, 873, 887, 938, 969, 986, 1015, 1018, 1020, 1054, 1056, 1060, 1066, 1075, 1076, 1092, 1100, 1114, 1165, 1170, 1178, 1208, 1211, 1212, 1291, 1310, 1329, 3052, 3053 |
| 3.2 Automated ingestion | 29 | 30, 33, 69, 74, 107, 181, 197, 200, 245, 334, 359, 376, 386, 447, 481, 612, 643, 806, 857, 1149, 1169, 1348, 2027, 3006, 3007, 3008, 3009, 3010, 3055 |
| 3.3 Connectors and integrations | 22 | 34, 304, 416, 632, 648, 743, 1229, 1241, 1292, 2024, 2031, 2032, 2034, 2036, 2039, 2040, 2041, 3034, 3035, 3054, 3061, 3062 |
| 4.1 Evaluate query performance | 46 | 143, 187, 265, 282, 310, 393, 407, 413, 440, 443, 451, 488, 505, 509, 539, 580, 600, 613, 641, 690, 692, 760, 762, 792, 809, 850, 861, 875, 876, 915, 972, 974, 1129, 1189, 1197, 1224, 1274, 1283, 1287, 1311, 3019, 3020, 3021, 3022, 3056, 3057 |
| 4.2 Optimize query performance | 28 | 124, 144, 212, 221, 229, 256, 305, 414, 444, 540, 637, 831, 832, 858, 871, 872, 943, 984, 1031, 1095, 1182, 1191, 1232, 1266, 1301, 1350, 3043, 3044 |
| 4.3 Caching | 15 | 84, 133, 172, 193, 198, 286, 293, 316, 323, 349, 353, 579, 859, 922, 3042 |
| 4.4 Data transformation | 64 | 37, 47, 57, 89, 175, 177, 188, 246, 258, 295, 307, 365, 392, 403, 438, 458, 485, 516, 545, 547, 549, 552, 558, 582, 590, 610, 620, 623, 630, 640, 655, 695, 702, 709, 755, 764, 823, 824, 837, 878, 905, 916, 966, 971, 979, 991, 995, 1009, 1025, 1038, 1084, 1098, 1131, 1132, 1233, 1239, 1302, 1307, 1308, 1341, 2009, 3040, 3041, 3058 |
| 5.1 Collaboration and protection | 45 | 13, 24, 49, 58, 65, 100, 115, 130, 136, 140, 164, 166, 170, 208, 210, 226, 231, 233, 236, 238, 266, 290, 300, 358, 394, 396, 404, 504, 530, 571, 606, 624, 713, 756, 811, 900, 903, 941, 990, 1115, 1140, 1192, 1242, 3048, 3049 |
| 5.2 Data sharing | 39 | 18, 53, 123, 131, 222, 322, 325, 330, 344, 371, 373, 379, 410, 452, 453, 468, 487, 520, 531, 533, 593, 595, 693, 754, 781, 796, 797, 853, 866, 908, 1005, 1007, 1024, 1072, 1271, 1326, 3023, 3050, 3051 |
| 5.3 Marketplace and listings | 16 | 228, 733, 775, 973, 1010, 1032, 1176, 1219, 3024, 3025, 3026, 3066, 3067, 3068, 3069, 3070 |

Una presencia en esta tabla no demuestra cobertura total. Las candidatas por palabras clave están separadas en el JSON; no cuentan como contrastadas. Ver [coverage-gaps.md](coverage-gaps.md) para carencias y profundidad.

## Trazabilidad

[Registro CSV](review-ledger.csv): decisión y motivo por pregunta. [Registro JSON](review-ledger.json): también versiones antes/después. [Resumen de la app](../public/data/snowpro-core-audit.json). Las fuentes concretas están en cada pregunta; el estado de consulta se registra en sources.json.

## Progreso y límites

Se conservan los IDs. Las estadísticas se reasignan por pregunta al nuevo dominio. Las preguntas reformuladas conservan su historial, pero reinician la racha/dominio para no contar una antigua clave como aprendida. El histórico de simulacros se conserva, pero solo sesiones de la versión vigente cuentan para la señal orientativa.

750/1000 es puntuación escalada, no 75% de aciertos. La app usa 75% como objetivo interno de práctica; no predice aprobar. No se probaron consultas en una cuenta real de Snowflake.

## Mantenimiento

Editar scripts/reviewed-questions.mjs, scripts/new-questions.mjs o el script de la tanda correspondiente (scripts/review-batch-*.mjs, con sus IDs congelados en audit/*-ids.json); ejecutar npm run audit (alias de audit:build) y npm test. No volver a ejecutar el antiguo fix-multi-answers sobre este banco. Las nuevas preguntas son material original de práctica, no preguntas de exámenes.
