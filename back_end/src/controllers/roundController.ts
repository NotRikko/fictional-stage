import { Request, Response, NextFunction } from "express";
import * as roundRepo from "../repositories/roundRepo";

export const getAllRounds = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rounds = await roundRepo.getAllRounds();
    res.status(200).json(rounds);
  } catch (err) {
    next(err); 
  }
};

export const getRoundById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const round = await roundRepo.getRoundById(id);

    if (!round) {
      return res.status(404).json({ message: "Round not found." });
    }

    res.status(200).json(round);
  } catch (err) {
    next(err);
  }
};

export const createRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newround = await roundRepo.createRound(data);
    res.status(201).json(newround);
  } catch (err) {
    next(err);
  }
};

export const createRounds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    let result;
    if (Array.isArray(data)) {
      result = await Promise.all(data.map(d => roundRepo.createRound(d)));
    } else {
      result = await roundRepo.createRound(data);
    }

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteRoundById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await roundRepo.deleteRoundById(id);
    res.status(200).json({ message: "Round deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAllRounds = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await roundRepo.deleteAllRounds();
    res.status(200).json({ message: "All rounds deleted successfully."});
  } catch (err) {
    next(err); 
  }
};
