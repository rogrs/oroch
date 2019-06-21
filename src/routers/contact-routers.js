
var express = require('express');
var router = express.Router();


Contact = require('../models/contact');



router.get('/', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find


    var options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
  
    Contact .paginate({}, options).then(function (results) {
      res.status(200).json(results);
    });
  })

router.post('/', function (req, res) {
    
    Contact.findOneAndUpdate({}, req.body , {upsert:true}, function(err, result){
      if (err) return res.send(400, { error: err });
      return res.status(201).json(result);
    });
})



router.get('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Contact.findById( req.params.id, function ( err, contact ) {
      if(err) {res.status(400).json(err)}
      res.status(200).json(contact);
    });


  })

router.put('/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Contact.findById( req.params.id, function ( err, contact ) {
      
      contact.updatedAt = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      contact.save( function ( err, contact ){
        if(err) {res.status(400).json(err)}
        res.status(200).json(contact);
      });
    });
  })


module.exports = router;