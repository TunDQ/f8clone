const express = require("express");
const {
  getAllCourses,
  createCourse,
  getCourseDetail,
  updateCourse,
} = require("../controllers/course.controller");
const router = express.Router();

router.get("/courses", getAllCourses);
router.get("/courses/:courseId", getCourseDetail);
router.post("/courses", createCourse);
router.put("/courses/:courseId", updateCourse);

module.exports = router;
