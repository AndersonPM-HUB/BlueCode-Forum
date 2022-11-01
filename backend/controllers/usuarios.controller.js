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
		Controlador de UsuarioController

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

}

export { UsuarioController }