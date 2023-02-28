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
    entertainment: [],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false },
  { timestamps: true }
);
const Event = mongoose.model("Event", eventSchema);

export default Event;
