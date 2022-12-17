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
        // timestamp getter method
    }
});

reactionSchema.virtual('timestamp').get(function() {
    return `${this.createdAt}`
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    }, 
    createdAt: {
        type: Date,
        default: Date.now
        // timestamp getter method
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

thoughtSchema.virtual('timestamp').get(function() {
    return `${this.createdAt}`
});

const Thought = new model('thought', thoughtSchema)

module.exports = { thoughtSchema, Thought }

