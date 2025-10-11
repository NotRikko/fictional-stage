import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/loginUser", authController.loginUser);
router.get("/signupUser", authController.signupUser);

export default router;