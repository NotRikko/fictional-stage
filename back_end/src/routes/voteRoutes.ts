import { Router } from "express";
import * as voteController from "../controllers/voteController";

const router = Router();

router.get("/", voteController.getAllVotes);
router.get("/:id", voteController.getVoteById);
router.get("/character/:id", voteController.getVoteByCharacter);
router.post("/", voteController.createVote);
router.delete("/:id", voteController.deleteVoteById);
router.delete("/", voteController.deleteAllVotes);

export default router;