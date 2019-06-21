var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
// Setup schema
var userSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
}).plugin(mongoosePaginate);
// Export User model
var User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}