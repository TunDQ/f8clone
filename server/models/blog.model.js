const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
        type: String,
        required: true,
      },
    image: { 
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
      },
    comments: {
        type: String
    },
    like: {
        type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogSchema);
