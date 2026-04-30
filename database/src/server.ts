import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import weatherRoutes from "./routes/weather.routes";
import favouriteRoutes from "./routes/favourite.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Middleware
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

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/auth", authRoutes);

// Static fallback
app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
