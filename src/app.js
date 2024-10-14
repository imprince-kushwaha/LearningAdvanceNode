const express = require('express');

const connectDB = require('./db/database')
const app = express();

const User = require("./models/user.model")

app.use(express.json());

app.post('/signup', async (req, res) => {
    // const userObj={
    //     firstName:"Prince",
    //     lastName:"Kushwaha",
    //     emailId:"prince@gmail.com",
    //     password:"prince123"
    // }

    // // Creating the instance of User Model
    // const user=new User(userObj)    (OR directly)

    // const user = new User({
    //     firstName: "Prince",
    //     lastName: "Kushwaha",
    //     emailId: "prince@gmail.com",
    //     password: "prince123"
    // })
    // try {
    //     await user.save();
    //     res.send("User Added Successfully!!!")
    // } catch (err) {
    //     res.status(400).send("Error saving the User" + err.message)
    // }


    // PASS DYNAMIC DATA TO API
    console.log(req.body)  //will give 'undefined' initially,becoz it's in json format to read json data so we use express.json to get data
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added Successfully!!!")
    } catch (err) {
        res.status(400).send("Error saving the User" + err.message)
    }

    
})

// First database should be connected then server should start and start listening API
connectDB().then(() => {
    console.log("Database Connected...")
    app.listen(5555, () => {
        console.log("Server is running on port 5555")
    })
}).catch((err) => {
    console.log("Database connection not established!!")
})

// app.listen(5555, () => {
//     console.log("Server is running on port 5555")
// })