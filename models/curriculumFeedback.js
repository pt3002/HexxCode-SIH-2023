const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CurriculumFeedbackSchema = new Schema(
  {
    title: { type: String, required: true, default: "Changes" },
    subjectName : {type: String},
    description: { type: String, required: true },
    author: { type: String, required: true },
    time: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

const CurriculumFeedback = model("calendar", CurriculumFeedbackSchema);
module.exports = CurriculumFeedback;