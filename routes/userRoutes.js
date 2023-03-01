import { Router } from "express";
import * as user from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import checkAdmin from "../middleware/checkAdmin.js";
import checkPWD from "../middleware/checkPWD.js";
import hashPWD from "../middleware/hashPWD.js";

import validate from "../middleware/validate.js";
import { postUser } from "./user.schema.js";

const userRoutes = Router();
// getAll> auth > admin
userRoutes.route("/").get(auth, checkAdmin, user.getAll);

userRoutes.route("/signup").post(user.create);
userRoutes.route("/signout").get(user.signout);
// login > checkPWD > signCookie;
userRoutes.route("/signin").post(checkPWD, user.login);

export default userRoutes;
