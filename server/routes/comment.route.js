const express = require("express");
const { createComment, getComments } = require("../controllers/comment.controller");
const { verifyToken } = require("../middleware/middleware");
const router = express.Router();

router.post("/comments",verifyToken,createComment)
router.get("/comments/:lessonId",getComments)


module.exports = router;