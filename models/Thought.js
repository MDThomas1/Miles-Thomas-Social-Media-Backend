const { Schema, model, now } = require('mongoose');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const thoughtSchema = new Schema({
    thoughtText: {

    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {

    },
    reaction: [reactionSchema]
})

const Thought = new model('thought', thoughtSchema)

module.exports = { thoughtSchema, Thought }

