const arr=[];
let bcrypt=require("bcrypt");
let jwt =require("jsonwebtoken");
const SignUp=(req,res)=>{
    const dataFromUser=req.body;
   if(dataFromUser){
     const find=arr.find((item)=>item.email===dataFromUser.email); 
     if(find){
        return res.send("you are already registered");
     }
     let password=dataFromUser.password;
     let encryptedPassword=bcrypt.hashSync(password,Number(process.env.saltround));
     let temp={
        ...dataFromUser,
        password:encryptedPassword,
     }
     arr.push(temp);
    //  console.log(temp);
       res.send(`you are registred`);
   }
    }
    const Login=(req,res)=>{
    const dataFromUser=req.body;
   if(dataFromUser){ 
    let findArr =arr.find((item)=> item.email==dataFromUser.email
        )
        console.log(findArr, arr)
        console.log("res", dataFromUser)
if(!findArr){
    console.log("you are not registed");
   return res.send("you are not registed");
}
const validate=bcrypt.compareSync(dataFromUser.password,findArr.password)
if(!validate){
    return res.send("your password is incorrect")
}
    res.send("you are login");}
    }
    module.exports={SignUp,Login};