import { Router } from "express";
import {
  toggleFavourite,
  getFavouriteWeather
} from "../controllers/favourite.controller";

const router = Router();

router.post("/toggle", toggleFavourite);
router.post("/weather", getFavouriteWeather);

export default router;