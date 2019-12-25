const express = require('express')
const app = express()
// 数据库
const db = require('./db/connect')

// bodyParser中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

// 用户路由接口
const userRouter = require('./router/userRouter')
app.use('/user',userRouter)


app.listen(3000,()=>{
    console.log('server has been started !')
})