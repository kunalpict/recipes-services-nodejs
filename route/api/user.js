var express = require('express');
var crypto = require('crypto');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var auth = require('../auth/auth');

router.post('/user/login', function(req, res, next) {
  auth.login(req.body.username, req.body.password)
    .then(function(results){
      if(results.length){
        var token = jwt.sign(req.body.username, "thisistokentest", {
          expiresIn: 30 // expires in 24 hours
        });
        console.log(token);
        /*setTimeout(function(){
          jwt.verify(token, "thisistokentest", function(err, decoded) {      
            
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded; 
              console.log(decoded);   
              
            }
          });
        },60);*/

        res.cookie('api-token', token, { domain:'api.myrecipeforum.com',path: '/', httpOnly:true});
        res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.json(results[0]);
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    }); 
});

router.get('/user/check', function(req, res, next) {
  auth.check(req.query.username)
    .then(function(results){
      res.sendStatus(200);
    });  
});

router.post('/user/create', function(req, res, next) {

  console.log(req.body)
   auth.create({
          userId : req.body.username,
          pwd : req.body.password,
          firstName : req.body.firstname,
          lastName : req.body.lastname});

   res.sendStatus(200);
  
  /*var pwd = crypto
      .createHash("md5")
      .update(req.body.password)
      .digest('hex');*/

/*  crypto.randomBytes(128, function (err, salt) {
    if (err) { throw err; }
    salt = new Buffer(salt).toString('hex');
    crypto.pbkdf2(req.body.password, salt, 1000, 256, 
      function (err, hash) {
        if (err) { throw err; }
         auth.create({
          userId : req.body.username,
          pwd : (new Buffer(hash).toString('hex')),
          firstName : req.body.firstname,
          lastName : req.body.lastname});
  
        res.sendStatus(200);
        console.log((new Buffer(hash).toString('hex')));
      });
  });  */  

 
});

router.post('/user/delete', function(req, res, next) {

res.sendStatus(200);
});

module.exports = router;
