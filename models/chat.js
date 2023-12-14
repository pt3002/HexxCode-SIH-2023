const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const chatSchema = new Schema(
  {
    messageIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
      default: [],
      required: true,
    },
    userIds: {
      type: [
        {
          type: Schema.Types.String,
        },
      ],
      default: [],
    },
    isGroupChat: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, required: true },
    lastMessageTime: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

const Chat = model("chat", chatSchema);
module.exports = Chat;
