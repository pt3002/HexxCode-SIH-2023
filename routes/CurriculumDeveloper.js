const express = require("express");
const CurriculumDeveloperControllers = require("../controllers/CurriculumDeveloper");
const router = express.Router();
const { auth } = require("../middleware/auth")
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

router.get(
  "/getGuidelines",
  CurriculumDeveloperControllers.getAllGuidelines
)

router.get("/getAllEducatorRequirements", CurriculumDeveloperControllers.getAllRequirements);
router.get("/getAllCDsofDepartment/:department", CurriculumDeveloperControllers.getAllCDsofDepartment)


//# Post Request
router.post(
  "/addPinnedResources",
  CurriculumDeveloperControllers.AddPinnedResources
);
router.post(
  "/addPinnedSubjects",
  CurriculumDeveloperControllers.AddPinnedSubjects
);
//login
router.post(
  "/CurriculumDeveloperLogin",
  CurriculumDeveloperControllers.CurriculumDeveloperLogin
);

// MONGO Post requests
router.post("/createDocument", CurriculumDeveloperControllers.createDocument)
router.get("/getDocuments", CurriculumDeveloperControllers.getAllDocuments)
router.post("/register", CurriculumDeveloperControllers.CDRegistration);
router.post("/newSave", CurriculumDeveloperControllers.addNewSave)
router.post("/addNewChat", CurriculumDeveloperControllers.addNewChat)

// MONGO GET REQUESTS
router.get("/lastSaveBody/:documentId", CurriculumDeveloperControllers.GetLastSaveBody)
router.get("/commitHistory/:documentId", CurriculumDeveloperControllers.GetCommitsHistory)
router.get("/fetchChats", CurriculumDeveloperControllers.fetchChatsForUser)

module.exports = router;
