import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

import planetsRouter from './routes/planets.router.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
    
}));

app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.use(planetsRouter);

export default app;