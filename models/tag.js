const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const tagSchema = new Schema({
  name: { type: String, required: true },
  used: { type: Number, default: 0 },
});

const Tag = model("tag", tagSchema);
module.exports = Tag;
