const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, // flight number
    mission: 'Amos-17', // mission name
    rocket: 'Falcon 9', // rocket name
    launchDate: new Date('August 6, 2019'), // when's the launch? 
    target: 'Geostationary Transfer Orbit (GTO)', // where's the launch going?
    costumer: ['X', 'NASA', 'ZTM'], // who's paying for the launch?
    upcoming: true, // is this a future launch or a past launch?
    success: true, // did the launch succeed?
};

// set the flight number as the key and the launch object as the value
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    // set the flight number as the key and the launch object as the value
    // Object.assign() is a method to copy the properties of an object to another object
    // The first argument is the target object
    // The second argument is the source object
    // The method returns the target object
    launches.set(latestFlightNumber, Object.assign(launch, {
            flightNumber: latestFlightNumber,
            upcoming: true,
            costumers: ['NASA'],
            success: true,
        })
    );
}

export {
    getAllLaunches,
    addNewLaunch
}