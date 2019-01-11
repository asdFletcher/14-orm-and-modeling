'use strict';

const category = require('./category-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const product = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  color: {type: String, required: true},
  price: {type: String, required: true},
  brand: {type: String, required: true},
});

module.exports = mongoose.model('product', product);
