import mongoose from 'mongoose';

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
		origen: 'Check the origin...',
		contenido: null,
		error: null,
	}

	let datos_recibidos;

	try {
		await mongoose.connect(db_uri);
		datos_recibidos = await db_operacion(data);

		response.contenido = datos_recibidos.datos; 
	} catch(error) {
		response.error = error.message;
	} finally {
		response.origen = datos_recibidos.origen ?? response.origen;
	}

	return response;
}

/*
	Exportación de la función
*/
export { dbConnection }