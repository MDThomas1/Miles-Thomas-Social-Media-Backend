const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteUser,
  updateUser
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
