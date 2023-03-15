import { Router } from "express";
import * as message from "../controllers/messageController.js";

const messageRoutes = Router();

messageRoutes.post("/", message.create);
messageRoutes.get("/", message.getAll);

export default messageRoutes;
