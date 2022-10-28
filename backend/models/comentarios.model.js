import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección comentarios de la base de datos
*/
const comentarioSchema = new mongoose.Schema({
	id_publicacion: Schema.Types.ObjectId,
	id_usuario: Schema.Types.ObjectId,
	contenido: String,
	fecha: Date
});

const ComentarioModel = mongoose.model('Comentarios', comentarioSchema);

export { ComentarioModel }