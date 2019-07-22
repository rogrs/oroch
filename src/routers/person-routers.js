
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
  Person.findOne({person_id: req.body.person_id}, function (err, result) {
    if (!err) {
      if (!result) {
        result = new Person(req.body);
        result.id = result._id;
      }

      result.save(function (err) {
        if (err) {
          res.status(500).json(err);
        }
        res.status(201).json(result);
      });
    }
  });
})


router.get('/:id', function (req, res) {
   Person.findOne({ person_id: req.params.id}, function (err, result) {
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
    Person.findOneAndUpdate( req.params.id,req.body, function ( err, result ) {
      // http://mongoosejs.com/docs/api.html#model_Model-save
      
        if (err) { 
           res.send(500, { error: err });
        }
        if (!result){
           res.send(404, { error: "not found" });
        }
        res.status(200).json(result);
    
    });
  })

router.delete('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findOneAndRemove( req.params.id, function ( err, result ) {
      // http://mongoosejs.com/docs/api.html#model_Model-save
      
        if (err) { 
           res.send(500, { error: err });
        }
        if (!result){
           res.send(404, { error: "not found" });
        }
        res.status(200).json("deleted");
    
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