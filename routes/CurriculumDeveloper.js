const express = require("express");
const CurriculumDeveloperControllers = require("../controllers/CurriculumDeveloper");
const router = express.Router();
const { auth } = require("../middleware/auth")

//# GET Request
router.get("/getAllSubjects", [auth,CurriculumDeveloperControllers.GetAllSubjects]);
router.get(
  "/getAllSubjectsByDepartment/:department",
  [auth,CurriculumDeveloperControllers.GetAllSubjectsByDepartment]
);
router.get(
  "/getDraftBySubjects/:subject_name",
  [auth,CurriculumDeveloperControllers.GetDraftBySubjects]
);
router.get(
  "/getDraftByDepartment/:department",
  [auth,CurriculumDeveloperControllers.GetDraftByDepartment]
);
router.get(
  "/getResourceBySubject/:name",
  [auth,CurriculumDeveloperControllers.GetResourceBySubject]
);

router.get(
  "/getGuidelines",
 CurriculumDeveloperControllers.getAllGuidelines
)

router.get("/getAllEducatorRequirements", CurriculumDeveloperControllers.getAllRequirements);
router.get("/getAllCDsofDepartment/:department", CurriculumDeveloperControllers.getAllCDsofDepartment)
router.get("/getCDName/:id", CurriculumDeveloperControllers.findCDName)
router.get("/getSubjectName", [auth, CurriculumDeveloperControllers.getSubjectName])

router.post("/getSubjectsBySEM", CurriculumDeveloperControllers.GetSubjectsBySemester)
router.post("/getBooksBySubjects", CurriculumDeveloperControllers.GetBooksBySubject);

//# Post Request
router.post(
  "/addPinnedResources",
  [auth,CurriculumDeveloperControllers.AddPinnedResources]
);
router.post(
  "/addPinnedSubjects",
  [auth,CurriculumDeveloperControllers.AddPinnedSubjects]
);
//login
router.post(
  "/CurriculumDeveloperLogin",
  CurriculumDeveloperControllers.CurriculumDeveloperLogin
);
router.post(
  "/checkAndLogin",
  CurriculumDeveloperControllers.getOTPEmailCheck
);

// MONGO Post requests
router.post("/createDocument",[auth, CurriculumDeveloperControllers.createDocument])
router.get("/getDocuments", [auth,CurriculumDeveloperControllers.getAllDocuments])
router.post("/register", CurriculumDeveloperControllers.CDRegistration);
router.post("/newSave", [auth,CurriculumDeveloperControllers.addNewSave])
router.post("/setNotificationSeen", [auth, CurriculumDeveloperControllers.setNotificationSeen]);
router.get("/getNotifications", [auth,CurriculumDeveloperControllers.getNotificationsByUserId]);
// MONGO GET REQUESTS
router.get("/lastSaveBody/:documentId", [auth,CurriculumDeveloperControllers.GetLastSaveBody])
router.get("/commitHistory/:documentId",[auth, CurriculumDeveloperControllers.GetCommitsHistory])
router.post("/addNewChat", CurriculumDeveloperControllers.addNewChat)
router.get("/fetchChats", CurriculumDeveloperControllers.fetchChatsForUser)


module.exports = router;
