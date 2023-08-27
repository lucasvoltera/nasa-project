import launchesDatabase from './launches.mongo.js';
import planets from './planets.mongo.js';

// const launches = new Map();

const launch = {
    flightNumber: 100, // flight number
    mission: 'Amos-17', // mission name
    rocket: 'Falcon 9', // rocket name
    launchDate: new Date('August 6, 2019'), // when's the launch? 
    target: 'Kepler-442 b', // where's the launch going?
    costumer: ['X', 'NASA', 'ZTM'], // who's paying for the launch?
    upcoming: true, // is this a future launch or a past launch?
    success: true, // did the launch succeed?
};

saveLaunch(launch);

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
      .findOne()
      .sort('-flightNumber');
  
    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }
  
    return latestLaunch.flightNumber;
  }
  
async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
      flightNumber: launch.flightNumber,
    }, launch, {
      upsert: true,
    });
}

async function getAllLaunches(skip, limit) {
    return await launchesDatabase
      .find({}, { '_id': 0, '__v': 0 })
      .sort({ flightNumber: 1 })
      .skip(skip)
      .limit(limit);
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}
  

async function existsLaunchWithId(launchId) {
    return await findLaunch({
      flightNumber: launchId,
    });
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
      flightNumber: launchId,
    }, {
      upcoming: false,
      success: false,
    });
  
    return aborted.modifiedCount === 1;
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    const newFlightNumber = await getLatestFlightNumber() + 1;
  
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Space X', 'NASA'],
      flightNumber: newFlightNumber,
    });
  
    await saveLaunch(newLaunch);
}

export {
    getAllLaunches,
    existsLaunchWithId,
    scheduleNewLaunch,
    abortLaunchById
}