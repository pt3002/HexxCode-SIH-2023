const { mongoURI } = require("../config/configKeys");
const Calendar = require("../models/calendar");

exports.getAllMeetings = async (req, res) => {
  const groupId = req.params && req.params.groupId;
  if (!groupId) {
    return res.status(400).send({ err: " missing Group Id" });
  }
  try {
    const meetings = await Calendar.find({ groupId: groupId }).exec;
    let result = [];
    meetings.forEach((meeting) => {
      let n = {
        //! Get Meeting Object ID
        id: "1231",
        title: meeting.title,
        description: meeting.description,
        location: meeting.location,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        createdBy: meeting.createdBy,
        createdAt: meeting.createdAt,
        groupId: meeting.groupId,
      };
      result.push(n);
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.AddMeeting = async (req, res) => {
  const {
    title,
    description,
    location,
    startTime,
    endTime,
    createdBy,
    createdAt,
    groupId,
  } = req.body;
  const newMeeting = new Calendar({
    title: title,
    description: description,
    location: location,
    startTime: startTime,
    endTime: endTime,
    createdBy: createdBy,
    createdAt: createdAt,
    groupId: groupId,
  });
  try {
    newMeeting.save();
    res.send({ message: "Meeting Saved" });
  } catch (error) {
    console.log(error);
  }
};
exports.UpdateMeeting = async (req, res) => {};
exports.DeleteMeeting = async (req, res) => {};
