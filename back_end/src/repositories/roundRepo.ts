import { prisma } from "../db";

interface CreateRoundInput {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  contestantIds?: number[];
}

export const createRound = async (data: CreateRoundInput) => {
    const round = await prisma.round.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  
    if (data.contestantIds?.length) {
      await prisma.character.updateMany({
        where: { id: { in: data.contestantIds } },
        data: { roundId: round.id },
      });
    }
  
    return prisma.round.findUnique({
      where: { id: round.id },
      include: { contestants: true },
    });
  };

export const getAllRounds = async () => {
  return prisma.round.findMany({
    include: {
      contestants: true,
    },
  });
};

export const getRoundById = async (id: number) => {
  return prisma.round.findUnique({
    where: { id },
    include: {
      contestants: true,
    },
  });
};

export const updateRound = async (id: number, data: Partial<CreateRoundInput>) => {
  return prisma.round.update({
    where: { id },
    data,
  });
};

export const deleteRoundById = async (id: number) => {
  return prisma.round.delete({
    where: { id },
  });
};

export const deleteAllRounds = async () => {
  return prisma.round.deleteMany();
};