var express = require('express');
var multer  = require('multer');
var upload = multer({dest: './upload/'});
var router = express.Router();
var AWS = require('aws-sdk');
var jwt    = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = JSON.stringify(req.headers);
  //res.clearCookie('dtve-tour-browse-two', { path: '/' });;
  res.cookie('dtve-tour-browse-two', false,{ path: '/users' });;
  res.render('index');
  //res.download('/public/1.docx');
});


router.all('*', function(req, res, next){
	console.log(req.cookies.api-token);
	if(req.cookies.api-token){
	jwt.verify(req.cookies.api-token, "thisistokentest", function(err, decoded) {      
            
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded; 
              console.log(decoded);   
              
            }
          });
	}
	next();
});

module.exports = router;
