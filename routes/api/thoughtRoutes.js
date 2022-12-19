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

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;