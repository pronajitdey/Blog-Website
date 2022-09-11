const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hello everyone! 👋 Welcome to this Blog Website. You can post your blogs here by going to Compose section of the website.";
const aboutContent = "This blog website is made by Pronajit Dey, a B.Tech C.S.E. student 💻 at Academy of Technology, India.";
const contactContent = "Connect with me on:";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-pronajit:Test1234@cluster0.p3agiem.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, function(err, foundPosts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundPosts
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});


app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post) {
    if (!err) {
      res.render("post", {
        post: post
      });
    }
  })
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = new Post ({
    title: postTitle,
    content: postBody
  });
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.post("/delete", (req, res) => {
  const delPostId = req.body.delBtn;
  Post.deleteOne({_id: delPostId}, function(err) {
    if (!err) {
      console.log("Successfully deleted post");
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started successfully");
});
