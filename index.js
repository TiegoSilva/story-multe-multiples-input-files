const express = require('express');
const app = express();
const port = 3000;


const multer = require('multer');


//to use files from public folder
app.use(express.static('public'));


// GET METHOD
app.get('/', (req, res) => {
  res.send('index')
});


// managing storage 
let diretorio = __dirname + '/uploads/';

const currentDate = Date.now(); 

let storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, diretorio)
    },
    filename: function (req, file, cb) {
      if(file.fieldname == "file2"){
        uniqueSuffix = "doc2" + file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uniqueSuffix)
      }else{
        uniqueSuffix = file.fieldname + "_" + "doc_" + currentDate + file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uniqueSuffix)
      }
      
    }
  }
)


const upload = multer({storage: storage})
const cpUpload = upload.fields([{name: 'comprovante_residencia'}, {name: 'id_cnh'}])


app.post('/uploadfiles', cpUpload, async (req, res, next) => { 
  res.json({
    "All right": "true", 
    "code": 502
  })
})


// feedbacks
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})