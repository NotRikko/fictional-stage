import { Router } from "express";
import * as roundController from "../controllers/roundController";

const router = Router();

router.get("/", roundController.getAllRounds);
router.get("/:id", roundController.getRoundById);
router.post("/", roundController.createRound);
router.post("/bulk", roundController.createRounds)
router.delete("/:id", roundController.deleteRoundById);
router.delete("/", roundController.deleteAllRounds);

export default router;