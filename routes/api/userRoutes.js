const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createNewUser,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getOneUser);

module.exports = router;
