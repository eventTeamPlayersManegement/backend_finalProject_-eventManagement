import { Router } from "express";
import * as suppliers from "../controllers/suppliersController.js";

const suppliersRoutes = Router();
suppliersRoutes.get("/", suppliers.getRandom);

export default suppliersRoutes;
