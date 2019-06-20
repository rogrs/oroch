
var express = require('express');
var router = express.Router();


Behaviour = require('../models/behaviour');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Behaviour.find( function ( err, behaviours ){
      res.status(200).json(behaviours);
    });
  })

router.post('/', function (req, res) {
    var behaviour = new Behaviour( req.body );
    behaviour.id = behaviour._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    behaviour.save(function (err) {
      if(err) {res.status(404).json(err)}
      res.status(201).json(behaviour);
    });
  })



router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
      if(err) {res.status(404).json(err)}
      res.status(200).json(behaviour);
    });


  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
    behaviour.document = req.body.document;
    behaviour.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      behaviour.save( function ( err, behaviour ){
        if(err) {res.status(404).json(err)}
        res.status(200).json(behaviour);
      });
    });
  })


module.exports = router;