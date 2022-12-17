const { Thought } = require('../models/Thought.js')
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params.userId) })
        .select('-__v')
        .then((thought) =>
        !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createNewThought(req, res) {
        Thought.create(req.body)
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
};
