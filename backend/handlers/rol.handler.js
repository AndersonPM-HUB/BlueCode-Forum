import { getResFormat } from '../utils/db.connection.js';

/*
	Clase RolHandler que permite manejar las peticiones
	segun el rol de los usuarios o usuario.
*/
class RolHandler {
	/*
		Constructor de RolHandler

		req: recibe la request
	*/
    constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.admin = parseInt(process.env.ADMIN);
	}

	/*
		Confirma que el usuario tenga los permisos requeridos
		para acceder al endpoit y retornar los recursos de la base
		de datos

		req: recibe la request
		data: recibe los datos para la operacion
		rol: recibe el valor del rol
		operacion: funcion callback que se quiere realizar

		return Objeto javascript con el formato de la respuesta
	*/
    async validarRol(req, data, usuario, rol, operacion) {
        let response = getResFormat();

		response.origen = this.origen;
		response.status = 400;

		if(usuario.rol < rol && usuario.rol !== this.admin) {
			response.contenido = 'No puedes acceder a este recurso...';

			return response;
		}	

        return await operacion(req, data);
    }
}

export { RolHandler }