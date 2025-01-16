const express = require('express')
const router = express.Router();
const { register, login } =  require("../controllers/authControllers")
const {signupValidation, loginValidation} = require("../moddlewares/authValidation")

router.post("/register",signupValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;