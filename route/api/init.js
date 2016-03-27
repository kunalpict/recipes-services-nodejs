var express = require('express');
var multer  = require('multer');
var upload = multer({dest: './upload/'});
var router = express.Router();
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
process.env.AWS_ACCESS_KEY_ID = 'AKIAIOJNQROQ2CUY5J3Q';
process.env.AWS_SECRET_ACCESS_KEY = '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';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = JSON.stringify(req.headers);
  //res.clearCookie('dtve-tour-browse-two', { path: '/' });;
  res.cookie('dtve-tour-browse-two', false,{ path: '/users' });;
  res.render('index');
  //res.download('/public/1.docx');
});


router.all('*', function(req, res, next){
	console.log(req.path);
    next();   
});

module.exports = router;
