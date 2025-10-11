import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as userRepo from "../repositories/userRepo";
import { prisma } from '../db';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../middleware/auth";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { userName, password } = req.body;
  
    const user = await prisma.user.findUnique({
      where: { userName },
    });
  
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }
  
    const { password: _, ...safeUser } = user;

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ user: safeUser, token });

});

export const signupUser = asyncHandler(async (req: Request, res: Response) => {
    const { userName, password, displayName, imageUrl } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await userRepo.createUser({
      userName,
      displayName,
      password: hashedPassword,
      imageUrl,
    });
  
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  
    res.status(201).json({ user, token });
  });
  