const jwt = require('jsonwebtoken')
const secret = 'thisissecret！'

function creatToken(payload){
    payload.ctime = Date.now()
    payload.timeout = 1000*60*60*24 //token超时(毫秒级)
    return jwt.sign(payload,secret)
}

function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,data)=>{
            if(err){
                reject('无效Token!')
            }else{
                // 先判断token是否超时
                let now = Date.now()
                let effectTime = data.ctime + data.timeout
                if(now > effectTime){
                    reject('Token超时！')
                }else{
                    resolve(data)
                }
            }
        })
    })
}

module.exports = { creatToken,verifyToken }