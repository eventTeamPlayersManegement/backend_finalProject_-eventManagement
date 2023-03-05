import { Router } from "express";
import {
  createOneChat,
  getOneChat,
  updateOneChat,
} from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.route("/").post(createOneChat);
chatRouter.route("/:id").get(getOneChat).patch(updateOneChat);

export default chatRouter;
