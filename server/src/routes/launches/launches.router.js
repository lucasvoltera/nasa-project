import { Router } from "express";
import { httpGetAllLaunches, httpAddNewLaunch } from "./launches.controller.js";

const launchesRounter = Router();

launchesRounter.get('/', httpGetAllLaunches);
launchesRounter.post('/', httpAddNewLaunch);

export default launchesRounter;