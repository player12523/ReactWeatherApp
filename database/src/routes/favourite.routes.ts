import { Router } from "express";
import {
  toggleFavourite,
  getFavouriteWeather,
} from "../controllers/favourite.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/weather", requireAuth, getFavouriteWeather);
router.post("/:locationId/toggle", requireAuth, toggleFavourite);

export default router;
