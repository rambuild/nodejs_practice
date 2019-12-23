const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host:'smtp.163.com',
    port:465,
    secure:true,
    auth:{
        user:'fyhlamp@163.com',
        pass:'q123666'
    }
})

let mailObj = {
    from:"<fyhlamp@163.com>",
    to:"276822603@qq.com",
    subject:"this is subject!",
    // text:'this is text!',
    html:"<b>您的验证码是：<i>136879</i></b>"
}
transporter.sendMail(mailObj,(err,data)=>{
    console.log(err)
    console.log(data)
})