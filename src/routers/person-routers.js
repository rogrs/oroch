
var express = require('express');
var router = express.Router();


Person = require('../models/person');

var conn = require('../config/connection');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Person.find( function ( err, persons ){
      res.status(200).json(persons);
    });
  })

router.post('/', function (req, res) {
    var person = new Person(req.body );
    person.id = person._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    person.save(function (err) {
      res.status(201).json(person);
    });
  })



router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findById( req.params.id, function ( err, person ) {
      res.status(200).json(person);
    });
  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Person.findById( req.params.id, function ( err, person ) {
    person.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      person.save( function ( err, person ){
        res.status(200).json(person);
      });
    });
  })


module.exports = router;