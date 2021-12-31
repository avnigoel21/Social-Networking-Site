const { Router } = require("express");
const express = require("express");
const {userById} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const postController = require("../controllers/post");
const validator = require("../validators/index");

const router = express.Router();

router.get("/", requireSignin,postController.getPosts);
router.post("/post" , requireSignin ,validator.createPostValidator, postController.createPost);

//any route containing : userId , our app will first execute userById
router.param("userId" , userById);


module.exports = router;