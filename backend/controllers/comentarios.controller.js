import * as DbOperation from '../utils/db.operations.js';
import { alertaRes } from '../utils/db.connection.js';
import { ComentarioModel } from '../models/comentarios.model.js';
import { PublicacionController } from './publicaciones.controller.js';
import { getTime } from '../utils/moment.utils.js'

/*
	Controlador de comentario que contiene las operaciones
	con la base de datos y el modelo Comentario
*/
class ComentarioController {
	/*
		Constructor de ComentarioController

		req: recibe la request
	*/
	constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.model = ComentarioModel;
	}

	/*
		Permite la creacion de comentarios a publicaciones
        existentes

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
				o respuesta modificada
	*/
	async createComentario(req, data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}

        const publicacionController = new PublicacionController(req);

        data.usuario = req.session.usuario._id;
        data.fecha = getTime();

        dataSchema.crear = data;

        let busqueda = {'buscar': {
            '_id': data.publicacion
        }};

        let publicacionExiste = await publicacionController.getPublicacion(busqueda);

        if (publicacionExiste != 'Contenido no encontrado...'){
            let comentarioCreado = await DbOperation.createDocument(this.model, dataSchema);
            
            let añadirComentario = {
                'buscar': {
                    '_id': publicacionExiste.contenido._id
                },
                'cambiar': {
                    $addToSet: {
                        'comentarios': comentarioCreado.contenido._id 
                    }
                }
            };

            publicacionController.updatePublicacion(req, añadirComentario);

            return comentarioCreado;
        }

        return alertaRes(origen, 'No existe la publicacion...', 400);
	}

	/*
		Trae todos los comentarios

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
	*/
	async getComentario(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			pagina: 1
		}

		let operationDb;

		dataSchema.poblar = [{ path: 'usuario', select: 'nickname puntos -_id' },
			{ path: 'publicacion', select: 'titulo -_id' }];

		if (!data.buscar) {
			operationDb = DbOperation.getDocuments;

			return await operationDb(this.model, dataSchema);
		}

		if (data.buscar.pagina) {
			dataSchema.buscar = data.buscar;
			dataSchema.pagina = data.buscar.pagina ?? 1;
			
			operationDb = DbOperation.getManyDocuments;
		}

		return await operationDb(this.model, dataSchema);
	}

	/*
		Elimina el comentario segun el tema que se envie como argumento

		data: Objecto javascript

		return Objecto javascript
	*/
	async deleteComentario(data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		if(data.eliminar._id) {
			dataSchema.eliminar = data.eliminar;
			return await DbOperation.deleteDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'Ingrese el _id del cometario para eliminar...', 400);
	}
	
}

export { ComentarioController }