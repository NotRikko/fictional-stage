import type { Character } from "./character";

export interface Vote {
  id: number;
  characterVote: Character;  
  characterId: number;     
  createdAt: Date;
  updatedNow: Date;
}