import express from 'express';
import { UsuarioController } from '../controllers/usuarios.controller.js';

const route = express.Router();

/*
	Endpoint que permite traer todos los usuarios que 
	existen en la base de datos
*/
route.get('/', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.getUsuarios(req.params);

	res.status = usuario.status;
	res.json(usuario);
});


/*
	Endpoint que permite registrar un usuario
	segun los datos enviados por el body (POST) 
*/
route.post('/registrar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.registrarUsuario(req.body);

	res.status = usuario.status;
	res.json(usuario);
});

/*
	Endpoint que permite eliminar un usuario
	segun los criterios de eliminación
	?parametro=valor&otro=valor
*/
route.post('/eliminar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.deleteUsuario(req.body);

	res.status = usuario.status;
	res.json(usuario);
});

/*
	Endpoint que permite modificar un hilo
	segun los criterios enviados por el body
	de la peticion
*/
route.post('/modificar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.updateUsuario(req.body);

	res.status = usuario.status;
	res.json(usuario);
});

export default route;