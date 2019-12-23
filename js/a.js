const fs = require('fs')
const path = require('path')

// // 异步api通过callback获取返回的值   /* *************************************************************************** */
// function cbfunc(callback){
//     setTimeout(()=>{
//         callback({
//             msg:'callback里面的值'
//         })
//     },2000)
// }

// cbfunc((n)=>{
//     console.log(n.msg)
// })


// //回调地狱                           /* ************************************************************************* */
// fs.readFile('./a.txt','utf-8',(err,data1)=>{
//     console.log(data1)
//     fs.readFile('./b.txt','utf-8',(err,data2)=>{
//         console.log(data2)
//         fs.readFile('./c.txt','utf-8',(err,data3)=>{
//             console.log(data3)
//         })
//     })
// })


// // promise API外面包裹函数，控制在合适的时机调用promise对象 /* ******************************************************************** */
// function a() {
//     return new Promise((reslove, reject) => {
//         fs.readFile('./a.txt', 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 reslove(data)
//             }
//         })
//     })
// }
// function b() {
//     return new Promise((reslove, reject) => {
//         fs.readFile('./b.txt', 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 reslove(data)
//             }
//         })
//     })
// }
// function c() {
//     return new Promise((reslove, reject) => {
//         fs.readFile('./c.txt', 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 reslove(data)
//             }
//         })
//     })
// }
// a().then((data) => {
//     console.log(data)
//     return c()
// }).then((data) => {
//     console.log(data)
//     return b()
// }).then((data) => {
//     console.log(data)
// })

// 异步函数         /* ************************************************************************************ */

// const promisify = require('util').promisify

// const readFile = promisify(fs.readFile)
// async function a(){
//     let file1 = await readFile('./a.txt','utf-8')
//     let file2 = await readFile('./b.txt','utf-8')
//     let file3 = await readFile('./c.txt','utf-8')
//     console.log(file1)
//     console.log(file2)
//     console.log(file3)
// }
// a()

// mongodb  /**************************************************** */



