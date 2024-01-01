const { validationResult } = require("express-validator");
const User = require("../models/users");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const jwtsecrateKey="IamGaneshKolekar"
const Orders=require('../models/orderData');

//create new user in db
module.exports.createUser = async function (req, res) {
  //return error msg if input is not valid
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  //create hash code for password field and save it in db
  //generate salt 
  const salt=await bcrypt.genSalt(10);
  //generate hashcode
  const hashcode=await bcrypt.hash(req.body.password,salt);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success: false,message:"already have an user..!" });
    } else {
      let newuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashcode,
        location: req.body.location,
      });
      if (newuser) {
        console.log("user created successfully");
        return res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};


//login user 
module.exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      //compare password with hash in db
      const iscorrectPW=await bcrypt.compare(req.body.password,user.password);
      if ( iscorrectPW) {
        //send authorization tocken in json res to frontend
        const data={
          userID:{
            id:user.id
          }
        }
        const authToken=jwt.sign(data,jwtsecrateKey);
        return res
          .status(200)
          .json({ success: true,authToken, message: "user logged in..!" });
      }
      return res.json({ success: false, message: "incorrect password..!" });
    }
    return res.json({ success: false, message: "user not found..!" });
  } catch (error) {
    console.log(error);
    return res.ststus(400).json({ success: false });
  }
};

//create ordered data for users in db
module.exports.postOrderData=async (req,res)=>{
  let data=req.body.order_data;
  await data.splice(0,0,{Order_date:req.body.date});
  let emailID=await Orders.findOne({email:req.body.email});
  if(!emailID){
    
      let order=await Orders.create({
        email:req.body.email,
        order_data:[data]
      });
      if(order){
        return res.status(200).json({success:true,message:"order data saved in server successfully..!!"})
      }
      return res.status(400).json({success:false,message:'sercer error'})
    
  }else{
    let order=await Orders.findOneAndUpdate({email:req.body.email},
      {
        $push:{order_data:data}
      });
    if(order){
      return res.status(200).json({success:true,message:"order data saved in server successfully..!!"})
    }
    return res.status(400).json({success:false,message:'server error'})
  }
};


//get my orders from db
module.exports.myOrdersdata=async function(req,res){
  try {
    let userOrders=await Orders.findOne({email:req.body.email});
  if(userOrders){
    return res.status(200).json({orderData:userOrders});
  }
  } catch (error) {
    res.send("Server error",error.message);
  }
}