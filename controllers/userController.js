import bcrypt from "bcrypt";
import * as User from "../models/User.js";
import token from "../lib/token.js"

export const getAll = async (req, res, next) => {
  try {
    const result = await User.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const create = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 15);
    req.body.password = hashedPassword;

    res.status(201).json(await User.create(req.body));
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
   
  try {
      const result = await User.getOne({email: req.body.email});
      const passwordIsEqual = await bcrypt.compare(req.body.password, result.password);
      if(!passwordIsEqual)return res.status(401).end();
      if(passwordIsEqual){
          const userToken = token.signToken({id: result._id})
          const expDate = 1000 * 60 * 60 * 24
          res.cookie("jwt", userToken, {
              sameSite: "lax",
              maxAge: expDate,
              httpOnly: true
          })
          res.cookie("loggedIn", result._id.toString(), {
              sameSite: "lax",
              maxAge: expDate,
              httpOnly: false
          })

          return res.status(201).json({message: "successfully logged in", id: result._id})
      }
  } catch(error) {
      next(error);
  };

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
