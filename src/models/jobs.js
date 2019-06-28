var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');

var jobSchema = mongoose.Schema({
    filename: {
        type: String,
        unique: true,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    object: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    lineEnding: {
        type: String,
        required: true
    },
    state: String,
    columnDelimiter: String,
    jobType: String,
    numberRecordsProcessed: Number,
    numberRecordsFailed: Number,
    totalProcessingTime: Number,
    apiActiveProcessingTime: Number,
    retries: {
        type: Number
    },
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

var Job = module.exports = mongoose.model('Job', jobSchema);
module.exports.get = function (callback, limit) {
        Job.find(callback).limit(limit);
}