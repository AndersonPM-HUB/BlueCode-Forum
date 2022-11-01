import * as DbOperation from '../utils/db.operations.js';
import { getResFormat } from '../utils/db.connection.js';
import { alertaRes } from '../utils/db.connection.js';
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
		
		return alertaRes(origen, 'El hilo ya existe...', 400);
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
		let operationDb = null;

		if (!data.buscar) {
			operationDb = DbOperation.getDocuments;

			return await operationDb(this.model, dataSchema);
		}

		if (data.buscar.tema) {
			dataSchema.buscar = data.buscar;
			operationDb = DbOperation.getOneDocument;
			
			if (data.buscar.todos === "true"){
				operationDb = DbOperation.getManyDocuments;
				delete data.buscar.todos;
			}

		}

		if (operationDb === null) {
			return alertaRes(origen, 'Los criterios de busqueda no son válidos...', 400);
		}

		return await operationDb(this.model, dataSchema);
	}

	/*
		Elimina el hilo segun el tema que se envie como argumento

		data: Objecto javascript

		return Objecto javascript
	*/
	async deleteHilo(data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		if(data.eliminar.tema) {
			dataSchema.eliminar = data.eliminar;
			return await DbOperation.deleteDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'Ingrese un tema para eliminar...', 400);
	}

	/*
		Actualiza un hilo segun lo que se le envia como argumentos

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