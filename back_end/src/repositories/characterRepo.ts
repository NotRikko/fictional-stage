import { prisma } from '../db';

interface CreateCharacterInput {
    name: string;
    imageUrl: string;
    description?: string;
    series?: string;
    songs?: { title: string }[];
  }

  export const createCharacter = async (data: CreateCharacterInput) => {
    return prisma.character.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
        series: data.series,
        songs: data.songs
          ? {
              create: data.songs, 
            }
          : undefined,
      },
      include: {
        songs: true, 
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