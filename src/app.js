const express = require('express');

const connectDB = require('./db/database')
const app = express();

const User = require("./models/user.model")
const { validateSignupData } = require("./utils/validate.utils")
const bcrypt = require("bcrypt");

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
    // const user = new User(req.body);    //not good to create an instance like this
    try {
        // Validate the data
        validateSignupData(req);

        const{firstName,lastName,emailId,password}=req.body;
        // Encrypting the password
        const passwordHash = await bcrypt.hash(password, 10)  //10 is no. of round of salt round
        console.log(passwordHash)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User Added Successfully!!!")
    } catch (err) {
        res.status(400).send("Error saving the User" + err.message)
    }


})

app.post('/login',async(req,res)=>{
    try {
        const {emailId,password}=req.body;
        // Can write logoc to check if the email is in correct format or not
        if(!validator.isEmail(emailId)){
            throw new Error("Email is not Valid")
        }
        const user=await User.findOne({emailId:emailId})
        if (!user) {
            throw new Error("Invalid email or password")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        
        if (isPasswordValid) {
            res.send("Login Successfully...")
        }else{
            throw new Error("Invalid email or password")
        }
        
    } catch (err) {
        res.status(400).send("Error saving the User" + err.message)
    }
})

// GET USER DETAILS FROM EMAIL
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail }) //.find({a:a}) returns as array
        if (user.length === 0) {
            res.status(404).send("User not Found!")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Something Went Wrong...")
    }
})

// TO get all user
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send("Something Went Wrong...")
    }
})

// Delete a user from DB by ID
app.delete('/user', async (req, res) => {
    const userId = req.body.userId //In postman raw data pass as "userId":"id_here"
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("User Deleted Successfully")
    } catch (err) {
        res.status(400).send("Something Went Wrong...")
    }
})

// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body
    try {
        const ALLOWED_UPDATES = ["photoUrl", "gender", "about", "age"]
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )
        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true })    //or=>({userId, data })
        res.send("User Updated Successfully")

    } catch (err) {
        res.status(400).send("Something Went Wrong...Not Updated!!!" + err.message)

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