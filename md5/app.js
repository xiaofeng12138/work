const express = require('express')

const app = new express()

app.get('/',(req,res)=>{
   res.send('大家好 我是渣渣辉')
})

app.listen(3000,()=>{
    console.log('服务器启动成功，监听在3000端口')
})