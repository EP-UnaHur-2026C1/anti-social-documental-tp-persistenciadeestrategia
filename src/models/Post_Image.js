const mongoose = require("mongoose");

const postImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post_Image", postImageSchema);