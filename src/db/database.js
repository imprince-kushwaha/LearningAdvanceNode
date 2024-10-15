const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://princeking19ald:prince123@cluster0.taxs0.mongodb.net/devTinder");
}

module.exports=connectDB;