import React, { useEffect, useState } from "react";
import { getEnrollCourseByUser } from "../services/enrollServices";
import { useNavigate } from "react-router-dom";
import dayjs from "../utils/dayjsConfig";

const MyCoursesDialog = ({ open, onClose }) => {
  const [enrolls, setEnrolls] = useState([]);
  const navigate = useNavigate();
  const userId = "681e186841c55336d257665f";

  useEffect(() => {
    if (open) {
      getEnrollCourseByUser(userId)
        .then((data) => setEnrolls(data))
        .catch((err) => console.error(err));
    }
  }, [open]);

  if (!open) return null;

  const getStatusText = (enroll) => {
    if (enroll.progress === 0) return "Bạn chưa học khoá này";
    if (enroll.progress >= 100) return `Đã hoàn thành`;
    return `Học ${dayjs(enroll.updatedAt).fromNow()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-5 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Khoá học của tôi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-lg">
            ✖
          </button>
        </div>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {enrolls.length === 0 ? (
            <p className="text-sm text-gray-600">Bạn chưa đăng ký khoá học nào.</p>
          ) : (
            enrolls.map((enroll) => (
              <div
                key={enroll._id}
                className="flex gap-3 items-start cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate(`/courses/${enroll.course._id}`);
                }}
              >
                <img
                  src={enroll.course.thumbnailUrl}
                  alt={enroll.course.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{enroll.course.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{getStatusText(enroll)}</p>
                  {enroll.progress === 0 ? (
                    <p className="text-xs text-orange-500 font-semibold">Bắt đầu học</p>
                  ) : (
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${enroll.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-right mt-4">
          <button
            onClick={() => {
              onClose();
              navigate("/my-courses");
            }}
            className="text-orange-500 text-sm font-medium hover:underline"
          >
            Xem tất cả →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesDialog;
