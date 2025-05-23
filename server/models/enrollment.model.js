const mongoose = require("mongoose");
const User = require("./users.model");
const Course = require("./courses.model");
const Lesson = require("./lessons.model");
const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number, // phần trăm hoàn thành (0–100)
      default: 0,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    }
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true }); // Mỗi người chỉ ghi danh 1 lần

module.exports = mongoose.model("Enrollment", enrollmentSchema);