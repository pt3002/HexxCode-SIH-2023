const express = require("express");
const AICTEAdminControllers = require("../controllers/AICTEAdmin");
const router = express.Router();

//Department Heads
router.get("/getAllDepartmentHeads", AICTEAdminControllers.getAllDepartmentHeads);
router.post("/addDepartmentHead", AICTEAdminControllers.addDepartmentHead);
router.post("/updateDepartmentHead", AICTEAdminControllers.updateDepartmentHead);
router.post("/deleteDepartmentHead", AICTEAdminControllers.deleteDepartmentHead);

//Guidelines
router.get("/getAllGuidelines", AICTEAdminControllers.getAllGuidelines);
router.post("/addGuideline", AICTEAdminControllers.addGuideline);
router.post("/updateGuideline", AICTEAdminControllers.updateGuideline);
router.post("/deleteGuideline", AICTEAdminControllers.deleteGuideline);

//login
router.post("/AICTEAdminLogin",AICTEAdminControllers.AICTEAdminLogin);

//CurriculumDevelopers
router.get("/getAvailableCDs", AICTEAdminControllers.getAvailableCurriculumDevelopers);
router.post("/changeCDStatus", AICTEAdminControllers.changeCDStatus)
router.post("/deleteCD", AICTEAdminControllers.deleteCD)

//Charts
router.get("/getCDApplicationCountUniversityWise", AICTEAdminControllers.getCDApplicationCountUniversityWise);
router.get("/getCDApplicationCountGenderWise", AICTEAdminControllers.getCDApplicationCountGenderWise);

module.exports = router;