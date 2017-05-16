var express = require('express');
var router = express.Router();

let User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.fetchAll()
      .then(function(users){
        res.render('index', {data:users.toJSON(),contextPath:""});
      })
      .catch(function(error){
          res.end(error.message);
      });
});

module.exports = router;
