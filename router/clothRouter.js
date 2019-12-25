const express = require('express')
const router = express()
const clothModel = require('../db/model/clothModel')

router.post('/add',(req,res)=>{
    let addCloth = {
        name:'皮草大衣',
        warm:9,
        soft:6,
        desc:"此款皮草大衣既保暖又时尚。"
    }
    clothModel.insertMany(addCloth)
    .then(()=>{
        res.send({ status:200,msg:"添加衣服成功！" })
    })
    .catch((err)=>{
        res.send({ status:401,msg:err.message })
    })
})
module.exports = router