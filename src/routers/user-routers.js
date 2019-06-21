
var express = require('express');
var router = express.Router();


User = require('../models/user');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find


    var options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
  
    User .paginate({}, options).then(function (results) {
      res.status(200).json(results);
    });
  })

router.post('/', function (req, res) {
    
  User.findOneAndUpdate({}, req.body , {upsert:true}, function(err, result){
      if (err) return res.send(400, { error: err });
      return res.status(201).json(result);
    });
})



router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, result ) {
      if(err) {res.status(400).json(err)}
      res.status(200).json(result);
    });


  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, result ) {
      
      result.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      result.save( function ( err, result ){
        if(err) {res.status(400).json(err)}
        res.status(200).json(result);
      });
    });
  })


module.exports = router;