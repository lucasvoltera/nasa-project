import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream } from 'fs';
import {parse} from 'csv-parse';
import planets from './planets.mongo.js';

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
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    // insert + update = upsert
                    savePlanet(data);
                }
            })
            // catch any error
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
            // when the stream ends
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                // exibing the name of the habitable planets
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
}

async function getAllPlanets() {
    return await planets.find({}, {
      '_id': 0, '__v': 0,
    });
  }
async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
}

export {
    loadPlanetsData,
    getAllPlanets,
}

