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
        subject: "您好!",
        // text:'this is text!',
        html: `<b>your verifyCode is <i>${code},limit 5 minutes!</i></b>`
    }
    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailObj, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })
}

module.exports = { sendMail }