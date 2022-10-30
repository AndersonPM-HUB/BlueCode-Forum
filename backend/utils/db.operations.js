import { dbConnection } from './db.connection.js';
import { getTime } from './moment.utils.js';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.development.local', enconding: 'latin1' });
const db = process.env.DB_URI;

/*
	Trae todos los documentos del modelo
	que se requiera

	Model: Mongoose schema
	datos: Objeto javascript

	return Objeto javascript

*/
async function getDocuments(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = await Model.find();
		logOperation(Model, 'getDocuments', data);

		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Trae un solo documento con los criterios de busqueda
	enviados

	Model: Mongoose schema
	datos: Objeto javascript

	return Objeto javascript
*/
async function getOneDocument(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = await Model.findOne(data.buscar);
		logOperation(Model, 'getOneDocument', data);

		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Trae varios documentos con los criterios de busqueda
	enviados

	Model: Mongoose schema
	datos: Objeto javascript

	return Objeto javasript
*/
async function getManyDocuments(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = await Model.find(data.buscar);
		logOperation(Model, 'getManyDocuments', data);

		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Crea el documento que se le envía y lo guarda
	en la base de datos

	Model: Mongoose schema
	datos: Objeto javascript (acá llega el objeto que se quiere crear y otros criterios)

	return Objeto javascript
*/
async function createDocument(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = new Model(data.crear);
		await documents.save();
		logOperation(Model, 'createDocument', data);

		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Elimina un documento de la colección en la base de datos
	con las condiciones que se le envía

	Model: Mongoose schema
	datos: Objecto javascript (condiciones para eliminar el documento)

	return Objecto javascript
*/
async function deleteDocument(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = await Model.deleteOne(data.eliminar);
		logOperation(Model, 'deleteDocument', data);
		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Actualiza un documento pasando un párametro de busqueda,
	y lo que se desea cambiar del documento filtrado

	Model: Mongoose schema
	datos: Objecto javascript (condiciones para buscar y cambiar)

	return Objecto javascript
*/
async function updateDocument(Model, datos) {
	let response = await dbConnection(db, datos, async (data) => {
		const documents = await Model.updateOne(data.buscar, data.cambiar);
		logOperation(Model, 'updateDocument', data);
		return {datos: documents, origen: data.origen}
	});

	return response;
}

/*
	Permite visualizar las operaciones realizadas en consola
	modelo, proceso y datos de entrada

	Model: Nombre del modelo sobre el que se realiza la operación
	process: Operacion realizada a la base de datos
	data: Datos que se la pasan a la operación
*/
function logOperation(Model, process, data){
	console.log('='.repeat(85));
	console.group('Database operation');
	console.log(`Time: ${getTime()}`);
	console.log(`Model: ${Model.collection.collectionName}`);
	console.log(`Process: ${process}`);
	console.log(`Data: ${JSON.stringify(data)}`);
	console.group('Input data:');
	console.table(data);
	console.groupEnd('Datos');
	console.groupEnd('Database');
}

/*
	Exportaciones de funciones
*/
export { getDocuments, getOneDocument,
		 getManyDocuments, createDocument,
		 deleteDocument, updateDocument }