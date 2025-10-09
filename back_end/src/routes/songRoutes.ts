import { Router } from "express";
import * as songController from "../controllers/songController";

const router = Router();

router.get("/", songController.getAllSongs);
router.get("/:id", songController.getSongById);
router.post("/", songController.createSong);
router.post("/bulk", songController.createSongs)
router.delete("/:id", songController.deleteSongById);
router.delete("/", songController.deleteAllSongs);

export default router;