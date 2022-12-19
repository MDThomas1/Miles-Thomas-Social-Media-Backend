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

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;