Backend Setup and Design Documentation

Overview

This project is a weather data API built using Node.js, Express, Prisma, and a relational database. The system models weather data using a nested structure consisting of locations, daily weather records, and hourly weather records.

The backend is intentionally limited to weather functionality only. User authentication, favourites, and other extended features are excluded at this stage to maintain focus on core data modelling and API design.

Project Structure

The backend follows a layered architecture:

> server.ts: Application entry point and route registration
> routes/: API endpoint definitions
> controllers/: Business logic and Prisma interactions
> lib/prisma.ts: Prisma client instance
> prisma/: Database schema, migrations, and seed scripts
> Installation

Install project dependencies:
- "npm install"
Database Setup

Run Prisma migrations to create and update the database schema:
- "npx prisma migrate dev"

Generate the Prisma client:
- "npx prisma generate"
Database Seeding

Populate the database with initial weather data:
- "npx prisma db seed"
Seed Behaviour

The seed script is designed to be idempotent. It performs a check before inserting data:

If location data already exists, the seed process is skipped
If the database is empty, sample weather data is inserted

This ensures safe repeated execution during development.

Running the Application

Start the development server:
- "npm run dev"

The backend will run on:
http://localhost:3000

Swagger API documentation is available at:
http://localhost:3000/api-docs
API Design Overview

The API is structured around three main weather-related entities:

Location

Represents a geographical location containing weather data.

DailyWeather

Represents aggregated weather data for a specific day and belongs to a Location.

HourlyWeather

Represents granular weather data for specific times and belongs to a DailyWeather entry.

The structure is hierarchical:

Location → DailyWeather → HourlyWeather

This design reduces the need for multiple API requests and aligns with real-world weather data models.