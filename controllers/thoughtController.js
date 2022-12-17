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
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.studentId })
        .then((student) =>
            !student
              ? res.status(404).json({ message: 'No such student exists' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.studentId },
                  { $pull: { thought: req.params.studentId } },
                  { new: true }
                )
          )
          .then((course) =>
            !course
              ? res.status(404).json({
                  message: 'Student deleted, but no courses found',
                })
              : res.json({ message: 'Student successfully deleted' })
          )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }    
};
