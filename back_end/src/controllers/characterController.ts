import { Request, Response } from "express";

export const getCharacters = (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Hatsune Miku", song: "World is Mine" },
    { id: 2, name: "Raiden Shogun", song: "Eternity's Promise" }
  ]);
};