const express = require("express");
const router = express.Router();
const DeptHeadControllers = require("../controllers/DeptHead");

//Groups
router.post("/getAllSubjectNamesByDepartment", DeptHeadControllers.getAllSubjectNamesByDepartment);
router.post("/addGroup", DeptHeadControllers.addGroup);

module.exports = router;