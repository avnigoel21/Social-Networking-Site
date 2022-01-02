const { Router } = require("express");
const express = require("express");
const {userById } = require("../controllers/user");
const {postById } = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");
const postController = require("../controllers/post");
const validator = require("../validators/index");

const router = express.Router();

router.get("/posts", requireSignin,postController.getPosts);
router.post("/post/new/:userId" , requireSignin , postController.createPost ,validator.createPostValidator);

router.get("/posts/by/:userId" , postController.postsByUser);
router.put("/post/:postId" , requireSignin, postController.isPoster ,  postController.updatePost);
router.delete("/post/:postId" , requireSignin, postController.isPoster ,  postController.deletePost);



//any route containing : userId , our app will first execute userById
router.param("userId" , userById);
//any route containing : postId , our app will first execute postById
router.param("postId" , postById);



module.exports = router;