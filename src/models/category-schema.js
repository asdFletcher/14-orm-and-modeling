'use strict';

const product = require('./product-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const category = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  seasonal: {type: Boolean, required: true},
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
  } catch(err){console.log('find error', e);}
});


module.exports = mongoose.model('category', category);
