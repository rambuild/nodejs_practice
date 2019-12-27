const jwt = require('jsonwebtoken')
const secret = 'thisissecret！'

function creatToken(payload){
    payload.ctime = Date.now()
    payload.timeout = 1000*60*60*24*7
    return jwt.sign(payload,secret)
}

function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,data)=>{
            if(err){
                reject(err.message)
            }else{
                resolve(data)
            }
        })
    })
}

module.exports = { creatToken,verifyToken }