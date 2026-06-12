// Corrige preguntas multirespuesta mal codificadas en el banco:
// el texto dice "Choose two/three" pero n/c no coincidían, lo que
// permitía acertar con una sola respuesta o fallar siempre.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../public/data/snowpro-core.json', import.meta.url);
const questions = JSON.parse(readFileSync(file, 'utf8'));

const fixes = {
  40: { n: 2, c: [1, 3] },
  157: {
    n: 3,
    c: [1, 2, 3],
    e: 'MIN(<<column value>>) can be answered directly from micro-partition metadata (metadata cache), so it does not require a running virtual warehouse. COPY loads data, SUM(<<column value>>) must scan column values, and UPDATE is a DML operation - these three require a virtual warehouse.',
  },
  298: { n: 2, c: [1, 2] },
  345: {
    n: 2,
    c: [1, 3],
    q: 'Which formats does Snowflake store semi-structured data in? (Choose two.)',
    e: 'Snowflake stores semi-structured data internally using the ARRAY and OBJECT types (inside VARIANT). XML and GeoJSON are supported input formats, not internal storage formats, and BLOB is not a Snowflake data type.',
  },
  349: {
    n: 2,
    c: [1, 3],
    e: 'The storage layer holds table data as micro-partitions and also the persisted query results (result cache). Parameters, query history and view definitions live in the cloud services layer, not in the storage layer.',
  },
  373: {
    n: 3,
    c: [2, 4, 5],
    e: 'Snowflake secure data sharing supports sharing tables, secure views (and secure materialized views) and secure UDFs with other Snowflake accounts. Roles and stored procedures cannot be shared; databases and schemas are containers on which usage is granted, not shared objects themselves.',
  },
  691: { n: 2, c: [1, 3] },
  834: {
    n: 2,
    c: [1, 4],
    e: 'Each worksheet in Snowsight uses a unique session with a specific role and warehouse assigned in the worksheet context. Users can also import worksheets (e.g. from the Classic Console) and share them with other users. Switching worksheets does not end the session, folders cannot be nested, and a worksheet can run many queries.',
  },
  1238: {
    n: 2,
    c: [1, 2],
    e: '- SELECT SRC:customer."phone number" FROM car_sales; y SELECT src:customer."phone number" FROM car_sales; son válidas: el nombre de columna antes de ":" no distingue mayúsculas (src y SRC valen), y los nombres con espacios se acceden con comillas dobles.\n\n- SELECT src:customer.’phone number’ FROM car_sales;: las comillas simples no son válidas para nombres de elementos.\n\n- SELECT SRC:customer.phone number FROM car_sales;: un nombre con espacios sin comillas es sintaxis inválida.\n\n- SELECT SRC:CUSTOMER."phone number" FROM car_sales;: los nombres de elementos después de ":" SÍ distinguen mayúsculas, y el dato es "customer", no "CUSTOMER".',
  },
  1341: { n: 2, c: [3, 4] },
  1345: { n: 2, c: [0, 1] },
};

let applied = 0;
for (const q of questions) {
  const fix = fixes[q.i];
  if (!fix) continue;
  Object.assign(q, fix);
  applied++;
}

if (applied !== Object.keys(fixes).length) {
  throw new Error(`Esperaba ${Object.keys(fixes).length} arreglos, aplicados ${applied}`);
}

writeFileSync(file, JSON.stringify(questions));
console.log(`OK: ${applied} preguntas corregidas`);
