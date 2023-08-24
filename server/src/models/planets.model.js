import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from 'fs';
import {parse} from 'csv-parse';
// import { parse } from "csv-parse";


const habitablePlanets = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function isHabitablePlanet(planet) {
    // filter the planets that are confirmed
    return planet['koi_disposition'] === 'CONFIRMED' && 
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        createReadStream(join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            // parse the csv file
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            // filter the planets that are confirmed
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            // catch any error
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
            // when the stream ends
            .on('end', () => {
                // exibing the name of the habitable planets
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}

export {
    loadPlanetsData,
    getAllPlanets,
}