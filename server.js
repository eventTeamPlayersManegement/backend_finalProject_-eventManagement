import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import "./lib/connecting.js";
import morgan from "morgan";
import cors from "cors";
import error from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import pkg from "express-openid-connect";
import eventRoutes from "./routes/eventRoutes.js";
import photographerRoutes from "./routes/photographerRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import entertainmentRoutes from "./routes/entertainmentRoutes.js";
import rentautoRoutes from "./routes/rentautoRoutes.js";

//Cookie
import cookieParser from "cookie-parser";
//Die beiden imports benötigen wir, damit wir die html Dateien finden
import { fileURLToPath } from "url";
import { dirname } from "path";
import suppliersRoutes from "./routes/suppliersRoute.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
// speichert unser aktuelles Verzeichnis in der Variable __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT;
const app = express();

const { auth, requiresAuth } = pkg;
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

//set middlewares
app.use(auth(config));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "https://event-management-final-project-iota.vercel.app/",
  })
);

app.get("/", function (req, res, next) {
  res.status(301).redirect("https://event-management-final-project-iota.vercel.app/");
});
app.get("/profile", requiresAuth(), function (req, res, next) {
  res.json({ user: req.oidc.user, message: `logged ${req.oidc.user.name}` });
});

app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/event", eventRoutes);
app.use("/api/photographer", photographerRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/rentauto", rentautoRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use(express.static("uploads"));
// app.use("/", express.static("./dist"));
// app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use("/:notfound", notFound);

app.use(error);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
