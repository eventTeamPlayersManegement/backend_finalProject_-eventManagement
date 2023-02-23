import mongoose from "mongoose";
const eventSchema = mongoose.Schema(
  {
    category: {
      type: String,
      // required: true,
    },
    budget: {
      type: Number,
    },
    guestsNumber: {
      type: Number,
      min: 2,
      max: 750,
    },
    decoration: {},
    entertainment: {},
    location: {},

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
