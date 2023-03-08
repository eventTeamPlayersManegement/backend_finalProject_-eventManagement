import mongoose from "mongoose";
import { updateOneUser } from "./User.js";

const conversationSchema = new mongoose.Schema(
  {
    chats: [
      {
        writer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export const createOneConversation = async (document) => {
  const newConversation = new Conversation(document);

  if (newConversation) {
    await updateOneUser(document.id, {
      conversations: newConversation._id,
    });
    return {
      aprooved: true,
      data: await newConversation.save(),
      message: " Conversation created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Conversation  failed to create",
    };
  }
};
export const getOneConversation = async (id) => {
  const conversation = await Conversation.findById(id).populate("chats.writer");
  return conversation;
};

export const updatOneConversation = async (id, data) => {
  console.log(id, data);
  const conversation = await Conversation.findByIdAndUpdate(id, {
    $push: { chats: data },
  });

  return conversation;
};
export const deleteOneConversation = async (id) => {
  const conversation = await Conversation.findByIdAndDelete(id);

  return conversation;
};
export const getAllConversation = async () => {
  const conversation = await Conversation.find().populate("chats.writer");

  return conversation;
};

export default Conversation;
