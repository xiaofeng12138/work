const express = require('express')
const router = express.Router()
const multer  = require('multer')
const { join } = require('path')

let storage = multer.diskStorage({  //文件保存的路径
    destination:function(req,file,cb){
      cb(null,join(process.cwd(), "static"))
      console.log(process.cwd())
    },
    filename:function(req,file,cb){  //文件名
    const filename = file.originalname.split('.')
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`)
    },
})

let  upload = multer({ storage: storage })

const app =  express();

router.post('/upload',upload.single('xiaofeng'),(req,res)=>{
   res.send({
       err:0,
       msg:'ok',
       path:req.file.path
   })
})



app.use(router)

app.listen(3000,()=>{
  console.log('服务启动成功，监听在3000端口')
})