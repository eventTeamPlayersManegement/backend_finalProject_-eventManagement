import mongoose from "mongoose";

const entertainmentSchema = mongoose.Schema(
  {
    avatar: String,
    name: String,
    type: {
      type: String,
      enum: ["clown", "magician", "band", "dj"],
    },

    description: String,

    price: Number,
    street: String,
    houseNumber: String,
    city: String,
    fotos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);
const Entertainment = mongoose.model("Entertainment", entertainmentSchema);

export const getAll = async () => {
  const entertainment = await Entertainment.find();
  return entertainment;
};
export const create = async (document) => {
  const newEntertainment = new Entertainment(document);
  if (newEntertainment) {
    return {
      aprooved: true,
      data: await newEntertainment.save(),
      message: "Entertainment created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Entertainment failed to create",
    };
  }
};
export const getOne = async (entertainmentId) => {
  const entertainment = await Entertainment.findOne({ _id: entertainmentId });
  return entertainment;
};
export const replace = async (entertainmentId, data) => {
  const entertainment = await Entertainment.findOneAndReplace(
    { _id: entertainmentId },
    data,
    { returnDocument: "after", runValidators: true }
  );

  return entertainment;
};
export const update = async (entertainmentId, data) => {
  const entertainment = await Entertainment.findByIdAndUpdate(
    entertainmentId,
    data,
    { new: true, runValidators: true }
  );

  return entertainment;
};
export const deleteOne = async (entertainmentId) => {
  const entertainment = await Entertainment.findByIdAndDelete(entertainmentId);

  return entertainment;
};

export default Entertainment;
