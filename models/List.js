const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content:{type:Array}
  },
//   see User.js file to get the idea of the below line it is explained there
  { timestamps: true }
);
//   see User.js file to get the idea of the below line it is explained there
module.exports = mongoose.model("List", ListSchema);