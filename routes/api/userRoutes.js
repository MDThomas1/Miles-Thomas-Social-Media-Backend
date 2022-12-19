// Importing all controllers from userController and giving them routes with names and classes
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

router.route('/:userId/addfriend/:friendId').put(addFriend)

router.route('/:userId/deletefriend/:friendId').put(deleteFriend)

module.exports = router;
