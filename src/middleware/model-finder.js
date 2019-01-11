'use strict';

function modelFinder(req,res,next) {
  req.model = require(`../models/${req.params.model}.js`);
  next();
};

module.exports = modelFinder;

