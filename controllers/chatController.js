import * as Chat from "../models/Chat.js";

export const getOneChat = async (req, res, next) => {
  try {
    const result = await Chat.getOneChat(req.query.chatId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const createOneChat = async (req, res, next) => {
  try {
    const result = await Chat.createOneChat(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateOneChat = async (req, res, next) => {
  try {
    const result = await User.updateOneChat(req.query.chatId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
