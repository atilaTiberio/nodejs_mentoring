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

router.get('/', function(req, res, next) {
    pool.query("SELECT * from expenses")
      .then(function(rows){
        res.render("expenses",{data:rows,contextPath: req.originalUrl});
      }).catch(function(error){
        res.end(JSON.stringify(error));
  });
});

router.get('/create',function (req,res,next) {
    res.render("expense-create",{contextPath:req.originalUrl});
});

router.post('/create',function(req,res,next){
  pool.query("INSERT INTO expenses SET ? ",req.body)
    .then(function(result){
      console.log(result);
      res.redirect("/expenses");
    })
    .catch(function(error){
      console.log(req.body);
      res.end(JSON.stringify(error));
    });
});

router.get('/update/:id',function(req,res,next){
  pool.query("SELECT * from expenses WHERE id=?",req.params.id)
    .then(function(rows){
      res.render("expenses-update",{item:rows[0],contextPath:req.originalUrl});
    }).catch(function(error){
      res.end(JSON.stringify(error));
    });
});

router.post('/update/:id',function(req,res,next){
  pool.query("UPDATE expenses SET ? WHERE id="+req.params.id,req.body)
    .then(function(result){
      res.redirect("/expenses");
    }
    )
    .catch(function(error){
      res.end(JSON.stringify(error));
    });
});

router.get('/delete/:id',function(req,res,next){
  pool.query("DELETE FROM expenses WHERE id="+req.params.id)
    .then(function(rows){
      res.redirect("/expenses");
    })
    .catch(function(error){
      res.end(error);
    });
});

module.exports = router;
