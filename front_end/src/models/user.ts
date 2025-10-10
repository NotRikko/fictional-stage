import type { Vote } from "./vote";

export interface User {
    id: number;
    displayName: string;
    userName: string;
    imageUrl: string;
    votes: Vote[];
    createdAt: Date;
    updatedAt: Date;
}