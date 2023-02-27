import { Router } from "express";
import * as photographer from "../controllers/photographerController.js";



const photographerRoutes = Router();

photographerRoutes.post("/", photographer.create);
photographerRoutes.get("/", photographer.getAll);
photographerRoutes.get("/:photographerId", photographer.getOne);
photographerRoutes.put("/:photographerId", photographer.replace);
photographerRoutes.patch("/:photographerId", photographer.update);
photographerRoutes.delete("/:photographerId", photographer.deleteOne);

export default photographerRoutes;