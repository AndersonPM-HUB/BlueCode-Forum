import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección publicaciones de la base de datos
*/
const publicacionSchema = new mongoose.Schema({
	titulo: String,
	contenido: String,
	imagen: String,
	id_usuario: Schema.Types.ObjectId,
	fecha: Date,
	activa: { type: Boolean, default: true },
	interacciones: {
		likes: Number,
		dislikes: Number
	},
	id_comentarios: [Schema.Types.ObjectId],
	id_clasificaciones: [Schema.Types.ObjectId]
});

const PublicacionModel = mongoose.model('Publicaciones', publicacionSchema);

export { PublicacionModel }