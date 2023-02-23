import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
        message: "Please enter a valid email address",
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
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

export const getAll = async () => {
  const users = await User.find();
  return users;
};
export const create = async (document) => {
  const newUser = new User(document);
  if (newUser) {
    return {
      aprooved: true,
      data: await newUser.save(),
      message: "user created ",
    };
  } else {
    return {
      aprooved: false,
      message: "User failed to create",
    };
  }
};
export const getOne = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};
export const replace = async (userId, data) => {
  const user = await User.findOneAndReplace({ _id: userId }, data, {
    returnDocument: "after",
    runValidators: true,
  });

  return user;
};
export const update = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });

  return user;
};
export const deleteOne = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  return user;
};

export default User;
