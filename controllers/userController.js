// Importing the models needed on the page as well as the ObjectId data type for use in parameters
const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

// Automatically exporting all functions used in routing
module.exports = {
    // Fetches all users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Fetches one user based on ID
    getOneUser(req, res) {
        User.findOne({ _id: ObjectId(req.params.userId) })
        .select('-__v')
        .then((user) =>
        !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Creates a new user 
    createNewUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // Deletes a specified user and any thoughts within that user's array
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: ObjectId(req.params.userId) })
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json(user))
        .then(() => res.json({ message: 'User has been successfully deleted' }))
        .catch((err) => res.status(500).json(err));
    },
    // Updates a specified user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json('User has been successfully deleted'))
        .catch((err) => res.status(500).json(err));
    },
    // Finds a user with a specified ID and adds them to another user's friend array
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $addToSet: ObjectId(req.params.friendId) },
            { new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json('New friend has been successfully added')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Finds a specified friend with a user's array and removes it
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $pull: { friends: ObjectId(req.params.friendId) } },
            { new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json('Friend has been successfully deleted')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    } 
};
