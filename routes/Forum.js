const express = require("express");
const ForumControllers = require("../controllers/Forum");
const router = express.Router();

//# Post
router.get("/getAllPost", ForumControllers.GetAllPost);
router.get("/getPostById/:id", ForumControllers.GetPostById);
router.post("/addPost", ForumControllers.AddPost);
router.post("/addLike", ForumControllers.AddLike);

//# Tag
router.get("/getTags", ForumControllers.GetTags);
router.post("/addTag", ForumControllers.AddTags);

module.exports = router;
