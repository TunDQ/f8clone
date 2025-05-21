import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const { name } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/blogs/category/${name}`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Lỗi lấy blog theo category", error);
            }
        };

        fetchCategoryBlogs();
    }, [name]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/blogs`); // Gọi tất cả blogs
                const categories = [...new Set(response.data.map((blog) => blog.category))];
                setAllCategories(categories);
            } catch (error) {
                console.error("Lỗi lấy tất cả category", error);
            }
        };

        fetchAllCategories();
    }, []);

    const otherCategories = allCategories.filter((cat) => cat !== name);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">{name}</h1>

            <div className='flex flex-col md:flex-row gap-8'>
                <div className='w-full md:w-2/3'>
                    {blogs.map((blog) => (
                        <div
                            className='cursor-pointer hover:shadow-lg transition rounded-2xl border mb-4 p-4'
                            key={blog._id}
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                        >
                            <div className='flex items-center mb-2'>
                                <img src={blog.user.avatarUrl} alt={blog.title} className='w-6 h-6 rounded-full object-cover me-2' />
                                <p className='text-black font-bold text-sm'>{blog.user.name}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex-1'>
                                    <h2 className='font-bold text-xl mb-1'>{blog.title}</h2>
                                    <p className="text-sm text-gray-700">
                                        {blog.content.length > 100
                                            ? `${blog.content.substring(0, 100)}...`
                                            : blog.content}
                                    </p>
                                </div>
                                <img src={blog.image} alt={blog.title} className='w-40 h-24 rounded object-cover ml-4' />
                            </div>
                        </div>
                    ))}
                </div>

                <div  className="w-full md:w-1/3">
                    <h2 className=" text-gray-500 mb-4">Chủ đề khác</h2>
                    {otherCategories.map((cat) => (
                        <div
                            key={cat}
                            className="rounded-2xl w-auto inline-block cursor-pointer hover:bg-gray-100"
                            style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
                            onClick={() => navigate(`/category/${cat}`)}
                        >
                            <span className="text-sm rounded text-blue-600">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
