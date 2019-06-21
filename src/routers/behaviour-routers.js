
var express = require('express');
var router = express.Router();


Behaviour = require('../models/behaviour');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find


    var options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
  
    Behaviour.paginate({}, options).then(function (results) {
      res.status(200).json(results);
    });
  })

router.post('/', function (req, res) {
  Behaviour.findOneAndUpdate({}, req.body , {upsert:true}, function(err, result){
    if (err) return res.send(400, { error: err });
    return res.status(201).json(result);
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