const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Provide Name"],
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;