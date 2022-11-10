import { getResFormat } from '../utils/db.connection.js';
import { RolHandler } from './rol.handler.js'

/*
	Clase AuthHandler que permite manejar las peticiones
	segun el inicio de sesion y los permisos
*/
class AuthHandler{
	/*
		Constructor de AuthHandler

		req: recibe la request
	*/
	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.pagina_actual = req.originalUrl;
		this.admin = parseInt(process.env.ADMIN);
	}

	/*
		Confirma que exista una instacia de usuario en la sesion
		y ejecuta la operacion (callback) que se le envíe, además
		realiza otras confirmaciones de sesión

		req: recibe la request
		data: recibe los datos para la operacion
		rol: recibe el valor del rol
		operacion: funcion callback que se quiere realizar

		return Objeto javascript con el formato de la respuesta
	*/
	async usuarioRequerido(req, data, rol, operacion) {
		const rolHandler = new RolHandler(req);

		let usuario = req.session.usuario;
		let response = getResFormat();
		
		response.origen = this.origen;
		response.status = 400;

		if (!usuario && this.pagina_actual !== '/usuarios/ingresar') {
			response.contenido = 'Por favor, inicia sesión...';

			return response;
		}

		if (usuario && this.pagina_actual === '/usuarios/ingresar') {
			response.contenido = 'Ya tienes una cuenta iniciada...';

			return response;
		}

		return rolHandler.validarRol(req, data, usuario, rol, operacion);
	}
	
	/*
		En caso que no se requiera una sesión para acceder
		a ciertos recursos, utilizar este método de
		autenticación

		req: recibe la request
		data: recibe los datos para la operacion
		operacion: funcion callback que se quiere realizar

		return Objeto javascript con el formato de la respuesta
	*/
	async usuarioNoRequerido(req, data, operacion){
		let usuario = req.session.usuario;
		let response = getResFormat();

		response.origen = this.origen;
		response.status = 400;

		if (usuario && this.pagina_actual === '/usuarios/registrar') {
			response.contenido = 'No puedes realizar esta acción, mientras tengas una cuenta iniciada...';

			return response;
		}

		return await operacion(req, data);
	}
}

export { AuthHandler }