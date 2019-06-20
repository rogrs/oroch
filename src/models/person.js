let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const personSchema = Schema({
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}).plugin(mongoosePaginate);



var Person = mongoose.model('Person', personSchema);

module.exports = Person;