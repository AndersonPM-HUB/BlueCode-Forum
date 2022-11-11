import { Schema, model } from 'mongoose';

/*
	Esquema/Modelo para la colección hilos de la base de datos
*/
const hiloSchema = new Schema({
	tema: { type: String, default: 'None' },
	descripcion: { type: String, default: 'None' },
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones'}
});

const HiloModel = model('Hilos', hiloSchema);

export { HiloModel }