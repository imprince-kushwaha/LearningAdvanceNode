const express=require('express');

const app=express();

// app.use((req,res)=>{
//     res.send("Hello server");
// }) //here on all route /hello,/user give same

app.use("/test",(req,res)=>{
    res.send("Hello test server");
}) 

app.listen(5555,()=>{
    console.log("Server is running on port 5555")
})