let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const personSchema = Schema({
  person_id: {type: String, unique: true, required: true},
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  updatedAt: { type: Date, required: true, default: Date.now },
  createdAt: { type: Date,required: true, default: Date.now }
}).plugin(mongoosePaginate);


function filterByID(obj) {
  if ('id' in obj && typeof(obj.id)) {
    return true;
  } 
}


var Person = mongoose.model('Person', personSchema);

module.exports = Person;


function log(data) {
    console.log(JSON.stringify(data, undefined, 2))
  }


  
module.exports.bulk = (async function (cursor) {
  let dtSync = new Date();
  try {
    let countDocs = 0;
    let count = 0;
    let bulk = Person.collection.initializeUnorderedBulkOp();

    for await (const person of cursor) {
     
      bulk.find({ person_id: person.person_id }).upsert().updateOne(person);
      countDocs++;
      count++;

      if (countDocs % 1000 == 0) {

        console.info("CountDocs for update bulk", countDocs)
        countDocs = 0;
        bulk.execute(function (err) {
          if (err) {
            console.error(err);
          }
          bulk = Person.collection.initializeUnorderedBulkOp();
        });
      }

    }

    if (count > 0) {
      let results = await bulk.execute();

      return {
        dtSync: dtSync,
        success: results,
        errors: []
      }
    } else {
      return {
        dtSync: dtSync,
        success: 0,
        errors: []
      }
    }


  } catch (e) {
    console.error(e);
    return {
      dtSync: null,
      success: null,
      errors: { id: -10000, stackTrace: e, type: 'error' }
    }
  }
});

exports.listPersons = function(Person) {
  return function(req, res) {
    Person.find({}, function(error, persons) {
      res.render('list_persons', { person_id : person_id });
    });
  }
};
