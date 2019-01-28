'use strict';
/**
 * Finds specific models based on route
 * @module modelFinder 
 * @param req {object} Express Request Object (required params: model)
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */

function modelFinder(req,res,next) {
  req.model = require(`../models/${req.params.model}.js`);
  next();
};

module.exports = modelFinder;

