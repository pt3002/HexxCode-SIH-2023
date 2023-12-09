const express = require("express");
const AICTEAdminControllers = require("../controllers/AICTEAdmin");
const router = express.Router();

//Department Heads
router.get("/getAllDepartmentHeads", AICTEAdminControllers.getAllDepartmentHeads);
router.post("/addDepartmentHead", AICTEAdminControllers.addDepartmentHead);
router.post("/updateDepartmentHead", AICTEAdminControllers.updateDepartmentHead);
router.post("/deleteDepartmentHead", AICTEAdminControllers.deleteDepartmentHead);

module.exports = router;