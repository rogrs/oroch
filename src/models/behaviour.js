let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');

let  behaviourSchema  = new mongoose.Schema({
      name :{type: String, required: true},
      type: {type: String, unique: true, required: true, lowercase: true},
      dateField: {type: String, required: true},
      structure: {type: Object, required: true},
      valid: Boolean,
      actions: {type: Object, required: true},
      updatedAt: { type: Date, default: Date.now },
      createdAt: { type: Date, default: Date.now }

}).plugin(mongoosePaginate);

var Behaviour = module.exports = mongoose.model('Behaviour', behaviourSchema);

module.exports.get = function (callback, limit) {
      Behaviour.find(callback).limit(limit);
}