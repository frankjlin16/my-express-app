var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Need a title for this entry.']},
    content: String,
    dateCreated: {type: Date, default: Date.now()},
    topic: {type: mongoose.Schema.Types.ObjectId, ref: 'TopicModel'}
});

var EntryModel = mongoose.model('EntryModel', EntrySchema);

module.exports = EntryModel;
