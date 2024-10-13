const express = require('express');

const app = express();

// app.use("/user",(req,res)=>{
// // WHAT IF NO RESPONSE IS SENT=> it will goes to infinite loop...(on postman you will not get any response)
// })

// app.use("/user",(req,res)=>{
//     res.send("Route Response 1")
// })

// one route can have multiple route handlers
// app.use("/user",(req,res,next)=>{
//     // res.send("Route Response 1")  //if no res.send here then will it go to second route handler...No, it will infinite again so if want to go to next route handler use next();
//     next();
// },(req,res)=>{
//     res.send("Route Response 2")
// })

// app.use("/user",(req,res,next)=>{
//     res.send("Route Response 1")  
//     next();
// },(req,res)=>{
//     res.send("Route Response 2")
// }) //Guess what will it do?==>"Route Response 1" but will see error also becoz sending again resposne to same url and it is not good practice

// app.use("/user",(req,res,next)=>{
//     next();
//     res.send("Route Response 1")  
// },(req,res)=>{
//     res.send("Route Response 2")
// })  //now guess?==>"Route Response 2" but error also as next(); calls it goes to 2res function

// app.use("/user",(req,res,next)=>{
//     next();
//     res.send("Route Response 1")  
// },(req,res)=>{
//     res.send("Route Response 2")
// }) //here we see "Route Response 2" with error also

// app.use("/user",(req,res,next)=>{
//     next();
// },(req,res,next)=>{
//     next();
// },(req,res,next)=>{
//     next();
// },(req,res,next)=>{
//     next();  //express is expecting a route handler here after it
// }) //it shows error cannot get /user


// we can also pass array of functions also
// app.use("/user",
//     [(req, res, next) => {
//         next();
//         res.send("Route Response 1")
//     }, (req, res) => {
//         res.send("Route Response 2")
//     }, (req, res) => {
//         res.send("Route Response 3")
//     }, (req, res) => {
//         res.send("Route Response 4")
//     }]
// )

// app.use("/route",R1,R2,R3,R4,R5)
// app.use("/route",[R1,R2,R3,R4,R5])
// app.use("/route",R1,[R2,R3],R4,R5)
// //SYNTAX USING MULTIPLE ROUTE HANDLERS AS ARRAY




// /admin at top so every request will go through it either /admin/getAllData or /admin/deleteUser
app.use("/admin",(req,res,next)=>{       // also we can create a middleware folder and in it make it auth file and write all auth fun. there and import it where needed
    const token="xyz"
    const isAdminAuthorized=token==="xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request!")
    }else{
        next();
    }
})

app.get("/user",userAuth,(req,res)=>{   //userAuth is middleware is authorizing user
    res.send("User Data Sent")
})
app.get("/admin/getAllData",(req,res)=>{
    // Logic of getting the data ,If req is authorized or not

    // const token="xyz"
    // const isAdminAuthorized=token==="xyz";
    // if (isAdminAuthorized) {
    //     res.send("All Data Sent")
    // }else{
    //     res.status(401).send("Unauthorized request!")
    // } //Is it good practice to write again and again same code if needed anywhere else,here middleware comes

    res.send("All Data Sent")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Data deleted successsfully!!!")
})

app.listen(5555, () => {
    console.log("Server is running on port 5555")
})