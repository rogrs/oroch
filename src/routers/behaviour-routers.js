
var express = require('express');
var router = express.Router();


Behaviour = require('../models/behaviour');

var conn = require('../config/connection');



router.get('/', function (req, res) {
    
    res.json(200, {message: 'OK' });
  })
 

router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Behaviour.find( function ( err, behaviours ){
      res.json(200, behaviours);
    });
  })

router.post('/', function (req, res) {
    var behaviour = new Behaviour( req.body );
    behaviour.id = behaviour._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    behaviour.save(function (err) {
      res.json(201, behaviour);
    });
  })



router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
      res.json(200, behaviour);
    });
  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
    behaviour.document = req.body.document;
    behaviour.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      behaviour.save( function ( err, behaviour ){
        res.json(200, behaviour);
      });
    });
  })


module.exports = router;