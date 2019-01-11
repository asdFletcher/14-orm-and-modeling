'use strict';

const schema = require('./category-schema.js');
const dataModel = require('./dataModel.js');

class Category extends dataModel {}

module.exports = new Category(schema);
