const express = require('express')
const router = express.Router()
const foodSchema = require('../db/model/foodModel')


router.post('/add',(req,res)=>{
    let food = {
        name:'宫保鸡丁',
        desc:'好吃但是偏辣！',
        price:36,
        introduce:"此菜品属于川菜系，吃辣的朋友首选。"
    }
    foodSchema.insertMany(food)
    .then(()=>{
        res.send({msg:'添加商品成功'})
    })
    .catch(()=>{
        res.send({msg:'添加商品失败'})
    })
})

module.exports = router