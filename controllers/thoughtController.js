// Importing the models needed on the page as well as the ObjectId data type for use in parameters
const { Thought, User } = require('../models')
const { ObjectId } = require('mongoose').Types;

// Automatically exporting all functions used in routing
module.exports = {
    // Fetches all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Fetches one thought through its ID
    getOneThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params.thoughtId) })
        .select('-__v')
        .then((thought) =>
        !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Creates a new thought and saves it to the user array with the matching username
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
    // Delete a thought based on ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: ObjectId(req.params.thoughtId) })
        .then((user) =>
            !user
              ? res.status(404).json({ message: 'This thought could not be found within a user' })
              : User.findOneAndUpdate(
                  { thoughts: ObjectId(req.params.id) },
                  { $pull: { thoughts: ObjectId(req.params.thoughtId) } },
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
    // Updates a thought based on ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'Sorry, this thought could not be found!' }) : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Adds a reaction to a selected thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
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
    // Finds a reaction in a specified thought and deletes it
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
            { $pull: { reactions: ObjectId(req.params.reactionId) } },
            { new: true }
        )
        .then((thought) => !thought ? res.status(404).json({ message: 'No reaction could be found with the provided ID' }) : res.json('Reaction has been successfully deleted')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};
