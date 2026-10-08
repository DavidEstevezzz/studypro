// Material de estudio por certificación. Cada guía carga su temario y su
// glosario bajo demanda (import ?raw), así no pesan en la carga inicial.
// Fuente única: los .md de /study, que también se leen en GitHub.

export const STUDY_GUIDES = {
  'snowpro-core': [
    {
      id: 'domain-1',
      label: 'Dominio 1',
      title: 'AI Data Cloud Features & Architecture',
      weight: 31,
      domain: 'Arquitectura y Data Cloud',
      objectives: {
        '1.1': 'Arquitectura y ediciones',
        '1.2': 'Interfaces y herramientas',
        '1.3': 'Jerarquía de objetos y sesión',
        '1.4': 'Virtual warehouses',
        '1.5': 'Almacenamiento, tablas y vistas',
        '1.6': 'IA/ML y desarrollo de apps',
      },
      // Recuentos para el resumen de la portada sin cargar los .md.
      sectionCount: 8,
      cardCount: 90,
      load: () =>
        Promise.all([
          import('../../study/domain-1/syllabus.md?raw'),
          import('../../study/domain-1/glossary.md?raw'),
        ]).then(([syllabus, glossary]) => ({
          syllabus: syllabus.default,
          glossary: glossary.default,
        })),
    },
    {
      id: 'domain-2',
      label: 'Dominio 2',
      title: 'Account Management & Data Governance',
      weight: 20,
      domain: 'Gestion de cuenta y Gobernanza',
      objectives: {
        '2.1': 'Seguridad y control de acceso',
        '2.2': 'Gobernanza de datos',
        '2.3': 'Monitorización y costes',
      },
      sectionCount: 5,
      cardCount: 105,
      load: () =>
        Promise.all([
          import('../../study/domain-2/syllabus.md?raw'),
          import('../../study/domain-2/glossary.md?raw'),
        ]).then(([syllabus, glossary]) => ({
          syllabus: syllabus.default,
          glossary: glossary.default,
        })),
    },
    {
      id: 'domain-3',
      label: 'Dominio 3',
      title: 'Data Loading, Unloading & Connectivity',
      weight: 18,
      domain: 'Carga, Descarga y Conectividad',
      objectives: {
        '3.1': 'Carga y descarga de datos',
        '3.2': 'Ingesta automatizada y pipelines',
        '3.3': 'Conectores e integraciones',
      },
      sectionCount: 5,
      cardCount: 112,
      load: () =>
        Promise.all([
          import('../../study/domain-3/syllabus.md?raw'),
          import('../../study/domain-3/glossary.md?raw'),
        ]).then(([syllabus, glossary]) => ({
          syllabus: syllabus.default,
          glossary: glossary.default,
        })),
    },
    {
      id: 'domain-4',
      label: 'Dominio 4',
      title: 'Performance Optimization, Querying & Transformation',
      weight: 21,
      domain: 'Rendimiento, Consultas y Transformacion',
      objectives: {
        '4.1': 'Evaluación del rendimiento',
        '4.2': 'Optimización de consultas',
        '4.3': 'Caché',
        '4.4': 'Transformación de datos',
      },
      sectionCount: 6,
      cardCount: 162,
      load: () =>
        Promise.all([
          import('../../study/domain-4/syllabus.md?raw'),
          import('../../study/domain-4/glossary.md?raw'),
        ]).then(([syllabus, glossary]) => ({
          syllabus: syllabus.default,
          glossary: glossary.default,
        })),
    },
  ],
};

export function guidesFor(certId) {
  return STUDY_GUIDES[certId] ?? [];
}

export function guideKey(certId, guideId) {
  return `${certId}/${guideId}`;
}
