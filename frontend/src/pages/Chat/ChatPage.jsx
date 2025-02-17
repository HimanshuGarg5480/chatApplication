import React, { useState } from "react";
import Profile from "../../components/Profile";
import Sider from "./components/Sider";
import { useSelector } from "react-redux";
import NotificationSider from "./components/NotificationSider";
import UserSearchPopup from "./components/UserSearchPopup";

const ChatPage = () => {
  let { isVisible } = useSelector((state) => state.profileVisibility);

  return (
    <div className="relative h-screen w-full md:flex">
      <div className="absolute z-10 w-full h-full md:w-[35%]">
        <Sider />
      </div>

      {/* Sidebar */}

      <NotificationSider />
      <UserSearchPopup />

      <div className="absolute left-0 z-0 h-screen w-full bg-[#020617]"></div>
      {isVisible && <Profile />}
    </div>
  );
};

export default ChatPage;
