import { Schema, model } from 'mongoose';

/*
	Esquema/Modelo para la colección clasificacion de la base de datos
*/
const ClasificacionSchema = new Schema({
	nombre: String,
	descripcion: String,
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones'}
});

const ClasificacionModel = model('Clasificaciones', ClasificacionSchema);

export { ClasificacionModel }