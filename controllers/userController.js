const User = require('../models/User.js');
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
};
