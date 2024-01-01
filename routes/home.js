const express=require("express");
const router=express.Router();
const homeController=require('../controller/homeController');
router.post('/home',homeController.sendData);

module.exports=router;