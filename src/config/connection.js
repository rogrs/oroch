'use strict';

const mongoose = require('mongoose');

var uri =  process.env.MONGODB_URI  || 'mongodb+srv://oroch:oroch2019@cluster0-y43qc.mongodb.net/orochDB?retryWrites=true&w=majority';
//'mongodb://localhost:27017/test'
mongoose.connect(uri, {useNewUrlParser: true});
