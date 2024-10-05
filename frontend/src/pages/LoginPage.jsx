import React from "react";
import corouselBg from "../assets/corousel-bg.svg";
import images from "../constants/sliderImages.js";
import CarouselSlider from "../components/carouselSlider.jsx";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <div
        className={`w-full h-full bg-blue-500 hidden lg:block`}
        style={{
          backgroundImage: `url(${corouselBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="flex h-full items-center">
          <CarouselSlider sliderImages={images} />
        </div>
      </div>

      <div className="w-full h-full bg-[#020617] text-slate-100">
        login form
      </div>
    </div>
  );
};

export default LoginPage;
