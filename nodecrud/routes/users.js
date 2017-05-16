var express = require('express');
var router = express.Router();

var User = require('../models/users');

router.get('/add', function(req, res, next) {
    res.render('users/add', {contextPath:req.originalUrl});
});

router.post("/add", function (req, res, next) {
    new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).save()
        .then(function (result) {
            res.redirect("/");
        })
        .catch(function (error) {
            res.end(error.message);
        });
});

router.get("/update/:id",function(req,res,next){

    User.where({id:req.params.id}).fetch()
        .then(function(user){
            res.render("users/update",{item:user.toJSON(),contextPath:""})

        })
        .catch(function(error){
            res.end(error.message);
        });
});

router.post("/update/:id",function(req,res,next){
    req.body.id=req.params.id;

    new User()
        .save(req.body,{patch:true})
        .then(function(result){
            res.redirect("/");

        }).catch(function(error){
        res.end(error.message);
    });

});

router.get("/delete/:id",function(req,res,next){
    new User({id: req.params.id})
        .destroy()
        .then(function(model){
            res.redirect("/");
        })
        .catch(function(error){
            res.end(error.message);
        });

});

module.exports = router;
