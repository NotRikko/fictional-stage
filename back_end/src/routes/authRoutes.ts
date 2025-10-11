import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/login", authController.loginUser);
router.post("/signup", authController.signupUser);

export default router;