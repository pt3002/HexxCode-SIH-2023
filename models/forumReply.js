const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const replySchema = new Schema({
  post: { type: mongoose.Schema.ObjectId, required: true },
  comment: { type: String, required: true },
  //   author: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }, // No Users
  //   upvotes: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "User" }, // No Users
  author: { type: String, required: true },
  upvotes: { type: [String], default: [] },
  time: { type: Date, default: Date.now, required: true },
});

const ForumReply = model("forumReply", replySchema);
module.exports = ForumReply;
