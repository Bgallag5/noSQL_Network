const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  postNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controllers");

router.route("/")
.get(getAllUsers)
.post(postNewUser)

router.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
