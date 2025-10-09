import { prisma } from "../db";

interface CreateVoteInput {
    characterVote: number;
};

export const createVote = async (data: CreateVoteInput) => {
    return prisma.vote.create({
        data: {
            characterId: data.characterVote,
        },
        include: {
            character: true,
        }
    });
};

export const getAllVotes = async () => {
    return prisma.vote.findMany({
      include: {
        character: {
          select: {
            name: true, 
          },
        },
      },
    });
};

export const getVoteById = async (id: number) => {
    return prisma.vote.findUnique({
        where: { id },
        include: 
        { character: true 
        },
    });
};

export const getVoteByCharacter = async (characterId: number) => {
    return prisma.vote.findMany({
        where: { characterId },
        include: 
        { character: true 
        },
    });
};

export const deleteVoteById = async( id: number) => {
    return prisma.vote.delete({
        where: { id },
    });
};

export const deleteAllVotes = async () => {
    return prisma.vote.deleteMany();
};