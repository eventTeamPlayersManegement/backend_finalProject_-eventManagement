import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: String,
    description: {
      type: String,
    },
    capacitymax: {
      type: String,
    },
    capacitymin: {
      type: String,
    },
    price: String,
    street: String,
    houseNumber: {
      type: String,
    },
    zipCode: String,
    city: String,
    fotos: [
      {
        type: String,
      },
    ],
    indoor: {
      type: Boolean,

      default: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
);
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export const getAll = async () => {
  const restaurant = await Restaurant.find();
  return restaurant;
};
export const create = async (document) => {
  const newRestaurant = new Restaurant(document);
  if (newRestaurant) {
    return {
      aprooved: true,
      data: await newRestaurant.save(),
      message: "Restaurant created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Restaurant failed to create",
    };
  }
};
export const findOnCity = async (city, capacity) => {
  const result = await Restaurant.find({
    city,
    capacitymin: { $gte: capacity },
    capacitymax: { $lte: capacity },
  });

  return result;
};

export const getOne = async (restaurantId) => {
  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  return restaurant;
};
export const replace = async (restaurantId, data) => {
  const restaurant = await Restaurant.findOneAndReplace(
    { _id: restaurantId },
    data,
    { returnDocument: "after", runValidators: true }
  );

  return restaurant;
};
export const update = async (restaurantId, data) => {
  const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, data, {
    new: true,
    runValidators: true,
  });

  return restaurant;
};
export const deleteOne = async (restaurantId) => {
  const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

  return restaurant;
};

export default Restaurant;
