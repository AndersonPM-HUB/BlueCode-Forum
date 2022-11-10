import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección publicaciones de la base de datos
*/
const publicacionSchema = new mongoose.Schema({
	titulo: String,
	contenido: String,
	imagen: String,
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' } ,
	fecha: Date,
	activa: { type: Boolean, default: true },
	interacciones: {
		likes: Number,
		dislikes: Number
	},
	comentarios: { type: [Schema.Types.ObjectId], ref: 'Comentarios' },
	clasificaciones: { type: [Schema.Types.ObjectId], ref: 'Clasificaciones'}
});

const PublicacionModel = mongoose.model('Publicaciones', publicacionSchema);

export { PublicacionModel }