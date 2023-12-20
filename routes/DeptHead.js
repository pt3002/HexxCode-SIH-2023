const express = require("express");
const router = express.Router();
const DeptHeadControllers = require("../controllers/DeptHead");
const { auth } = require("../middleware/auth")

router.post("/DeptHeadLogin",DeptHeadControllers.DeptHeadLogin);
router.get(
    "/getGuidelines",
   DeptHeadControllers.getAllGuidelines
  )
//Groups
router.post("/getAllSubjectNamesByDepartment", DeptHeadControllers.getAllSubjectNamesByDepartment);
router.post("/addGroup", DeptHeadControllers.addGroup);
router.get("/getMembersNotInAnyGroup", DeptHeadControllers.getMembersNotInAnyGroup);
router.post("/addMembersToGroup", DeptHeadControllers.addMembersToGroup);
router.post("/viewGroupMembers", DeptHeadControllers.viewMembersOfGroup);
router.post("/deleteMembersFromGroup", DeptHeadControllers.deleteMembersFromGroup);
router.get("/getNotifications", [auth, DeptHeadControllers.getNotificationsByUserId]);
router.post("/setNotificationSeen", [auth, DeptHeadControllers.setNotificationSeen]);
router.get(
  "/getAvailableCurriculums",
  DeptHeadControllers.getAllGuidelines
);
router.post("/deleteCurriculum", DeptHeadControllers.deleteGuideline);
router.post("/addCurriculum", DeptHeadControllers.addCurriculum);
module.exports = router;