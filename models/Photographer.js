import mongoose from "mongoose";

const photographerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    portfolio: String,
    avatar: String,
    description: String,
    fotos: [
      {
        type: String,
      },
    ],
    location: String,
  },
  { timestamps: true },
  { versionKey: false }
);
const Photographer = mongoose.model("Photographer", photographerSchema);

export const getAll = async () => {
  const photographers = await Photographer.find();
  return photographers;
};
export const create = async (document) => {
  const newUser = new Photographer(document);
  if (newUser) {
    return {
      aprooved: true,
      data: await newUser.save(),
      message: "Photographer created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Photographer failed to create",
    };
  }
};
export const getOne = async (photographerId) => {
  const photographer = await Photographer.findOne({ _id: photographerId });
  return photographer;
};
export const replace = async (photographerId, data) => {
  const photographer = await Photographer.findOneAndReplace(
    { _id: photographerId },
    data,
    { returnDocument: "after", runValidators: true }
  );

  return photographer;
};
export const update = async (photographerId, data) => {
  const photographer = await Photographer.findByIdAndUpdate(
    photographerId,
    data,
    { new: true, runValidators: true }
  );

  return photographer;
};
export const deleteOne = async (photographerId) => {
  const photographer = await Photographer.findByIdAndDelete(photographerId);

  return photographer;
};

export default Photographer;
