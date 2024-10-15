const mongoose = require('mongoose');
const validator=require('validator');
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Provide Name"],
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address..."+value)
            }
        }
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        min:18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not Valid")
            }
        } //This validate function will only run when creating a new object if doing update it will not run have to enable it to tun on update also, Go to mongoose update docs you will get runValidators (options) in findByIdAndUpdate
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Image Url..."+value)
            }
        }
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;