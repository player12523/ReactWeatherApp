import prisma from "../lib/prisma";
import { Request, Response } from "express";

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
              create: dw.hourlyWeather
            }
          }))
        }
      },
      include: {
        dailyWeather: {
          include: {
            hourlyWeather: true
          }
        }
      }
    });

    res.status(201).json(weather);
  } catch {
    res.status(400).json({ error: "Could not create weather" });
  }
};

export const updateWeather = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.location.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });

    res.json(updated);
  } catch {
    res.status(404).json({ error: "Weather not found" });
  }
};

export const deleteWeather = async (req: Request, res: Response) => {
  try {
    await prisma.location.delete({
      where: { id: Number(req.params.id) }
    });

    res.json({ message: "Deleted" });
  } catch {
    res.status(404).json({ error: "Weather not found" });
  }
};

export const getWeather = async (_req: Request, res: Response) => {
  try {
    const weather = await prisma.location.findMany({
      include: {
        dailyWeather: {
          include: {
            hourlyWeather: true
          }
        }
      }
    });

    res.json(weather);
  } catch {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};