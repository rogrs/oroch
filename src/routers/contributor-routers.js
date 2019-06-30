
var express = require('express');
var router = express.Router();


Contributor = require('../models/contributor');



router.get('/', function (req, res) {
   
    var options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
  
    Contributor.paginate({}, options).then(function (results) {
      res.status(200).json(results);
    });
  })

router.post('/', function (req, res) {
  Contributor.findOne({ pis: req.body.pis}, function (err, result) {
    if (!err) {
      if (!result) {
        result = new Contributor(req.body);
        result.id = result._id;
      }

      result.save(function (err) {
        if (err) {
          res.status(400).json(err);
        }
        res.status(201).json(result);
      });
    }
  });
})



router.get('/:id', function (req, res) {
    Contributor.findById( req.params.id, function ( err, result ) {
      if(err) {res.status(400).json(err)}
      res.status(200).json(result);
    });


  })

router.put('/:id', function (req, res) {
  Contributor.findById( req.params.id, function ( err, result ) {
      
      result.updated = Date.now;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      result.save( function ( err, result ){
        if(err) {res.status(400).json(err)}
        res.status(200).json(result);
      });
    });
  })


  router.delete('/:id', function (req, res) {
    Contributor.findByIdAndRemove(req.params.id, (err, result) => {
        // As always, handle any potential errors:
        if (err) return res.status(400).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Contributor successfully deleted",
            id: Job._id
        };
        return res.status(200).send(response);
    });
  })


module.exports = router;