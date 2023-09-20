const express=require("express");
const app=express();
const dotenv=require("dotenv");
const userRoute = require("./Routes/userRoutes");
const socket=require("socket.io");
dotenv.config();
app.use(express.json());
app.use("/",userRoute);
let server=app.listen(process.env.port,(err)=>{
    if(err)console.log(err)
    else console.log(`server is active on port number ${process.env.port}`)
})
const io=socket(server,{
    cors:{
        origin:"*",
    }
})
io.on("connection",(SocketClient)=>{
console.log(SocketClient.id);
SocketClient.on("joinRoom",(data)=>{
    // console.log(groupName)
    SocketClient.join(data.groupName);
   io.to(data.groupName).emit("success",`${data.author} you are joined a group name ${data.groupName}`)
    SocketClient.on("toRoom",(messToRoom)=>{
        console.log(messToRoom.message)
        io.to(data.groupName).emit("messFromServer",messToRoom);
    })
})

})
app.get("/",(req,res)=>{
    console.log("server is on")
    res.send("welcome")
})

