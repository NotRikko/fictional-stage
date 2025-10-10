import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import * as userRepo from "../repositories/userRepo";
import * as userController from "../controllers/userController";

vi.mock("../utils/asyncHandler", () => ({
    asyncHandler: (fn: any) => fn,
}));

vi.mock("../repositories/userRepo", () => ({
    getAllUsers: vi.fn(),
    getUserById: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUserById: vi.fn(),
    deleteAllUsers: vi.fn(),
}));

const createFakerUser = (overrides = {}) => ({
    id: 1,
    displayName: "Rikko",
    userName: "Rikko",
    password: "12345",
    imageUrl: "https://preview.redd.it/robin-character-is-based-on-a-poem-from-emily-dickenson-v0-5tjg0oic4mjc1.jpeg?width=640&crop=smart&auto=webp&s=c32cef6fab641c57958e4ec96c5b549d26e3978a",
    votes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});

describe("userController", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    const mockNext = vi.fn();

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        vi.clearAllMocks();
    });

    it("should return 200 and list of users", async () => {
        const fakeUsers = [createFakerUser()];
        (userRepo.getAllUsers as any).mockResolvedValue(fakeUsers);

        await userController.getAllUsers(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(userRepo.getAllUsers).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(fakeUsers);
    });

    it("should return 200 and a single user by id", async () => {
        const fakeUser = createFakerUser();
        mockReq.params = { id: "1" };
        (userRepo.getUserById as any).mockResolvedValue(fakeUser);
    
        await userController.getUserById(
          mockReq as Request,
          mockRes as Response,
          mockNext
        );
    
        expect(userRepo.getUserById).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(fakeUser);
      });
    
    it("should return 404 if user not found", async () => {
    mockReq.params = { id: "1" };
    (userRepo.getUserById as any).mockResolvedValue(null);

    await userController.getUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext
    );

    expect(userRepo.getUserById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it("should create a new user and return 201", async () => {
    const fakeUser = createFakerUser();
    mockReq.body = { displayName: "Rikko", userName: "Rikko", password: "12345" };
    (userRepo.createUser as any).mockResolvedValue(fakeUser);

    await userController.createUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
    );

    expect(userRepo.createUser).toHaveBeenCalledWith(mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeUser);
    });

    it("should update a user and return 200", async () => {
    const fakeUser = createFakerUser();
    mockReq.params = { id: "1" };
    mockReq.body = { displayName: "Updated" };
    (userRepo.updateUser as any).mockResolvedValue(fakeUser);

    await userController.updateUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
    );

    expect(userRepo.updateUser).toHaveBeenCalledWith(1, mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeUser);
    });

    it("should delete a user by id and return 200 w/ success message", async () => {
    mockReq.params = { id: "1" };

    await userController.deleteUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext
    );

    expect(userRepo.deleteUserById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "User deleted successfully." });
    });

    it("should delete all users and return 200", async () => {
    await userController.deleteAllUsers(
        mockReq as Request,
        mockRes as Response,
        mockNext
    );

    expect(userRepo.deleteAllUsers).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "All users deleted successfully." });
    });
});