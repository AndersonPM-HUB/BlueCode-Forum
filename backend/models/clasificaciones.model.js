import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección calificaciones de la base de datos
*/
const calificacionSchema = new mongoose.Schema({
	nombre: String,
	descripcion: String,
	id_publicaciones: [Schema.Types.ObjectId]
});

const CalificacionModel = mongoose.model('Calificaciones', calificacionSchema);

export { CalificacionModel }