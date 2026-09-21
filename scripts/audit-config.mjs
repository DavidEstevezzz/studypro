export const REVIEW_DATE = '2026-09-21';
export const BANK_VERSION = 'cof-c03-2026-09-21-batch300';
export const INITIAL_CONTENT_REVISION = 'cof-c03-2026-09-21';
export const GUIDE = 'https://publish-p93462-e887935.adobeaemcloud.com/content/dam/snowpro-sg/SnowProCoreStudyGuideC03.pdf';
export const domains = {
  1: 'Arquitectura y Data Cloud',
  2: 'Gestion de cuenta y Gobernanza',
  3: 'Carga, Descarga y Conectividad',
  4: 'Rendimiento, Consultas y Transformacion',
  5: 'Colaboracion y Proteccion de datos',
};
export const objectives = {
  '1.1': 'Architecture and editions', '1.2': 'Interfaces and tools',
  '1.3': 'Object hierarchy and types; session context', '1.4': 'Virtual warehouses',
  '1.5': 'Storage, table types and views', '1.6': 'AI/ML and application development',
  '2.1': 'Security model and access control', '2.2': 'Data governance',
  '2.3': 'Monitoring and cost management', '3.1': 'Data loading and unloading',
  '3.2': 'Automated ingestion', '3.3': 'Connectors and integrations',
  '4.1': 'Evaluate query performance', '4.2': 'Optimize query performance',
  '4.3': 'Caching', '4.4': 'Data transformation',
  '5.1': 'Collaboration and protection', '5.2': 'Data sharing', '5.3': 'Marketplace and listings',
};
// These are candidate mappings for unverified material, never evidence of coverage.
export const mappingRules = [
  ['1.6', /cortex|snowpark(?![- ]optimized)|streamlit|notebook|snowflake ml|\bAI_/i],
  ['3.3', /git |connector|driver|SnowCD|REST API|integration/i],
  ['1.2', /snowsight|worksheet|web interface|snowflake cli|snowsql|dashboard/i],
  ['2.2', /masking|row.access|tagging|\btag\b|classification|lineage|trust center|privacy|encrypt|key rotation|rekey|access.history/i],
  ['2.1', /\brole\b|\broles\b|privilege|grant|authentication|\bMFA\b|network polic|security|\bSSO\b|OAuth|ownership/i],
  ['2.3', /credit|billing|cost|metering|resource monitor|storage.metrics/i],
  ['5.3', /marketplace|listing|native app/i],
  ['5.2', /shar|reader account|data exchange|clean room/i],
  ['5.1', /clon|time.travel|fail.safe|replicat|failover|undrop|retention/i],
  ['3.2', /snowpipe|\bpipe\b|\btask|\bstream\b|dynamic table|openflow/i],
  ['3.1', /\bCOPY\b|\bPUT\b|\bGET\b|stage|loading|unload|file format/i],
  ['4.3', /cach|RESULT_SCAN/i],
  ['4.1', /query profile|query history|spilling|spillage|pruning|query insight|query attribution/i],
  ['4.2', /search optimization|query acceleration|clustering key|optimiz.*performance/i],
  ['1.4', /warehouse|multi.cluster|scaling polic/i],
  ['1.1', /architecture|cloud service|edition|cloud platform/i],
  ['1.5', /micro.partition|table type|transient|temporary|iceberg|materialized view/i],
  ['4.4', /function|\bSQL\b|variant|JSON|semi.structured|data type|sample|procedure/i],
  ['1.3', /schema|database|object|session|parameter/i],
];
