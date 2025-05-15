const coursesModel = require("../models/courses.model");
const lessonModel = require("../models/lessons.model");

exports.createLesson = async (req, res) => {
  try {
    const { title, videoUrl, content, courseId } = req.body;
    const course = await coursesModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const newLesson = new lessonModel({
      title,
      videoUrl,
      content,
      course: courseId,
      order: course.lessons.length + 1,
    });

    await newLesson.save();
    course.lessons.push(newLesson._id); // Thêm lesson vào danh sách lessons của course
    await course.save();
    return res.status(201).json({
      message: "Create lesson successfully!",
      lesson: newLesson,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Create lesson failed!", error: error.message });
  }
};

exports.getLessonDetail = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await lessonModel.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found!" });
    }
    return res.status(200).json({
      message: "Get lesson detail successfully!",
      lesson,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Get lesson detail failed!", error: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { title, videoUrl, content } = req.body;
    const { lessonId } = req.params;
    const lesson = await lessonModel.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found!" });
    }

    // Cập nhật các trường nếu có trong req.body
    if (title) lesson.title = title;
    if (videoUrl) lesson.videoUrl = videoUrl;
    if (content) lesson.content = content;

    await lesson.save();

    return res.status(200).json({
      message: "Update lesson successfully!",
      lesson,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update lesson failed!",
      error: error.message,
    });
  }
};
