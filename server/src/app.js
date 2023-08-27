import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

import planetsRouter from './routes/planets/planets.router.js'
import launchesRouter from './routes/launches/launches.router.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
    
}));

// morgan is a logger for express to log the requests to the console
app.use(morgan('combined'));

// express.json() is a middleware to parse the request body
app.use(express.json());

app.use(express.static(join(__dirname, '..', 'public')));
app.use('/planets', planetsRouter);
app.use('/launches' , launchesRouter);


app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default app;