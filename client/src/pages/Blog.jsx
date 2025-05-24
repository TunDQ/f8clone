import React, { useEffect, useState } from 'react'
import { getAllBlogs } from '../services/blogService';
import { useNavigate } from 'react-router-dom';

export const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await getAllBlogs();
            setBlogs(response);
        }
        fetchBlogs();
    }, []);
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className='w-full md:w-2/3'>
                <h1 className="text-3xl font-bold mb-4">Bài viết nổi bật
                </h1>
                <p className="text-gray-600 mb-8">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
                </p>
            </div>
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
                                    </p>                                </div>
                                <img src={blog.image} alt={blog.title} className='w-40 h-24 rounded object-cover ml-4' />
                            </div>
                        </div>
                    ))}
                </div>
                <div  className="w-full md:w-1/3">
                    <h1 className=" text-gray-500 mb-4">Xem các bài viết theo chủ đề </h1>
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className='rounded-2xl w-auto inline-block cursor-pointer hover:bg-gray-100'
                            style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
                            onClick={() => navigate(`/category/${blog.category}`, { state: { blogs } })}
                        >
                            <span className='text-sm rounded text-blue-600'>{blog.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Blog
