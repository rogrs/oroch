'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var behaviourSchema  = new Schema({
      document : Object,
      updatedAt: { type: Date, default: Date.now },
      createdAt: { type: Date, default: Date.now }

})

var Behaviour = mongoose.model('Behaviour', behaviourSchema);

module.exports = Behaviour;
