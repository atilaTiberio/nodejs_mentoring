var bookshelf = require('./../libs/model_config')
var logs= bookshelf.Model.extend({
	tableName: "logs"
});
module.exports = function(req,res,next){
	console.log(req.url)
	new logs()
		.save({visitedUrl:req.url})
		.then(function(){
			next()
		})
		.catch(function(err){
			console.error("ERROR: url visit could not be saved")
		})
}