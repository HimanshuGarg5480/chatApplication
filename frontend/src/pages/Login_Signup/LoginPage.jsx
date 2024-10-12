import React from "react";
import corouselBg from "../../assets/corousel-bg.svg";
import images from "../../constants/sliderImages.js";
import CarouselSlider from "../../components/carouselSlider.jsx";
import logo from "../../assets/Chat_Application-logo.png";
import LoginSignupForm from "./components/LoginSignupForm.jsx";
import { useLocation} from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  
  // Split the path and get the last part
  const page = location.pathname.split('/').filter(Boolean).pop();
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

      <div className="w-full h-full bg-[#020617] text-slate-100 flex flex-col items-center justify-center pt-4">
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-[40%] md:w-[25%] sm:w-[30%] lg:w-[30%]">
            <img className="w-full" src={logo} alt="" />
          </div>
          <div className="w-11/12 max-w-[30rem] max-h-[80vh]">
            <LoginSignupForm page = {page}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
