import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { auth, SECRET_KEY } from "./auth";
import jwt from "jsonwebtoken";

describe("auth middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    next = vi.fn();
  });

  it("should call next() when token is valid", () => {
    const token = jwt.sign({ userId: 1 }, SECRET_KEY);
    mockReq.header = vi.fn().mockReturnValue(`Bearer ${token}`);

    auth(mockReq as Request, mockRes as Response, next);

    expect(next).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("should return 401 if no token provided", () => {
    mockReq.header = vi.fn().mockReturnValue(undefined);

    auth(mockReq as Request, mockRes as Response, next);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith("Please authenticate");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", () => {
    mockReq.header = vi.fn().mockReturnValue("Bearer invalidtoken");

    auth(mockReq as Request, mockRes as Response, next);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith("Please authenticate");
    expect(next).not.toHaveBeenCalled();
  });
});