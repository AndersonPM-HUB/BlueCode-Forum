import * as DbOperation from '../utils/db.operations.js';
import { getResFormat } from '../utils/db.connection.js';
import { HiloModel } from '../models/hilos.model.js';

/*
	Controlador de hilo que contiene las operaciones
	con la base de datos y el modelo Hilo
*/
class HiloController {
	/*
		Controlador de HiloController

		req: recibe la request
	*/
	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.model = HiloModel;
	}

	/*
		Permite la creacion de hilos, pero antes comprueba que
		no existe ningun hilo con el mismo tema

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
				o respuesta modificada
	*/
	async createHilo(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

		let consulta = {
			...dataSchema,
			buscar: {
				tema: data.tema
			}
		}

		let documentExist = await DbOperation.getOneDocument(this.model, consulta);

		if(documentExist.contenido === 'Contenido no encontrado...'){
			dataSchema.crear = data;
			return await DbOperation.createDocument(this.model, dataSchema);
		}

		documentExist = getResFormat();
		documentExist.origen = origen;
		documentExist.contenido = 'El hilo ya existe...';
		
		return documentExist;
	}

	/*
		Trae los hilos o el hilo según los criterios de busqueda
		enviados, siendo el intermediario entre los modelos y las operaciones
		de la base de datos

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
	*/
	async getHilo(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

		let operationDb = DbOperation.getDocuments;

		if (data.buscar) {
			dataSchema.buscar = data.buscar;
			operationDb = DbOperation.getOneDocument;
			
			if (data.buscar.todos === "true"){
				operationDb = DbOperation.getManyDocuments;
				delete data.buscar.todos;
			}
		}

		return await operationDb(this.model, dataSchema);
	}

	/*
		Elimina el hilo que se le envía por parametro,
		segun lo que se le envíe por parametro

		data: Objecto javascript

		return Objecto javascript
	*/
	async deleteHilo(data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		dataSchema.eliminar = data.eliminar;

		return await DbOperation.deleteDocument(this.model, dataSchema);
	}

	/*
		Actualiza un hilo segun lo que se le envia por
		parametros

		data: Objecto javascript

		return Objecto javascript
	*/
	async updateHilo(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			...data 
		}

		return await DbOperation.updateDocument(this.model, dataSchema);
	}
}

export { HiloController }