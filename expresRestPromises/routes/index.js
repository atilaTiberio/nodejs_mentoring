var express = require('express');
var router = express.Router();
var bookshelf = require('../bookshelf/bookshelf');

var User= bookshelf.Model.extend({
    tableName:"users"
});



router.get("/",function(req,res,next){

  new User().fetchAll()
      .then(function(users){
        res.render("usuarios",{data:users.toJSON(),contextPath:""});
      })
      .catch(function(error){
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

router.get("/actualizar/:id",function(req,res,next){

    new User().where({id:req.params.id}).fetch()
        .then(function(user){
          res.render("actualiza",{item:user.toJSON(),contextPath:""})

        })
        .catch(function(error){
          res.end(error.message);
        });
});

router.post("/actualizar/:id",function(req,res,next){
    req.body.id=req.params.id;

    new User()
        .save(req.body,{patch:true})
        .then(function(result){
          res.redirect("/");

        }).catch(function(error){
          res.end(error.message);
    });

});

router.get("/alta",function(req,res,next){

    res.render("alta",{contextPath:""});

});

router.post("/alta",function(req,res,next){
    new User()
        .save(req.body)
        .then(function(result){
          res.redirect("/");
        })
        .catch(function(error){
            res.end(error.message);
        });


});
module.exports = router;
