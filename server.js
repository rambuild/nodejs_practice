const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
// 数据库
const db = require('./db/connect')
const cors = require('cors')
const request = require('request')

// 公用中间件
app.use('/static',express.static(path.join(__dirname,'./static')))
// 跨域
app.use(cors())

// bodyParser中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// 用户路由接口
const userRouter = require('./router/userRouter')
app.use('/user',userRouter)

const foodRouter = require('./router/foodRouter')
app.use('/food',foodRouter)

const clothRouter = require('./router/clothRouter')
app.use('/cloth',clothRouter)

app.get('/cors',(req,res)=>{
    request('http://es6.ruanyifeng.com',(err,respose,body)=>{
        res.send(body)
        console.log(err)
    })
})

const fileRouter = require('./router/fileRouter')

app.use('/file',fileRouter)

app.listen(3000,()=>{
    console.log('server has been started !')
})