const mongoose = require("mongoose")
const { model, Schema } = mongoose;

const SaveSchema = new Schema({
    previousSaveId : {
        type: Schema.Types.ObjectId,
        ref: "saves",
        default : null
    },
    documentId : {
        type : Schema.Types.ObjectId,
        ref : "documents",
        required : true
    },
    createdBy : {type: String, required : true},
    createdAt: { type: Date, default: Date.now, required: true },
    body: { type: String, default: "Start Developing...", required: true },
    commitMessage : {type: String, default : "Initial Version", required:true},
    commitType : {type: String, required: true, default : "Initial Setup"}
})

const Save = model("save", SaveSchema)
module.exports = Save