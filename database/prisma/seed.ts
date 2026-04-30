import prisma from "../src/lib/prisma";

async function main() {
  const existing = await prisma.location.findFirst();

  if (existing) return;
  else {console.log("Seeding database...")}

  await prisma.location.create({
    data: {
      locationName: "Manchester",
      provinceName: "Greater Manchester",
      countryName: "UK",
      latitude: 53.4808,
      longitude: -2.2426,
      dailyWeather: {
        create: [
          {
            dateTime: "2026-04-29",
            rainfall: 3.2,
            weatherCodeDay: 2,
            weatherCodeNight: 3,
            temperatureMax: 15,
            temperatureMin: 7,
            humidity: 72,
            windSpeed: 14,
            sundown: "20:30",
            hourlyWeather: {
              create: [
                {
                  dateTime: "2026-04-29T09:00:00Z",
                  weatherCode: 2,
                  temperature: 9,
                  rainfall: 0.2
                }
              ]
            }
          }
        ]
      }
    }
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});