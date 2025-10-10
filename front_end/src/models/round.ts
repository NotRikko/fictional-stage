import type { Character } from "./character";

export interface Round {
  id: number;
  name: string;
  description: string;
  contestants: Character[]; // array of Character objects
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const backupRound: Round = {
  id: 0,
  name: "Sample Round",
  description: "This is a backup round object",
  contestants: [],
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
  createdAt: new Date(),
  updatedAt: new Date(),
};