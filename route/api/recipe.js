var Promise = require('promise');
var express = require('express');
var uuid = require('uuid');
var redisClient = require('../cache/redis-client');
var router = express.Router();
var mysqlConfig = require('../config/mysqlconfig');
var getRecipe = require('../recipe/getRecipe');
var createRecipe = require('../recipe/createRecipe');
var validator = require('../recipe/validateRecipeModel');
var jwtUtil = require('../auth/jwt');

router.post('/recipe/', jwtUtil.validate, validator, function(req, res, next) {
    var id = uuid.v4();
    createRecipe(req, id, req.user)
        .then(function(resolve) {
            res.json({
                id: id
            });
            res.sendStatus(200);
        });
});

router.get('/recipe/:id', function(req, res, next) {
    getRecipe(req.params.id)
        .then(function(resolve) {
            var jsonResponse = {
                info: resolve[0][0],
                ingredients: resolve[1],
                directions: resolve[2]
            };

            res.json(jsonResponse);
        })
});


router.put('/recipe/:id', jwtUtil.validate, validator, function(req, res, next) {});

router.get('/recipes', function(req, res, next) {
    var connection = mysqlConfig.create();
    connection.connect();
    connection.query('SELECT * FROM study.recipes', function(err, rows, fields) {
        if (err) console.log(err);
        res.json(rows);
    });

    connection.end();
});

module.exports = router;