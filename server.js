import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import "./lib/connecting.js";
import morgan from "morgan";
import cors from "cors";
import error from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import userRoutes from "./routes/userRoutes.js";
import { auth } from "express-openid-connect";
import jwt from "jsonwebtoken";
import * as User from "./models/User.js";
//Cookie
import cookieParser from "cookie-parser";
//Die beiden imports benötigen wir, damit wir die html Dateien finden
import { fileURLToPath } from "url";
import { dirname } from "path";
// speichert unser aktuelles Verzeichnis in der Variable __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT;
const app = express();

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
    origin: "http://localhost:5173",
  })
);

//set routes
app.get("/", async (req, res) => {
  console.log(req.oidc.idToken);
  const token = jwt.decode(req.oidc.idToken, process.env.SECRET);
  console.log(token);
  res.redirect("http://localhost:5173");

  // const user = await User.getOne({ sub: req.oidc.sub });
  // if (user) {
  //   res.redirect("http://localhost:5173");
  // } else if (!user && req.oidc.isAuthenticated()) {
  //   await User.create(req.oidc.user);
  //   res.redirect("http://localhost:5173");
  // } else {
  //   res.redirect("http://localhost:5173");
  // }
});

app.use("/api/users", userRoutes);

app.use(express.static("uploads"));
app.use("/", express.static("./dist"));
// app.get("/*", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use("/:notfound", notFound);

app.use(error);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
