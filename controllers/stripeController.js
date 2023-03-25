import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

const STRIPE = process.env.STRIPE_KEY;
const HOST = process.env.HOST;
const stripe = new Stripe(STRIPE, {
  apiVersion: "2020-08-27",
});

export const create = async (req, res, next) => {
  try {
    const product = await stripe.products.create({
      name: req.body.name,
      default_price_data: {
        currency: "eur",
        unit_amount: req.body.amount,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
export const createPayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      line_items: [req.body],
      mode: "payment",
      success_url: "http://localhost:5173/thanks",
      cancel_url: "http://localhost:5173",
    });
    console.log(session);
    res.status(200).json(session.url);
  } catch (error) {
    next(error);
  }
};
