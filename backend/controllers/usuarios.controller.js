import * as DbOperation from '../utils/db.operations.js';
import * as encrypt from '../utils/encrypt.utils.js';
import { getResFormat } from '../utils/db.connection.js';
import { alertaRes } from '../utils/db.connection.js';
import { UsuarioModel } from '../models/usuarios.model.js';

/*
	Controlador de usuario que contiene las operaciones
	con la base de datos y el modelo Usuario
*/
class UsuarioController {
	/*
		Constructor de UsuarioController

		req: recibe la request
	*/
	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.model = UsuarioModel;
	}

	/*
		Trae los usuarios registrados almacenados en la base de datos

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
	*/
	async getUsuarios(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

		dataSchema.poblar = 'publicaciones';

		return await DbOperation.getDocuments(this.model, dataSchema);
	}

	/*
		Permite el registro de usuarios, pero antes comprueba que
		no existe ningun usuario con el mismo nickname o correo

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
				o respuesta modificada
	*/
	async registrarUsuario(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

		let consulta = {
			...dataSchema,
			buscar: { $or: [ { nickname: data.nickname }, { email: data.email } ] }
		}

		let documentExist = await DbOperation.getOneDocument(this.model, consulta);

		if(documentExist.contenido === 'Contenido no encontrado...'){
			data.contraseña = await encrypt.encryptData(data.contraseña);
			dataSchema.crear = data;
			return await DbOperation.createDocument(this.model, dataSchema);
		}

		return alertaRes(origen, 'El usuario ya se encuentra registrado...', 400);
	}

	/*
		Elimina el usuario por _id que se le envía como argumento

		data: Objecto javascript

		return Objecto javascript
	*/
	async deleteUsuario(data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		if(data.eliminar._id) {
			dataSchema.eliminar = data.eliminar;
			return await DbOperation.deleteDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'Ingrese el id de un usuario para eliminar...', 400);
	}

	/*
		Actualiza un usuario segun lo argumentos que se le envian por
		parametros 

		data: Objecto javascript

		return Objecto javascript
	*/
	async updateUsuario(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			...data 
		}

		return await DbOperation.updateDocument(this.model, dataSchema);
	}

	/*
		Busca al usuario segun su email, si lo encuentra confirma la
		contraseña y procede a asignarle la session en la base de datos 
	
		req: Objeto request (peticíon) javascript
		data: Objecto javascript

		return Objecto javascript
	*/
	async ingresarUsuario(req, data) {
		let response;
		let origen = this.origen;
		let dataSchema = {
			origen,
			buscar: {email: data.email}
		}

		let usuario = await DbOperation.getOneDocument(this.model, dataSchema);
		
		usuario = usuario.contenido;
		
		if (usuario === 'Contenido no encontrado...'){
			return alertaRes(origen, 'El usuario no se encuentra registrado...', 400);
		}

		let contraseña_valida = await encrypt.compareData(data.contraseña, usuario.contraseña);		

		if (contraseña_valida && (data.email === usuario.email)) {
			req.session.usuario = usuario;

			dataSchema.buscar._id = usuario._id;
			dataSchema.cambiar = {session: req.sessionID, activo: true};

			response = await DbOperation.updateDocument(this.model, dataSchema);

			usuario = await DbOperation.getOneDocument(this.model, dataSchema);

			response.contenido = usuario.contenido; // Añadir a la respuesta el usuario
			response.session_id = req.sessionID; // Añadir a la respuesta la sesion

			response.mensaje = 'Has iniciado sesión...'; // Añadir a la respuesta un mensaje

			return response;
		}

		return alertaRes(origen, 'Las credenciales son incorrectas...', 400);
	}

	/*
		Elimina la sesion si un usuario existe

		req: Objeto request (peticíon) javascript
		return Objecto javascript
	*/
	async salirUsuario(req) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}
		if (req.session.usuario){
			dataSchema.buscar = {_id: req.session.usuario._id}
			dataSchema.cambiar = {activo: false, session: ''};
			
			req.session.cookie.maxAge = 0;
			await DbOperation.updateDocument(this.model, dataSchema);
			await req.session.destroy();

			return alertaRes(origen, 'Has cerrado sesión...', 200);
		}

		return alertaRes(origen, 'No es posible cerrar sesión', 400);
	}

}

export { UsuarioController }