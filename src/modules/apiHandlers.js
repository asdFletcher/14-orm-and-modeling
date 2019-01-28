'use strict';


function handleGetAll(req,res,next) {
  req.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(req,res,next) {
  req.model.get(req.params.id)
    .then( result => res.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(req,res,next) {
  req.model.post(req.body)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

function handlePut(req,res,next) {
  req.model.put(req.params.id, req.body)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

function handleDelete(req,res,next) {
  req.model.delete(req.params.id)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

module.exports = {
  handleGetAll,
  handleGetOne,
  handlePost,
  handlePut,
  handleDelete,
};
