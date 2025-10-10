import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import * as voteController from "../controllers/voteController";
import * as voteRepo from "../repositories/voteRepo";

vi.mock("../utils/asyncHandler", () => ({
  asyncHandler: (fn: any) => fn,
}));

vi.mock("../repositories/voteRepo", () => ({
  getAllVotes: vi.fn(),
  getVoteById: vi.fn(),
  getVoteByCharacter: vi.fn(),
  createVote: vi.fn(),
  deleteVoteById: vi.fn(),
  deleteAllVotes: vi.fn(),
}));


const createFakeVote = (overrides = {}) => ({
  id: 1,
  characterId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe("voteController", () => {
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

  it("should return 200 and list of votes", async () => {
    const fakeVotes = [createFakeVote()];
    (voteRepo.getAllVotes as any).mockResolvedValue(fakeVotes);

    await voteController.getAllVotes(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.getAllVotes).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeVotes);
  });

  it("should return 200 and vote if found", async () => {
    const fakeVote = createFakeVote();
    mockReq.params = { id: "1" };
    (voteRepo.getVoteById as any).mockResolvedValue(fakeVote);

    await voteController.getVoteById(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.getVoteById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeVote);
  });

  it("should return 404 if vote not found", async () => {
    mockReq.params = { id: "999" };
    (voteRepo.getVoteById as any).mockResolvedValue(null);

    await voteController.getVoteById(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.getVoteById).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Vote not found." });
  });

  it("should return votes by character", async () => {
    const fakeVotes = [createFakeVote({ characterId: 1 })];
    mockReq.params = { id: "1" };
    (voteRepo.getVoteByCharacter as any).mockResolvedValue(fakeVotes);

    await voteController.getVoteByCharacter(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.getVoteByCharacter).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeVotes);
  });

  it("should return 404 if no votes for character", async () => {
    mockReq.params = { id: "1" };
    (voteRepo.getVoteByCharacter as any).mockResolvedValue([]);

    await voteController.getVoteByCharacter(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Votes not found for character." });
  });

  it("should create a new vote", async () => {
    const newVoteData = { characterVote: 1 };
    mockReq.body = newVoteData;
    const fakeCreated = createFakeVote({ characterId: 1, id: 2 });
    (voteRepo.createVote as any).mockResolvedValue(fakeCreated);

    await voteController.createVote(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.createVote).toHaveBeenCalledWith(newVoteData);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeCreated);
  });

  it("should return 400 if characterVote not provided", async () => {
    mockReq.body = {};
    await voteController.createVote(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "characterVote (characterId) is required." });
  });

  it("should delete a vote by id", async () => {
    mockReq.params = { id: "1" };
    (voteRepo.deleteVoteById as any).mockResolvedValue(createFakeVote());

    await voteController.deleteVoteById(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.deleteVoteById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Vote deleted successfully." });
  });

  it("should delete all votes", async () => {
    (voteRepo.deleteAllVotes as any).mockResolvedValue({ count: 2 });

    await voteController.deleteAllVotes(mockReq as Request, mockRes as Response, mockNext);

    expect(voteRepo.deleteAllVotes).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "All votes deleted successfully." });
  });
});