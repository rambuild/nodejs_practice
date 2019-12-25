const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true,useUnifiedTopology: true })

var db = mongoose.connection

db.on('error',()=>[
    console.log('db connect error !')
])
db.once('open',()=>{
    console.log('db connect successful !')
})