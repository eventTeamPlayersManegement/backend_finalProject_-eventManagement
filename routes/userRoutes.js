import { Router } from "express";
import * as user from "../controllers/userController.js";

import validate from "../middleware/validate.js";
import { postUser } from "./user.schema.js";


const userRoutes = Router();

userRoutes.route("/").get(user.getAll).post(validate(postUser), user.create);

export default userRoutes;
