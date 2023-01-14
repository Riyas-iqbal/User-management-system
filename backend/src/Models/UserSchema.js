const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    address:String,
    imageUrl:String
})

module.exports = mongoose.model('users',userSchema)