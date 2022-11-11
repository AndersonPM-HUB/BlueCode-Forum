import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección hilos de la base de datos
*/
const hiloSchema = new mongoose.Schema({
	tema: { type: String, default: 'None' },
	descripcion: { type: String, default: 'None' },
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones'}
});

const HiloModel = mongoose.model('Hilos', hiloSchema);

export { HiloModel }