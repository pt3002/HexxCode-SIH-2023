const express = require("express");
const AICTEAdminControllers = require("../controllers/AICTEAdmin");
const router = express.Router();

//Department Heads
router.get(
  "/getAllDepartmentHeads",
  AICTEAdminControllers.getAllDepartmentHeads
);
router.post("/addDepartmentHead", AICTEAdminControllers.addDepartmentHead);
router.post(
  "/updateDepartmentHead",
  AICTEAdminControllers.updateDepartmentHead
);
router.post(
  "/deleteDepartmentHead",
  AICTEAdminControllers.deleteDepartmentHead
);

//Guidelines
router.get("/getAllGuidelines", AICTEAdminControllers.getAllGuidelines);
router.post("/addGuideline", AICTEAdminControllers.addGuideline);
router.post("/updateGuideline", AICTEAdminControllers.updateGuideline);
router.post("/deleteGuideline", AICTEAdminControllers.deleteGuideline);

//login
router.post("/AICTEAdminLogin", AICTEAdminControllers.AICTEAdminLogin);

//CurriculumDevelopers
router.get(
  "/getAvailableCDs",
  AICTEAdminControllers.getAvailableCurriculumDevelopers
);
router.post("/changeCDStatus", AICTEAdminControllers.changeCDStatus);
router.post("/deleteCD", AICTEAdminControllers.deleteCD);

//Curriculum
router.get(
  "/getAvailableCurriculums",
  AICTEAdminControllers.getAvailableCurriculum
);
router.post("/changeCurriculumStatus", AICTEAdminControllers.changeCurriculumStatus);
router.post("/deleteCurriculum", AICTEAdminControllers.deleteCurriculum);

//CD Charts
router.get(
  "/getCDApplicationCountUniversityWise",
  AICTEAdminControllers.getCDApplicationCountUniversityWise
);
router.get(
  "/getCDApplicationCountGenderWise",
  AICTEAdminControllers.getCDApplicationCountGenderWise
);

//Feedback Charts
router.post(
  "/getFeedbackDataDepartmentWise",
  AICTEAdminControllers.getFeedbackDataDepartmentWise
);
module.exports = router;
