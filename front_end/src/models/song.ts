import type { Character } from "./character";

export interface Song {
  id: number;
  title: string;
  character: Character;  
  characterId: number;  
  createdAt: Date;
  updatedAt: Date;
}