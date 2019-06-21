
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
  var result = new Contact(req.body);
  result.id = result._id;

  result.save(function (err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(result);
    }
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


  router.delete('/:id', function (req, res) {
    Contact.findByIdAndRemove(req.params.id, (err, result) => {
        // As always, handle any potential errors:
        if (err) return res.status(400).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Contact successfully deleted",
            id: Contact._id
        };
        return res.status(200).send(response);
    });
  })


module.exports = router;