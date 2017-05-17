var express = require('express');
var bookshelf = require('./../libs/model_config')
var router = express.Router();
bookshelf.plugin('pagination')
var posts= bookshelf.Model.extend({
	tableName:"posts"
});

/* GET users listing. */
router.get('/create', function(req, res, next) {
	res.render('posts_form', { title: 'Create a post' });
});
router.get('/:page?', function(req, res, next) {
	var page = (req.params.page >= 1)? req.params.page : 1;
	new posts().fetchPage({
		pageSize : 10000,
		page: page
	}).then(function(results){
		res.render('posts', { title:'someTitle',posts:results.toJSON()});
	})

});
router.post('/create', function(req, res, next) {
	new posts()
		.save(req.body)
		.then(function(result){
			res.redirect("/posts");
		})
		.catch(function(error){
			res.end(error.message);
		});
});

router.get("/delete/:id",function(req,res,next){
	new posts({id: req.params.id})
	.destroy()
	.then(function(model){
		res.redirect("/posts");
	})
	.catch(function(error){
		res.end(error.message);
	});
})
router.get("/edit/:id",function(req,res,next){
	new posts().where({id: req.params.id}).fetch().then(function(post){
		res.render('posts_form', { title: 'Edit posts', post:post.toJSON() });
	})

})
router.post("/edit/:id",function(req,res,next){
	new posts({id: req.params.id})
		.save(req.body,{patch:true})
		.then(function(result){
			res.redirect("/posts");
		}).catch(function(error) {
			res.end(error.message);
		})
})
module.exports = router;
