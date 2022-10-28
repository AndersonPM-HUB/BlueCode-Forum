import mongoose from 'mongoose';
import { Schema } from 'mongoose';

/*
	Esquema/Modelo para la colección usuarios de la base de datos
*/
const usuarioSchema = new mongoose.Schema({
	nickname: String,
	nombres: String,
	apellidos: String,
	contraseña: String,
	email: String,
	puntos: Number,
	rol: Number,
	activo: { type: Boolean, default: true }
});

const UsuarioModel = mongoose.model('Usuarios', usuarioSchema);

export { UsuarioModel }