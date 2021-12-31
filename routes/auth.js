const { Router } = require("express");
const express = require("express");
const {signup , signin , signout} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {userSignUpValidator} = require("../validators/index");

const router = express.Router();

router.post("/signup" ,userSignUpValidator, signup);
router.post("/signin" ,signin);
router.get("/signout" ,signout);

//any route containing : userId , our app will first execute userById
router.param("userId" , userById);

module.exports = router;