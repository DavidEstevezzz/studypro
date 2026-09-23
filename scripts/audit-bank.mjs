import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { BANK_REVIEW_DATE, REVIEW_DATE, BANK_VERSION, INITIAL_CONTENT_REVISION, GUIDE, domains, objectives, mappingRules } from './audit-config.mjs';
import { reviewedGroups, corrections } from './reviewed-questions.mjs';
import { additions } from './new-questions.mjs';
import { batch100 } from './review-batch-100.mjs';
import { batch200 } from './review-batch-200.mjs';
import { batch300 } from './review-batch-300.mjs';
import { batch400 } from './review-batch-400.mjs';
import { batch500 } from './review-batch-500.mjs';
import { batch600 } from './review-batch-600.mjs';
import { batch700 } from './review-batch-700.mjs';
import { batch800 } from './review-batch-800.mjs';
import { quarantine900 } from './review-quarantine-900.mjs';

const root = new URL('../', import.meta.url);
const path = (p) => new URL(p, root);
mkdirSync(path('audit/original/'), { recursive: true });
const originalPath = path('audit/original/snowpro-core.json');
if (!existsSync(originalPath)) copyFileSync(path('public/data/snowpro-core.json'), originalPath);
const originalBytes = readFileSync(originalPath);
const original = JSON.parse(originalBytes);
const bank = structuredClone(original);
const byId = new Map(bank.map(q => [q.i, q]));
const before = new Map(original.map(q => [q.i, q]));
const records = new Map();
const quarantine = new Map();
function hold(ids, reason) { ids.forEach(id => quarantine.set(id, reason)); }
hold([3,14,15,21,31,32,38,40,43,45,50,51,54,59,60,66,67,68,70,71,72,75,80,82,90,91,92,96,104,110,113,114,125,132,140,142,150,153,154,155,157,160,167,169,173,178,184,185,190,192,194,196,199,203,207,219,220,223,224,227,232,235,242,243,244,247,249,250,254,259,260,262,263,268,270,271,274,276,277,278,281,285,288,292,297,299,306,308,314,315,316,318,321,324,325,328,329,332,333,337,338,339,341,343,345,348,350],
  'Revisar alcance, condiciones o clave: una lectura preliminar detectó ambigüedad, límite histórico, contexto ausente o posible respuesta adicional. No se declara incorrecta sin validar todas las opciones.');
hold([361,370,372,374,375,377,383,385,387,391,397,400,405,406,409,410,411,415,421,422,428,432,434,435,441,445,448,449,456,459,461,462,464,470,471,479,480,489,490,492,493,494,495,497,499,501,502,506,507,508,511,512,515,518,519,522,524,526,528,529,536,537,538,543,546],
  'Apartada tras cribado: posible clave o generalización incorrecta, dependencia de interfaz/versión, o condiciones insuficientes. Requiere validación individual.');
hold([551,553,557,559,560,561,565,566,568,571,574,575,583,588,592,594,596,599,601,602,604,605,607,608,611,615,617,618,626,627,628,629,638,642,650,654,656,660,661,662,664,666,667,668,671,672,674,681,684,686,691,694,697,698,704,707,708,711,716,718,720,722,724,728,730,733,734,735,736,737,745,747,751,758,760,761,767,768,772,773,776,777,780,783,784,787,793,798,807,811,813,815,817,819,820,821,826,828,829,834,835,838,839,840,844,847,854,860,864,868,869,871,874,877,879,880,881,886,888,891,892,893,895,896,897,898,902,907,910,911,914,918,921,923,924,927,931,934,935,937,944,947,949,950],
  'Pendiente prioritaria por formulación absoluta, comportamiento cambiante, respuesta sospechosa o escenario incompleto. Se excluye hasta contrastar las condiciones.');
hold([951,954,958,960,962,964,965,970,975,976,980,981,985,988,993,997,999,1002,1004,1008,1011,1013,1016,1021,1028,1030,1034,1037,1039,1043,1047,1051,1055,1057,1062,1064,1078,1080,1081,1082,1086,1089,1096,1102,1105,1106,1107,1109,1110,1112,1119,1125,1126,1136,1137,1142,1146,1148,1150,1158,1162,1163,1164,1167,1171,1177,1184,1193,1194,1195,1198,1201,1203,1209,1213,1214,1217,1218,1220,1222,1223,1226,1229,1234,1235,1236,1238,1240,1243,1248,1249,1251,1253,1254,1255,1256,1258,1259,1262,1265,1267,1268,1276,1278,1279,1280,1281,1285,1286,1289,1294,1295,1297,1300,1303,1304,1313,1314,1318,1319,1322,1325,1333,1335,1343,1345,1346,1349,1352,2002,2011,2017,2018,2022,2026,2029,2033,2035,2037,2038,2046,2047,2051,2052],
  'Revisar con documentación específica y versión actual antes de usar para evaluación; la clave o el alcance no están suficientemente justificados.');
// Precise reasons for high-impact findings; retain originals, never silently delete.
hold([167,185,220,270,350,691,745,879,1238], 'Falta imagen, tabla o configuración citada por el enunciado; no se puede resolver de forma autónoma.');
hold([45,434,758,954], 'Límite histórico de 16 MB sin contexto de tipo/versión; contrastar con límites actuales.');
hold([50,254], 'Supone un número físico fijo de servidores por talla de warehouse; no es una equivalencia general fiable.');
hold([263], 'La clave señala LZO para descarga Parquet; revisar formatos/compresión admitidos.');
hold([341], 'Confunde retención de metadatos de carga para deduplicación con historial consultable.');
hold([361], 'Incluye SHOW STORAGE BY TABLE como respuesta correcta; sintaxis pendiente de corrección.');
hold([406,874], 'Confunde política/modo de escalado o interpreta los seis minutos de Economy como espera garantizada.');
hold([421], 'La selección SYSADMIN/USERADMIN requiere corregir el papel de SECURITYADMIN.');
hold([441,445], 'No existe un formato universalmente más rápido independiente del volumen, compresión y estructura de los archivos.');
hold([459], 'Afirma que las consultas en ejecución se migran a la nueva configuración al redimensionar.');
hold([583], 'Reglas de elección de rol y fallo de inicio de sesión no respaldadas por el escenario.');
hold([601], 'La pregunta sobre streaming omite Snowpipe Streaming y no distingue filas de archivos.');
hold([627], 'Precisión de coma flotante expresada como par precisión/escala; enunciado y opciones requieren revisión.');
hold([628,896], 'Confunde acceso a datos de una vista segura, definición y privilegios de visibilidad adicionales.');
hold([704], 'Generaliza el alcance de todas las vistas de INFORMATION_SCHEMA a toda la cuenta.');
hold([730], 'Afirma un máximo general de dos stored procedures por sentencia sin base suficiente.');
hold([747], 'ALTER MASKING POLICY modifica la política; su aplicación a una columna necesita otra operación.');
hold([871], 'Tipos elegidos para clustering requieren comprobación; no asumir soporte para GEOMETRY/BINARY.');
hold([1037], 'Afirma que una vista materializada suspendida devuelve datos con advertencia; necesita corrección.');
hold([1081], 'Orden de precedencia de network policies sospechoso y contradictorio con otras preguntas.');
hold([1146], 'FLOAT/DOUBLE no garantizan precisión decimal exacta.');
hold([1229], 'El autenticador JDBC por defecto no debe confundirse con snowflake_jwt.');
hold([1243], 'CREATE TABLE se concede sobre schema, no sobre database.');
hold([1304], 'Una stored procedure de owner no puede manipular libremente las variables de sesión del caller.');

const archiveAdvice = new Set([83,149,227,375,2053,2058,2059,2060]);
const dedupeKey = q => JSON.stringify([q.q.trim(), [...q.o].sort(), q.c.map(i=>q.o[i]).sort()]);
const duplicateOf = new Map();
const seen = new Map();
for (const q of bank) {
  const key = dedupeKey(q);
  if (seen.has(key)) duplicateOf.set(q.i, seen.get(key)); else seen.set(key,q.i);
}
for (const q of bank) {
  const text = `${q.q} ${q.c.map(i => q.o[i]).join(' ')}`;
  const candidate = mappingRules.find(([,r]) => r.test(text))?.[0] ?? null;
  let status = 'pending', decision = 'conservar_pendiente';
  let reason = 'Cribado de enunciado y clave. Sin validación exhaustiva de distractores y explicación; no apta para simulacro contrastado.';
  if (quarantine.has(q.i)) { status='quarantine'; decision='apartar'; reason=quarantine.get(q.i); }
  if (archiveAdvice.has(q.i)) { status='archived'; decision='archivar'; reason='Consejo sobre el examen, preferencia comercial o trivia de partners; no evalúa directamente una habilidad del temario.'; }
  if (duplicateOf.has(q.i)) { status='archived'; decision='duplicado'; reason=`Mismo enunciado, opciones y respuestas que ${duplicateOf.get(q.i)} (ignorando orden).`; }
  if (/image needed|image below|following diagram|shown in the diagram/i.test(q.q)) {
    status='quarantine'; decision='apartar'; reason='El enunciado requiere un recurso visual que no está integrado en el banco.';
  }
  q.review = { status, candidateObjective: candidate, reason, screenedAt: REVIEW_DATE };
  // No claim of confirmed mapping for the inherited material.
  if (candidate) q.d = domains[candidate[0]];
  else q.d = domains[1];
  records.set(q.i,{id:q.i,decision,reason,oldDomain:q.d,originalDomain:before.get(q.i).d});
}
for (const [objective, topic, docPath, ids, principle] of reviewedGroups) {
  for (const id of ids) {
    const q = byId.get(id);
    if (!q) throw new Error(`Unknown reviewed ID ${id}`);
    if (q.review.status === 'quarantine' || q.review.status === 'archived') continue;
    q.r = `https://docs.snowflake.com/en/${docPath}`;
    q.e = `Correct: ${q.c.map(i => q.o[i]).join(' / ')}\n\n${principle}`;
    q.objective = objective; q.topic=topic; q.d=domains[objective[0]];
    q.review = {status:'verified',reviewedAt:REVIEW_DATE,method:'editorial-documentation',reason:'Enunciado, opciones y clave revisados; explicación sustituida por una nota contrastada.'};
    records.set(id,{id,decision:'conservar_revisada',reason:q.review.reason,originalDomain:before.get(id).d});
  }
}
for (const patch of corrections) {
  const q = byId.get(patch.i);
  if (!q) throw new Error(`Unknown corrected ID ${patch.i}`);
  const {reason,...fields} = patch;
  Object.assign(q,fields,{d:domains[patch.objective[0]],contentRevision:INITIAL_CONTENT_REVISION,
    review:{status:'verified',reviewedAt:REVIEW_DATE,method:'editorial-documentation',reason}});
  records.set(q.i,{id:q.i,decision:'corregir',reason,originalDomain:before.get(q.i).d});
}
for (const item of additions) {
  if (byId.has(item.i)) throw new Error(`New ID collision ${item.i}`);
  const q={...item,d:domains[item.objective[0]],contentRevision:INITIAL_CONTENT_REVISION,
    origin:'original-practice-2026',review:{status:'verified',reviewedAt:REVIEW_DATE,method:'editorial-documentation',reason:'Escenario original para cubrir o reforzar objetivos de la guía.'}};
  bank.push(q); byId.set(q.i,q);
  records.set(q.i,{id:q.i,decision:'añadir',reason:q.review.reason,originalDomain:''});
}
// Fix small scope issues before treating reviewed originals as exam material.
const clarify = {
  47: 'Which Snowflake type is designed to store a JSON document together with its native value types?',
  152: 'Which two responsibilities belong to cloud services rather than warehouse execution or data storage? (Choose two.)',
  162: 'A user-managed virtual warehouse is resumed from suspension. What is the minimum billable compute time for this start?',
  317: 'For a fixed warehouse type, generation, and single-cluster configuration, which factors determine warehouse compute credits?',
};
for (const [id,text] of Object.entries(clarify)) {
  const q=byId.get(Number(id)); q.q=text; q.contentRevision=INITIAL_CONTENT_REVISION;
  records.get(q.i).decision='corregir'; records.get(q.i).reason='Acotado el escenario para evitar generalizaciones; clave conservada.';
}
// Applies one reviewed batch. `from` is the status every question in it must have beforehand:
// 'pending' for the batches taken from the pending queue, 'quarantine' for those rescued from the held pool.
function applyBatch(batch, idsFile, revision, reviewedAt = REVIEW_DATE, from = 'pending') {
  const batchIds = JSON.parse(readFileSync(path(idsFile)));
  // La lista congelada de IDs define la tanda; la última de pendientes es menor porque se agotaron.
  if (batch.length !== batchIds.length || new Set(batch.map(q => q.i)).size !== batchIds.length ||
    batchIds.some(id => !batch.some(q => q.i === id))) throw new Error(`Batch does not match ${idsFile}`);
  for (const item of batch) {
    const q = byId.get(item.i);
    if (!q || q.review.status !== from) throw new Error(`Batch ID was not ${from}: ${item.i}`);
    const { decision, reason, ...fields } = item;
    // Only conservar_revisada and corregir mark a question as verified; anything unknown stops the build.
    if (decision === 'archivar') {
      q.review = { ...q.review, status: 'archived', reviewedAt, reason };
    } else if (decision === 'mantener_pendiente' || decision === 'apartar') {
      q.review = { ...q.review, status: decision === 'apartar' ? 'quarantine' : 'pending', reviewedAt, reason };
    } else if (decision === 'conservar_revisada' || decision === 'corregir') {
      Object.assign(q, fields, { d: domains[item.objective[0]], topic: objectives[item.objective],
        review: { status: 'verified', reviewedAt, method: 'editorial-documentation', reason } });
      if (decision === 'corregir') q.contentRevision = revision;
    } else throw new Error(`Unknown batch decision for ${item.i}: ${decision}`);
    records.set(q.i, { id: q.i, decision, reason, originalDomain: before.get(q.i).d });
  }
}
applyBatch(batch100, 'audit/next-100-ids.json', 'cof-c03-2026-09-21-batch100');
applyBatch(batch200, 'audit/batch-200-ids.json', 'cof-c03-2026-09-21-batch200');
applyBatch(batch300, 'audit/batch-300-ids.json', 'cof-c03-2026-09-21-batch300');
applyBatch(batch400, 'audit/batch-400-ids.json', 'cof-c03-2026-09-21-batch400');
applyBatch(batch500, 'audit/batch-500-ids.json', 'cof-c03-2026-09-23-batch500', '2026-09-23');
applyBatch(batch600, 'audit/batch-600-ids.json', 'cof-c03-2026-09-23-batch600', '2026-09-23');
applyBatch(batch700, 'audit/batch-700-ids.json', 'cof-c03-2026-09-23-batch700', '2026-09-23');
applyBatch(batch800, 'audit/batch-800-ids.json', 'cof-c03-2026-09-23-batch800', '2026-09-23');
applyBatch(quarantine900, 'audit/quarantine-900-ids.json', BANK_VERSION, BANK_REVIEW_DATE, 'quarantine');
const statusCounts=Object.fromEntries(['verified','pending','quarantine','archived'].map(s=>[s,bank.filter(q=>q.review.status===s).length]));
const coverage=Object.entries(objectives).map(([id,title])=>({id,title,domain:domains[id[0]],
  reviewedIds:bank.filter(q=>q.objective===id && q.review.status==='verified').map(q=>q.i),
  candidateIds:bank.filter(q=>q.review.status!=='verified' && q.review.candidateObjective===id).map(q=>q.i),
  note:'Los IDs revisados acreditan práctica de este objetivo, no cobertura exhaustiva de todos sus subapartados.'}));
const summary={version:BANK_VERSION,date:BANK_REVIEW_DATE,guide:GUIDE,originalCount:original.length,total:bank.length,statusCounts,
  originalSha256:createHash('sha256').update(originalBytes).digest('hex'),
  correctedIds:[...records.values()].filter(r=>r.decision==='corregir').map(r=>r.id),
  addedIds:additions.map(q=>q.i),coverage};
const ledger=bank.map(q=>({...records.get(q.i),status:q.review.status,domain:q.d,objective:q.objective??'',
  candidateObjective:q.review.candidateObjective??'',mapping:q.objective?'editorial':'provisional',question:q.q,reference:q.r,
  reviewedAt:q.review.reviewedAt??'',before:before.get(q.i)??null,after:q}));
function json(p,data){writeFileSync(path(p),JSON.stringify(data,null,2)+'\n');}
json('public/data/snowpro-core.json',bank);
json('audit/batch-100-decisions.json', batch100);
json('audit/batch-200-decisions.json', batch200);
json('audit/batch-300-decisions.json', batch300);
json('audit/batch-400-decisions.json', batch400);
json('audit/batch-500-decisions.json', batch500);
json('audit/batch-600-decisions.json', batch600);
json('audit/batch-700-decisions.json', batch700);
json('audit/batch-800-decisions.json', batch800);
json('audit/quarantine-900-decisions.json', quarantine900);
json('public/data/snowpro-core-audit.json',summary);
json('audit/review-ledger.json',ledger);
const fields=['id','decision','status','objective','candidateObjective','mapping','originalDomain','domain','question','reason','reference','reviewedAt'];
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
writeFileSync(path('audit/review-ledger.csv'),'\ufeff'+[fields.join(','),...ledger.map(r=>fields.map(f=>csv(r[f])).join(','))].join('\r\n'));
const catalog=JSON.parse(readFileSync(path('public/data/catalog.json')));
Object.assign(catalog.find(c=>c.id==='snowpro-core'),{bankVersion:BANK_VERSION,reviewDate:BANK_REVIEW_DATE,auditFile:'snowpro-core-audit.json',language:'en',
  domainWeights:{[domains[1]]:31,[domains[2]]:20,[domains[3]]:18,[domains[4]]:21,[domains[5]]:10},
  blurb:'Práctica en inglés para COF-C03. Simulacros con preguntas contrastadas y cinco dominios oficiales.'});
json('public/data/catalog.json',catalog);
const rows=coverage.map(o=>`| ${o.id} ${o.title} | ${o.reviewedIds.length} | ${o.reviewedIds.join(', ')} |`).join('\n');
writeFileSync(path('audit/README.md'),`# Auditoría SnowPro Core — ${BANK_REVIEW_DATE}\n\n`+
  `Banco original: ${original.length} preguntas. SHA-256: \`${summary.originalSha256}\`.\n\n`+
  `Se conserva intacto en [original/snowpro-core.json](original/snowpro-core.json). No se ha verificado independientemente la procedencia comercial.\n\n`+
  `## Alcance y resultados\n\nCribado editorial de enunciados y claves del banco, controles estructurales y revisión documental de una selección. No es una certificación de exactitud de las ${original.length} preguntas ni una revisión documental exhaustiva de cada distractor original.\n\n`+
  `- Contrastadas: **${statusCounts.verified}**, incluyendo **${additions.length} originales nuevas**.\n`+
  `- Pendientes de validación documental: **${statusCounts.pending}**.\n`+
  `- Apartadas para revisión prioritaria: **${statusCounts.quarantine}**. Una sospecha no equivale a demostrar que la pregunta es falsa.\n`+
  `- Archivadas (duplicados exactos o casi exactos, consejos, trivia o dependencia de una interfaz antigua): **${statusCounts.archived}**.\n`+
  `- Reformuladas/corregidas: **${summary.correctedIds.length}**.\n\n`+
  `El simulacro y la práctica predeterminada usan solo contrastadas. La práctica ampliada permite pendientes con aviso; nunca incluye apartadas ni archivadas. Todo el original sigue en el registro.\n\n`+
  `## Guía y pesos\n\n[Guía oficial](${GUIDE}). Pesos: 31/20/18/21/10. El 31% es arquitectura y funcionalidades, no IA sola. No se atribuyen pesos inventados a subobjetivos. Git se ubica en 3.3, IA/aplicaciones en 1.6.\n\n`+
  `## Mapa por objetivo\n\n| Objetivo | Preguntas contrastadas | IDs |\n|---|---:|---|\n${rows}\n\n`+
  `Una presencia en esta tabla no demuestra cobertura total. Las candidatas por palabras clave están separadas en el JSON; no cuentan como contrastadas. Ver [coverage-gaps.md](coverage-gaps.md) para carencias y profundidad.\n\n`+
  `## Trazabilidad\n\n[Registro CSV](review-ledger.csv): decisión y motivo por pregunta. [Registro JSON](review-ledger.json): también versiones antes/después. [Resumen de la app](../public/data/snowpro-core-audit.json). Las fuentes concretas están en cada pregunta; el estado de consulta se registra en sources.json.\n\n`+
  `## Progreso y límites\n\nSe conservan los IDs. Las estadísticas se reasignan por pregunta al nuevo dominio. Las preguntas reformuladas conservan su historial, pero reinician la racha/dominio para no contar una antigua clave como aprendida. El histórico de simulacros se conserva, pero solo sesiones de la versión vigente cuentan para la señal orientativa.\n\n`+
  `750/1000 es puntuación escalada, no 75% de aciertos. La app usa 75% como objetivo interno de práctica; no predice aprobar. No se probaron consultas en una cuenta real de Snowflake.\n\n`+
  `## Mantenimiento\n\nEditar scripts/reviewed-questions.mjs, scripts/new-questions.mjs o el script de la tanda correspondiente (scripts/review-batch-*.mjs, con sus IDs congelados en audit/*-ids.json); ejecutar npm run audit (alias de audit:build) y npm test. No volver a ejecutar el antiguo fix-multi-answers sobre este banco. Las nuevas preguntas son material original de práctica, no preguntas de exámenes.\n`);
console.log(JSON.stringify({original:original.length,total:bank.length,...statusCounts,corrected:summary.correctedIds.length,added:additions.length,
  domains:Object.values(domains).map(d=>[d,bank.filter(q=>q.d===d&&q.review.status==='verified').length])},null,2));
