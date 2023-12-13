const express = require("express");
const DeptHeadControllers = require("../controllers/DeptHeads");
const router = express.Router();

//login
router.post("/DeptHeadLogin",DeptHeadControllers.DeptHeadLogin);

module.exports = router;
