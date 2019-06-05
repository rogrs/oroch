var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
      id: mongoose.Schema.Types.ObjectId,
      document : Object
    }),

    Behaviour = mongoose.model('Behaviour', Schema);

 
 var databaseString =  process.env.MONGOLAB_URI  || 'mongodb+srv://oroch:oroch2019@cluster0-y43qc.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(databaseString, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get('/', function (req, res) {
    res.json(200, {msg: 'OK' });
  })
  .get('/api', function (req, res) {
    res.json(200, {msg: 'API OK' });
  })

  .get('/api/v1/behaviour', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Behaviour.find( function ( err, behaviours ){
      res.json(200, behaviours);
    });
  })

  .post('/api/v1/behaviour', function (req, res) {
    var behaviour = new Behaviour( req.body );
    behaviour.id = behaviour._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    behaviour.save(function (err) {
      res.json(200, behaviour);
    });
  })

  .del('/api/v1/behaviour', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    Behaviour.remove({ completed: true }, function ( err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/api/v1/behaviour/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
      res.json(200, behaviour);
    });
  })

  .put('/api/v1/behaviour/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
    behaviour.document = req.body.document;
     
      // http://mongoosejs.com/docs/api.html#model_Model-save
      behaviour.save( function ( err, behaviour ){
        res.json(200, behaviour);
      });
    });
  })

  .del('/api/v1/behaviour/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Behaviour.findById( req.params.id, function ( err, behaviour ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      behaviour.remove( function ( err, behaviour ){
        res.json(200, {msg: 'OK'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);