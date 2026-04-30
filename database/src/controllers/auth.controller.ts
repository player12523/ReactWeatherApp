import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createToken, hashPassword } from "../utils/auth";
import { mapUser } from "../utils/weatherMapper";

// Basic trim helper for form input.
function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// Creates a new user and returns a login token.
export async function register(req: Request, res: Response) {
  const username = clean(req.body.username);
  const password = clean(req.body.password);

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  const existingUser = await prisma.user.findFirst({ where: { username } });
  if (existingUser) {
    return res.status(409).json({ error: "That username is already taken." });
  }

  const user = await prisma.user.create({
    data: {
      username,
      hashedPassword: hashPassword(password),
    },
    include: { favourites: true },
  });

  return res.status(201).json({
    token: createToken(user.id),
    user: mapUser(user),
  });
}

// Checks user credentials and returns a login token.
export async function login(req: Request, res: Response) {
  const username = clean(req.body.username);
  const password = clean(req.body.password);

  const user = await prisma.user.findFirst({
    where: {
      username,
      hashedPassword: hashPassword(password),
    },
    include: { favourites: true },
  });

  if (!user) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }

  return res.json({
    token: createToken(user.id),
    user: mapUser(user),
  });
}

// Returns the currently logged-in user.
export async function me(req: Request, res: Response) {
  if (!req.userId) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  const user = await prisma.user.findFirst({
    where: { id: req.userId },
    include: { favourites: true },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  return res.json(mapUser(user));
}

export async function logout(_req: Request, res: Response) {
  return res.json({ message: "Logged out" });
}

// Removes the current user and their favourites.
export async function deleteMe(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  await prisma.favouriteIds.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });

  return res.json({ message: "Account deleted" });
}
