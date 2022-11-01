import mongoose from 'mongoose';
import { getTime } from './moment.utils.js';

/*
	Realiza la conexión con la base de datos, y
	ejecuta la operación que se le envíe como
	argumento.

	db_uri: String,
	data: Mixed,
	db_operacion: function (callback)

	return: object
*/
async function dbConnection(db_uri, data, db_operacion) {
	let response = {
		fecha: getTime(), 
		origen: 'Revise el origen...',
		contenido: null,
		total: 0,
		status: 200,
		error: null,
	}

	let datos_recibidos;

	try {
		await mongoose.connect(db_uri);
		datos_recibidos = await db_operacion(data);
		response.origen = datos_recibidos.origen;

		response.contenido = datos_recibidos.datos ?? 'Contenido no encontrado...';
		response.total = response.contenido != 'Contenido no encontrado...' ? 
							response.contenido.length : response.total;
							
	} catch(error) {
		response.contenido = 'Algo salio mal...';
		response.error = error.message;
		response.status = 400;
	}

	return response;
}

/*
	Retorna el formato de respuesta de la
	base de datos
*/
function getResFormat() {
	return {
		fecha: getTime(), 
		origen: 'Revise el origen...',
		contenido: 'Not content found',
		total: 0,
		status: 200,
		error: null,
	}
}

/*
	Avisa al usuario en caso de alguna alerta

	origen: String de donde proviene la peticion
	message: String Mensaje de alerta

	return Objecto javascript con la alerta y el formato de respuesta
*/
function alertaRes(origen, message, status) {
	let dataSchema = getResFormat();
	dataSchema.origen = origen;
	dataSchema.contenido = message;
	dataSchema.status = status;

	return dataSchema;
}

/*
	Exportación de la función
*/
export { dbConnection, getResFormat, alertaRes }