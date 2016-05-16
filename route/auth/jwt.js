var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Promise = require('promise');
var jwtSecretKey = "thisistokentest";
jwtUtil = function() {
	function createToken(keyword) {
		var token = jwt.sign(keyword, jwtSecretKey, {
          expiresIn: 30 // expires in 24 hours
        });
        return token;
	}

	function validateToken(req, res, next) {
		console.log(req.cookies);
		jwt.verify(req.cookies['api-token'], jwtSecretKey, function(err, decoded) {      
            if (err) {
              res.sendStatus(403);	    
            } else {
            	req.user = decoded;
             	next(); 
            }
        });
	}

	return {
		create: createToken,
		validate: validateToken
	}
};


module.exports = jwtUtil();