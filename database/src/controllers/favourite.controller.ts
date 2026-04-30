import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { mapLocation } from "../utils/weatherMapper";

// Adds or removes a favourite location for the logged-in user.
export const toggleFavourite = async (req: Request, res: Response) => {
  const userId = req.userId;
  const locationId = Number(req.params.locationId);

  if (!userId) {
    return res.status(401).json({ error: "You must be logged in to manage favourites." });
  }

  const location = await prisma.location.findFirst({ where: { id: locationId } });
  if (!location) {
    return res.status(404).json({ error: "Location not found." });
  }

  const existing = await prisma.favouriteIds.findFirst({
    where: { userId, locationId },
  });

  if (existing) {
    await prisma.favouriteIds.delete({
      where: { id: existing.id },
    });

    return res.json({ message: "Removed", locationId, isFavourite: false });
  }

  await prisma.favouriteIds.create({
    data: { userId, locationId },
  });

  return res.json({ message: "Added", locationId, isFavourite: true });
};

// Returns weather records saved as favourites by the current user.
export const getFavouriteWeather = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: "You must be logged in to view favourites." });
  }

  const favourites = await prisma.favouriteIds.findMany({
    where: { userId },
    include: {
      location: {
        include: {
          dailyWeather: {
            include: {
              hourlyWeather: true,
            },
          },
        },
      },
    },
  });

  const result = favourites.map((f) => mapLocation(f.location));

  res.json(result);
};
