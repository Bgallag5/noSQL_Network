const router = require("express").Router();
const {
  getAllThoughts,
  getOneThought,
  postThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controllers");

router.route("/")
.get(getAllThoughts)
.post(postThought)

router.route("/:id")
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

router.route("/:thoughtId/reactions/:reactionId")
.post(addReaction)
.delete(deleteReaction);


module.exports = router;
