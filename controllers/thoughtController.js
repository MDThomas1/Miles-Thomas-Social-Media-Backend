const { Thought, User } = require('../models')
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params.id) })
        .select('-__v')
        .then((thought) =>
        !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
            return User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { thoughts: thought } },
              { new: true }
            );
        })
        .then((user) => !user ? res.status(404).json({ message: 'No user could be found with the provided username' }) : res.json('New thought has been successfully uploaded')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: ObjectId(req.params.id) })
        .then((user) =>
            !user
              ? res.status(404).json({ message: 'This thought could not be found within a user' })
              : User.findOneAndUpdate(
                  { thoughts: ObjectId(req.params.id) },
                  { $pull: { thoughts: ObjectId(req.params.id) } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'Sorry, this thought could not be found',
                })
              : res.json({ message: 'Thought has been successfully deleted' })
          )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found!' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found!' }) : res.json('New reaction has been successfully uploaded')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteReaction(req, res) {
        Thought.findOneAndRemove(
            { reactions: ObjectId(req.params.id) },
            { $pull: { thoughts: ObjectId(req.params.id) } },
            { new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'No user could be found with the provided username' }) : res.json('New thought has been successfully uploaded')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};
