const express = require("express");
const router = express.Router();
const { getAllBlog, createBlog } = require("../controllers/blog.controller");
const { verifyToken } = require("../middleware/middleware");

router.get("/blogs", getAllBlog);
router.post("/blogs",verifyToken,createBlog);

module.exports = router;
