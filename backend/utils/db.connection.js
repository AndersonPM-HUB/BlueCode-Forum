import mongoose from 'mongoose';

/*
	Realiza la conexión con la base de datos, y
	ejecuta la operación que se le envíe como
	argumento.

	db_uri: String,
	data: Mixed,
	callback: function
*/
async function dbConnection(db_uri, data, callback) {
	let response = {
		origen: '',
		contenido: [],
		error: '',
	}

	let datos_recibidos = null;

	try {
		await mongoose.connect(db_uri);
		datos_recibidos = await callback(data);

		response.origen = datos_recibidos.origen;
		delete datos_recibidos.origen;

		response.contenido = datos_recibidos.datos; 
	} catch(error) {
		response.error = error.message;
	}

	return response;
}

export { dbConnection }