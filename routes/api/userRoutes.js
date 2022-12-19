const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createNewUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend)

module.exports = router;
