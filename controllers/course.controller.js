const coursesModel = require("../models/courses.model");
const usersModel = require("../models/users.model");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await coursesModel.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      category,
      level,
      lessons = [],
      instructorId,
    } = req.body;

    const instructor = await usersModel.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    const newCourse = new coursesModel({
      title,
      description,
      thumbnailUrl,
      category,
      level,
      lessons,
      instructor: instructorId,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Create new course a successfully!", newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Create new course failed!", error: error.message });
  }
};

exports.getCourseDetail = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await coursesModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    return res
      .status(200)
      .json({ message: "Get course detail successfully!", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Get course detail failed!", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      description,
      thumbnailUrl,
      category,
      level,
      lessons = [],
      isPublished,
    } = req.body;
    const course = await coursesModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    const updatedCourse = await coursesModel.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        thumbnailUrl,
        category,
        level,
        lessons,
        isPublished,
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Update course failed!" });
    }
    return res
      .status(200)
      .json({ message: "Update course successfully!", updatedCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update course failed!", error: error.message });
  }
};
