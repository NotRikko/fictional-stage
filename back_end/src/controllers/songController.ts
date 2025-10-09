import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as songRepo from "../repositories/songRepo";

export const getAllSongs = asyncHandler(async (_req: Request, res: Response) => {
  const songs = await songRepo.getAllSongs();
  res.status(200).json(songs);
});

export const getSongById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const song = await songRepo.getSongById(id);

  if (!song) {
    res.status(404).json({ message: "Song not found." });
    return;
  }

  res.status(200).json(song);
});

export const createSong = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const newSong = await songRepo.createSong(data);
  res.status(201).json(newSong);
});

export const createSongs = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const result = Array.isArray(data)
    ? await Promise.all(data.map(d => songRepo.createSong(d)))
    : await songRepo.createSong(data);

  res.status(201).json(result);
});

export const deleteSongById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await songRepo.deleteSongById(id);
  res.status(200).json({ message: "Song deleted successfully." });
});

export const deleteAllSongs = asyncHandler(async (_req: Request, res: Response) => {
  await songRepo.deleteAllSongs();
  res.status(200).json({ message: "All songs deleted successfully." });
});