import { Router } from "express";
import * as characterController from "../controllers/characterController";

const router = Router();

router.get("/", characterController.getAllCharacters);
router.get("/:id", characterController.getCharacterById);
router.post("/", characterController.createCharacter);
router.post("/bulk", characterController.createCharacters)
router.delete("/:id", characterController.deleteCharacterById);
router.delete("/", characterController.deleteAllCharacters);

export default router;