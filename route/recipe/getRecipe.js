var Promise = require('promise');
var redisClient = require('../cache/redis-client');
var mysqlConfig = require('../config/mysqlconfig');

var getRecipe = function(id) {
   var promise1 = new Promise(function(resolve, reject) {
        var connection = mysqlConfig.create();
        connection.connect();
        connection.query('SELECT * FROM study.recipes where id = ?', [id],
            function(err, rows, fields) {
                if (err) console.log(err);
                resolve(rows);
                connection.end();
            });
    });

    var promise2 = new Promise(function(resolve, reject) {
        var connection = mysqlConfig.create();
        connection.connect();
        connection.query('SELECT ingredient, qty FROM study.ingredients where id = ?', [id],
            function(err, rows, fields) {
                if (err) console.log(err);
                resolve(rows);
                connection.end();
            });
    });


    var promise3 = new Promise(function(resolve, reject) {
        var connection = mysqlConfig.create();
        connection.connect();
        connection.query('SELECT * FROM study.procedures where id = ? order by step;', [id],
            function(err, rows, fields) {
                if (err) console.log(err);
                resolve(rows);
                connection.end();
            });
    });


    return Promise.all([promise1, promise2, promise3]);
};

module.exports = getRecipe;
