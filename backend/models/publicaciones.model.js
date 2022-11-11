import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

/*
	Esquema/Modelo para la colección publicaciones de la base de datos
*/
const publicacionSchema = new Schema({
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

publicacionSchema.plugin(paginate);

const PublicacionModel = model('Publicaciones', publicacionSchema);

export { PublicacionModel }