import mongoose from "mongoose";
import User, { updateOneUser } from "./User.js";
const eventSchema = mongoose.Schema(
  {
    cost: {
      type: Number,
    },
    city: { type: String },
    restname: { type: String },
    entertainment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entertainment",
    },

    rentauto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rentauto",
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stripe: {},
  },
  { versionKey: false },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export const getAll = async (document) => {
  const event = await Event.find({ _id: document });
  return event;
};
export const create = async (document) => {
  const newEvent = new Event(document);
  await updateOneUser(document.user, { events: newEvent._id });
  if (newEvent) {
    return {
      aprooved: true,
      data: await newEvent.save(),
      message: "Event created ",
    };
  } else {
    return {
      aprooved: false,
      message: "Event failed to create",
    };
  }
};
export const getOne = async (eventId) => {
  const event = await Event.findOne({ _id: eventId })
    .populate("user")
    .populate("photographer")
    .populate("restaurant")
    .populate("rentauto")
    .populate("entertainment");
};
export const replace = async (eventId, data) => {
  const event = await Event.findOneAndReplace({ _id: eventId }, data, {
    returnDocument: "after",
    runValidators: true,
  });

  return event;
};
export const update = async (eventId, data) => {
  const event = await Event.findByIdAndUpdate(eventId, data, {
    new: true,
    runValidators: true,
  });

  return event;
};
export const deleteOne = async (eventId) => {
  const event = await Event.findByIdAndDelete(eventId);

  return event;
};

export default Event;
