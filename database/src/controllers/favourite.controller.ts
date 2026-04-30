import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const toggleFavourite = async (req: Request, res: Response) => {
  const { userId, locationId } = req.body;

  const existing = await prisma.favouriteIds.findFirst({
    where: { userId, locationId }
  });

  if (existing) {
    await prisma.favouriteIds.delete({
      where: { id: existing.id }
    });
    return res.json({ message: "Removed" });
  }

  const created = await prisma.favouriteIds.create({
    data: { userId, locationId }
  });

  res.json(created);
};

export const getFavouriteWeather = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const favourites = await prisma.favouriteIds.findMany({
    where: { userId },
    include: {
      location: {
        include: {
          dailyWeather: {
            include: {
              hourlyWeather: true
            }
          }
        }
      }
    }
  });

  const result = favourites.map(f => f.location);

  res.json(result);
};