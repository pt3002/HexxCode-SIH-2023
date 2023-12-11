const express = require("express");
const EducatorsControllers = require("../controllers/Educator");
const router = express.Router();

router.get("/getGuidelines", EducatorsControllers.getAllGuidelines);

// router.post("/educatorLogin", EducatorsControllers.EducatorLogin);
router.post("/educatorRegister", EducatorsControllers.EducatorRegistration);


module.exports = router;