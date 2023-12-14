const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "chats",
      required: true,
    },
    text: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: [
      {
        type: Schema.Types.String,
      },
    ],
    required:true },
    sendTime: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

const Message = model("message", messageSchema);
module.exports = Message;
