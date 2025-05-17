const blogModel = require("../models/blog.model");
const Blog = require("../models/blog.model"); 

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("user", "name avatarUrl") 
      .sort({ createdAt: -1 }); // Sắp xếp blog mới nhất lên đầu 

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createBlog = async (req, res) => {
    try {
      const { title, content, description,image, category } = req.body;
      const userId = req.user.id;
      const newBlog = new blogModel({
        user: userId,
        title,
        content,
        description,
        image,
        category
      });
      await newBlog.save();
      const blog = await newBlog.populate("user", "name avatarUrl -_id");
  
      res.status(201).json({
        message: "Create Blog successfully",
        blog: blog,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };