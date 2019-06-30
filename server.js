const express  = require('express');
const cors = require('cors');

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

app.use('/api/v1/index', index);
app.use('/api/v1/behaviours', behaviour);
app.use('/api/v1/uploads', upload);
app.use('/api/v1/persons', person);
app.use('/api/v1/users', user);
app.use('/api/v1/contacts', contact);
app.use('/api/v1/jobs', job);
app.use('/api/v1/contributors', contributor);



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

app.listen(port, () => {
  console.log('Listening on port %s', port );
});

module.exports = app;