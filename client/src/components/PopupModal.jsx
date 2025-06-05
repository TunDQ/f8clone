import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function PopupModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000); // Tự hiện sau 1s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Nền mờ mịn, không ảnh hưởng popup */}
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"></div>

      {/* Popup chính */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-xl p-6 relative">
          {/* Nút đóng */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
          >
            &times;
          </button>

          {/* Nội dung popup */}
          <h2 className="text-xl font-bold mb-2">📢 Bản tin mới</h2>
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            # Chia sẻ từ học viên đã đi làm!
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Chia sẻ của bạn Quỳnh Nga sau khi hoàn thành khóa học lập trình web
            tại F8. Hiện tại Quỳnh Nga đã có công việc ổn định và thu nhập hấp
            dẫn tại công ty công nghệ hàng đầu VN.
          </p>

          <img
            src="/doremon.png"
            alt="F8 Sharing"
            className="rounded-lg border-2 border-orange-400 mb-4 w-20 ms-50"
          />

          <p className="text-sm text-gray-800">
            ✅ Hiện tại F8 đang mở thêm lớp Offline tại HN và online qua Zoom.
            <br />
            👉 Đăng ký tại:{" "}
            <NavLink to="/road" className="text-blue-600 underline">
              Form tư vấn
            </NavLink>
          </p>

          <p className="mt-2 text-red-500 italic text-sm">
            *Có những ưu đãi đặc biệt khi đăng ký đợt cuối năm các bạn nhé!
          </p>
        </div>
      </div>
    </>
  );
}
