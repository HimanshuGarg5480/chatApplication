import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { MdNotificationAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import defaultUserPic from "../../../assets/defaultUserPic.jpg";
import { showProfile } from "../../../redux/features/user/ProfileSlice";
import { notifyError, notifySuccess } from "../../../components/Error";
import {
  toggleNotification,
  toggleSearch,
} from "../../../redux/features/uiSlice/UiSlice";
import { clearUser } from "../../../redux/features/user/userSlice";

const UserBio = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleProfile = () => {
    dispatch(showProfile());
  };

  const handleToggleSerch = () => {
    dispatch(toggleSearch());
  };

  const handleToggleNotification = () => {
    dispatch(toggleNotification());
  };
  const handleLogOut = async () => {
    try {
      const response = await fetch("/server/v1/api/user/logout", {
        method: "POST",
      });
      if (response.ok) {
        dispatch(clearUser());
        navigate("/login");
        notifySuccess("Logged out successfully");
      }
    } catch (error) {
      console.error(err);
      notifyError("Failed to logout");
    }
  };
  return (
    <div className="bg-[#0F172A] border-b-[#1E293B] border-b-2 p-2">
      <div className="flex gap-3 items-center px-2">
        <div
          className="text-2xl cursor-pointer hover:text-blue-300 rounded-md p-1"
          onClick={handleLogOut}
        >
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
          <div
            className="flex gap-1 cursor-pointer hover:text-blue-300"
            onClick={handleToggleProfile}
          >
            <div>{user.username}</div>
            <div className="text-xs flex items-center">
              <FaChevronDown />
            </div>
          </div>
        </div>
        <div className="flex gap-2 ml-auto text-2xl">
          <div
            className="cursor-pointer hover:text-blue-300 rounded-md p-1"
            onClick={handleToggleSerch}
          >
            <RiUserAddFill />
          </div>
          <div
            className="cursor-pointer hover:text-blue-300 rounded-md p-1"
            onClick={handleToggleNotification}
          >
            <MdNotificationAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const [conversation, setConverstion] = React.useState([]);
  const [searchUser, setSearchUSer] = React.useState("");

  const getConversations = async () => {
    try {
      const data = await fetch(
        `/server/v1/api/message/conversations?search=${searchUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (!data.ok) {
        throw new Error("Failed to fetch conversations");
      }
      const response = await data.json();
      console.log(response);
      setConverstion(response);
    } catch (err) {
      console.error(err);
      notifyError("Failed to fetch conversations");
    }
  };
  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    getConversations();
  }, [searchUser]);
  
  return (
    <div className="overflow-y-auto custom-scrollbar bg-[#0F172A] h-full p-2">
      <div className="flex gap-2 items-center p-2 border-b-[#1E293B] border-b-2">
        <div className="text-3xl font-bold">
          <IoSearchOutline />
        </div>
        <input
          type="text"
          className="w-full p-1 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={searchUser}
          onChange={(e) => setSearchUSer(e.target.value)}
        />
      </div>
      {conversation.map((user) => (
        <div className="flex gap-2 items-center p-2 border-b-[#1E293B] border-b-2 cursor-pointer hover:bg-[#1E293B]">
          <div className="bg-slate-700 border-white border-2 w-12 h-12 rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={user?.participants[0]?.profilePic || defaultUserPic}
              alt=""
            />
          </div>
          <div>{user?.participants[0]?.username}</div>
        </div>
      ))}
    </div>
  );
};

const Sider = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col h-full bg-[#171f34] border-r-[#1E293B] border-r-2 text-slate-50">
      <UserBio user={user} />
      <div className="bg-[#171f34] p-1 border-b-[#1E293B] border-b-2 text-lg text-slate-300 font-semibold">
        Conversations
      </div>
      <UserList />
    </div>
  );
};

export default Sider;
