const { mongoURI } = require("../config/configKeys");
const Calendar = require("../models/calendar");

exports.getAllMeetings = async (req, res) => {
  const groupId = req.params && req.params.groupId;
  if (!groupId) {
    return res.status(400).send({ err: " missing Group Id" });
  }
  try {
    const meetings = await Calendar.find({ groupId: groupId }).exec();
    return res.send(meetings);
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
    groupId,
  } = req.body;
  const newMeeting = new Calendar({
    title: title,
    description: description,
    location: location,
    startTime: startTime,
    endTime: endTime,
    createdBy: createdBy,
    groupId: groupId,
  });
  try {
    newMeeting.save();
    res.send({ message: "Meeting Saved" });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateMeeting = async (req, res) => {
  const {
    id,
    title,
    description,
    location,
    startTime,
    endTime,
    createdBy,
    groupId,
  } = req.body;
  try {
    const meeting = await Calendar.findById(id).exec();
    if (meeting) {
      meeting.title = title;
      meeting.description = description;
      meeting.location = location;
      meeting.startTime = startTime;
      meeting.endTime = endTime;
      meeting.createdBy = createdBy;
      meeting.groupId = groupId;
      await meeting
        .save()
        .then(() => {
          return res.send({ message: "Updated Successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.send({ error: "Unable To Update" });
        });
    } else {
      return res.send({ error: "No Meeting Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteMeeting = async (req, res) => {
  let { id } = req.body;
  try {
    await Calendar.deleteOne({ _id: id })
      .exec()
      .then(() => {
        return res.send({ message: "Deleted Successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.send({ error: "Unable To Delete" });
      });
  } catch (error) {
    console.log(error);
  }
};
