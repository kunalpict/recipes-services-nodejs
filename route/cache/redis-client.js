var redis = require('redis');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//create redis client
var redisClient = function(){
	var client = redis.createClient({
  		host: 'ec2-54-175-94-107.compute-1.amazonaws.com'
	});

	client.on("error", function (err) {
   	 	console.log("Error " + err);
	});

	return {
		client : client
	};
};

module.exports = redisClient();

