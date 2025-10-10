import type { Round } from "../models/round";
import type { Character } from "../models/character";
import { mizi, sua } from "./characterMock";

export const roundMock: Round = {
  id: 1,
  name: "Round 1",
  description: "Mizi vs Sua",
  contestants: [], 
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const updatedMizi: Character = {
  ...mizi,
  currentRound: roundMock,
  roundId: roundMock.id,
};

export const updatedSua: Character = {
  ...sua,
  currentRound: roundMock,
  roundId: roundMock.id,
};

roundMock.contestants = [mizi, sua];