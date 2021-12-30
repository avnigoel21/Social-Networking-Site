const { Router } = require("express");
const express = require("express");
const {signup} = require("../controllers/auth");
const {userSignUpValidator} = require("../validators/index");

const router = express.Router();

router.post("/signup" ,userSignUpValidator, signup);

module.exports = router;