const express = require("express");
const router = express.Router();
const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const userController=require('../controller/userController');

router.post(
  //used express validator in createuser route
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  userController.createUser
);
//login route
router.post('/login',userController.login);

router.post('/orderdata',userController.postOrderData);
router.post('/myorders',userController.myOrdersdata);

module.exports = router;
