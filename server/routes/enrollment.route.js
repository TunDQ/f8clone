const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/middleware");
const { getEnrolledCourses, createEnrollment,getEnrollCourseByUser } = require("../controllers/enrollment.controller");

router.get("/enrolls",verifyToken, getEnrolledCourses);
router.post("/enrolls",verifyToken,createEnrollment);
router.get("/enrolls/user/:userId", getEnrollCourseByUser);
module.exports = router;
