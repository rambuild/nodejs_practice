const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    user:String,
    pwd:String,
    age:Number,
    birthDate:String,
    sex:String,
    hobby:String,
    
})

var  User = mongoose.model('User',userSchema)

module.exports = User