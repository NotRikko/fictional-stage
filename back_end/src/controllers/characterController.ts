import { Request, Response, NextFunction } from "express";
import * as characterRepo from "../repositories/characterRepo";

export const getAllCharacters = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const characters = await characterRepo.getAllCharacters();
    res.status(200).json(characters);
  } catch (err) {
    next(err); 
  }
};

export const getCharacterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const character = await characterRepo.getCharacterById(id);

    if (!character) {
      return res.status(404).json({ message: "Character not found." });
    }

    res.status(200).json(character);
  } catch (err) {
    next(err);
  }
};

export const createCharacter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const newCharacter = await characterRepo.createCharacter(data);
    res.status(201).json(newCharacter);
  } catch (err) {
    next(err);
  }
};

export const createCharacters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    let result;
    if (Array.isArray(data)) {
      result = await Promise.all(data.map(d => characterRepo.createCharacter(d)));
    } else {
      result = await characterRepo.createCharacter(data);
    }

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteCharacterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await characterRepo.deleteCharacterById(id);
    res.status(200).json({ message: "Character deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAllCharacters = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await characterRepo.deleteAllCharacters();
    res.status(200).json({ message: "All characters deleted successfully."});
  } catch (err) {
    next(err); 
  }
};
