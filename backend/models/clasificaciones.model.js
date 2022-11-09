import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección clasificacion de la base de datos
*/
const ClasificacionSchema = new mongoose.Schema({
	nombre: String,
	descripcion: String,
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones'}
});

const ClasificacionModel = mongoose.model('Clasificaciones', ClasificacionSchema);

export { ClasificacionModel }