import { prisma } from "../db";
import bcrypt from "bcrypt";

interface CreateUserInput {
  displayName: string;
  userName: string;
  password: string;
  imageUrl?: string;
}

export const createUser = async (data: CreateUserInput) => { 
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
        data: {
        userName: data.userName,
        displayName: data.displayName,
        password: hashedPassword,
        ...(data.imageUrl ? { imageUrl: data.imageUrl } : {}),
        },
    });
};

 
export const getAllUsers = async () => {
    return prisma.user.findMany({
        include: {
        votes: true, 
        },
    });
};
  
 
export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        include: {
        votes: true,
        },
    });
};
  

export const updateUser = async (id: number, data: Partial<CreateUserInput>) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUserById = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};
  

export const deleteAllUsers = async () => {
    return prisma.user.deleteMany();
};