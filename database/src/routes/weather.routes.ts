import { Router } from "express";
import {
  createWeather,
  updateWeather,
  deleteWeather,
  getWeather,
  getWeatherById,
} from "../controllers/weather.controller";

const router = Router();

router.get("/", getWeather);
router.get("/:id", getWeatherById);
router.post("/", createWeather);
router.patch("/:id", updateWeather);
router.delete("/:id", deleteWeather);

export default router;
