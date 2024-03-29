const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const Tag  = require("./tag");
const ForumReply = require("./forumReply")

const forumPostSchema = new Schema({
  title: { type: String, required: true },
  tags: {
    type: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    default: [],
    ref: Tag,
    required: true,
  },
  description: { type: String, required: true },
  //   author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // No User Table
  //   upvotes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "User" }, // No User Table
  author: { type: String, required: true },
  upvotes: { type: [String], default: [] },
  views: { type: Number, default: 1, min: 1 },
  time: { type: Date, default: Date.now, required: true },
  replies : {
    type: [
      {
        type: Schema.Types.ObjectId,
      }
    ],
    default : [],
    ref : ForumReply,
  }
  
});

const ForumPost = model("forumPost", forumPostSchema);
module.exports = ForumPost;
