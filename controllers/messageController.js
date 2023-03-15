import * as Message from "../models/Message.js";

export const create = async (req, res, next) => {
  try {
    const result = await Message.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const result = await Message.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
