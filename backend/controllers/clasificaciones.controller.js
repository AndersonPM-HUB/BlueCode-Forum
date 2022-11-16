import * as DbOperation from '../utils/db.operations.js';
import { alertaRes } from '../utils/db.connection.js';
import { ClasificacionModel } from '../models/clasificaciones.model.js';

/*
	Controlador de clasificacion que contiene las operaciones
	con la base de datos y el modelo Clasificacion
*/
class ClasificacionController {
	/*
		Constructor de ClasificacionController

		req: recibe la request
	*/
	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.model = ClasificacionModel;
	}

	/*
		Permite la creacion de clasificaciones, pero antes comprueba que
		no existe ninguna clasificacion con el mismo tema

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
				o respuesta modificada
	*/
	async createClasificacion(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

		let consulta = {
			...dataSchema,
			buscar: {
				nombre: data.nombre
			}
		}

		let documentExist = await DbOperation.getOneDocument(this.model, consulta);
		
		if(documentExist.contenido === 'Contenido no encontrado...'){
			dataSchema.crear = data;
			return await DbOperation.createDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'La clasificacion ya existe...', 400);
	}

	/*
		Trae las clasificaciones o la clasificacion según los criterios de busqueda
		enviados, siendo el intermediario entre los modelos y las operaciones
		de la base de datos

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
	*/
	async getClasificacion(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			pagina: 1
		}

		let operationDb = null;

		dataSchema.poblar = [{ path: 'publicaciones' }]
		
		if (!data.buscar) {
			operationDb = DbOperation.getDocuments;

			return await operationDb(this.model, dataSchema);
		}

		if (data.buscar.nombre || data.buscar.pagina) {
			dataSchema.buscar = data.buscar;

			operationDb = DbOperation.getOneDocument;
			
			if (data.buscar.todos === "true"){
				dataSchema.pagina = data.buscar.pagina ?? 1;
				
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
		Elimina la clasificacion segun el nombre que se envie como argumento

		data: Objecto javascript

		return Objecto javascript
	*/
	async deleteClasificacion(data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		if(data.eliminar.nombre) {
			dataSchema.eliminar = data.eliminar;
			return await DbOperation.deleteDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'Ingrese un nombre para eliminar...', 400);
	}

	/*
		Actualiza una clasificacion segun lo que se le envia como argumentos

		data: Objecto javascript

		return Objecto javascript
	*/
	async updateClasificacion(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			...data 
		}

		return await DbOperation.updateDocument(this.model, dataSchema);
	}
	
}

export { ClasificacionController }