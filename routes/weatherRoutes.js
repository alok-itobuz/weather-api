import { Router } from "express";
import {
  getAllWeathers,
  getWeather,
  addWeather,
  pathNotFound,
} from "../controllers/weatherControllers.js";

const weatherRouter = Router();

weatherRouter.route("").get(getAllWeathers).post(addWeather);
weatherRouter.route("/:name").get(getWeather);
weatherRouter.route("*").all(pathNotFound);

export default weatherRouter;
