import { Router } from "express";
import * as userController from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/me", auth, userController.getCurrentUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUserById);
router.delete("/", userController.deleteAllUsers);

export default router;