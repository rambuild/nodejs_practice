const http = require('http')
const app = http.createServer()
const url = require('url')
const queryString = require('querystring')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

app.on('request', (req, res) => {
    let reqpath =  url.parse(req.url).pathname
    reqpath = reqpath == '/'?'/a.html':reqpath
    let realPath = path.join(__dirname,'static',reqpath)
    let type = mime.getType(reqpath)
    fs.readFile(realPath,(err,data)=>{
        if(err){
            res.writeHead(404,{
                'Content-Type':type
            })
            res.end('404')
           return  
        }else{
            res.writeHead(200,{
                'Content-Type':type
            })
            res.end(data)
            console.log('brfore')
            setTimeout(() => {
                console.log('2 seconds later')
            },2000)
            console.log('after')
        }
    })
})
app.listen(200)
console.log('ok')