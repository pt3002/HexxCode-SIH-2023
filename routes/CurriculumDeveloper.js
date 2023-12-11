const express = require("express");
const CurriculumDeveloperControllers = require("../controllers/CurriculumDeveloper");
const router = express.Router();

//# GET Request
router.get("/getAllSubjects", CurriculumDeveloperControllers.GetAllSubjects);
router.get(
  "/getAllSubjectsByDepartment/:department",
  CurriculumDeveloperControllers.GetAllSubjectsByDepartment
);
router.get(
  "/getDraftBySubjects/:subject_name",
  CurriculumDeveloperControllers.GetDraftBySubjects
);
router.get(
  "/getDraftByDepartment/:department",
  CurriculumDeveloperControllers.GetDraftByDepartment
);
router.get(
  "/getResourceBySubject/:name",
  CurriculumDeveloperControllers.GetResourceBySubject
);

//# Post Request
router.post(
  "/addPinnedResources",
  CurriculumDeveloperControllers.AddPinnedResources
);
router.post(
  "/addPinnedSubjects",
  CurriculumDeveloperControllers.AddPinnedSubjects
);

// MONGO Post requests
router.post("/createDocument", CurriculumDeveloperControllers.createDocument)

module.exports = router;
