const nodemailer = require('nodemailer')

function sendMail(mail, code) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fyhlamp@163.com',
            pass: 'q123666'
        }
    })
    let mailObj = {
        from: "<fyhlamp@163.com>",
        to: mail,
        subject: "this is subject!",
        // text:'this is text!',
        html: `<b>您的验证码是：<i>${code}</i>，有效期5分钟！</b>`
    }
    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailObj, (err, data) => {
            if(err){
                reject()
            }else{
                resolve()
            }
        })
    })
}

module.exports = { sendMail }