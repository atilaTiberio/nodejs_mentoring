'use strict';

var Bookshelf = require('../config/dbconfig');

var User = Bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true

});

module.exports = User;
