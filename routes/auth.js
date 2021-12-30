const { Router } = require("express");
const express = require("express");
const {signup , signin} = require("../controllers/auth");
const {userSignUpValidator} = require("../validators/index");

const router = express.Router();

router.post("/signup" ,userSignUpValidator, signup);
router.post("/signin" ,signin);

module.exports = router;