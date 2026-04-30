import prisma from "../src/lib/prisma";
import { hashPassword } from "../src/utils/auth";

const weatherLocations = [
  {
    locationName: "Manchester",
    provinceName: "Greater Manchester",
    countryName: "United Kingdom",
    latitude: 53.4808,
    longitude: -2.2426,
    dailyWeather: [
      {
        dateTime: "2026-04-30",
        rainfall: 3.2,
        weatherCodeDay: 2,
        weatherCodeNight: 3,
        temperatureMax: 15,
        temperatureMin: 7,
        humidity: 72,
        windSpeed: 14,
        sundown: "20:30",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 1, temperature: 8, rainfall: 0.1 },
          { dateTime: "09:00", weatherCode: 2, temperature: 10, rainfall: 0.2 },
          { dateTime: "12:00", weatherCode: 0, temperature: 14, rainfall: 0 },
          { dateTime: "15:00", weatherCode: 2, temperature: 15, rainfall: 0.1 },
          { dateTime: "18:00", weatherCode: 3, temperature: 11, rainfall: 1.2 },
        ],
      },
      {
        dateTime: "2026-05-01",
        rainfall: 1.1,
        weatherCodeDay: 1,
        weatherCodeNight: 2,
        temperatureMax: 16,
        temperatureMin: 8,
        humidity: 68,
        windSpeed: 12,
        sundown: "20:32",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 2, temperature: 9, rainfall: 0.1 },
          { dateTime: "09:00", weatherCode: 1, temperature: 11, rainfall: 0 },
          { dateTime: "12:00", weatherCode: 1, temperature: 15, rainfall: 0 },
          { dateTime: "15:00", weatherCode: 1, temperature: 16, rainfall: 0 },
          { dateTime: "18:00", weatherCode: 2, temperature: 12, rainfall: 0.4 },
        ],
      },
    ],
  },
  {
    locationName: "London",
    provinceName: "Greater London",
    countryName: "United Kingdom",
    latitude: 51.5072,
    longitude: -0.1276,
    dailyWeather: [
      {
        dateTime: "2026-04-30",
        rainfall: 1.4,
        weatherCodeDay: 1,
        weatherCodeNight: 2,
        temperatureMax: 18,
        temperatureMin: 10,
        humidity: 66,
        windSpeed: 11,
        sundown: "20:20",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 1, temperature: 11, rainfall: 0 },
          { dateTime: "09:00", weatherCode: 1, temperature: 13, rainfall: 0 },
          { dateTime: "12:00", weatherCode: 0, temperature: 17, rainfall: 0 },
          { dateTime: "15:00", weatherCode: 1, temperature: 18, rainfall: 0.1 },
          { dateTime: "18:00", weatherCode: 2, temperature: 15, rainfall: 0.4 },
        ],
      },
      {
        dateTime: "2026-05-01",
        rainfall: 0.6,
        weatherCodeDay: 0,
        weatherCodeNight: 1,
        temperatureMax: 20,
        temperatureMin: 11,
        humidity: 61,
        windSpeed: 9,
        sundown: "20:22",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 1, temperature: 12, rainfall: 0 },
          { dateTime: "09:00", weatherCode: 0, temperature: 15, rainfall: 0 },
          { dateTime: "12:00", weatherCode: 0, temperature: 19, rainfall: 0 },
          { dateTime: "15:00", weatherCode: 0, temperature: 20, rainfall: 0 },
          { dateTime: "18:00", weatherCode: 1, temperature: 17, rainfall: 0.1 },
        ],
      },
    ],
  },
  {
    locationName: "Crewe",
    provinceName: "Cheshire East",
    countryName: "United Kingdom",
    latitude: 53.1004,
    longitude: -2.4438,
    dailyWeather: [
      {
        dateTime: "2026-04-30",
        rainfall: 2.1,
        weatherCodeDay: 2,
        weatherCodeNight: 3,
        temperatureMax: 14,
        temperatureMin: 6,
        humidity: 74,
        windSpeed: 16,
        sundown: "20:32",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 2, temperature: 7, rainfall: 0.2 },
          { dateTime: "09:00", weatherCode: 2, temperature: 9, rainfall: 0.4 },
          { dateTime: "12:00", weatherCode: 1, temperature: 13, rainfall: 0.1 },
          { dateTime: "15:00", weatherCode: 2, temperature: 14, rainfall: 0.2 },
          { dateTime: "18:00", weatherCode: 3, temperature: 10, rainfall: 1.0 },
        ],
      },
    ],
  },
  {
    locationName: "Edinburgh",
    provinceName: "Scotland",
    countryName: "United Kingdom",
    latitude: 55.9533,
    longitude: -3.1883,
    dailyWeather: [
      {
        dateTime: "2026-04-30",
        rainfall: 4.8,
        weatherCodeDay: 3,
        weatherCodeNight: 4,
        temperatureMax: 11,
        temperatureMin: 4,
        humidity: 80,
        windSpeed: 22,
        sundown: "20:49",
        hourlyWeather: [
          { dateTime: "06:00", weatherCode: 3, temperature: 5, rainfall: 0.9 },
          { dateTime: "09:00", weatherCode: 3, temperature: 7, rainfall: 1.1 },
          { dateTime: "12:00", weatherCode: 2, temperature: 10, rainfall: 0.4 },
          { dateTime: "15:00", weatherCode: 3, temperature: 11, rainfall: 1.2 },
          { dateTime: "18:00", weatherCode: 4, temperature: 7, rainfall: 1.2 },
        ],
      },
    ],
  },
];

// Clears dependent tables first so the seed can be rerun safely.
async function clearDatabase() {
  await prisma.hourlyWeather.deleteMany();
  await prisma.dailyWeather.deleteMany();
  await prisma.favouriteIds.deleteMany();
  await prisma.user.deleteMany();
  await prisma.location.deleteMany();
}

async function seedWeather() {
  const createdLocations = [];

  for (const location of weatherLocations) {
    const createdLocation = await prisma.location.create({
      data: {
        locationName: location.locationName,
        provinceName: location.provinceName,
        countryName: location.countryName,
        latitude: location.latitude,
        longitude: location.longitude,
        dailyWeather: {
          create: location.dailyWeather.map((day) => ({
            dateTime: day.dateTime,
            rainfall: day.rainfall,
            weatherCodeDay: day.weatherCodeDay,
            weatherCodeNight: day.weatherCodeNight,
            temperatureMax: day.temperatureMax,
            temperatureMin: day.temperatureMin,
            humidity: day.humidity,
            windSpeed: day.windSpeed,
            sundown: day.sundown,
            hourlyWeather: {
              create: day.hourlyWeather,
            },
          })),
        },
      },
    });

    createdLocations.push(createdLocation);
  }

  return createdLocations;
}

// Adds example users for testing login and favourites.
async function seedUsers(locationIds: number[]) {
  await prisma.user.create({
    data: {
      username: "demo",
      hashedPassword: hashPassword("password123"),
      favourites: {
        create: [
          { locationId: locationIds[0] },
          { locationId: locationIds[1] },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "tester",
      hashedPassword: hashPassword("testing123"),
      favourites: {
        create: [{ locationId: locationIds[2] }],
      },
    },
  });
}

async function main() {
  console.log("Clearing existing seed data...");
  await clearDatabase();

  console.log("Adding weather locations, daily weather and hourly weather...");
  const locations = await seedWeather();

  console.log("Adding demo users and favourites...");
  await seedUsers(locations.map((location) => location.id));

  console.log("Seed completed successfully.");
  console.log("Demo login: demo / password123");
  console.log("Test login: tester / testing123");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
