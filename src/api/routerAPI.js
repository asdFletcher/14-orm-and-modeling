'use strict';

const express = require('express');

const modelFinder = require('../middleware/model-finder.js');
const router = express.Router();

const apiHandlers = require('./../modules/apiHandlers');

const handleGetAll = apiHandlers.handleGetAll;
const handleGetOne = apiHandlers.handleGetOne;
const handlePost = apiHandlers.handlePost;
const handlePut = apiHandlers.handlePut;
const handleDelete = apiHandlers.handleDelete;


router.param('model', modelFinder);


// ROUTES
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);


module.exports = router;
