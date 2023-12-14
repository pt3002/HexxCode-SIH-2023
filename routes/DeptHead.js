const express = require("express");
const router = express.Router();
const DeptHeadControllers = require("../controllers/DeptHead");

router.post("/DeptHeadLogin",DeptHeadControllers.DeptHeadLogin);

//Groups
router.post("/getAllSubjectNamesByDepartment", DeptHeadControllers.getAllSubjectNamesByDepartment);
router.post("/addGroup", DeptHeadControllers.addGroup);
router.get("/getMembersNotInAnyGroup", DeptHeadControllers.getMembersNotInAnyGroup);
router.post("/addMembersToGroup", DeptHeadControllers.addMembersToGroup);



module.exports = router;