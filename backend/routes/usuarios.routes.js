import express from 'express';
import { UsuarioController } from '../controllers/usuarios.controller.js';
import { AuthHandler } from '../handlers/auth.handler.js';

const route = express.Router();

/*
	Endpoint que permite traer todos los usuarios que 
	existen en la base de datos
*/
route.get('/', async (req, res) => {
	const auth = new AuthHandler(req); // Handler para confirmar que el usuario este conectado
	let respuesta = await auth.usuarioConectado(req, req.params, async (req, data) => {
		const usuarioController = new UsuarioController(req);
		return await usuarioController.getUsuarios(data);
	});
	
	res.status(respuesta.status).json(respuesta);
});


/*
	Endpoint que permite registrar un usuario
	segun los datos enviados por el body (POST) 
*/
route.post('/registrar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.registrarUsuario(req.body);

	res.status(usuario.status).json(usuario);
});

/*
	Endpoint que permite eliminar un usuario
	segun los criterios de eliminación
	?parametro=valor&otro=valor
*/
route.post('/eliminar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.deleteUsuario(req.body);

	res.status(usuario.status).json(usuario);
});

/*
	Endpoint que permite modificar un hilo
	segun los criterios enviados por el body
	de la peticion
*/
route.post('/modificar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.updateUsuario(req.body);

	res.status(usuario.status).json(usuario);
});

/*
	Endpoint que permite ingresar a la cuenta de un usuario
	si este se encuentra registrado, se envia el email y contraseña
*/
route.post('/ingresar', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.ingresarUsuario(req, req.body);

	res.status(usuario.status).json(usuario);
});

/*
	Endpoint que permite cerrar la sesión de un usuario
*/
route.get('/salir', async (req, res) => {
	const usuarioController = new UsuarioController(req);
	let usuario = await usuarioController.salirUsuario(req);

	res.status(usuario.status).json(usuario);
});

export default route;