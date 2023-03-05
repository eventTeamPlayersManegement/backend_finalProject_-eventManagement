import mongoose from "mongoose";
const chatSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      message: " Chat created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Chat  failed to create",
    };
  }
};
export const getOneChat = async (chatId) => {
  const chat = await Chat.findById(chatId).populate("writer");
  return chat;
};

export const updatOneChat = async (chatId, data) => {
  const chat = await Chat.findByIdAndUpdate(chatId, data);

  return chat;
};
export const deleteOneChat = async (chatId) => {
  const chat = await Chat.findByIdAndDelete(chatId);

  return chat;
};

export default Chat;
