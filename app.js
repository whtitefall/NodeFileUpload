const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

// set storage engine

const storage = multer.diskStorage({
    destination : './public/uploads/',
    filename : function(req,file, callback){
        callback(null,file.filename+ '-' + Date.now()+ path.extname(file.originalname))
    }
})

// init upload 

const upload = multer({
    storage,
    limits:{fieldSize:1000} 
}).single('myimg')

function CheckFileType(file, cb ){
    const fileTypes = /js/ 
    const extname= fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeTye = fileTypes.test(file.mimeTye)

    if(mimeTye && extname){
        return cb(null,true)
    }else{
        console.log(file.filename)
        cb('Error wrong type')
    }
}

const app = express()
const port = 3000 

app.set('view engine','ejs')

app.use(express.static('./public'))

app.get('/', (req,res) => res.render('index'))

app.post('/upload',(req,res)=>{
    upload(req,res, err =>{
        if(err){
            res.render('index', {
                msg :err
            })
        }else {
            if(req.file == undefined){
                res.render('index',{
                    msg: 'error: no file selected'
                })
            }else{
                res.render('index',{
                    msg:'File uploaded',
                    file: `uploads/${req.file.filename}` 
                })
            }
        }

    })
})

app.listen(3000, ()=>{

    console.log(`server runnning on ${port}`)
})
