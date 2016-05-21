var express = require('express');
var multer = require('multer');
var upload = multer({
    dest: './upload/'
});
var router = express.Router();
var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');

module.exports = router;