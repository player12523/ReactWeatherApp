import { Router } from "express";
import { deleteMe, login, logout, me, register } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

// Account routes used by login, register and settings.

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.delete("/me", requireAuth, deleteMe);

export default router;
