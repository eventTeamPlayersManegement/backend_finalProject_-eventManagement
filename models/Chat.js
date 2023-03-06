import mongoose from "mongoose";
import { updateOneUser } from "./User.js";

const chatSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    message: {
      type: String,
    },
  },

  { timestamps: true },
  { versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);

export const createOneChat = async (document) => {
  const newChat = new Chat(document);

  if (newChat) {
    return {
      aprooved: true,
      data: await newChat.save(),
      message: "Chat created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Chat  failed to create",
    };
  }
};
export const getOneChat = async (id) => {
  const chat = await Chat.findById(id).populate("writer");
  return chat;
};

export const updatOneChat = async (id, data) => {
  const chat = await Chat.findByIdAndUpdate(id, data);

  return chat;
};
export const deleteOneChat = async (id) => {
  const chat = await Chat.findByIdAndDelete(id);

  return chat;
};

export default Chat;
