const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ _id: ObjectId(req.params.userId) })
        .select('-__v')
        .then((user) =>
        !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    createNewUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: ObjectId(req.params.userId) })
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : Thought.deleteMany({ _id: { $in: user.thoughts } }))
        .then(() => res.json({ message: 'User has been successfully deleted' }))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $addToSet: User.findOne( { _id: ObjectId(req.params.friendId) } ) },
            { new: true }
        )
        .then((user) => !user ? res.status(404).json({ message: 'Sorry, this user could not be found!' }) : res.json('New friend has been successfully added')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
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
