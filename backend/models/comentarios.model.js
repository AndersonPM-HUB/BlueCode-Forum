import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección comentarios de la base de datos
*/
const comentarioSchema = new mongoose.Schema({
	publicacion: { type: Schema.Types.ObjectId, ref: 'Publicaciones' },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
	contenido: String,
	fecha: Date
});

const ComentarioModel = mongoose.model('Comentarios', comentarioSchema);

export { ComentarioModel }