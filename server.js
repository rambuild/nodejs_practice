const express = require('express')
const app = express()
const path = require('path')
// 数据库
const db = require('./db/connect')
// 公用中间件
app.use('/static',express.static(path.join(__dirname,'./static')))

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

app.listen(3000,()=>{
    console.log('server has been started !')
})