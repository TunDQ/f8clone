const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET
const usersModel = require("../models/users.model");
const register = async (req, res) => {
  try {
    const { name, email, passwordHash, role } = req.body;
    const existUser = await usersModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const validRoles = ["student", "admin", "instructor"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(passwordHash, salt);

    const newUser = new usersModel({
      name,
      email,
      passwordHash: hashed,
      role: role || "student",
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, passwordHash } = req.body;
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const validPassword = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!validPassword) {
      res.status(404).json("Wrong Password");
    }
    const accessToken = jwt.sign(
        {id: user._id, name: user.name, email: user.email,role: user.role },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    )
    const format ={
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        accessToken
    }
    return res.status(200).json(format)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
