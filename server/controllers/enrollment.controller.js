const Enrollment = require('../models/enrollment.model');

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const enrollments = await Enrollment.find({ user: userId }).populate('course');

        const courses = enrollments.map(enrollment => enrollment.course);

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học đã đăng ký' });
    }
};

exports.createEnrollment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Bạn đã đăng ký khóa học này rồi.' });
        }

        const newEnrollment = new Enrollment({ user: userId, course: courseId });
        await newEnrollment.save();

        res.status(201).json({ message: 'Đăng ký khóa học thành công.', enrollment: newEnrollment });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

exports.getEnrollCourseByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const enrollments = await Enrollment.find({ user: userId }).populate('course');

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy khóa học nào đã đăng ký cho người dùng này.' });
        }

        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học đã đăng ký của người dùng.' });
    }
};





