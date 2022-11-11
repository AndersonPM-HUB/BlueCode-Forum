import express from 'express';
import { ClasificacionController } from '../controllers/clasificaciones.controller.js';
import { AuthHandler } from '../handlers/auth.handler.js';

const route = express.Router();

/*
	Endpoint que permite traer todas las clasificaciones que 
	existen en la base de datos
*/
route.get('/', async (req, res) => {
	const auth = new AuthHandler(req); // Handler para confirmar que el usuario este conectado

	let respuesta = await auth.usuarioNoRequerido(req, req.params, async (req, data) => {
		const clasificacionController = new ClasificacionController(req);
		return await clasificacionController.getClasificacion(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite realizar busquedas en las clasificaciones
	segun los criterios de busqueda pasados por la url
	?parametro=valor&otro=valor
*/
route.get('/buscar', async (req, res) => {
	const auth = new AuthHandler(req);
	const busqueda = {buscar: req.query};

	let respuesta = await auth.usuarioNoRequerido(req, busqueda, async (req, data) => {
		const clasificacionController = new ClasificacionController(req);
		return await clasificacionController.getClasificacion(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite crear una clasificacion
	segun los datos enviados por el body (POST) 
*/
route.post('/crear', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.MODERADOR);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const clasificacionController = new ClasificacionController(req);
		return await clasificacionController.createClasificacion(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite eliminar una clasificacion
	segun los criterios de eliminación
	?parametro=valor&otro=valor
*/
route.post('/eliminar', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.ADMIN);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const clasificacionController = new ClasificacionController(req);
		return await clasificacionController.deleteClasificacion(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

/*
	Endpoint que permite modificar una clasificacion
	segun los criterios enviados por el body
	de la peticion
*/
route.post('/modificar', async (req, res) => {
	const auth = new AuthHandler(req);
	const rol = parseInt(process.env.MODERADOR);

	let respuesta = await auth.usuarioRequerido(req, req.body, rol, async (req, data) => {
		const clasificacionController = new ClasificacionController(req);
		return await clasificacionController.updateClasificacion(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});

export default route;