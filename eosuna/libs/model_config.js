var dbConfig = {
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: '123',
		database:'blog',
		charset: 'utf8'
	}
};

var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);
