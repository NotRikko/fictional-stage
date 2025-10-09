import { Request, Response, NextFunction } from "express";
import * as songRepo from "../repositories/songRepo";

export const getAllSongs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const songs = await songRepo.getAllSongs();
        res.status(200).json(songs);
    } catch (err) {
        next(err);
    }
};

export const getSongById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const song = await songRepo.getSongById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found."});
        }

        res.status(200).json(song);
    } catch (err) {
        next(err);
    }
};

export const createSong = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const newSong = await songRepo.createSong(data);
        res.status(201).json(newSong);
    } catch (err) {
        next(err);
    }
};

export const createSongs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        let result;
        if (Array.isArray(data)) {
            result = await Promise.all(data.map(d => songRepo.createSong(d)));
        } else{
            result = await songRepo.createSong(data);
        }

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteSongById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    await songRepo.deleteSongById(id);
    res.status(200).json({ message: "Song deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAllSongs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await songRepo.deleteAllSongs();
    res.status(200).json({ message: "All songs deleted successfully."});
  } catch (err) {
    next(err); 
  }
};
