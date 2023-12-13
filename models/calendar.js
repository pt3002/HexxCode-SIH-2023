const mongoose = require("mongoose");
const { model, Schema } = mongoose;

/*
  #Title
  #Description
  #Location
  #Start Time (How to Store the Time)
  #End Time
  #Created By (How To Map the user)
  #CreatedAt 
  #GroupId
*/

const calendarSchema = new Schema(
  {
    title: { type: String, required: true, default: "Meeting" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    groupId: { type: String, required: true },
  },
  { timestamps: true }
);

const Calendar = model("calendar", calendarSchema);
module.exports = Calendar;
