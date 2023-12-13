const express = require("express");
const CalendarControllers = require("../controllers/Calendar");
const router = express.Router();

router.get("/getAllMeetings/:groupId", CalendarControllers.getAllMeetings);
router.post("/addMeeting", CalendarControllers.AddMeeting);
router.post("/updateMeeting", CalendarControllers.UpdateMeeting);
router.post("/deleteMeeting", CalendarControllers.DeleteMeeting);

module.exports = router;
