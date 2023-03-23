import { Router } from "express";
import { create, createPayment } from "../controllers/stripeController.js";

const stripeRouter = Router();

stripeRouter.route("/create").post(create);
stripeRouter.route("/createpayment").post(createPayment);

export default stripeRouter;
