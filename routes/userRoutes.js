import { Router } from "express";
import * as user from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.route("/").get(user.getAll).post(user.create);

export default userRoutes;
