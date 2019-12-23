const express = require('express')
const router = express.Router()

router.get('/add',(req,res)=>{
    res.send('add user')
})
router.get('/del',(req,res)=>{
    res.send('add del')
})

module.exports = router