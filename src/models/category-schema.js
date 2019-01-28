'use strict';

const product = require('./product-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const category = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  seasonal: {type: Boolean, required: true},
  store: {type: String, required: false},
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

category.virtual('products', {
  ref: 'product',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

category.pre('find', function() {
  try {
    this.populate('products');
  } catch(err){console.error('find error', err);}
});

category.pre('save', function() {
  try {
    this.store = `Fletcher's store`;
  } catch (err) {
    console.error('save error: ', err);
  }
});



module.exports = mongoose.model('category', category);
