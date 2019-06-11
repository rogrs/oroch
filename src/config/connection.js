'use strict';

const mongoose = require('mongoose');

var uri =  process.env.MONGODB_URI  || 'mongodb://localhost:27017/test'
mongoose.connect(uri, {useNewUrlParser: true});