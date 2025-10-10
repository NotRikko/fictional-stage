import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userRepo from "../repositories/userRepo";

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await userRepo.getAllUsers();
    res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userRepo.getUserById(id);

    if(!user) {
        res.status(404).json({ message: "User not found."});
        return;
    }
    
    res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const newUser = await userRepo.createUser(data);
    res.status(201).json(newUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedUser = await userRepo.updateUser(id, data);
    res.status(200).json(updatedUser);
});

export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await userRepo.deleteUserById(id);
    res.status(200).json({ message: "User deleted successfully." });
});

export const deleteAllUsers = asyncHandler(async (req: Request, res: Response) => {
    await userRepo.deleteAllUsers();
    res.status(200).json( {message: "All users deleted successfully." })
})