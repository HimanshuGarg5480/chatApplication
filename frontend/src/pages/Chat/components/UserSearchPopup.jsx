import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../../../redux/features/uiSlice/UiSlice";
import useApi from "../../../hooks/useApi";
import defaultUserPic from "../../../assets/defaultUserPic.jpg";
import { notifyError, notifySuccess } from "../../../components/Error";

export default function UserSearchPopup() {
  const dispatch = useDispatch();
  let { isSearchVisible } = useSelector((state) => state.ui);
  const { sendRequest, loading } = useApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);

  const handleToggleSerch = () => {
    dispatch(toggleSearch());
  };

  const getSearchUser = async () => {
    try {
      const response = await sendRequest(
        `/server/v1/api/user/search?name=${searchTerm}`,
        "GET"
      );

      console.log(response);
      setSearchedUser(response);
    } catch (error) {
      console.log("error while serching the user", error);
    }
  };

  const handleInvitationRequest = async (user) => {
    try {
      await sendRequest(`/server/v1/api/invitations/${user._id}/send`, "POST");
      notifySuccess("request send")
    } catch (error) {
      console.log("error while send invitation to the user", error);
      notifyError(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchUser();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  if (!isSearchVisible) return null;

  return (
    <div className="absolute h-screen w-screen z-50 bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center">
      <div className="w-full max-w-md rounded-lg p-6 shadow-lg bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Search User
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            onClick={handleToggleSerch}
          >
            ✖
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 21l-4.35-4.35M11 6a5 5 0 0 1 5 5m3 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0" />
          </svg>
        </div>

        {/* User List */}
        <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto">
          {searchedUser.length > 0 ? (
            searchedUser.map((user) => (
              <div
                key={user._id}
                className="flex gap-3 justify-between items-center p-3 border-b-[#1E293B] border-b-2"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-700 border-white border-2 w-12 h-12 rounded-full overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={user.profilePic || defaultUserPic}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1 cursor-pointer text-white">
                    <div>{user.username}</div>
                  </div>
                </div>
                <button
                  className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInvitationRequest(user);
                  }}
                >
                  Request
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}
