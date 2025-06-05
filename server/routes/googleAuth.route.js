const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");

const client = new OAuth2Client(process.env.GG_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GG_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // Tìm hoặc tạo user
    let user = await usersModel.findOne({ email: payload.email });
    if (!user) {
      user = await usersModel.create({
        name: payload.name,
        email: payload.email,
        avatarUrl: payload.picture,
        passwordHash: "google_oauth", // dummy
      });
    }
    // Tạo JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Google login failed", error: error.message });
  }
});

module.exports = router;
