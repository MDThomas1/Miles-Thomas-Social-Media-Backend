const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

const userSchema = new Schema({
    username: {

    },
    email: {

    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
});

const User = new model('user', userSchema)

module.exports = User