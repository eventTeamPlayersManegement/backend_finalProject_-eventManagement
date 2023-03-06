import * as Conversation from "../models/Conversation.js";

export const getOneConversation = async (req, res, next) => {
  try {
    const result = await Conversation.getOneConversation(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getAllConversation = async (req, res, next) => {
  try {
    const result = await Conversation.getAllConversation();
    res.status(200).json({ conversations: result });
  } catch (error) {
    next(error);
  }
};
export const createOneConversation = async (req, res, next) => {
  try {
    const result = await Conversation.createOneConversation(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateOneConversation = async (req, res, next) => {
  try {
    const result = await Conversation.updatOneConversation(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
