const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organiser: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("events", eventSchema);