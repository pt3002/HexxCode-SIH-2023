const express = require("express");
const ForumControllers = require("../controllers/Forum");
const router = express.Router();

//# Post
router.get("/getAllPost", ForumControllers.GetAllPost);
router.get("/getPostById/:id", ForumControllers.GetPostById);
router.post("/addPost", ForumControllers.AddPost);
router.post("/addLike", ForumControllers.AddLike);
router.get("/getTrending", ForumControllers.GetTrending);
router.get("/getUnanswered", ForumControllers.GetUnanswered);

//# Tag
router.get("/getTags", ForumControllers.GetTags);
router.post("/addTag", ForumControllers.AddTags);
router.post("/postaccordingToTag", ForumControllers.getPostsAccordingToTags)

//# Reply
router.post("/addReply", ForumControllers.AddReply);
router.get("/getReply/:id", ForumControllers.GetReply);

// router.put("/like/:id",async (req, res) => {
//   const reply = await Reply.findById(req.params.id);
//   if (!reply) return res.status(400).send("reply doesn't exists");
//   if (reply.author == req.user._id)
//     return res.status(400).send("You can't upvote your own reply");
//   const upvoteArray = reply.upvotes;
//   const index = upvoteArray.indexOf(req.user._id);
//   if (index === -1) {
//     upvoteArray.push(req.user._id);
//   } else {
//     upvoteArray.splice(index, 1);
//   }
//   reply.upvotes = upvoteArray;
//   const result = await reply.save();
//   const reply_new = await Reply.find({ _id: reply._id }).populate(
//     "author",
//     "name username"
//   );
//   res.send(reply_new);
// });

module.exports = router;
