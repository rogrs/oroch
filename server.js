const express  = require('express');
const cors = require('cors');
const conn = require('./src/config/connection');
const bodyParser = require('body-parser');

const port =process.env.PORT || 3333;

var index = require('./src/routers/index-routers');
var behaviour = require('./src/routers/behaviour-routers');
var upload = require('./src/routers/upload-routers');
var person = require('./src/routers/person-routers');
var user = require('./src/routers/user-routers');
var contact = require('./src/routers/contact-routers');
var job = require('./src/routers/job-routers');
var contributor = require('./src/routers/contributor-routers');

const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Ensure JSON acceptance
 */
app.use((req, res, next) => {
  let err

  if (!req.accepts('json')) {
    err = new Error('Not Acceptable')
    err.status = 406
  }

  return next(err)
})


app.get('/', (req, res) => {
  res.send('Its work');
});

app.post('/upload', function(req, res) {
  console.log("okkkk>>>"+req.files.foo); // the uploaded file object
});

app.use('/api/v1/web/index', index);
app.use('/api/v1/web/behaviours', behaviour);
app.use('/api/v1/web/uploads', upload);
app.use('/api/v1/web/persons', person);
app.use('/api/v1/web/users', user);
app.use('/api/v1/web/contacts', contact);
app.use('/api/v1/web/jobs', job);
app.use('/api/v1/web/contributors', contributor);



app.use(express.static(__dirname + '/'));


/**
 * ErrorHandler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      message: err.message,
      stack: err.stack
    })
})


  var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://%s:%s", host, port);
});

module.exports = app;