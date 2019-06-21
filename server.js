const express  = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const port =process.env.PORT || 3000;

var index = require('./src/routers/index-routers');
var behaviour = require('./src/routers/behaviour-routers');
var upload = require('./src/routers/upload-routers');
var person = require('./src/routers/person-routers');
var user = require('./src/routers/user-routers');
var contact = require('./src/routers/contact-routers');


const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('ci with travis');
});

app.use('/api/v1/index', index);
app.use('/api/v1/behaviour', behaviour);
app.use('/api/v1/upload', upload);
app.use('/api/v1/person', person);
app.use('/api/v1/user', user);
app.use('/api/v1/contact', contact);



app.use(express.static(__dirname + '/'));

app.listen(port, () => {
  console.log('Listening on port %s', port );
});

module.exports = app;