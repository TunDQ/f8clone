import React from "react";
import F8Logo from "../assets/f8logo.webp";
export const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="font-bold text flex items-center gap-2">
        <span>
          <img
            src={F8Logo}
            alt=""
            className="w-9 h-9 object-contain rounded-md"
          />
        </span>
        <span>Học lập trình để đi làm</span>
      </div>
      <div className="relative flex items-center w-1/2 max-w-lg">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm khoá học, bài viết, video,..."
          className="flex-1 px-10 py-2 border border-gray-300 rounded-3xl focus:outline-none"
        />
      </div>
      {/* Profile */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="font-stretch-normal">
          <p className="flex p-2 gap-4">
            Khoá học của tôi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {/*avatar  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </p>
        </span>
      </div>
    </div>
  );
};
