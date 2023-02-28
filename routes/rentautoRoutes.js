import { Router } from "express";
import * as rentauto from "../controllers/rentautoController.js";



const rentautoRoutes = Router();

rentautoRoutes.post("/", rentauto.create);
rentautoRoutes.get("/", rentauto.getAll);
rentautoRoutes.get("/:rentautoId", rentauto.getOne);
rentautoRoutes.put("/:rentautoId", rentauto.replace);
rentautoRoutes.patch("/:rentautoId", rentauto.update);
rentautoRoutes.delete("/:rentautoId", rentauto.deleteOne);

export default rentautoRoutes;