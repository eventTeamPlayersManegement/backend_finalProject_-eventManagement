import { Router } from "express";
import {
  createOneUser,
  getOneUser,
  getOneUserSub,
  updateOneUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/").post(createOneUser);
userRouter.route("/sub/:sub").get(getOneUserSub);
userRouter.route("/:id").get(getOneUser).patch(updateOneUser);

export default userRouter;
