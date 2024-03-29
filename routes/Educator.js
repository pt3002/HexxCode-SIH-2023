const express = require("express");
const EducatorsControllers = require("../controllers/Educator");
const router = express.Router();
const { auth } = require("../middleware/auth")

router.get("/getGuidelines",[auth, EducatorsControllers.getAllGuidelines]);
router.get("/getEducatorRequirements", [auth,EducatorsControllers.getRequirements]);
router.get("/getCurriculum", EducatorsControllers.getCurriculum);

router.get("/getNotifications", [auth,EducatorsControllers.getNotificationsByUserId]);
router.post("/setNotificationSeen", [auth, EducatorsControllers.setNotificationSeen]);
router.post("/educatorLogin", EducatorsControllers.EducatorLogin);
router.post("/educatorRegister", EducatorsControllers.EducatorRegistration);
router.post("/postRequirement", [auth,EducatorsControllers.EducatorRequirement]);
router.post("/deleteRequirement",[auth,EducatorsControllers.EducatorDeleteRequirement]);
router.post("/postFeedback/:id",[auth,EducatorsControllers.EducatorPostFeedback]);



module.exports = router;