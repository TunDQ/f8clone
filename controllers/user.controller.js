const usersModel = require("../models/users.model");

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersModel.findById(id);
    const format = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses,
    };
    res.status(200).json(format);
  } catch (error) {
    res.status(500).json(err);
  }
};
const updateInfoUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, avatarUrl } = req.body;
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.avatarUrl = avatarUrl;
    const updatedUser = await user.save();
    const { passwordHash, ...userInfo } = updatedUser._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

module.exports = { getUser, updateInfoUser };
