const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user',{ useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection

db.on('error',(err)=>console.log(err))

db.on('open',(err,data)=>{
    console.log('成功')
})
var schemas = mongoose.Schema

const userSchema = new schemas({
    name:String,
    date:{ type:Date,default:Date.now() },
    sex:String
})

var User = mongoose.model('user',userSchema)
User.insertMany({
    name:'zjl',
    sex:'男'
})
.then((data)=>{
    console.log('插入成功！数据是：')
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})