const Post = require("../models/forumPost");
const Reply = require("../models/forumReply");
const Tag = require("../models/tag");

exports.GetAllPost = async (req, res, next) => {
  // let all_posts = await Post.find().populate("tags").exec();
  let all_posts = await Post.find().exec();
  res.send(all_posts);
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
