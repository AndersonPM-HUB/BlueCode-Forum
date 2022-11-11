import express from 'express';
import { ComentarioController } from '../controllers/comentarios.controller.js';
import { AuthHandler } from '../handlers/auth.handler.js';

const route = express.Router();

/*
	Endpoint que permite traer todos los comentarios que 
	existen en la base de datos
*/
route.get('/', async (req, res) => {
	const auth = new AuthHandler(req); // Handler para confirmar que el usuario este conectado

	let respuesta = await auth.usuarioNoRequerido(req, req.params, async (req, data) => {
		const comentarioController = new ComentarioController(req);
		return await comentarioController.getComentario(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite crear un comentario
	segun los datos enviados por el body (POST) 
*/
route.post('/crear', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.CORRIENTE);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const comentarioController = new ComentarioController(req);
		return await comentarioController.createComentario(req, data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite eliminar un comentario
*/
route.post('/eliminar', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.CORRIENTE);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const comentarioController = new ComentarioController(req);
		return await comentarioController.deleteComentario(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

export default route;