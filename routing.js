const express = require('express');

const app = express();

// app.use("/",(req,res)=>{
//     res.send("Hello / server");
// }) 

// app.use("/hello",(req,res)=>{
//     res.send("Hello hello server");
// }) 

// app.use("/test",(req,res)=>{
//     res.send("Hello test server");
// }) 
// Now till here what will be shown on /hello and /test,-> on both route it will show "Hello / server"
// IT IS BECOZ ROUTING MATTERS IN NODE AND IT MATCHES ALL ROUTE FROM /
// AND FROM /hello and /hello/abc or /hello/xyz/zxy will show "Hello hello server"


// app.use("/hello", (req, res) => {
//     res.send("Hello hello server");
// })
// app.use("/hello/2", (req, res) => {
//     res.send("Chin Dabak Dam Dam");
// })
// here if I goto /hello/2 still will print "Hello hello server" BECOZ FIRSTLY IT MATCHES /hello and goes to first one so,routing matters


// app.use("/hello/2", (req, res) => {
//     res.send("Chin Dabak Dam Dam");
// })
// app.use("/hello", (req, res) => {
//     res.send("Hello hello server");
// })
// app.use("/test", (req, res) => {
//     res.send("Hello test server");
// })

// app.use("/", (req, res) => {
//     res.send("Hello / server");
// })

// on /xyz it will goes to "Hello / server"


// IF uses app.use it will be same res for both get&post
app.get("/user", (req, res) => {
    res.send({ firstName: "Prince", lastName: "Kushwaha" })
})

app.post("/user", (req, res) => {
    res.send("Data saved succesfully!!!")
})

// NOW ADVANCED ROUTING ==> /ab?c , /ab+c , /ab*cd , /a(bc)*d , /a/ , /.*fly$/ , /user/:userId(by req.params)
app.listen(5555, () => {
    console.log("Server is running on port 5555")
})