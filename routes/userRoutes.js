import { Router } from "express";
import * as user from "../controllers/user.js"

const userRoutes = Router();

userRoutes.get("/", user.getAll);
userRoutes.post("/", user.create);

export default userRoutes