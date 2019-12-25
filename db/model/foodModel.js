const mongoose = require('mongoose')

var foodSchema = new mongoose.Schema({
    name:String,
    desc:String,
    price:String,
    introduce:String    
})

var  Food = mongoose.model('Food',foodSchema)

module.exports = Food