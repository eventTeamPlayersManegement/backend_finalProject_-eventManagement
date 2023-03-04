import { Router } from "express";
import * as restaurant from "../controllers/restaurantController.js";



const restaurantRoutes = Router();

restaurantRoutes.post("/", restaurant.create);
restaurantRoutes.get("/", restaurant.getAll);
restaurantRoutes.get("/:restaurantId", restaurant.getOne);
restaurantRoutes.put("/:restaurantId", restaurant.replace);
restaurantRoutes.patch("/:restaurantId", restaurant.update);
restaurantRoutes.delete("/:restaurantId", restaurant.deleteOne);

export default restaurantRoutes;