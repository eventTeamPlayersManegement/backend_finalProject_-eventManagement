import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
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
  const user = await User.findOne({ sub: sub }).populate("conversations");
  return user;
};

export const getOneUser = async (id) => {
  const user = await User.findById(id).populate("conversations");
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
