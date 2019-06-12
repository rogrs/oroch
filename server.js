const express  = require('express');

const bodyParser = require('body-parser');

const port =process.env.PORT || 4200;

var index = require('./src/routers/index-routers.js');
var behaviour = require('./src/routers/behaviour-routers.js');
//var user = require('./src/routers/user-routers.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', index);
app.use('/api/v1/behaviour', behaviour);
//app.use('/api/v1/user', user);

app.use(express.static(__dirname + '/'));

app.listen(port, () => {
  console.log('Listening on port %s', port );
});