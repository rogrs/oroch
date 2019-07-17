
var express = require('express');
var router = express.Router();


Person = require('../models/person');

var conn = require('../config/connection');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    var options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
  
    Person.paginate({}, options).then(function (results) {
      res.status(200).json(results);
    });
  })

router.post('/', function (req, res) {
  Person.findOneAndUpdate({}, req.body , {upsert:true}, function(err, result){
    if (err) { 
      res.send(500, { error: err });
    }
    if (!result){
        res.send(404, { error: "not found" });
    }
     res.status(201).json(result);
  });
})


router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findById( req.params.id, function ( err, result ) {
      if (err) { 
      res.send(500, { error: err });
    }
      if (!result){
        res.send(404, { error: "not found" });
    }
      res.status(200).json(result);
    });
  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findById( req.params.id, function ( err, result ) {
    result.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      result.save( function ( err, result ){
        if (err) { 
      res.send(500, { error: err });
    }
        if (!result){
        res.send(404, { error: "not found" });
    }
        res.status(200).json(result);
      });
    });
  })

  router.post('/bulk', function (req, res) {
  return Person.bulk(req.body , function(err, result){
    if (err) {

      res.send(500, { error: err });
    }
    if (!result){
        res.send(404, { error: "not found" });
    }
    return res.status(201).json(result);
  });
})


module.exports = router;