const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createNewThought,
  deleteThought,
  updateThought
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createNewThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

module.exports = router;