import React, { useEffect, useState } from "react";
import { getEnrollCourseByUser } from "../services/enrollServices";

const MyCoursesPage = () => {
  const [enrolls, setEnrolls] = useState([]);
  const userId = "681e186841c55336d257665f"; // giả lập user đã đăng nhập

  const completedCourses = enrolls.filter((e) => e.progress >= 100);
  const completedCount = completedCourses.length;

  useEffect(() => {
    getEnrollCourseByUser(userId)
      .then((data) => setEnrolls(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Khoá học của tôi</h1>
      {enrolls.length > 0 && (
        <p className="text-gray-600 mb-6">
          {completedCount === 0
            ? "Bạn chưa hoàn thành khoá học nào."
            : `Bạn đã hoàn thành ${completedCount} khoá học.`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {enrolls.map((enroll) => {
          const { progress, updatedAt } = enroll;

          let status = "Bạn chưa học khoá này";
          let timeNote = "";

          if (progress >= 100) {
            status = "Đã hoàn thành";
            timeNote = `Hoàn thành cách đây ${dayjs(updatedAt).fromNow()}`;
          } else if (progress > 0) {
            status = "Đang học";
            timeNote = `Học cách đây ${dayjs(updatedAt).fromNow()}`;
          }

          return (
            <div
              key={enroll._id}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={enroll.course.thumbnailUrl}
                alt={enroll.course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">
                  {enroll.course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{status}</p>
                {timeNote && (
                  <p className="text-sm text-gray-400 italic">{timeNote}</p>
                )}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default MyCoursesPage;
