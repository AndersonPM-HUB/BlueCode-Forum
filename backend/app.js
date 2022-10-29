import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import hilosRoutes from './routes/hilos.routes.js';

dotenv.config({ path: './.env.development.local', enconding: 'latin1' });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Routes
app.use('/hilos', hilosRoutes);


app.listen(port, () => {
	console.log(`Listen on: ${port}`);
	console.log(`App on localhost:${port}`);
});