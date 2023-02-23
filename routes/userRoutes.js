import { Router } from "express";
import * as user from "../controllers/userController.js";

import validate from "../middleware/validate.js";
import { postUser } from "./user.schema.js";

const userRoutes = Router();

userRoutes.route("/").get(user.getAll);
userRoutes.route("/register").post(validate(postUser), user.create);
userRoutes.route("/login").post(user.login);

export default userRoutes;
