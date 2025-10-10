import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import * as songController from "../controllers/songController";
import * as songRepo from "../repositories/songRepo";

vi.mock("../utils/asyncHandler", () => ({
  asyncHandler: (fn: any) => fn,
}));

vi.mock("../repositories/songRepo", () => ({
  getAllSongs: vi.fn(),
  getSongById: vi.fn(),
  createSong: vi.fn(),
  deleteSongById: vi.fn(),
  deleteAllSongs: vi.fn(),
}));

const createFakeSong = (overrides = {}) => ({
  id: 1,
  title: "Fake Song",
  characterId: 1,
  createdAt: new Date(),
  ...overrides,
});

describe("songController", () => {
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

  it("should return 200 and list of songs", async () => {
    const fakeSongs = [createFakeSong()];
    (songRepo.getAllSongs as any).mockResolvedValue(fakeSongs);

    await songController.getAllSongs(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.getAllSongs).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeSongs);
  });

  it("should return 200 and song if found", async () => {
    const fakeSong = createFakeSong();
    mockReq.params = { id: "1" };
    (songRepo.getSongById as any).mockResolvedValue(fakeSong);

    await songController.getSongById(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.getSongById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(fakeSong);
  });

  it("should return 404 if song not found", async () => {
    mockReq.params = { id: "999" };
    (songRepo.getSongById as any).mockResolvedValue(null);

    await songController.getSongById(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.getSongById).toHaveBeenCalledWith(999);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Song not found." });
  });

  it("should create a new song and return 201", async () => {
    const newSongData = { title: "New Song", characterId: 1 };
    mockReq.body = newSongData;
    const fakeCreated = createFakeSong({ ...newSongData, id: 2 });
    (songRepo.createSong as any).mockResolvedValue(fakeCreated);

    await songController.createSong(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.createSong).toHaveBeenCalledWith(newSongData);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeCreated);
  });

  it("should create multiple songs if array provided", async () => {
    const songsArray = [
      { title: "Song 1", characterId: 1 },
      { title: "Song 2", characterId: 2 },
    ];
    mockReq.body = songsArray;

    const created1 = createFakeSong({ ...songsArray[0], id: 1 });
    const created2 = createFakeSong({ ...songsArray[1], id: 2 });

    (songRepo.createSong as any)
      .mockResolvedValueOnce(created1)
      .mockResolvedValueOnce(created2);

    await songController.createSongs(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.createSong).toHaveBeenCalledTimes(2);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith([created1, created2]);
  });

  it("should delete a song and return success message", async () => {
    mockReq.params = { id: "1" };
    (songRepo.deleteSongById as any).mockResolvedValue(createFakeSong());

    await songController.deleteSongById(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.deleteSongById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Song deleted successfully." });
  });

  it("should delete all songs and return success message", async () => {
    (songRepo.deleteAllSongs as any).mockResolvedValue({ count: 2 });

    await songController.deleteAllSongs(mockReq as Request, mockRes as Response, mockNext);

    expect(songRepo.deleteAllSongs).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "All songs deleted successfully." });
  });
});