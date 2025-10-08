import { prisma } from '../db';

interface CreateCharacterInput {
    name: string;         
    imageUrl: string;     
    biography: string;    
    series: string;       
    roundId?: number;     
    songs?: { title: string }[];
  }

export const createCharacter = async (data: CreateCharacterInput) => {
  return prisma.character.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      biography: data.biography,
      series: data.series,
      ...(data.roundId && { roundId: data.roundId }),
      ...(data.songs && { songs: { create: data.songs } }),
    },
    include: {
      songs: true,
      currentRound: true,
      votes: true,
    },
  });
};

export const getCharacters = async () => {
  return prisma.character.findMany();
};

export const getCharacterById = async (id: number) => {
  return prisma.character.findUnique({
    where: { id },
  });
};