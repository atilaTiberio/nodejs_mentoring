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

    pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        }

        connection.query("SELECT * FROM userentity ",function (err, rows, fields) {
            var dataInfo = [];
            if (err) {
                throw err;
            }
            else {
                rows.forEach(function (item) {
                    dataInfo.push({id:item.id,nombre: item.username, apellido: item.password});
                });
                console.log("cambiando");
                res.render('usuarios', {title: 'Lista de usuarios', datos: dataInfo});
            }
        });

        connection.release();

    });
});

router.get('/registrar',function(req,res,next){
    res.render('alta');

});

router.post('/alta',function(req,res,next) {
    pool.getConnection(function (err, connection) {

        if (err)
            throw err;

        connection.query("INSERT INTO userentity SET ?", req.body, function (error, results, fields) {
            if (error)
                throw error;
            console.log(results.affectedRows);

            res.redirect('/usuarios');

        });

    });
});

router.get('/actualizar/:id',function(req,res,next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        connection.query("SELECT * FROM userentity where id=?",req.params.id, function (err, rows, fields) {
            var dataInfo = [];
            if (err) {
                throw err;
            }
            console.log(rows);
            res.render('actualizar', {fila: rows[0]})
        })
    })

})

router.post('/actualizar/:id',function(req,res,next) {
    pool.getConnection(function (err, connection) {

        if (err)
            throw err;

        connection.query("UPDATE userentity SET ? WHERE ID =" + req.params.id, req.body, function (error, results, fields) {
            if (error)
                throw error;
            console.log(results.affectedRows);

            res.redirect('/usuarios');

        });

    });
});

router.get('/borrar/:id',function(req,res,next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        connection.query("DELETE FROM userentity where id=?",req.params.id, function (err, rows, fields) {
            var dataInfo = [];
            if (err) {
                throw err;
            }
            console.log(rows);
            res.redirect('/usuarios');
        })
    })

})

module.exports = router;
