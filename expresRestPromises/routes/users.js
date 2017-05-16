var express = require('express');
var router = express.Router();
var mysql = require("promise-mysql");

var pool=mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'hiturbe',
    password: 'Garcia@1',
    database:'nodejs_ccolorado'
});

/* GET users listing. */
router.get('/', function(req, res, next) {

    pool.query("SELECT * from users")
      .then(function(rows){

        res.render("usuarios",{data:rows,contextPath: req.originalUrl});

      }).catch(function(error){
        res.end(JSON.stringify(error));
  });




});
router.get('/alta',function (req,res,next) {

    res.render("alta",{contextPath:req.originalUrl});

});

router.post('/alta',function(req,res,next){

    pool.query("INSERT INTO users SET ? ",req.body)
        .then(function(result){
            console.log(result);
            res.redirect("/users");
    })
        .catch(function(error){
            res.end(JSON.stringify(error));
    });




});

router.get('/delete/:id',function(req,res,next){

    pool.query("DELETE FROM users WHERE id="+req.params.id)
        .then(function(rows){
            res.redirect("/users");
        })
        .catch(function(error){
            res.end(error);
        });

});

router.get('/actualizar/:id',function(req,res,next){

    pool.query("SELECT * from users WHERE id=?",req.params.id)
        .then(function(rows){
                res.render("actualiza",{item:rows[0],contextPath:req.originalUrl});

        }).catch(function(error){
        res.end(JSON.stringify(error));
    });

});

router.post('/actualizar/:id',function(req,res,next){

    pool.query("UPDATE users SET ? WHERE id="+req.params.id,req.body)
        .then(function(result){
                res.redirect("/users");
            }
        )
        .catch(function(error){
            res.end(JSON.stringify(error));
        });
});
module.exports = router;
