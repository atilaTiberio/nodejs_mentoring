var dbConfig = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'thehives',
        database:'nodementoring',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);
bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;