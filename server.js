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
import messageRoutes from "./routes/messageRoutes.js";
import stripe from "stripe";
//Cookie
import cookieParser from "cookie-parser";
//Die beiden imports benötigen wir, damit wir die html Dateien finden
import { fileURLToPath } from "url";
import { dirname } from "path";
import suppliersRoutes from "./routes/suppliersRoute.js";
import userRouter from "./routes/userRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import stripeRouter from "./routes/stripeRoutes.js";
// speichert unser aktuelles Verzeichnis in der Variable __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT;
const STRIPE = process.env.STRIPE_KEY;

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
stripe(STRIPE);

//set middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(auth(config));
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

app.get("/", function (req, res, next) {
  // res.status(200).send(req.oidc.isAuthenticated() ? "login" : "logout");
  res.redirect("http://localhost:5173");
});

app.get("/profile", requiresAuth(), function (req, res, next) {
  res.json({ user: req.oidc.user, message: `logged ${req.oidc.user.name}` });
});

app.use("/api/users", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/event", eventRoutes);
app.use("/api/photographer", photographerRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/rentauto", rentautoRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/stripe", stripeRouter);
// app.use(express.static("uploads"));
// app.use("/", express.static("./dist"));
// app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));
app.use("/:notfound", notFound);

app.use(error);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
