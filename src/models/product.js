'use strict';

const schema = require('./product-schema.js');
const dataModel = require('./dataModel.js');
  /**
   * A model for products
   * @extends dataModel
   */
class Product extends dataModel {}

module.exports = new Product(schema);
