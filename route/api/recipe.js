var Promise = require('promise');
var express = require('express');
var uuid = require('uuid');
var redisClient = require('../cache/redis-client');
var router = express.Router();
var mysqlConfig = require('../config/mysqlconfig');
var getRecipe = require('../recipe/getRecipe');
var createRecipe = require('../recipe/createRecipe');
var jwtUtil = require('../auth/jwt');
/* GET home page. */
router.get('/init', function(req, res, next) {
    console.log(req.cookies.rememberme);
    console.log(uuid.v4());
    console.log(uuid.v1());    
});

router.post('/recipe/new', jwtUtil.validate, function(req, res, next) {
    var id = uuid.v4();
    createRecipe(req, id, req.user)
        .then(function(resolve) {
            res.json({
              id:id
            });
            res.sendStatus(200)
        });
});

router.get('/recipe/:id', function(req, res, next) {
      getRecipe(req.params.id)
          .then(function(resolve) {
              var jsonResponse = {
                  info: resolve[0][0],
                  ingredients: resolve[1],
                  directions: resolve[2]
              }

              res.json(jsonResponse);
          })
});

router.get('/recipes', function(req, res, next) {
    var connection = mysqlConfig.create();
    connection.connect();
    connection.query('SELECT * FROM study.recipes', function(err, rows, fields) {
        if (err) console.log(err);
        res.cookie('name', 'tobi', { domain: 'localhost', path: '/api/init', secure: true });
        res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.json(rows);
    });

    connection.end();
});

module.exports = router;