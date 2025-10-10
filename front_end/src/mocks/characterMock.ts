import type { Character } from "../models/character";
import type { Song } from "../models/song";
import type { Round } from "../models/round";
import type { Vote } from "../models/vote";

const emptySongs: Song[] = [];
const emptyVotes: Vote[] = [];

export const mizi: Character = {
  id: 1,
  name: "Mizi",
  imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844fdf9ab402ebeaf911cd1b25",
  biography: "Mizi",
  series: "Alien Stage",
  songs: emptySongs,
  currentRound: null,
  roundId: null,
  votes: emptyVotes,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sua: Character = {
  id: 2,
  name: "Sua",
  imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da847fb4bcf9d748b52513d8e7d7",
  biography: "Sua",
  series: "Alien Stage",
  songs: emptySongs,
  currentRound: null,
  roundId: null,
  votes: emptyVotes,
  createdAt: new Date(),
  updatedAt: new Date(),
};