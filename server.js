import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import "./lib/connecting.js";
import morgan from "morgan";
import cors from "cors";

import error from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import userRoutes from "./routes/userRoutes.js";
import photographerRoutes from "./routes/photographerRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

//Cookie
import cookieParser from "cookie-parser";
//Die beiden imports benötigen wir, damit wir die html Dateien finden
import { fileURLToPath } from "url";
import { dirname } from "path";
// speichert unser aktuelles Verzeichnis in der Variable __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4000;

const app = express();
//set middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//set routes

app.use("/api/users", userRoutes);
app.use("/api/photographer", photographerRoutes);
app.use("/api/restaurant", restaurantRoutes);

app.use(express.static("uploads"));
app.use("/", express.static("./dist"));
app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use("/:notfound", notFound);

app.use(error);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
