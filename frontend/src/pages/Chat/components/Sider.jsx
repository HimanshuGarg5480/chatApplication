import React, { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdNotificationAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import defaultUserPic from "../../../assets/defaultUserPic.jpg";
import { showProfile } from "../../../redux/features/user/ProfileSlice";
import { notifyError } from "../../../components/Error";

const UserBio = ({ user }) => {
  const dispatch = useDispatch();
  const handleToggleProfile = () => {
    dispatch(showProfile());
  };
  return (
    <div className="bg-[#0F172A] border-b-[#1E293B] border-b-2 p-2">
      <div className="flex gap-3 items-center px-2">
        <div className="text-2xl cursor-pointer hover:text-blue-300 rounded-md p-1">
          <RiLogoutBoxLine />
        </div>
        <div className="flex gap-2 items-center">
          <div className="bg-slate-700 border-white border-2 w-12 h-12 rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={user.profilePic || defaultUserPic}
              alt=""
            />
          </div>
          <div className="flex gap-1 cursor-pointer hover:text-blue-300">
            <div>{user.username}</div>
            <div
              className="text-xs flex items-center"
              onClick={handleToggleProfile}
            >
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-auto text-2xl">
          <div className="cursor-pointer hover:text-blue-300 rounded-md p-1">
            <IoSearchOutline />
          </div>
          <div className="cursor-pointer hover:text-blue-300 rounded-md p-1">
            <MdNotificationAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const [conversation, setConverstion] = React.useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await fetch("/server/v1/api/message/conversations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setConverstion(data);
      } catch (err) {
        console.error(err);
        notifyError("Failed to fetch conversations");
      }
    };
    getConversations();
  }, []);
  return (
    <div className="overflow-y-auto custom-scrollbar bg-[#0F172A] h-full">
      <div className="flex gap-3 items-center p-2 border-b-[#1E293B] border-b-2">
        <div className="bg-slate-700 border-white border-2 w-12 h-12 rounded-full overflow-hidden">
          <img className="object-cover w-full h-full" alt="" />
        </div>
        <div className="flex flex-col gap-1 cursor-pointer">
          <div>user.username</div>
          <div className="text-sm text-gray-500">lastMessage.text</div>
        </div>
      </div>
    </div>
  );
};

const Sider = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="hidden sm:flex sm:flex-col h-screen w-[40rem] bg-[#171f34] border-r-[#1E293B] border-r-2 text-slate-50">
      <UserBio user={user} />
      <div className="bg-[#171f34] p-1 border-b-[#1E293B] border-b-2 text-lg text-slate-300 font-semibold">
        Conversations
      </div>
      <UserList />
    </div>
  );
};

export default Sider;
