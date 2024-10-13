const express = require('express');

const app = express();

app.use("/getUserData", (req, res, next) => {
    // Logic of DB and get data
    // use try,catch block good practice
    res.send("User Response Sent")
})

app.use("/", (err, req, res, next) => {
    if (err) {
        // Log your errors
        res.status(500).send("Something Went Wrong!")
    }
}) //keep it at last 

app.listen(5555, () => {
    console.log("Server is running on port 5555")
})