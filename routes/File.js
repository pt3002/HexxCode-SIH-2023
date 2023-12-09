const express = require("express");
const router = express.Router();

const { uploadFile, getFileGrid, getFileId } = require("../controllers/File");

router.post("/upload", uploadFile);
router.get("/fileId/:filename", getFileId);
router.get("/get/:filename", getFileGrid);

module.exports = router