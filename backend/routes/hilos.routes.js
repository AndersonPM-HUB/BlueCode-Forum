import express from 'express';
import { HiloController } from '../controllers/hilos.controller.js';
import { AuthHandler } from '../handlers/auth.handler.js';

const route = express.Router();

/*
	Endpoint que permite traer todos los hilos que 
	existen en la base de datos
*/
route.get('/', async (req, res) => {
	const auth = new AuthHandler(req); // Handler para confirmar que el usuario este conectado

	let respuesta = await auth.usuarioNoRequerido(req, req.params, async (req, data) => {
		const hiloController = new HiloController(req);
		return await hiloController.getHilo(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite realizar busquedas en los hilos
	segun los criterios de busqueda pasados por la url
	?parametro=valor&otro=valor
*/
route.get('/buscar', async (req, res) => {
	const auth = new AuthHandler(req);
	const busqueda = {buscar: req.query};

	let respuesta = await auth.usuarioNoRequerido(req, busqueda, async (req, data) => {
		const hiloController = new HiloController(req);
		return await hiloController.getHilo(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite crear un hilo
	segun los datos enviados por el body (POST) 
*/
route.post('/crear', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.MODERADOR);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const hiloController = new HiloController(req);
		return await hiloController.createHilo(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite eliminar un hilo
	segun los criterios de eliminación
	?parametro=valor&otro=valor
*/
route.post('/eliminar', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.ADMIN);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const hiloController = new HiloController(req);
		return await hiloController.deleteHilo(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite modificar un hilo
	segun los criterios enviados por el body
	de la peticion
*/
route.post('/modificar', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.MODERADOR);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const hiloController = new HiloController(req);
		return await hiloController.updateHilo(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

export default route;