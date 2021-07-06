var mongoose = require('mongoose');

var TopicsSchema = new mongoose.Schema({
    topic: {type: String, required: [true, 'Need a topic title.'] },
    dateCreated: {type: Date, default: Date.now()},
    entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
});

var TopicModel = mongoose.model('TopicModel', TopicsSchema);

module.exports = TopicModel;