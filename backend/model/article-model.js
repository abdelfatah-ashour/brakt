const {Schema, model} = require("mongoose");
const {ObjectId} = Schema.Types;
const articleSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "Author",
    },
    title: String,
    category: String,
    description: String,
    imageArticle: String,
    content: String,
    like: {
      _id: String,
      type: [Object],
      default: [],
    },
    unlike: {
      _id: String,
      type: [Object],
      default: [],
    },
    comments: {
      _id: String,
      type: [Object],
      default: [],
    },
    tags: {type: [String], default: []},
    visible: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

module.exports = model("Article", articleSchema);
