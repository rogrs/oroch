
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

var db = mongoose.connection;
var uri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(uri, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected successful!");
});
