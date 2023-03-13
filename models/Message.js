import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});
const Message = mongoose.model("message", messageSchema);

export const create = async (document) => {
  const newMessage = new Message(document);
  if (newMessage) {
    return {
      aprooved: true,
      data: await newMessage.save(),
      message: "Message created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Message failed to create",
    };
  }
};
