import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

import hilosRoutes from './routes/hilos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';

dotenv.config({ path: './.env.development.local', enconding: 'latin1' });

//Iniciando la aplicación
const app = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(session({
	secret: process.env.SECRET_KEY,
	name: process.env.SESSION_NAME,
	cookie: {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		secure: false,
		sameSite: false,
	},
	saveUninitialized: true,
	resave: true,
	store: MongoStore.create({
		mongoUrl: process.env.DB_URI,
		touchAfter: 24 * 3600,
		ttl: 14 * 24 * 60 * 60,
		autoRemove: 'native',
		autoRemoveInterval: 60 * 24
	}),
}));

// Rutas de la aplicación
app.use('/hilos', hilosRoutes);
app.use('/usuarios', usuariosRoutes);

// test session
app.get('/', async (req, res) => {
	// if(req.session.page_views){
	// 	req.session.page_views++;
	// } else {
	// 	req.session.page_views = 1;
	// }

	// //TODO Regenerar session despues de un login
	// //TODO Destruir session cuando se salga de la session
	
	// //console.log(req.cookies)
	// //console.log('Signed Cookies: ', req.signedCookies)
	// console.log(req.session.id);
	// console.log(req.sessionID);
	// let session_id = req.sessionID;
	// let session_params = req.session;

	res.json('Hola mundo');
})

// Inicio de la aplicación
app.listen(port, () => {
	console.log(`Listen on: ${port}`);
	console.log(`App on http://localhost:${port}`);
});