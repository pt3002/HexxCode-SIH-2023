const express = require("express");
const AICTEAdminControllers = require("../controllers/AICTEAdmin");
const router = express.Router();

//Department Heads
router.get("/getAllDepartmentHeads", AICTEAdminControllers.getAllDepartmentHeads);
router.post("/addDepartmentHead", AICTEAdminControllers.addDepartmentHead);

module.exports = router;