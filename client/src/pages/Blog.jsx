//image cua bai blog va tag category
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../services/userService";
export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getAllBlogs();
      setBlogs(response);
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="mb-[100px] mt-10">
        <h1 className="text-3xl font-bold mb-4">Bài viết nổi bật</h1>
        <p className="text-gray-600 mb-4">
          Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
          và các kỹ thuật lập trình web.
        </p>
      </div>
      <div className="flex gap-[80px]">
        <div>
          {blogs.map((blog) => (
            <div
              className="leading-[36px] rounded-2xl cursor-pointer"
              key={blog._id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <div className="flex m-2">
                <img
                  src={blog.user.avatarUrl}
                  alt={blog.title}
                  style={{ width: "20px", height: "20px" }}
                  className="rounded-full object-cover me-1"
                />
                <p className="text-black font-bold text-sm">{blog.user.name}</p>
              </div>
              <div className="flex">
                <div>
                  <h2 className="font-bold text-xl ms-2 mt-2 me-2">
                    {blog.title}
                  </h2>
                  <p className="font-light ms-2 mb-2 me-2">
                    {blog.description}
                  </p>
                </div>
                <div>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: "250px", height: "70px" }}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-sm font-bold mb-4">
            Xem các bài viết theo chủ đề{" "}
          </h1>
          {blogs.map((blog) => (
            <div
              className=" rounded-2xl w-auto inline-block bg-[#f2f2f2] text-sm text-[#333] font-bold m-2 p-2 cursor-pointer"
              key={blog._id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <span className=" text-sm rounded">{blog.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
