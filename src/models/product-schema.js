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

product.pre('save', function() {
  try {
    let newPrice = parseInt(this.price) + 0.99;
    this.price = newPrice;
  } catch (err) {
    console.log('save error', err);
  };
});

module.exports = mongoose.model('product', product);
