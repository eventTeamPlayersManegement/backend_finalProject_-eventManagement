import mongoose from "mongoose";
const eventSchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
    date: {},
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
    entertainment: [],
    yourLocation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],

    catering: [],
    rentAuto: [],
    dreamstyle: [],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
