var mongoose = require('mongoose');

var TopicsSchema = new mongoose.Schema({
    _topicID: mongoose.Types.ObjectId,
    topic: {type: String, required: [true, 'Need a topic title.'] },
    dateCreated: {type: Date, default: Date.now()},
});

var TopicModel = mongoose.model('TopicModel', TopicsSchema);

module.exports = TopicModel;