import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { dbConnection } from './utils/db.connection.js';
import { HiloModel } from './models/hilos.model.js';

dotenv.config({ path: './.env.development.local', enconding: 'latin1' });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	let db = process.env.DB_URI;
	let origen = req.protocol + "://" + req.get('host');

	let crearHilo = await dbConnection(db, origen, async (data) => {
		// const hilo = new HiloModel({
		// 	tema: 'Programación',
		// 	descripcion: 'Este es el apartado de programación',
		// 	publicaciones: []
		// });

		// await hilo.save();

		const eliminarHilo = await HiloModel.deleteOne({ tema: 'Programación'});
		const encontrarHilo = await HiloModel.find();

		return {datos: [...encontrarHilo], origen: data};
	});

	res.json(crearHilo);
});

app.listen(port, () => {
	console.log(`Listen on: ${port}`);
	console.log(`App on localhost:${port}`);
});