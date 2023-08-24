import { Router } from "express";
import { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } from "./launches.controller.js";

const launchesRounter = Router();

launchesRounter.get('/', httpGetAllLaunches);
launchesRounter.post('/', httpAddNewLaunch);
launchesRounter.delete('/:id', httpAbortLaunch);

export default launchesRounter;