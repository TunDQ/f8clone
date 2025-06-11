const express = require("express");
const {
  getUser,
  updateInfoUser,
  getAllUser,
} = require("../controllers/user.controller");
const { verifyAdmin } = require("../middleware/middleware");
const router = express.Router();

router.get("/user/:id", verifyAdmin, getUser);
router.get("/users", verifyAdmin, getAllUser);
router.put("/user/:id", updateInfoUser);

module.exports = router;
