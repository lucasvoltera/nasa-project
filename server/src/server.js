import http from 'http';
import app from './app.js';
import { loadPlanetsData } from './models/planets.model.js';
import { mongoConnect, mongoDisconnect } from './services/mongo.js';


const PORT = process.env.PORT || 8000; // Porta que não há conflito com o frontend
const server = http.createServer(app);


async function startServer() {
    await mongoConnect(); // Conecta com o banco de dados MongoDB
    await loadPlanetsData(); // Carrega os dados do arquivo planets.json

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });    
}

startServer();

