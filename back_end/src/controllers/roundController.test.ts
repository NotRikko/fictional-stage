import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import * as roundRepo from "../repositories/roundRepo";
import * as roundController from "../controllers/roundController";

vi.mock("../utils/asyncHandler", () => ({
    asyncHandler: (fn: any) => fn,
}));

vi.mock("../repositories/roundRepo", () => ({
    getAllRounds: vi.fn(),
    getRoundById: vi.fn(),
    updateRound: vi.fn(),
    createRound: vi.fn(),
    deleteRoundById: vi.fn(),
    deleteAllRounds: vi.fn(),
}));

const createFakeRound = (overrides = {}) => ({
  id: 1,
  name: "Round 1",
  description: "First round",
  contestants: [],
  startDate: new Date(),
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe("roundController", () => {
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

  it("should return 200 and list of rounds", async () => {
    const fakeRounds = [createFakeRound()];
    (roundRepo.getAllRounds as any).mockResolvedValue(fakeRounds);

    await roundController.getAllRounds(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.getAllRounds).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeRounds);
  });

  it("should return 200 and a round if found", async () => {
    mockReq.params = { id: "1" };
    const fakeRound = createFakeRound();
    (roundRepo.getRoundById as any).mockResolvedValue(fakeRound);

    await roundController.getRoundById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.getRoundById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeRound);
  });

  it("should return 404 if round not found", async () => {
    mockReq.params = { id: "999" };
    (roundRepo.getRoundById as any).mockResolvedValue(null);

    await roundController.getRoundById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.getRoundById).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Round not found." });
  });

  it("should create a single round and return 201", async () => {
    const newRound = { name: "Round 2", description: "Second round", startDate: new Date(), endDate: new Date() };
    mockReq.body = newRound;
    const created = createFakeRound({ ...newRound, id: 2 });

    (roundRepo.createRound as any).mockResolvedValue(created);

    await roundController.createRound(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.createRound).toHaveBeenCalledWith(newRound);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(created);
  });

  it("should create multiple rounds if array provided", async () => {
    const newRounds = [
      { name: "A", description: "A round", startDate: new Date(), endDate: new Date() },
      { name: "B", description: "B round", startDate: new Date(), endDate: new Date() },
    ];
    mockReq.body = newRounds;

    const created1 = createFakeRound({ ...newRounds[0], id: 3 });
    const created2 = createFakeRound({ ...newRounds[1], id: 4 });

    const mockCreate = roundRepo.createRound as any;
    mockCreate.mockResolvedValueOnce(created1).mockResolvedValueOnce(created2);

    await roundController.createRounds(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockCreate).toHaveBeenCalledTimes(2);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith([created1, created2]);
  });

  it("should delete a round and return success message", async () => {
    mockReq.params = { id: "1" };
    (roundRepo.deleteRoundById as any).mockResolvedValue(createFakeRound());

    await roundController.deleteRoundById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.deleteRoundById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Round deleted successfully." });
  });

  it("should delete all rounds and return success message", async () => {
    (roundRepo.deleteAllRounds as any).mockResolvedValue({ count: 2 });

    await roundController.deleteAllRounds(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(roundRepo.deleteAllRounds).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "All rounds deleted successfully." });
  });
});