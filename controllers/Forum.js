const Post = require("../models/forumPost");
const Reply = require("../models/forumReply");
const Tag = require("../models/tag");

// Done
exports.GetAllPost = async (req, res, next) => {
  try {
    const user = req.params && req.params.user;
    if (!user) {
      return res.status(400).send({ err: " missing User" });
    }
    let ans_posts = await Post.find()
      .populate("tags")
      .sort({ time: -1 })
      .exec();
    // let all_posts = ans_posts;
    let all_posts = [];
    for (let i = 0; i < ans_posts.length; i++) {
      let liked = false;
      let upvotes_array = ans_posts[i].upvotes;
      // console.log(
      //   i,
      //   ans_posts[i].title,
      //   upvotes_array.includes(user),
      //   upvotes_array,
      //   user
      // );
      if (upvotes_array.includes(user)) {
        liked = true;
      }
      let n = {
        title: ans_posts[i].title,
        isLiked: liked,
        tags: ans_posts[i].tags,
        upvotes: ans_posts[i].upvotes,
        views: ans_posts[i].views,
        replies: ans_posts[i].replies,
        _id: ans_posts[i]._id,
        description: ans_posts[i].description,
        author: ans_posts[i].author,
        time: ans_posts[i].time,
      };
      all_posts.push(n);
    }
    res.send({ all_posts: all_posts });
  } catch (error) {
    console.log(error);
    res.send({ error: "Unable To Fetch" });
  }
};

exports.GetPostById = async (req, res, next) => {
  const id = req.params && req.params.id;
  if (!id) {
    return res.status(400).send({ err: " missing Id" });
  }
  try {
    const post = await Post.find({ _id: id }).exec();
    const views = post[0].views;
    post[0].views = views + 1;
    const result = await post[0].save();
    res.send(post[0]);
  } catch (error) {
    console.log("error: ", error);
    return res.send(error.message);
  }
};

// done
exports.AddPost = async (req, res, next) => {
  const { title, tags, description, author } = req.body;
  const tags_array = [];
  for (let i = 0; i < tags.length; i++) {
    try {
      const tag_in_db = await Tag.findOne({ _id: tags[i] }).exec();
      if (!tag_in_db) return res.status(400).send("Invalid Tag");
      tags_array.push(tag_in_db);
    } catch (error) {
      console.log(error);
      res.send({ error: "Cannot Find Tag" });
    }
  }
  const post = new Post({
    title: title,
    tags: tags_array,
    description: description,
    author: author,
    views: 1,
  });
  try {
    await post.save();
    res.send({ message: "Post succesfully created" });
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.AddLike = async (req, res, next) => {
  const { id, user } = req.body;
  const post = await Post.findById(id).exec();
  if (!post) return res.status(400).send("Post doesn't exists");
  // if (post.author == req.user._id)
  //   return res.status(400).send("You can't upvote your own post");
  const upvoteArray = post.upvotes;
  const index = upvoteArray.indexOf(user);
  if (index === -1) {
    upvoteArray.push(user);
  } else {
    upvoteArray.splice(index, 1);
  }
  post.upvotes = upvoteArray;
  const result = await post.save();
  const post_new = await Post.find({ _id: post._id }).exec();
  res.send(post_new);
};

// Done
exports.GetTrending = async (req, res, next) => {
  try {
    await Post.find()
      .populate("tags")
      .sort({ views: -1 })
      .then((all_posts) => {
        res.send({ all_posts });
      });
  } catch (error) {
    console.log(error);
    res.send({ error: "Unable To Fetch" });
  }
};

// done
exports.GetUnanswered = async (req, res, next) => {
  try {
    let all_post = await Post.find().populate("tags");
    let unanswered_post = [];
    for (let i = 0; i < all_post.length; i++) {
      let post_id = all_post[i]._id;
      const reply = await Reply.findOne({ post: post_id }).exec();
      if (!reply) {
        unanswered_post.push(all_post[i]);
      }
    }
    res.send(unanswered_post);
  } catch (error) {
    console.log(error);
    res.send({ error: "Unable To Fetch" });
  }
};

// done
exports.GetTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().exec();
    res.send(tags);
  } catch (error) {
    console.log(error);
  }
};

exports.AddTags = async (req, res, next) => {
  const { name } = req.body;
  const tag = new Tag({
    name: name,
  });
  try {
    await tag.save();
    console.log("tag created");
    res.send({ message: "Tag Created Successfully" });
  } catch (error) {
    console.log("err", error);
  }
};

exports.getPostsAccordingToTags = async (req, res, next) => {
  const { tagIds } = req.body;
  try {
    const all_posts = [];
    const post_ids = [];
    for (let i = 0; i < tagIds.length; i++) {
      await Post.find({ tags: { $elemMatch: { $eq: tagIds[i] } } }).then(
        (postForTag) => {
          for (let j = 0; j < postForTag.length; j++) {
            if (post_ids.indexOf(String(postForTag[j]._id)) == -1) {
              all_posts.push(postForTag[j]);
              post_ids.push(String(postForTag[j]._id));
            }
          }
        }
      );
    }
    res.send({ all_posts });
  } catch (error) {
    console.log("err", error);
  }
};

// done
exports.AddReply = async (req, res, next) => {
  const { id, comment, author, previousReplies } = req.body;
  try {
    const post = await Post.findById(id).exec();
  } catch (ex) {
    return res
      .status(400)
      .send({ error: "The Post with given ID doesn't exists!" });
  }
  const reply = new Reply({
    post: id,
    comment: comment,
    author: author,
  });
  try {
    await reply.save().then((resp) => {
      previousReplies.push(resp._id);
      console.log(previousReplies);
      Post.updateOne(
        { _id: id },
        { $addToSet: { replies: previousReplies } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send({ message: "Reply Added" });
          }
        }
      );
    });
    // const reply_populated = await Reply.find({ _id: reply._id })
    //   .populate("post")
    //   .exec();
    // res.send(reply_populated);
  } catch (ex) {
    console.log("error: ", ex);
    res.send({ error: "Unable To Reply" });
  }
};

exports.GetReply = async (req, res, next) => {
  const id = req.params && req.params.id;
  if (!id) {
    return res.status(400).send({ err: " Missing Id" });
  }
  try {
    const replies = await Reply.find({ post: id }).exec();
    res.send(replies);
  } catch (ex) {
    return res.status(400).send("The Post with given ID doesn't exists!");
  }
};
