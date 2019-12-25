const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../utils/sendmail')
let codes = {}

/**
 * @api {post} /user/reg 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} user *用户名
 * @apiParam {String} pwd *密码
 * @apiParam {String} mail *邮箱验证码
 *
 * @apiSuccess {Number} status 200
 * @apiSuccess {msg} pwd  密码
 */

// 注册
router.post('/reg',(req,res)=>{
    const {user , pwd , code} = req.body
    if(!user || !pwd) return res.send({status:400,msg:'用户名和密码必须都填写！'})
    User.find({user})
    .then((data)=>{
        console.log(codes)
        if(data.length !== 0) return res.send({status:403,msg:'用户名已存在'})
        if(!code || codes.code != code){
            return res.send({ status:401,msg:"验证码错误！" })
        }
        User.insertMany({user,pwd})
        .then(()=>{            
            res.send({status:200,msg:'注册成功！'})
        })
        .catch((err)=>[
            res.send({status:401,msg:'注册失败！'})
        ])
    })
    .catch((err)=>{
        res.send({status:500,msg:'内部错误！'})
    })   
})

/**
 * @api {get} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} user *用户名
 * @apiParam {String} pwd *用户密码
 *
 * @apiSuccess {Number} 200 登录成功
 * @apiError {Number} 400 登录失败
 */

// 登录
router.get('/login',(req,res)=>{
    const { user , pwd } = req.body
    if(!user || !pwd) return res.send({status:400,msg:'用户名和密码必须都填写！'})
    User.find({user,pwd})
    .then((data)=>{
        if(data.length == 0) return res.send({status:401,msg:'用户名或密码错误！'})
        res.send({status:200,msg:'登录成功！'})
    })
    .catch((err)=>{
        res.send({status:500,msg:'内部错误'})
    })
})

/**
 * @api {get} /user/mail 发送验证码
 * @apiName verificationCode
 * @apiGroup User
 *
 * @apiParam {String} mail *用户的邮箱
 *
 * @apiSuccess {Number} 200 发送验证码成功
 * @apiError {Number} 400 发送验证码失败
 */

// 发送验证码
router.get('/mail',(req,res)=>{
    const { mail } = req.body
    if(!mail) return res.send({ status:400,msg:"请输入邮箱！" })
    let randomCode = parseInt(Math.random()*100000)
    Mail.sendMail(mail,randomCode)
    .then(()=>{        
        res.send({ status:200,msg:"验证码发送成功！" })
        codes = {
            mail,
            code:randomCode
        }
        // 有效期5分钟，5分钟后重置codes变量
        setTimeout(()=>{
            codes={}
        },300000)
    })
    .catch(()=>{        
        res.send({ status:500,msg:"验证码发送失败！" })
    })
})

module.exports = router