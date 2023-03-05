import { safeStringify } from "ajv/dist/compile/codegen/code.js";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    admin: {
      type: Boolean,
      default: false,
    },
    data: {},
    sub: {
      type: String,
      required: true,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

export const createOneUser = async (document) => {
  const newUser = new User(document);
  if (newUser) {
    return {
      aprooved: true,
      data: await newUser.save(),
      message: "User created ",
    };
  } else {
    return {
      aprooved: false,
      message: "User failed to create",
    };
  }
};
export const getOneUserSub = async (sub) => {
  const user = await User.findOne({ sub: sub }).populate("chats");
  return user;
};

export const getOneUser = async (id) => {
  const user = await User.findById(id).populate("chats");
  return user;
};

export const updateOneUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, { $push: { ...data } });

  return user;
};
export const deleteOne = async (id) => {
  const user = await User.findByIdAndDelete(id);

  return user;
};

export default User;
