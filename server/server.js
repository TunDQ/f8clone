const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")
connectDB();
const CourseRoute = require("./routes/course.route");
const LessonRoute = require("./routes/lesson.route");
const CommentRoute = require("./routes/comment.route")
const BlogRoute = require("./routes/blog.route")
const EnrollmentRoute = require("./routes/enrollment.route");

app.use(express.json());
app.use(cors());
app.use("", CourseRoute);
app.use("", LessonRoute);
app.use("", CommentRoute);
app.use("", BlogRoute);
app.use("", EnrollmentRoute);

app.use("/auth", authRoute)
app.use("/", userRoute)

app.get("/", async (req, res) => {
  try {
    res.send({ message: "Welcome to Practical Exam!" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
