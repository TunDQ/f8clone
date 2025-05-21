import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog detail:', error);
            }
        };
        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div className="text-center py-6">Loading...</div>;
    }
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center mb-4">
                <img src={blog.user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
                <p className="text-sm font-semibold">{blog.user.name}</p>
            </div>
            <div
                className="text-gray-700 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
        </div>
    );
};

export default BlogDetail;