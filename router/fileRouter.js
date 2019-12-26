// 上传文件API

const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/uploads/img')
    },
    filename: function (req, file, cb) {
        let mimeName = file.originalname.split('.')[0] == '' ? file.originalname.split('.')[1] : file.originalname.split('.')[0]
        let mimeType = file.originalname.split('.')
        let mimeCut = mimeType[mimeType.length-1]
      cb(null, mimeName + Date.now() + '.' + mimeCut)
    }
})

// 文件过滤器的使用？

// var fileFilter = function(req,file,cb){
//     // 这个函数应该调用 `cb` 用boolean值来
//      // 指示是否应接受该文件

//     // 拒绝这个文件，使用`false`，像这样:
//     const { size,mimetype,path } = file
//     let imgType = ['jpg','png','jpeg','gif']
//     let mime = mimetype.split('/')[1]
//     if(imgType.indexOf(mime) == -1){
//         cb(null, false)
//     }

//     // 接受这个文件，使用`true`，像这样:
//      cb(null, true)
// }
  
var upload = multer({ storage })

router.post('/upload',upload.single('key'),(req,res)=>{
    const { size,mimetype,path } = req.file
    let imgType = ['jpg','png','jpeg','gif']
    let mime = mimetype.split('/')
    let mimeCut = mime[mime.length-1]
    console.log(req.file)
    if( size > 512000){
        return res.send({ status:401,msg:"上传的文件不得超过500Kb!" })
    }else if(imgType.indexOf(mimeCut) == -1){
        return res.send({ status:401,msg:"上传的文件必须是图片类型!" })
    }else{
        let url = req.file.filename
        res.send({ status:200,msg:'上传成功！',filepath:`static/uploads/img/${url}` })
    }
})

module.exports = router