'use strict';

const schema = require('./category-schema.js');
const dataModel = require('./dataModel.js');
  /**
   * A model for categories
   * @extends dataModel
   */
class Category extends dataModel {}

module.exports = new Category(schema);
