let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
let Schema = mongoose.Schema;


const recordSchema = mongoose.Schema({
    pis: {type: String,unique: true,required: true},
   // contributor :{ type: Schema.Types.ObjectId, ref: 'Contributor' },
    name: {type: String,required: true},
    date: { type: Date,required: true},
    clocking: { type: Date,required: true},
    company: String,
    system: {
      updated: {
          type: Date,
          default: Date.now
      },
      created: {
          type: Date,
          default: Date.now
      }
  }
  }).plugin(mongoosePaginate);
  
  const Record = mongoose.model('Record', recordSchema);
