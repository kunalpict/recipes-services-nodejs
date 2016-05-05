var Promise = require('promise');
var express = require('express');
var uuid = require('uuid');
var redisClient = require('../cache/redis-client');
var router = express.Router();
var mysqlConfig = require('../config/mysqlconfig');
/* GET home page. */
router.get('/init', function(req, res, next) {
  console.log(req.cookies.rememberme);
  console.log(uuid.v4());
  console.log(uuid.v1());
});

router.post('/recipe/new', function(req, res, next) {
  var id = uuid.v4();
  console.log(JSON.stringify(req.body.procedure));
    var connection = mysqlConfig.create(); 
      connection.connect();
      connection.query('INSERT INTO study.recipes (id,title,category,user,cook_time,date,description,image) values (?,?,?,?,?,?,?,?)',
        [id,req.body.title,req.body.category,req.body.user,req.body.cook_time,
        req.body.date,req.body.desc,req.body.image],
        function(err, results) 
      {
        if (err) throw err;
      });

      // connection.query('INSERT INTO study.ingredients (id, ingredient) values (?,?)',
      //   [id, JSON.stringify(req.body.ingredient)],
      //   function(err, results) 
      // {
      //   if (err) throw err;
      // });

/*      var sql = connection.query('INSERT INTO study.procedures (id, procedure) values (?,?)',
        [id, JSON.stringify(req.body.procedure)],
        function(err, results) 
      {
        if (err) throw err;
      });

      console.log(sql);
*/      connection.end();  
    

     res.sendStatus(200)
});

router.get('/recipe/:id', function(req, res, next) {
   /* redisClient.client.getAsync(req.params.id)
    .then(function(data) {
      if (data) {
        console.log(data);
        res.json(JSON.parse(data));
      } else 
      {*/ 
        var connection = mysqlConfig.create(); 
        connection.connect();
        connection.query('SELECT * FROM study.recipes where id = ?',
        [req.params.id],  
        function(err, rows, fields) {
          
          if (err) console.log(err);
         /* rows.forEach( function(element, index) {
            //element.ingredient = JSON.parse(element.ingredient);
            //element.procedure = JSON.parse(element.procedure);
          });*/
          res.json(rows);
          //redisClient.client.set(req.params.id, JSON.stringify(rows));
         // redisClient.client.expire(req.params.id, 30);
          connection.end();
        });
      /*}
     });*/
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
