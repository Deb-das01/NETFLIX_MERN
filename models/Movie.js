const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  //   see User.js file to get the idea of the below line it is explained there
  { timestamps: true }
);
//   see User.js file to get the idea of the below line it is explained there
module.exports = mongoose.model("Movie", MovieSchema);