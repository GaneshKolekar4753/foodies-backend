const mongoose = require("mongoose");

module.exports.sendData = async function (req, res) {
  try {
    //get foodItems data and catagory data form db and pass it globally
    const foodItem = await mongoose.connection.db
      .collection("food_items")
      .find()
      .toArray();
    const foodCat = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();

    return res.send({foodItem, foodCat});
  } catch (error) {
    res.send("server err");
  }
};
