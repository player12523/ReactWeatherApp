import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { mapLocation } from "../utils/weatherMapper";

const weatherInclude = {
  dailyWeather: {
    include: {
      hourlyWeather: true,
    },
    orderBy: {
      id: "asc" as const,
    },
  },
};

export const createWeather = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const weather = await prisma.location.create({
      data: {
        locationName: data.locationName,
        provinceName: data.provinceName,
        countryName: data.countryName,
        latitude: data.latitude,
        longitude: data.longitude,

        dailyWeather: {
          create: data.dailyWeather.map((dw: any) => ({
            dateTime: dw.dateTime,
            rainfall: dw.rainfall,
            weatherCodeDay: dw.weatherCodeDay,
            weatherCodeNight: dw.weatherCodeNight,
            temperatureMax: dw.temperatureMax,
            temperatureMin: dw.temperatureMin,
            humidity: dw.humidity,
            windSpeed: dw.windSpeed,
            sundown: dw.sundown,

            hourlyWeather: {
              create: dw.hourlyWeather,
            },
          })),
        },
      },
      include: weatherInclude,
    });

    res.status(201).json(mapLocation(weather));
  } catch {
    res.status(400).json({ error: "Could not create weather" });
  }
};

export const updateWeather = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.location.update({
      where: { id: Number(req.params.id) },
      data: req.body,
      include: weatherInclude,
    });

    res.json(mapLocation(updated));
  } catch {
    res.status(404).json({ error: "Weather not found" });
  }
};

export const deleteWeather = async (req: Request, res: Response) => {
  try {
    await prisma.location.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Weather not found" });
  }
};

export const getWeather = async (req: Request, res: Response) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

    const weather = await prisma.location.findMany({
      where: search
        ? {
            OR: [
              { locationName: { contains: search, mode: "insensitive" } },
              { provinceName: { contains: search, mode: "insensitive" } },
              { countryName: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: weatherInclude,
      orderBy: { locationName: "asc" },
    });

    res.json(weather.map(mapLocation));
  } catch {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

export const getWeatherById = async (req: Request, res: Response) => {
  try {
    const location = await prisma.location.findFirst({
      where: { id: Number(req.params.id) },
      include: weatherInclude,
    });

    if (!location) {
      return res.status(404).json({ error: "Weather location not found" });
    }

    res.json(mapLocation(location));
  } catch {
    res.status(500).json({ error: "Failed to fetch weather location" });
  }
};
