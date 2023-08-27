import { getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById } from '../../models/launches.model.js';

async function httpGetAllLaunches(req, res) {
    // Array.from() is a method to create an array from an iterable
    // launches.values() is an iterable of the values of the launches map
    // The values of the launches map are the launch objects
    // The launch objects are converted to an array and sent to the client
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {

    // req.body is an object with the properties of the request body
    // The request body is an object with the properties of the launch object
    const launch = req.body;

    // Check if the launch object has the required properties
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    
    // Check if the launch date is valid
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }

    // The launch object is added to the launches map
    // The launch object is sent to the client
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
  
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
      return res.status(404).json({
        error: 'Launch not found',
      });
    }
  
    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
      return res.status(400).json({
        error: 'Launch not aborted',
      });
    }
  
    return res.status(200).json({
      ok: true,
    });
}

export {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}