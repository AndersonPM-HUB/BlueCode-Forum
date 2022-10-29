import express from 'express';
import { getDocuments } from '../utils/db.operations.js'
import { getOneDocument } from '../utils/db.operations.js'
import { getManyDocuments } from '../utils/db.operations.js'
import { createDocument } from '../utils/db.operations.js'
import { deleteDocument } from '../utils/db.operations.js'
import { updateDocument } from '../utils/db.operations.js'


import { HiloModel } from '../models/hilos.model.js';


const route = express.Router();

route.get('/', async (req, res) => {
	let origen = req.protocol + "://" + req.get('host') + req.originalUrl;
	let test = null;
	//TODO Controlador de hilos para las operaciones
	//test = await getDocuments(HiloModel, {origen}); // GetAll
	//test = await getOneDocument(HiloModel, {origen, buscar: {tema: 'Jamon'}}); // Get one document, first
	//test = await getManyDocuments(HiloModel, {origen, buscar: {tema: 'Programación'}}); // Get many documents
	//test = await createDocument(HiloModel, {origen, crear: {tema: 'Jamon', descripcion: 'Este es el apartado de jamon'}}); // Create one element
	//test = await deleteDocument(HiloModel, {origen, eliminar: {tema: 'Programación'}}); // delete one element
	//test = await updateDocument(HiloModel, {origen, buscar:{tema: 'Noticias'}, cambiar:{descripcion: 'Cambiando una noticia'}}); // update one element
	res.json(test ?? {});
});

route.get('/tmp', async (req, res) => {
	
	let origen = req.protocol + "://" + req.get('host') + req.originalUrl;

	// let crearHilo = await dbConnection(db, origen, async (data) => {
	// 	const hilo = new HiloModel({
	// 		tema: 'Programación',
	// 		descripcion: 'Este es el apartado de programación',
	// 	});

	// 	await hilo.save();

	// 	//const eliminarHilo = await HiloModel.deleteOne({ tema: 'Programación'});
	// 	const encontrarHilo = await HiloModel.find();

	// 	return {datos: hilo, origen: origen};
	// });

	res.json(test);
});

export default route;