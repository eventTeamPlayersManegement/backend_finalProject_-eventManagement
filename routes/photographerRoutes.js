import { Router } from "express";
import * as photographer from "../controllers/photographer.js";
import validate from "../middlewares/validate.js";
import { postSchema, getSchema, getAllSchema, deleteSchema } from "./photographer.schema.js";

const photographerRoutes = Router();

photographerRoutes.post("/", validate(postSchema), photographer.create);
photographerRoutes.post("/login", photographer.login);
photographerRoutes.get("/", validate(getAllSchema), photographer.getAll);
photographerRoutes.get("/:photographerId", validate(getSchema), photographer.getOne);
photographerRoutes.put("/:photographerId", photographer.replace);
photographerRoutes.patch("/:photographerId", photographer.update);
photographerRoutes.delete("/:photographerId", validate(deleteSchema), photographer.deleteOne);

export default photographerRoutes;