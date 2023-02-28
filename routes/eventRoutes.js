import { Router } from "express";
import * as event from "../controllers/eventController.js";


const eventRoutes = Router();

eventRoutes.post("/", event.create);
eventRoutes.get("/", event.getAll);
eventRoutes.get("/:eventId", event.getOne);
eventRoutes.put("/:eventId", event.replace);
eventRoutes.patch("/:eventId", event.update);
eventRoutes.delete("/:eventId", event.deleteOne);

export default eventRoutes;