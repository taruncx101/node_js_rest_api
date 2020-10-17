const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    paassword: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
        },
    posts: [{
        type: Schema.type.ObjectId,
        ref: 'Post'
    }]
  }
);

module.exports = mongoose.model("User", userSchema);
