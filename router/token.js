const jwt = require('jsonwebtoken')

const secret = 'thisissecret！'
const payload = {
    uid:'500',
    secret:null
}

const token = jwt.sign(payload,secret)

console.log(token)

let getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDAiLCJzZWNyZXQiOm51bGwsImlhdCI6MTU3NzQ0OTgyNH0.obqeT_CKJ8Q-Um5nAEies5BaShPuw2zZ5qVtmcXwMFY"
jwt.verify(getToken,secret,(err,data)=>{
    console.log(err)
    console.log(data)
})
