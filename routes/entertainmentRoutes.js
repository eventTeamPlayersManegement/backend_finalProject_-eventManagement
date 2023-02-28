import { Router } from "express";
import * as entertainment from "../controllers/entertainmentController.js";



const entertainmentRoutes = Router();

entertainmentRoutes.post("/", entertainment.create);
entertainmentRoutes.get("/", entertainment.getAll);
entertainmentRoutes.get("/:entertainmentId", entertainment.getOne);
entertainmentRoutes.put("/:entertainmentId", entertainment.replace);
entertainmentRoutes.patch("/:entertainmentId", entertainment.update);
entertainmentRoutes.delete("/:entertainmentId", entertainment.deleteOne);

export default entertainmentRoutes;