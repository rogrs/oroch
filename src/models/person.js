let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const personSchema = Schema({
  person_id: {type: String, unique: true, required: true},
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}).plugin(mongoosePaginate);



var Person = mongoose.model('Person', personSchema);

module.exports = Person;


function log(data) {
    console.log(JSON.stringify(data, undefined, 2))
  }
module.exports.bulk = (async function (docs) {
  try {

    let results = await new Promise((resolve, reject) => {
      Person.collection.insertMany(docs, { ordered: false }, (err,result) => {
            if (err) {
              reject(err)
            };    // Because the errors are here as well
            resolve(result);
          }
        )
    });
console.log(results);
  } catch (e) {
      console.dir(e);
      console.log(e);
      console.log(JSON.stringify(e.writeErrors,undefined,2));
  }
});

