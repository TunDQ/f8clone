import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import { useNavigate } from "react-router-dom";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await getAllBlogs();
            setBlogs(response.slice(0, 6)); 
        };
        fetchBlogs();
    }, []);

    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold mb-4">Bài viết nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                    >
                        <img
                            src={
                                blog.image ||
                                "https://via.placeholder.com/300x200?text=No+Image"
                            }
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{blog.title}</h3>
                            {/* <p className="text-gray-600 text-sm">
                                {blog.content.length > 100
                                    ? blog.content.substring(0, 100) + "..."
                                    : blog.content}
                            </p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedBlogs;