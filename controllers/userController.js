import * as User from "../models/User.js";

export const getOneUser = async (req, res, next) => {
  try {
    const result = await User.getOneUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getOneUserSub = async (req, res, next) => {
  try {
    const result = await User.getOneUserSub(req.params.sub);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const createOneUser = async (req, res, next) => {
  try {
    const result = await User.createOneUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateOneUser = async (req, res, next) => {
  try {
    const result = await User.updateOneUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
