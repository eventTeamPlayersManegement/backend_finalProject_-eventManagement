import bcrypt from "bcrypt";
import * as User from "../models/User.js";
import token from "../lib/token.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await User.getAll();
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
export const create = async (req, res, next) => {
  try {
    res.status(201).json({
      aprooved: true,
      data: await User.create(req.body),
      message: "user created",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    console.log(req.user);
    const userToken = token.signToken({ id: req.user._id });
    const expDate = 1000 * 60 * 60 * 24 * 30 * 8;
    return res
      .status(201)
      .cookie("jwt", userToken, {
        sameSite: "lax",
        maxAge: expDate,
        httpOnly: true,
      })
      .json({
        aprooved: true,
        message: `successfully logged in ${req.user.firstName}`,
      });
  } catch (error) {
    next({ aprooved: false, message: error });
  }
};
export const getOne = async (req, res, next) => {
  try {
    const result = await User.getOne(req.params.UserId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const replace = async (req, res, next) => {
  try {
    const result = await User.replace(req.params.UserId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(204).send();
    return;
  }
  try {
    const result = await User.update(req.params.UserId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    const result = await User.deleteOne(req.params.UserId);
    if (result.deletedCount > 0) return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
export const signout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("jwt")
      .json({ aprooved: true, message: "you are logged out" });
  } catch (error) {
    next(error);
  }
};
