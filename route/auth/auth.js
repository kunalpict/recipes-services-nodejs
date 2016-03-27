var Promise = require('promise');
var mysqlConfig = require('../config/mysqlconfig');

var auth = function() {

	function create(user){
		var promise = new Promise(function(resolve, reject){
			var connection = mysqlConfig.create(); 
    		connection.connect();
    		connection.query('INSERT INTO `study`.`user` SET ?',
    			user,
    			function(err, results) 
    		{
    			if (err) reject(err);
   				resolve(results);      		
    		});
 
    		connection.end();  
		});

		return promise;
	}

	function check(username){
		var promise = new Promise(function(resolve, reject){
			var connection = mysqlConfig.create(); 
    		connection.connect();
    		connection.query('SELECT * FROM study.user where userId = ?',
    			[username],
    			function(err, results) {
    			console.log(err);
    			if (err) reject(err);

   				resolve(results);      		
    		});
 			connection.end();  
		});

		return promise;
	}

	function login(username, password){
		var promise = new Promise(function(resolve, reject){
			var connection = mysqlConfig.create(); 
    		connection.connect();
    		connection.query('SELECT * FROM study.user where userId = ? and pwd = ?',
    			[username, password],
    			function(err, results) 
    		{
    			if (err) reject(err);
   				resolve(results);      		
    		});
 
    		connection.end();  
		});

		return promise;
	}

	function logout(username){
		
	}
	function deleteUser(username){
		
	}

	return {
		create: create,
		check: check,
		login: login,
		logout: logout,
		deleteUser: deleteUser
	};
};

module.exports = auth();
