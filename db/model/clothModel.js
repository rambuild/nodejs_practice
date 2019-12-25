const mongoose = require('mongoose')

const clothSchema = new mongoose.Schema({
    name:String,
    soft:Number,
    warm:Number,
    desc:String
})

var clothModel = mongoose.model('Cloth',clothSchema)

module.exports = clothModel