const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    saveIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    subjectName : {type: String}
  },
  { timestamps: true }
);

const Document = model("document", documentSchema);
module.exports = Document;
