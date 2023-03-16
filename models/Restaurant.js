import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
  {
    name: {
        type: String,
      required: true,
    },
    description: {
      type: String,
    },
    capacitymax: {
      type: String,
    },
    capacitymin: {
      type: String,
    },

    street: String,
    houseNumber: {
      type: String,
      validate: {
        validator: (v) => /^[0-9].*$/.test(v),
        message: "Please insert some kind of number as House number",
      },
    },
    zipCode: String,
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

export const findOnCity = async (req) => {
    console.log("capacity", +req.query.capacity )
  const result = await Restaurant.find({ city: req.query.city.toLowerCase(), capacitymin: { $gte: +req.query.capacity }, capacitymax: { $lte: +req.query.capacity } });
  // const result = await Restaurant.find({ 'address.city': req.query.city, "capacity": { $gte: +req.query.capacity }});
    // return result;
  // const result = await Restaurant.find( {$or:[{"address.city":"Berlin"},{"address.city":"Munchen"}]});
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
