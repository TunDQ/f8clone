import React, { useContext, useState } from "react";
import F8Logo from "../assets/f8logo.webp";
import logo from "../assets/f8logo.webp";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../services/authService.jsx";
import { AuthContext } from "../contexts/authContext";
import MyCoursesDialog from "../components/MyCoursesDialog";
import { useRef } from "react";
import { useEffect } from "react";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { user, login, logout } = useContext(AuthContext);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userInfoRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userInfoRef.current &&
        !userInfoRef.current.contains(event.target) &&
        !event.target.closest("#avatar-toggle")
      ) {
        setShowUserInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="font-bold text flex items-center gap-2">
        <img
          src={F8Logo}
          alt="logo"
          className="w-9 h-9 object-contain rounded-md"
        />
        <span>Học lập trình để đi làm</span>
      </div>

      {/* Search */}
      <div className="relative flex items-center w-1/2 max-w-lg">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m21 21-5.197-5.197A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm khoá học, bài viết, video,..."
          className="flex-1 px-10 py-2 border border-gray-300 rounded-3xl focus:outline-none"
        />
      </div>

      {/* Nếu đã đăng nhập */}
      {user ? (
        <div className="flex items-center gap-4 font-semibold">
          <div className="flex items-center gap-2 cursor-pointer me-16">
            <p className="flex items-center gap-2">
              <span onClick={() => setOpenDialog(true)}>Khoá học của tôi</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              <div
                id="avatar-toggle"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowUserInfo((prev) => !prev)}
              >
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </p>
          </div>
          {showUserInfo && (
            <div
              className="absolute top-16 right-8 bg-white shadow-lg rounded-xl w-64 z-50 py-4 px-5 border border-gray-100"
              ref={userInfoRef}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-[15px] leading-5">
                    {user.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    @{user.username || "username"}
                  </span>
                </div>
              </div>

              {/* Danh sách tùy chọn */}
              <div className="space-y-2 text-sm text-gray-700 font-medium">
                <p className="hover:text-[#ff5117] cursor-pointer">
                  Trang cá nhân
                </p>
                <p className="hover:text-[#ff5117] cursor-pointer">Viết blog</p>
                <p className="hover:text-[#ff5117] cursor-pointer">
                  Bài viết của tôi
                </p>
                <p className="hover:text-[#ff5117] cursor-pointer">
                  Bài viết đã lưu
                </p>
                <p className="hover:text-[#ff5117] cursor-pointer">Cài đặt</p>
                <hr />
                <p
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  onClick={() => {
                    logout();
                    setShowUserInfo(false);
                  }}
                >
                  Đăng xuất
                </p>
              </div>
            </div>
          )}
          <MyCoursesDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          />
        </div>
      ) : (
        // Nếu chưa đăng nhập
        <div className="flex items-center gap-4 font-semibold">
          <button
            className="bg-gradient-to-br from-[#ff8f26] to-[#ff5117] text-white px-4 py-2 rounded-3xl shadow"
            onClick={() => setShowLogin(true)}
          >
            Đăng Nhập
          </button>
        </div>
      )}

      {/* Form đăng nhập Google */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div
            className="bg-white rounded-2xl shadow-lg w-[450px] p-6 relative"
            style={{
              background: "linear-gradient(to right, #fdfbff, #f6fcff)",
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" className="w-12 rounded-[8px] mt-4" />
              <h2 className="text-2xl font-bold mt-6 mb-2">Đăng nhập vào F8</h2>
              <p className="text-sm text-red-500 text-center mb-4">
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều
                <br />
                người sử dụng chung sẽ bị khóa.
              </p>
            </div>

            <div className="flex flex-col mt-2 items-center gap-2">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const data = await loginWithGoogle(
                      credentialResponse.credential
                    );
                    if (data.token) {
                      login(data.user, data.token); // ✅ context
                      setShowLogin(false);
                    } else {
                      alert("Đăng nhập Google thất bại!");
                    }
                  } catch (err) {
                    alert("Lỗi đăng nhập Google!");
                    console.error("Login error:", err);
                  }
                }}
                onError={() => {
                  alert("Đăng nhập Google thất bại!");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
