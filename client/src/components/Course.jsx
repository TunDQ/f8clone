import React, { useState } from "react";
import { useEffect } from "react";
import { getAllCourse } from "../services/courseService";
export const Course = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getAllCourse();
      setCourse(response);
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <div>
        <h2 className="ms-3 font-bold text-2xl">Khoá học Pro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4">
          {course.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={
                  item.thumbnailUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                <h2 className="text-lg text-[#f05123] font-semibold mb-1">
                  {item.price
                    ? item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "Miễn phí"}
                </h2>
                <br />
                <p className="text-sm text-gray-600 flex gap-2">
                  <span>
                    <img
                      src={item.instructor.avatarUrl}
                      alt=""
                      className="w-6 rounded-full"
                    />
                  </span>
                  <span>{item.instructor?.name || "Không rõ giảng viên"}</span>
                  <span className="ms-6 flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-square-play-icon lucide-square-play w-5"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="m9 8 6 4-6 4Z" />
                    </svg>
                    {item.lessons?.length}
                  </span>
                </p>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
