import * as DbOperation from '../utils/db.operations.js';
import * as encrypt from '../utils/encrypt.utils.js';
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
			pagina: 1
		}

		let operationDb = null;

		dataSchema.poblar = [{ path: 'publicaciones', select: 'titulo fecha usuario -_id', populate : { path: 'usuario', select: 'nickname puntos -_id' } }];

		if (!data.buscar) {
			operationDb = DbOperation.getDocuments;

			return await operationDb(this.model, dataSchema);
		}

		if (data.buscar.pagina || data.buscar.nombre || data.buscar.nickname || data.buscar._id){
			dataSchema.buscar = data.buscar;
			
			operationDb = DbOperation.getOneDocument;
			
			if (data.buscar.todos === "true"){
				dataSchema.pagina = data.buscar.pagina ?? 1;
				
				operationDb = DbOperation.getManyDocuments;
				delete data.buscar.todos;
			}
		}

		return await operationDb(this.model, dataSchema);
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
			data.contrase??a = await encrypt.encryptData(data.contrase??a);
			dataSchema.crear = data;
			return await DbOperation.createDocument(this.model, dataSchema);
		}

		return alertaRes(origen, 'El usuario ya se encuentra registrado...', 400);
	}

	/*
		Elimina el usuario por _id que se le env??a como argumento

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
		contrase??a y procede a asignarle la session en la base de datos 
	
		req: Objeto request (petic??on) javascript
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
		
		try{
			let usuario = await DbOperation.getOneDocument(this.model, dataSchema);
			usuario = usuario.contenido.docs[0];
		}catch(error){
			usuario = 'Contenido no encontrado...';
		}

		if (usuario == 'Contenido no encontrado...'){
			return alertaRes(origen, 'El usuario no se encuentra registrado...', 400);
		}

		let contrase??a_valida = await encrypt.compareData(data.contrase??a, usuario.contrase??a);		

		if (contrase??a_valida && (data.email === usuario.email)) {
			req.session.usuario = usuario;

			dataSchema.buscar._id = usuario._id;
			dataSchema.cambiar = {session: req.sessionID, activo: true};

			response = await DbOperation.updateDocument(this.model, dataSchema);

			usuario = await DbOperation.getOneDocument(this.model, dataSchema);

			response.contenido = usuario.contenido; // A??adir a la respuesta el usuario
			response.session_id = req.sessionID; // A??adir a la respuesta la sesion

			response.mensaje = 'Has iniciado sesi??n...'; // A??adir a la respuesta un mensaje

			return response;
		}

		return alertaRes(origen, 'Las credenciales son incorrectas...', 400);
	}

	/*
		Elimina la sesion si un usuario existe

		req: Objeto request (petic??on) javascript
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

			return alertaRes(origen, 'Has cerrado sesi??n...', 200);
		}

		return alertaRes(origen, 'No es posible cerrar sesi??n', 400);
	}

}

export { UsuarioController }