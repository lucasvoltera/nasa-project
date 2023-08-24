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

// express.static() is a middleware to serve static files (like index.html) from a directory (like public)
app.use(express.static(join(__dirname, '..', 'public')));

// app.use() is a method to register a middleware
// The first argument is the path to the route
// The second argument is the middleware
// The path to the route is the path after the prefix /api
// The middleware is a router that handles all requests to the path /api/planets
// The router is defined in the file routes/planets.router.js
app.use('/planets', planetsRouter);
app.use('/launches' , launchesRouter);

// app.get() is a method to define a route handler for GET requests to a path (/)
// The route handler is a function that takes a request and a response object as arguments
// The response object has a method sendFile() to send a file to the client
// The method join() from the path module is used to join the path of the current file (__dirname) with the path to the index.html file
// The method sendFile() from the response object is used to send the index.html file to the client
app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

export default app;