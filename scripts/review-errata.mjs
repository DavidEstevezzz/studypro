// Erratas sobre preguntas ya contrastadas: se revisan cuando la documentación cambia o cuando
// aparece una pregunta mejor sobre el mismo hecho. IDs congelados en audit/errata-ids.json.
// Se aplican con from = 'verified': no salen de la cola de pendientes ni del grupo apartado.
export const errata = [];
function archive(i,reason){errata.push({i,decision:'archivar',reason});}

archive(487,'Contrastada en la tanda 300, pero su distractor "vista estándar no segura" dejó de ser falso: con SECURE_OBJECTS_ONLY = FALSE se puede conceder SELECT sobre vistas no seguras a un share, condición que ya evalúa el ID 781. El resto de la pregunta duplica el ID 373, que enumera tablas, vistas seguras y UDFs seguras. Se archiva en lugar de reformularla para no repetir un hecho ya cubierto por dos preguntas mejores.');
