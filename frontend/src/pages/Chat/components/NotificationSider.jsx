import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";
import { toggleNotification } from "../../../redux/features/uiSlice/UiSlice";
import { notifyError } from "../../../components/Error";

const NotificationSider = () => {
  let dispatch = useDispatch();
  let { isNotificationVisible } = useSelector((state) => state.ui);
  const [notifications, setNotifications] = useState([
    "user1",
    "user2",
    "user3",
  ]);

  const handleToggleNotification = () => {
    dispatch(toggleNotification());
  };

  useEffect(() => {
    const getNotifications = async () => {
      const res = await fetch("/server/v1/api/invitations/");
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setNotifications(data);
      }
    };
    try {
      getNotifications();
    } catch (error) {
      notifyError("server error");
      console.log("notification error", error);
    }
  }, []);

  return (
    <div
      className={`sidebar z-20 fixed top-0 right-0 w-80 h-full bg-gray-900 shadow-lg border-l border-black transition-transform duration-500 ${
        isNotificationVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center gap-10 pl-3">
        <span
          className="text-slate-100 hover:text-slate-300 cursor-pointer text-3xl "
          onClick={handleToggleNotification}
        >
          <RxCross1 />
        </span>
        <h2 className="text-white text-center text-2xl font-semibold my-4">
          Notifications
        </h2>
      </div>
      {notifications.map((notification, index) => (
        // <div
        //   key={index}
        //   className="notibox text-white font-sans bg-gray-800 px-4 py-2 my-4 mx-6 rounded relative"
        // >
        //   {notification}
        //   <div
        //     className="cancel absolute right-2 top-2 cursor-pointer text-black bg-white px-2 py-1 rounded-full hover:bg-black hover:text-white"
        //   >
        //     ✕
        //   </div>
        // </div>
        <div
          key={index}
          className="overflow-y-auto custom-scrollbar bg-[#0F172A] h-full"
        >
          <div className="flex gap-3 items-center justify-between p-2 border-[#1E293B] border-b-2 border-t-2">
            <div className="flex gap-3 items-center">
              <div className="bg-slate-700 border-white border-2 w-12 h-12 rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" alt="" />
              </div>
              <div className="flex flex-col gap-1 cursor-pointer ">
                <div className="text-gray-200">user.username</div>
                <div className="text-sm text-gray-500">lastMessage.text</div>
              </div>
            </div>

            <div className="flex gap-3 items-center p-2 text-xl">
              <div className="text-green-500 cursor-pointer hover:bg-green-200 rounded-full p-1">
                <IoCheckmarkOutline />
              </div>

              <div className="text-red-500 cursor-pointer hover:bg-red-200 rounded-full p-1">
                <RxCross1 />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSider;
