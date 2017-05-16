'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('books', {
        id: { type: 'int', primaryKey: true },
        name: 'string',
        description: 'string',
        edition: 'int',
        pages: 'int',
        genre: 'string'
    });
};

exports.down = function(db) {
    return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
