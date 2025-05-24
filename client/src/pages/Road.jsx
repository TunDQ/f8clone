import React from "react";
import feRoad from "../assets/feRoad.png";
import beRoad from "../assets/beRoad.png";
import img from "../assets/img.webp";
export const Road = () => {
  return (
    <div>
      <div>
        <h2 className="font-extrabold text-2xl mt-5">Lộ trình học</h2>
        <p className="text-black-500 mt-2 text-sm leading-8">
          Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
          Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập{" "}
          <br />
          trung vào lộ trình "Front-end".
        </p>
      </div>
      {/* lộ trình */}
      <div className="flex gap-10 items-stretch mt-26">
        <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col justify-between w-116">
          <div className="flex">
            <div>
              <h2 className="font-extrabold text-2xl">
                Lộ trình học Front-end
              </h2>
              <p className="text-gray-600 mt-2 text-sm leading-6">
                Lập trình viên Front-end là người xây dựng ra giao diện
                websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                thành lập trình viên Front-end nhé.
              </p>
            </div>

            <div className="flex justify-center mt-5 ms-10 border-4 border-red-500 p-2 rounded-full">
              <img src={feRoad} alt="Frontend" className="w-68 object-cover" />
            </div>
          </div>

          <button className="mt-4 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            Xem chi tiết
          </button>
        </div>
        <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col justify-between w-116">
          <div className="flex">
            <div>
              <h2 className="font-extrabold text-2xl">Lộ trình học Back-end</h2>
              <p className="text-gray-600 mt-2 text-sm leading-6">
                Trái với Front-end thì lập trình viên Back-end là người làm việc
                với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ
                cùng tìm hiểu thêm về lộ trình học Back-end nhé.
              </p>
            </div>

            <div className="flex justify-center mt-5 ms-10 border-4 border-red-500 p-2 rounded-full">
              <img src={beRoad} alt="Frontend" className="w-68 object-cover" />
            </div>
          </div>

          <button className="mt-4 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            Xem chi tiết
          </button>
        </div>
      </div>

      <div className="flex justify-bween items-center mt-10">
        <div>
          <h2 className="font-extrabold text-2xl mt-10">
            Tham gia cộng đồng học viên F8 trên <br /> Facebook
          </h2>
          <p className="text-black-500 mt-2 text-sm leading-4">
            Hàng nghìn người khác đang học lộ trình giống như bạn. <br /> Hãy
            tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học <br />
            nhé.
          </p>
          <button className="mt-4 px-6 py-1 border-2 bg-white text-black rounded-full hover:bg-black hover:text-white cursor-pointer transition">
            Tham gia nhóm
          </button>
        </div>
        <img src={img} alt="" className="w-[400px] ms-80" />
      </div>
    </div>
  );
};
