let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');



const contributorSchema = mongoose.Schema({
    pis: {type: String,unique: true,required: true},
    name: {type: String,required: true},
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
  
  const Contributor = mongoose.model('Contributors', contributorSchema);