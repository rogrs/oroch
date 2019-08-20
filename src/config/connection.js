'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
 
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
    { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  ).catch(error => handleError(error));
 
  //useCreateIndex: true,
      //useFindAndModify: false
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});
 
module.exports = db;
