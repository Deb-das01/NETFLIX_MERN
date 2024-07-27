const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
  },
//   For the below line mongoose will automatically set the createdAt and updatedAt fields to the current timestamp. 
//   If you later update that document, the updatedAt field will be automatically updated to reflect the modification time.
  { timestamps: true }
);

// This below line of code creates and exports a Mongoose model for the "User" schema, making it available for use in other parts of your application. 
// You can use this model to perform CRUD (Create, Read, Update, Delete) operations on the "users" collection in MongoDB.
module.exports = mongoose.model("User", UserSchema);
//this below line won't define the collection name as default(pluralized schema name in this case "users"),
//rather it defines a different name as given by the developer or programmer in place of customUserCollection.
//But here this part is commented out because we want the collection name as the default i.e users.just below is the code--
// module.exports = mongoose.model("User", UserSchema, "customUserCollection");
