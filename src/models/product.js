'use strict';

const schema = require('./product-schema.js');
const dataModel = require('./dataModel.js');

class Product extends dataModel {}

module.exports = new Product(schema);
