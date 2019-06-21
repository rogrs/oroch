var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
// Setup schema
var contactSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    gender: String,
    phone: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
}).plugin(mongoosePaginate);
// Export Contact model
var Contact = module.exports = mongoose.model('Contact', contactSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}