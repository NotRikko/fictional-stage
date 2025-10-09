import { prisma } from '../db';

interface CreateSongInput {
    title: string,
    characterId: number,
}

export const createSong = async (data: CreateSongInput) => {
    return prisma.song.create({
        data: {
            title: data.title,
            character: { connect: { id: data.characterId } },
        },
        include: {
            character: true,
        }
    });
};


export const getAllSongs = async () => {
    return prisma.song.findMany();
}

export const getSongById = async (id: number) => {
    return prisma.song.findUnique({
        where: { id },
    });
}

export const deleteSongById = async (id: number) => {
    return prisma.song.delete({
        where: {id},
    });
}

export const deleteAllSongs = async () => {
    return prisma.song.deleteMany();
}