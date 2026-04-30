import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { readToken } from "../utils/auth";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "You must be logged in to do that." });
  }

  const payload = readToken(token);
  if (!payload?.userId) {
    return res.status(401).json({ error: "Invalid login token." });
  }

  const user = await prisma.user.findFirst({ where: { id: payload.userId } });
  if (!user) {
    return res.status(401).json({ error: "User no longer exists." });
  }

  req.userId = user.id;
  next();
}
