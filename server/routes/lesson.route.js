const express = require("express");
const {
  createLesson,
  getLessonDetail,
  updateLesson,
} = require("../controllers/lesson.controller");

const router = express.Router();

router.post("/lessons", createLesson);
router.get("/courses/:lessonId/lessons", getLessonDetail);
router.put("/lessons/:lessonId", updateLesson);

module.exports = router;
