// ═══════════════════════════════════════════════════════════════════════
// SCRIPTS DE PRUEBA - ESQUEMA DE VALIDACIÓN MongoDB
// Proyecto: Dann-Alpes - Módulo de Reseñas
// Colección: resenas
// ═══════════════════════════════════════════════════════════════════════


db.runCommand({
  collMod: "resenas",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "id_hotel",
        "documento_cliente",
        "id_reserva",
        "puntuacion_estrellas",
        "descripcion",
        "estado",
        "fecha"
      ],
      properties: {
        id_hotel: {
          bsonType: ["int", "long"],
          description: "ID del hotel - obligatorio"
        },
        documento_cliente: {
          bsonType: ["int", "long"],
          description: "Documento del cliente - obligatorio"
        },
        id_reserva: {
          bsonType: ["int", "long"],
          description: "ID de la reserva - obligatorio"
        },
        puntuacion_estrellas: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Calificación entre 1 y 5 estrellas"
        },
        descripcion: {
          bsonType: "string",
          minLength: 1,
          description: "Texto de la reseña - obligatorio"
        },
        estado: {
          enum: ["publicada", "ELIMINADA"],
          description: "Estado válido: publicada o ELIMINADA"
        },
        destacada: {
          bsonType: "bool"
        },
        fecha: {
          bsonType: ["date", "string"]
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});


// ═══════════════════════════════════════════════════════════════════════
// 6.1 VALIDACIÓN DE ESQUEMA PARA RF1 (CREAR RESEÑA)
// ═══════════════════════════════════════════════════════════════════════

//Caso 1
db.resenas.insertOne({
  descripcion: "Reseña sin id_hotel ni cliente"
});


//Caso2
db.resenas.insertOne({
  id_reseña: NumberLong(99999999),
  id_hotel: 1,
  documento_cliente: NumberLong(2843140779),
  id_reserva: 1,
  puntuacion_estrellas: 10,
  descripcion: "Calificación inválida",
  estado: "publicada",
  destacada: false,
  fecha: new Date(),
  hora: "12:00"
});


//Caso 3

db.resenas.insertOne({
  id_reseña: NumberLong(99999998),
  id_hotel: 1,
  documento_cliente: NumberLong(2843140779),
  id_reserva: 2,
  puntuacion_estrellas: 4,
  descripcion: "Estado no permitido",
  estado: "INVENTADO",
  destacada: false,
  fecha: new Date(),
  hora: "12:00"
});


// ═══════════════════════════════════════════════════════════════════════
// 6.2 VALIDACIÓN DE ESQUEMA PARA RF2 (EDITAR RESEÑA)
// ═══════════════════════════════════════════════════════════════════════

//caso 1

db.resenas.updateOne(
  { _id: ObjectId("6a07b3f0e18f377ff062b832") },
  { $set: { puntuacion_estrellas: 0 } }
);


//Caso 2

db.resenas.updateOne(
  { _id: ObjectId("6a07b3f0e18f377ff062b832") },
  { $set: { puntuacion_estrellas: "cinco" } }
);


//Caso 3
db.resenas.updateOne(
  { _id: ObjectId("6a07b3f0e18f377ff062b832") },
  { $set: { estado: "BORRADOR" } }
);


//Caso 4

db.resenas.updateOne(
  { _id: ObjectId("6a07b3f0e18f377ff062b832") },
  { $set: { descripcion: "" } }
);




db.getCollectionInfos({ name: "resenas" });



