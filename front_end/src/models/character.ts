import type { Song } from "./song";
import type { Round } from "./round";
import type { Vote } from "./vote";

export interface Character {
  id: number;
  name: string;
  imageUrl: string;
  biography?: string;
  series?: string;
  songs: Song[];
  currentRound?: Round | null;
  roundId?: number | null;
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}