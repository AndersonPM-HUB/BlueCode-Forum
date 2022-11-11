import { Schema, model } from 'mongoose';

/*
	Esquema/Modelo para la colección usuarios de la base de datos
*/
const usuarioSchema = new Schema({
	nickname: String,
	nombres: String,
	apellidos: String,
	contraseña: String,
	email: String,
	puntos: { type: Number, default: 0 },
	rol: { type: Number, default: 0 },
	activo: { type: Boolean, default: false },
	session: { type: String, default: '' },
	publicaciones: { type: [Schema.Types.ObjectId], ref: 'Publicaciones' },
});

const UsuarioModel = model('Usuarios', usuarioSchema);

export { UsuarioModel }