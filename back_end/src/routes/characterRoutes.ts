import { Router } from "express";
import { getCharacters } from "../controllers/characterController";

const router = Router();

router.get("/", getCharacters);

export default router;