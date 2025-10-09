import { Request, Response } from "express";
import * as roundRepo from "../repositories/roundRepo";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllRounds = asyncHandler(async (_req: Request, res: Response) => {
  const rounds = await roundRepo.getAllRounds();
  res.status(200).json(rounds);
});

export const getRoundById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const round = await roundRepo.getRoundById(id);

  if (!round) {
    res.status(404).json({ message: "Round not found." });
    return;
  }

  res.status(200).json(round);
});

export const createRound = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const newRound = await roundRepo.createRound(data);
  res.status(201).json(newRound);
});

export const createRounds = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const result = Array.isArray(data)
    ? await Promise.all(data.map(d => roundRepo.createRound(d)))
    : await roundRepo.createRound(data);

  res.status(201).json(result);
});

export const deleteRoundById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await roundRepo.deleteRoundById(id);
  res.status(200).json({ message: "Round deleted successfully." });
});

export const deleteAllRounds = asyncHandler(async (_req: Request, res: Response) => {
  await roundRepo.deleteAllRounds();
  res.status(200).json({ message: "All rounds deleted successfully." });
});