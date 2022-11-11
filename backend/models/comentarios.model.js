import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

/*
	Esquema/Modelo para la colección comentarios de la base de datos
*/
const comentarioSchema = new Schema({
	publicacion: { type: Schema.Types.ObjectId, ref: 'Publicaciones' },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
	contenido: String,
	fecha: Date
});

comentarioSchema.plugin(paginate);

const ComentarioModel = model('Comentarios', comentarioSchema);

export { ComentarioModel }