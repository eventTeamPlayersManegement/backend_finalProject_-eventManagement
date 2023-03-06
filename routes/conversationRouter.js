import { Router } from "express";
import {
  createOneConversation,
  getAllConversation,
  getOneConversation,
  updateOneConversation,
} from "../controllers/conversationController.js";

const conversationRouter = Router();

conversationRouter
  .route("/")
  .post(createOneConversation)
  .get(getAllConversation);
conversationRouter
  .route("/:id")
  .get(getOneConversation)
  .patch(updateOneConversation);

export default conversationRouter;
