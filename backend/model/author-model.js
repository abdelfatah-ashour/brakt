const {Schema, model} = require("mongoose");

const authorSchema = new Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    imageProfile: {
      type: String,
      default: null,
    },
    password: String,
  },
  {timestamps: true}
);

module.exports = model("Author", authorSchema);
