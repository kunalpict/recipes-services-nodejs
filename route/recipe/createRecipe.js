var Promise = require('promise');
var redisClient = require('../cache/redis-client');
var mysqlConfig = require('../config/mysqlconfig');

var createRecipe = function(req, id, user) {
    var promise1 = new Promise(function(resolve, reject) {
        var connection = mysqlConfig.create();
        connection.connect();
        connection.query('INSERT INTO study.recipes (id,title,category,user,cook_time,date,description,image) values (?,?,?,?,?,?,?,?)', [id, req.body.info.title, req.body.info.category, user, req.body.info.cook_time,
                new Date().toISOString(), req.body.info.desc, req.body.info.image
            ],
            function(err, results) {
                if (err) throw err;
                resolve(results);
            });
        connection.end();
    });

    var promise2 = new Promise(function(resolve, reject) {
        var ingredients = [];
        for (var i = 0; i < req.body.ingredients.length; i++) {
            var row = [];
            row.push(id);
            row.push(req.body.ingredients[i].ingredient);
            row.push(req.body.ingredients[i].qty);
            ingredients.push(row);
        }
        var connection = mysqlConfig.create();
        connection.connect();
        connection.query('INSERT INTO study.ingredients (id, ingredient, qty) values ?', [ingredients],
            function(err, results) {
                if (err) throw err;
                resolve(results);
            });
        connection.end();
    });


    var promise3 = new Promise(function(resolve, reject) {
        var directions = [];
        for (var i = 0; i < req.body.directions.length; i++) {
            var row = [];
            row.push(id);
            row.push(req.body.directions[i].direction);
            row.push(i);
            directions.push(row);
        }

        var connection = mysqlConfig.create();
        connection.connect();
        var query = connection.query('INSERT INTO study.procedures (id, direction, step) values ?', [directions],
            function(err, results) {
                if (err) console.log(err);
                resolve(results);
            });
        connection.end();
    });

    return Promise.all([promise1, promise2, promise3]);
};

module.exports = createRecipe;
