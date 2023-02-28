import mongoose from "mongoose";
const eventSchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
    budget: {
      type: Number,
    },
    guestsNumber: {
      type: Number,
      min: 2,
      max: 750,
    },
    venue: [{ type: String /* city: "bla"*/ }],
    decor: [],
    entertainment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entertainment"
      }
    ],
    yourLocation: [],
    fotos: [],
    catering: [],
    rentAuto: [],
    dreamstyle: [],
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant"
    },
    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photographer"
    },

    user: {
      type: String
    },
  },
  { versionKey: false },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export const getAll = async (document) => {
  const event = await Event.find({_id: document});
  return event;
};
export const create = async (document) => {
  const newEvent = new Event(document);
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
  const event = await Event.findOne({_id: eventId});
  return event;
};
export const replace = async (eventId, data) => {
  const event = await Event.findOneAndReplace({_id: eventId}, data, {returnDocument: "after", runValidators: true},);

  return event;
};
export const update = async (eventId, data) => {
  const event = await Event.findByIdAndUpdate(eventId, data, {new: true, runValidators: true});

  return event;
};
export const deleteOne = async (eventId) => {
  const event = await Event.findByIdAndDelete(eventId)

  return event;
};

export default Event;
