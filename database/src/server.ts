import express, { NextFunction, Request, Response } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import weatherRoutes from "./routes/weather.routes";
import favouriteRoutes from "./routes/favourite.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Allows the API to read JSON request bodies.
app.use(express.json());

// Basic CORS for development when the React app is served by Vite.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "..", "swagger.yaml"),
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API route groups used by the React client.
// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/locations", weatherRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/auth", authRoutes);

// Static fallback
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found." });
  }

  return res.status(404).send("Page not found");
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  const message = error instanceof Error
    ? error.message
    : "An unexpected server error occurred.";

  return res.status(500).json({
    error: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
