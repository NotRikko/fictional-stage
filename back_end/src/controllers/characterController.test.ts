import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import * as characterRepo from "../repositories/characterRepo";
import * as characterController from "../controllers/characterController";

vi.mock("../utils/asyncHandler", () => ({
  asyncHandler: (fn: any) => fn,
}));

vi.mock("../repositories/characterRepo", () => ({
  getAllCharacters: vi.fn(),
  getCharacterById: vi.fn(),
  createCharacter: vi.fn(),
  deleteCharacterById: vi.fn(),
  deleteAllCharacters: vi.fn(),
}));

const createFakeCharacter = (overrides = {}) => ({
  id: 1,
  name: "Rikko",
  imageUrl: "image.png",
  biography: "Bio",
  series: "Series",
  roundId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  songs: [],
  currentRound: null,
  votes: [],
  ...overrides,
});

describe("characterController", () => {
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

  it("should return 200 and list of characters", async () => {
    const fakeCharacters = [createFakeCharacter()];
    (characterRepo.getAllCharacters as any).mockResolvedValue(fakeCharacters);

    await characterController.getAllCharacters(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.getAllCharacters).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeCharacters);
  });

  it("should return 200 and character if found", async () => {
    mockReq.params = { id: "1" };
    const fakeCharacter = createFakeCharacter();
    (characterRepo.getCharacterById as any).mockResolvedValue(fakeCharacter);

    await characterController.getCharacterById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.getCharacterById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeCharacter);
  });

  it("should return 404 if character not found", async () => {
    mockReq.params = { id: "999" };
    (characterRepo.getCharacterById as any).mockResolvedValue(null);

    await characterController.getCharacterById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.getCharacterById).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Character not found." });
  });

  it("should create a new character and return 201", async () => {
    const newChar = { name: "New", imageUrl: "img.png", biography: "Bio", series: "Series" };
    mockReq.body = newChar;
    const created = createFakeCharacter({ ...newChar, id: 1 });

    (characterRepo.createCharacter as any).mockResolvedValue(created);

    await characterController.createCharacters(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.createCharacter).toHaveBeenCalledWith(newChar);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(created);
  });

  it("should create multiple characters if array provided", async () => {
    const newChars = [
      { name: "A", imageUrl: "imgA.png", biography: "BioA", series: "SeriesA" },
      { name: "B", imageUrl: "imgB.png", biography: "BioB", series: "SeriesB" },
    ];
    mockReq.body = newChars;

    const created1 = createFakeCharacter({ ...newChars[0], id: 1 });
    const created2 = createFakeCharacter({ ...newChars[1], id: 2 });

    const mockCreate = characterRepo.createCharacter as any;
    mockCreate.mockResolvedValueOnce(created1).mockResolvedValueOnce(created2);

    await characterController.createCharacters(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockCreate).toHaveBeenCalledTimes(2);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith([created1, created2]);
  });

  it("should delete a character and return 200 w/success message", async () => {
    mockReq.params = { id: "1" };
    (characterRepo.deleteCharacterById as any).mockResolvedValue(createFakeCharacter());

    await characterController.deleteCharacterById(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.deleteCharacterById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Character deleted successfully." });
  });

  it("should delete all characters and return success message", async () => {
    (characterRepo.deleteAllCharacters as any).mockResolvedValue({ count: 2 });

    await characterController.deleteAllCharacters(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(characterRepo.deleteAllCharacters).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "All characters deleted successfully." });
  });
});