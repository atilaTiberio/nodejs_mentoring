var dbConfig = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'hiturbe',
        password: 'Garcia@1',
        database:'nodejs_ccolorado',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);
