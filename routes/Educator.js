const express = require("express");
const EducatorsControllers = require("../controllers/Educator");
const router = express.Router();
const { auth } = require("../middleware/auth")

router.get("/getGuidelines", EducatorsControllers.getAllGuidelines);
router.get("/getEducatorRequirements", EducatorsControllers.getRequirements);

router.post("/educatorLogin", EducatorsControllers.EducatorLogin);
router.post("/educatorRegister", EducatorsControllers.EducatorRegistration);
router.post("/postRequirement", EducatorsControllers.EducatorRequirement);


module.exports = router;