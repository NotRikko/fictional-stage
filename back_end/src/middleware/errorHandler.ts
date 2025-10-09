import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("🔥 Error caught:", err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": 
        return res.status(409).json({ message: "Duplicate entry." });
      case "P2025":
        return res.status(404).json({ message: "Record not found." });
      default:
        return res.status(400).json({ message: `Database error: ${err.code}` });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  res.status(500).json({ message: "Internal server error." });
}