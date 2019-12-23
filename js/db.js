const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/coursedb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('连接数据库成功'))
    .catch((err) => console.log(err, '连接失败'))
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

const shopSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: Array,
    email: String,
    password: [String]
})
const Shop = mongoose.model('shop', shopSchema)
Shop.find({
        age: { $gt:15,$lt:50 }
    })
    .then((data) => {
        console.log(data)
    })