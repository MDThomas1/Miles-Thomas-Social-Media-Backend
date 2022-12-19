const { Schema, model, now } = require('mongoose');

// Showing what a reaction should look like
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

// Adding a timestamp virtual to reaction
reactionSchema.virtual('timestamp').get(function() {
    return `${this.createdAt}`
});

// Showing what a thought should look like
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
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

// Adds a virtual to show the number of reactions attached to a post
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

// Adds a timestamp to each thought
thoughtSchema.virtual('timestamp').get(function() {
    return `${this.createdAt}`
});

// Turns the schema into a model for use in controllers
const Thought = new model('thought', thoughtSchema)

module.exports = { thoughtSchema, Thought }

