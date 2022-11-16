if (data.cambiar.clasificaciones) {
    const clasificacionController = new ClasificacionController(req);

    let busqueda = {
        'buscar' : {
            'nombre': data.cambiar.clasificaciones,
        }
    };

    const clasificacion = await clasificacionController.getClasificacion(busqueda);

    if (clasificacion.contenido !== 'Contenido no encontrado...'){
        busqueda = {
            origen,
            'buscar': {
                'titulo': data.buscar.titulo,
            },
            'cambiar': {
                $addToSet: {
                    'clasificaciones': clasificacion.contenido._id
                }
            }
        };

        delete data.cambiar.clasificaciones;

        await DbOperation.updateDocument(this.model, busqueda);
    
    } else {
        return alertaRes(origen, 'La clasificación no existe...', 400);
    }
    
}
