const express = require('express')
const router = express.Router()
const foodSchema = require('../db/model/foodModel')

/**
 * @api {post} /food/add 食品添加
 * @apiName addFood
 * @apiGroup Food
 *
 * @apiParam {String} name *食品名称
 * @apiParam {String} desc *概述
 * @apiParam {Number} price *价格
 * @apiParam {Number} introduce *介绍
 *
 * @apiSuccess {Number} status 200
 */

router.post('/add', (req, res) => {
    const { name,desc,price,introduce } = req.body
    let food = {
        name,
        desc,
        price,
        introduce
    }
    if( !name || !desc || !price || !introduce ){
        return res.send({
            status:400,
            msg:'请填写所有必须项！'
        })
    }
    foodSchema.insertMany(food)
        .then((data) => {
            res.send({
                status:200,
                msg: '添加商品成功',
                list:data
            })
        })
        .catch(() => {
            res.send({
                status:200,
                msg: '添加商品失败'
            })
        })    
})

/**
 * @api {post} /food/findByIntro 通过introduce查询
 * @apiName findByIntro
 * @apiGroup Food
 *
 * @apiParam {String} introduce *介绍查询关键字
 *
 * @apiSuccess {Number} status 200
 */
 
router.post('/findByIntro', (req, res) => {
    const {
        introduce
    } = req.body
    let reg = new RegExp(introduce)
    foodSchema.find({
        $and: [{
                name: {
                    $regex: reg
                }
            }, {
                introduce: {
                    $regex: reg
                }
            }
        ]
    })
    .then((data) => {
        if(data.length == 0) return res.send({ msg:'无匹配项' })
        res.send({
            msg: '查询成功！',
            list: data
        })
    })
    .catch((err) => {
        res.send({
            msg: '查询失败！',
            info: err
        })
    })
})

/**
 * @api {post} /food/del 删除食品
 * @apiName delFood
 * @apiGroup Food
 *
 * @apiParam {String} _id 要删除的食品的ID
 *
 * @apiSuccess {Number} status 200
 */

router.delete('/del',(req,res)=>{
    const { id } = req.query
    console.log(req.query)
    if( !id ){
        return res.send({
            status:400,
            msg:"请输入需要删除的ID"
        })
    }
    foodSchema.remove({ _id:id })
    .then((data) => {
        res.send({
            status:200,
            msg: `删除成功！删除了${data.deletedCount}条数据`,
            list: data
        })
    })
    .catch((err) => {
        res.send({
            status:400,
            msg: '删除失败！',
            info: err
        })
    })
})

/**
 * @api {post} /food/update 修改食品信息
 * @apiName updateFood
 * @apiGroup Food
 *
 * @apiParam {String} name 要删除的食品的名称
 * @apiParam {String} desc 修改后的食品概述
 *
 * @apiSuccess {Number} status 200
 */

 router.post('/update',(req,res)=>{
     let { desc } = req.body
     foodSchema.updateMany({ name:'1' },{ $inc:{ "price":-6 } })
     .then((data) => {
        res.send({
            msg: `修改成功`,
            list: data
        })
    })
    .catch((err) => {
        res.send({
            msg: '修改失败！',
            info: err
        })
    })
 })

/**
 * @api {post} /food/getInfoByPage 分页查询食品信息
 * @apiName getInfoByPage
 * @apiGroup Food
 *
 * @apiParam {Number} pagenum 页码
 * @apiParam {Number} pagesize 每页显示的数据个数
 *
 * @apiSuccess {Number} status 200
 */
router.post('/getInfoByPage',(req,res)=>{
    const { pagesize,pagenum } = req.body
    if(!pagenum || !pagesize){
        return res.send({ status:400,msg:'请传入页码及每页显示的数量' })
    }
    let totalNum = 0
    foodSchema.find({})
    .then(data=>{
        totalNum = data.length
    })
    // 跳过(pagenum-1)*pagesize条取pagesize条，以实现分页功能
    foodSchema.find({}).limit(Number(pagesize)).skip(Number((pagenum-1)*pagesize))
    .then((data) => {
        res.send({
            status:200,
            msg: `通过页码查询成功`,
            list: data,
            total:totalNum
        })
    })
    .catch((err) => {
        res.send({
            status:400,
            msg: '通过页码查询失败！',
            info: err
        })
    })

})

module.exports = router