import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as characterRepo from "../repositories/characterRepo";

export const getAllCharacters = asyncHandler(async (_req: Request, res: Response) => {
  const characters = await characterRepo.getAllCharacters();
  res.status(200).json(characters);
});

export const getCharacterById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const character = await characterRepo.getCharacterById(id);

  if (!character) {
    res.status(404).json({ message: "Character not found." });
    return;
  }

  res.status(200).json(character);
});

export const createCharacter = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const newCharacter = await characterRepo.createCharacter(data);
  res.status(201).json(newCharacter);
});

export const createCharacters = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const result = Array.isArray(data)
    ? await Promise.all(data.map(d => characterRepo.createCharacter(d)))
    : await characterRepo.createCharacter(data);

  res.status(201).json(result);
});

export const deleteCharacterById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await characterRepo.deleteCharacterById(id);
  res.status(200).json({ message: "Character deleted successfully." });
});

export const deleteAllCharacters = asyncHandler(async (_req: Request, res: Response) => {
  await characterRepo.deleteAllCharacters();
  res.status(200).json({ message: "All characters deleted successfully." });
});