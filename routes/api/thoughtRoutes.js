// Importing all controllers from thoughtController and giving them routes with names and classes
const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createNewThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createNewThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').put(createReaction)

router.route('/:thoughtId/reactions/:reactionId').put(deleteReaction)

module.exports = router;