import { getResFormat } from '../utils/db.connection.js';

class AuthHandler{

	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
	}

	async usuarioConectado(req, data, operacion) {
		let usuario = req.session.usuario;
		let response = getResFormat();
		response.origen = this.origen;

		if (!usuario){
			response.contenido = 'Por favor, inicia sesión...';
			response.status = 400;
			return response;
		}

		return await operacion(req, data);
	}
	
}

export { AuthHandler }