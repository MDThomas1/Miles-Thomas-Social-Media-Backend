const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createNewThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createNewThought);

router.route('/:userId').get(getOneThought);

module.exports = router;