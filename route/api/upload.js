var express = require('express');
var uuid = require('uuid');
var multer  =   require('multer');
var router = express.Router();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/var/www/html/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.jpg');
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

router.post('/upload', function (req, res, next) {
	 upload(req,res,function(err) {
        if(err) {
        	console.log(err)
            return res.end("Error uploading file.");
        }
        console.log(req.file);
        res.redirect('http://127.0.0.1:8080/userPhoto-1463083466521.jpg');
    });  
})

module.exports = router;
