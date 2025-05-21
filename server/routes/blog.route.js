const express = require("express");
const router = express.Router();
const { getAllBlog, createBlog,getBlogDetail,getBlogByCategory,deleteBlog } = require("../controllers/blog.controller");
const { verifyToken } = require("../middleware/middleware");

router.get("/blogs", getAllBlog);
router.post("/blogs",verifyToken,createBlog);
router.get("/blogs/:id",getBlogDetail);
router.get("/blogs/category/:category", getBlogByCategory); 
router.delete("/blogs/:id", deleteBlog); 

module.exports = router;
