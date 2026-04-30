/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "FavouriteIds" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "locationName" TEXT NOT NULL,
    "provinceName" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyWeather" (
    "id" SERIAL NOT NULL,
    "dateTime" TEXT NOT NULL,
    "rainfall" DOUBLE PRECISION NOT NULL,
    "weatherCodeDay" INTEGER NOT NULL,
    "weatherCodeNight" INTEGER NOT NULL,
    "temperatureMax" DOUBLE PRECISION NOT NULL,
    "temperatureMin" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "sundown" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DailyWeather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HourlyWeather" (
    "id" SERIAL NOT NULL,
    "dateTime" TEXT NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "rainfall" DOUBLE PRECISION NOT NULL,
    "dailyWeatherId" INTEGER NOT NULL,

    CONSTRAINT "HourlyWeather_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavouriteIds" ADD CONSTRAINT "FavouriteIds_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteIds" ADD CONSTRAINT "FavouriteIds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyWeather" ADD CONSTRAINT "DailyWeather_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HourlyWeather" ADD CONSTRAINT "HourlyWeather_dailyWeatherId_fkey" FOREIGN KEY ("dailyWeatherId") REFERENCES "DailyWeather"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
