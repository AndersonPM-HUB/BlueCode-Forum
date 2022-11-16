import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

/*
	Esquema/Modelo para la colección clasificacion de la base de datos
*/
const clasificacionSchema = new Schema({
	nombre: String,
	descripcion: String,
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones'}
});

clasificacionSchema.plugin(paginate);

const ClasificacionModel = model('Clasificaciones', clasificacionSchema);

export { ClasificacionModel }