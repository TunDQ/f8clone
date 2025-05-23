import React, { useState } from "react";
import slider from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import { Course } from "../components/Course";
import FeaturedBlogs from "../components/FeaturedBlogs";
const slides = [
  {
    id: 1,
    image: slider,
    title: "Lớp Offline tại Hà Nội 👑",
    description:
      "Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn và hỗ trợ trực tiếp tại lớp. Giờ học linh hoạt, phù hợp cả sinh viên và người đi làm.",
    button: "Tư vấn miễn phí",
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    image: slider2,
    title: "Học HTML,CSS cho người mới bắt đầu",
    description:
      "Thực hành dự án Figma,hàng trăm bài tập, hướng dẫn 100% bởi Sơn Đặng, tặng kèm flashcard và tài liệu học tập.",
    button: "Xem chi tiết",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    id: 3,
    image: slider3,
    title: "Học cùng cộng đồng F8",
    description:
      "Tham gia cộng đồng học lập trình để cùng nhau chia sẻ và phát triển.",
    button: "Vào nhóm học",
    bgColor: "bg-gradient-to-r from-green-400 to-lime-500",
  },
];

export const Slider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const slide = slides[current];

  return (
    <div className="relative w-full mt-1 px-4">
      <div
        className={`w-full rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row items-stretch transition-all duration-500 ${slide.bgColor}`}
      >
        {/* Left - Text content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{slide.title}</h2>
          <p className="text-base md:text mb-6">{slide.description}</p>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition font-semibold w-fit">
            {slide.button}
          </button>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0  top-30 bg-white/90 hover:bg-white text-gray-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow"
        aria-label="Previous slide"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-30 bg-white/90 hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow"
        aria-label="Next slide"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`block w-3 h-3 rounded-full transition ${
              current === idx ? "bg-white" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>

      <div className="mt-8">
        <Course />
        <FeaturedBlogs/>
      </div>
    </div>
  );
};
