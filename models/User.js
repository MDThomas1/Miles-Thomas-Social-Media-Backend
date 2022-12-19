const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

// Showing what a user should look like
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
            }
        }
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
});

// Adds a virtual to count the number of friends a user has
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

// Converts the schema into a model for use in controllers
const User = new model('user', userSchema)

module.exports = User