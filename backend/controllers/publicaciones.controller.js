import * as DbOperation from '../utils/db.operations.js';
import { alertaRes } from '../utils/db.connection.js';
import { PublicacionModel } from '../models/publicaciones.model.js';
import { getTime } from '../utils/moment.utils.js';
import { UsuarioController } from './usuarios.controller.js';

/*
	Controlador de publicacion que contiene las operaciones
	con la base de datos y el modelo Publicacion
*/
class PublicacionController {
    /*
		Constructor de PublicacionController

		req: recibe la request
	*/
    constructor(req) {
		this.origen = req.protocol + "://" + req.get('host') + req.originalUrl;
		this.model = PublicacionModel;
	}

    /*
		Permite la creacion de publicaciones, pero antes comprueba que
		no existe ninguna publicacion con el mismo titulo

		data: Objecto javascript
        req: recibe la request

		return Objecto javascript que proviene de la base de datos (db.connection)
				o respuesta modificada
	*/
    async createPublicacion(req, data) {
        let origen = this.origen;
		let dataSchema = {
			origen,
		}

		let consulta = {
			...dataSchema,
			buscar: {
				titulo: data.titulo
			}
		}

		let documentExist = await DbOperation.getOneDocument(this.model, consulta);

		if(documentExist.contenido === 'Contenido no encontrado...'){
			const usuarioController = new UsuarioController(req);

			dataSchema.crear = data;
            dataSchema.crear.usuario = req.session.usuario._id;
            dataSchema.crear.fecha = getTime();
        
			const publicacionCreada = await DbOperation.createDocument(this.model, dataSchema);

			let busqueda = {
				'buscar': {
					'nickname': req.session.usuario.nickname,
				},
				'cambiar': {
					$addToSet: {
						'publicaciones': publicacionCreada.contenido._id
					}
				}
			};
	
			await usuarioController.updateUsuario(busqueda);

			return publicacionCreada;
		}
		
		return alertaRes(origen, 'La publicacion con el titulo ingresado ya existe...', 400);
    }

    /*
		Trae las publicaciones o la publicacion según los criterios de busqueda
		enviados, siendo el intermediario entre los modelos y las operaciones
		de la base de datos

		data: Objecto javascript

		return Objecto javascript que proviene de la base de datos (db.connection)
	*/
    async getPublicacion(data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
		}
		let operationDb = null;

        dataSchema.poblar = [{ path: 'usuario', select: 'nickname puntos -_id' },
			{ path: 'clasificaciones', select: 'nombre -_id' },
			{ path: 'comentarios', select: 'contenido usuario fecha -_id', populate: { path: 'usuario', select: 'nickname -_id' } }];

		if (!data.buscar) {
			operationDb = DbOperation.getDocuments;

			return await operationDb(this.model, dataSchema);
		}

		if (data.buscar.titulo || data.buscar._id) {
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
		Elimina la publicacion segun el nombre que se envie como argumento

		data: Objecto javascript

		return Objecto javascript
	*/
    async deletePublicacion(req, data) {
		let origen = this.origen;
		let dataSchema = {
			origen, 
		}

		const usuarioController = new UsuarioController(req);
        
        let busqueda = {
            'buscar' : {
                'titulo': data.eliminar.titulo,
                '_id': data.eliminar._id
            }
        };

        const publicacion = await this.getPublicacion(busqueda);

        if (publicacion.contenido !== 'Contenido no encontrado...') {
			let eliminarPublicacion = {
                'buscar': {
                    '_id': publicacion.contenido.usuario._id
                },
                'cambiar': {
                    $pull: {
                        'publicaciones': data.eliminar._id
                    }
                }
            };
        
        	await usuarioController.updateUsuario(eliminarPublicacion);
        } 

		if(data.eliminar.titulo) {
			dataSchema.eliminar = data.eliminar;
			return await DbOperation.deleteDocument(this.model, dataSchema);
		}
		
		return alertaRes(origen, 'Ingrese un titulo para eliminar...', 400);
	}

    /*
		Actualiza una publicacion segun lo que se le envia como argumentos

		data: Objecto javascript

		return Objecto javascript
	*/
    async updatePublicacion(req, data) {
		let origen = this.origen;
		let dataSchema = {
			origen,
			...data 
		}

		return await DbOperation.updateDocument(this.model, dataSchema);
	}
}

export { PublicacionController }