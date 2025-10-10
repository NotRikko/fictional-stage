import { Request, Response } from "express";
import * as voteRepo from "../repositories/voteRepo";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllVotes = asyncHandler(async (_req: Request, res: Response) => {
  const votes = await voteRepo.getAllVotes();
  res.status(200).json(votes);
});

export const getVoteById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const vote = await voteRepo.getVoteById(id);

  if (!vote) {
    return res.status(404).json({ message: "Vote not found." });
  }

  res.status(200).json(vote);
});

export const getVoteByCharacter = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const votes = await voteRepo.getVoteByCharacter(id);

  if (!votes || votes.length === 0) {
    return res.status(404).json({ message: "Votes not found for character." });
  }

  res.status(200).json(votes);
});

export const createVote = asyncHandler(async (req: Request, res: Response) => {
  const { userId, characterVote } = req.body;

  if (!userId || !characterVote) {
    return res.status(400).json({ message: "userId and characterVote are required." });
  }

  const newVote = await voteRepo.createVote({ userId, characterVote });
  res.status(201).json(newVote);
});

export const deleteVoteById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await voteRepo.deleteVoteById(id);
  res.status(200).json({ message: "Vote deleted successfully." });
});

export const deleteAllVotes = asyncHandler(async (_req: Request, res: Response) => {
  await voteRepo.deleteAllVotes();
  res.status(200).json({ message: "All votes deleted successfully." });
});