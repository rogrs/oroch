var express = require('express');
var router = express.Router();

Person = require('../models/person');

router.get('/', function (req, res) {
  // http://mongoosejs.com/docs/api.html#query_Query-find
  var options = {
    page: req.query.page || 1,
    limit: req.query.limit || 10
  };

  Person.paginate({}, options).then(function (results) {
    res.json(results);
  });
})

router.post('/', function (req, res) {
  Person.findOne({ person_id: req.body.person_id }, function (err, result) {
    if (!err) {
      if (!result) {
        result = new Person(req.body);
        result.id = result._id;
      }
      result.save(function (err, result) {

        if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
        }
        if (!result) {
          res.status(404).json({ message: "Not found" });
          res.end();
          return;
        }

        return res.status(201).json(result);

      });
    }
  });
});

router.get('/:id', function (req, res) {

  Person.findOne({ person_id: req.params.id }, function (err, result) {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    if (!result) {
      res.status(404).json({ message: "Not found" });
      res.end();
      return;
    }

    return res.json(result);

  });
})

router.put('/:id', function (req, res) {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  Person.findOneAndUpdate({ person_id: req.params.id }, req.body, { new: true }, function (err, result) {
    // http://mongoosejs.com/docs/api.html#model_Model-save

    result.save(function (err, result) {

      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      if (!result) {
        res.status(404).json({ message: "Not found" });
        res.end();
        return;
      }

      return res.json(result);

    });

  });
})

router.delete('/:id', function (req, res) {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  Person.findOneAndRemove(req.params.id, function (err, result) {
    // http://mongoosejs.com/docs/api.html#model_Model-save

    if (err) {
      res.send(500, { error: err });
    }
    if (!result) {
      res.send(404, { error: "not found" });
    }
    res.json("deleted");

  });
})

router.post('/bulk', function (req, res) {
   Person.bulk(req.body, function (err, result) {
    if (err) {

      res.send(500, { error: err });
    }
    if (!result) {
      res.send(404, { error: "not found" });
    }
    return res.status(201).json(result);
  });
})


module.exports = router;