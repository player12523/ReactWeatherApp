import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import weatherRoutes from "./routes/weather.routes";
import favouriteRoutes from "./routes/favourite.routes";

const app = express();
const PORT = 3000;

// Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "..", "swagger.yaml")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/favourites", favouriteRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// 
app.use(express.static(path.join(__dirname, "..", "public")));