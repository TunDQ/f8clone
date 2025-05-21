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
  exports.getBlogDetail = async (req, res) => {
    try {
      const { id } = req.params; 
      const blog = await blogModel.findById(id).populate("user", "name avatarUrl");
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.status(200).json({
        title: blog.title,
        user: blog.user,
        content: blog.content,
        image: blog.image
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getBlogByCategory = async (req, res) => {
    try {
      const { category } = req.params; 
      const blogs = await blogModel
        .find({ category }) 
        .populate("user", "name avatarUrl") 
        .sort({ createdAt: -1 }); 
  
      if (blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found for this category" });
      }
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      await blogModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  