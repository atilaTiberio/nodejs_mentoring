var express = require('express');
var router = express.Router();
var mysql= require("mysql");


var pool=mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'hiturbe',
    password: 'Garcia@1',
    database:'legacydb'
});


/* GET home page. */
router.get('/', function(req, res, next) {

    /*
    connection.query({
      query: 'myquery',
      values:'misvalues
    }, function(err,rows,fields){});
     */

    pool.getConnection(function(err,connection) {
              if(err) {
                  throw err;
      }

          connection.query("SELECT * FROM userentity ", function (err, rows, fields) {
              var dataInfo = [];
              if (err) {
                  throw err;
              }
              else {

                  rows.forEach(function (item) {
                      dataInfo.push({nombre: item.username, apellido: item.password});
                  });

                  res.render('index', {title: 'Express', datos: dataInfo});
              }
          });

          connection.release();

    });
});

router.post('/listaUsuarios',function(req,res,next){

// pool.escape('')

});
Q
router.post('/alta',function(req,res,next){

  console.log(req.body);
  pool.getConnection(function(err,connection){

      if(err)
        throw err;

      connection.query("INSERT INTO userentity SET ?",req.body,function(error,results,fields){
        if(error)
          throw error;
        console.log(results.affectedRows);



      });
      res.end("<a href='/' >Inicio</a>");
  });


});

module.exports = router;
