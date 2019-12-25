const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
// 解析表单数据
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    console.log('中间件')
    let { token } = req.query
    if(!token){
        res.send('没有token!')
        return false
    }else{        
        next()
        console.log(path.join(__dirname,'aaa'))
    }
})
app.use('/',express.static(path.join(__dirname,'static')))
// app.get('/index',(req,res)=>{
//     // res.send('hello')
//     // console.log(req)
//     const { user,pwd } = req.query
//     if( user == 'zjl' && pwd == '123'){
//         res.send({error:0,msg:'ok'})
//     }else{
//         res.send({error:-1,msg:'not ok'})
//     }
// })

// app.post('/users/reg',(req,res)=>{
//     const { user,pwd } = req.body
//     if(user == 123456 && pwd == 123){        
//         res.send({error:0,msg:'注册OK！'})
//     }else{
//         res.send({ error:1,msg:'账号或密码错误!' })
//     }
//     console.log(req.body)
// })

const userRouter = require('./router/userRouter')
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('server start')
})