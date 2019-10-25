const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')
var bodyParser = require('body-parser');


var aws = require('aws-sdk')
var multerS3 = require('multer-s3')


var app = express()


const BUCKET_NAME = 'yuanzhenghu'
const s3 = new aws.S3();


app.set('view engine','ejs')
app.use(express.static('./public'))

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'yuanzhenghu',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
 
app.post('/upload', upload.array('myimg', 1), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files!')
  })

// set storage engine

// const storage = multer.diskStorage({
//     destination : './public/uploads/',
//     filename : function(req,file, callback){
//         callback(null,file.filename+ '-' + Date.now()+ path.extname(file.originalname))
//     }
// })

// init upload 

// const upload = multer({
//     storage,
//     limits:{fieldSize:1000} 
// }).single('myimg')

// function CheckFileType(file, cb ){
//     const fileTypes = /js/ 
//     const extname= fileTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimeTye = fileTypes.test(file.mimeTye)

//     if(mimeTye && extname){
//         return cb(null,true)
//     }else{
//         console.log(file.filename)
//         cb('Error wrong type')
//     }
// }

// function showFileName() {
//     var fil = document.getElementById("myFile");
//     alert(fil.value);
//  }

// const app = express()
// const port = 3000 

// app.use(bodyParser.json());

// app.set('view engine','ejs')

// app.use(express.static('./public'))

app.get('/', (req,res) => res.render('index'))

// app.post('/upload',(req,res)=>{
//     res.end(bodyParser.json(req.body) + "\n");
// })
var port = process.env.PORT || 8080;
app.listen(port, ()=>{

    console.log(`server runnning on ${port}`)
})

// upload(req,res, err =>{
//     if(err){
//         res.render('index', {
//             msg :err
//         })
//     }else {
//         if(req.file == undefined){
//             res.render('index',{
//                 msg: 'error: no file selected'
//             })
//         }else{
//             res.render('index',{
//                 msg:'File uploaded',
//                 file: `uploads/${req.file.filename}` 
//             })
//         }
//     }

// })