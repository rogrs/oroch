let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });
  
  const Story = mongoose.model('Story', storySchema);