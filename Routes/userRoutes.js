const { Login, SignUp } = require("../controller/registerController");

const userRoute=require("express").Router();
userRoute.post("/Login", Login)
userRoute.post("/SignUp",SignUp)
module.exports=userRoute;