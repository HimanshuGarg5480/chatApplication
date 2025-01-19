import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import defaultUserPic from "../assets/defaultUserPic.jpg";
import useApi from "../hooks/useApi";
import { setUser } from "../redux/features/user/userSlice.js";
import { closeProfile } from "../redux/features/user/ProfileSlice.js";

const EditSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
      className="h-4 w-4 stroke-white stroke-2"
    >
      <path d="m13.5 7.5-3-3M1.875 16.125l2.538-.282c.31-.034.465-.052.61-.098.129-.042.251-.1.364-.175.127-.084.238-.194.458-.415L15.75 5.25a2.121 2.121 0 0 0-3-3l-9.905 9.905c-.22.22-.33.33-.415.458a1.5 1.5 0 0 0-.174.364c-.047.145-.065.3-.099.61l-.282 2.538"></path>
    </svg>
  );
};

const Profile = () => {
  const [editShow, setEditShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleToggleProfile = () => {
    dispatch(closeProfile());
  };
  return (
    <div className="absolute h-screen w-screen bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center">
      <div className="overflow-hidden rounded-xl border-2 border-gray-800 bg-gray-900 w-full sm:w-[70%] shadow-lg shadow-black">
        <div className="min-h-[8vh] bg-grey-100 bg-gray-700 sm:min-h-[10vh] md:min-h-[14vh] bg-pattern-banner bg-cover bg-no-repeat bg-center">
          <div className="flex justify-end pr-5 pt-5 text-gray-300 cursor-pointer hover:text-gray-200" onClick={handleToggleProfile}>
            <ImCross />
          </div>
        </div>
        <div className="-mt-12 flex flex-col gap-3 p-4 sm:-mt-14 md:-mt-16 lg:p-6">
          <div className="mx-auto">
            <div className="flex w-auto flex-col items-center flex-wrap gap-4">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={user.profilePic || defaultUserPic}
                alt="image"
              />

              <div className="flex flex-col text-center gap-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-base font-semibold leading-6 text-grey-800 text-gray-50">
                    {user.username}
                  </span>
                </div>
                <span className="text-sm font-medium leading-5 text-grey-500 text-gray-400">
                  {user.email}
                </span>
                {user.bio && (
                  <div className="text-gray-400 mt-5 text-xs">~ {user.bio}</div>
                )}
              </div>
            </div>
          </div>
          {editShow && <EditProfileForm setEditShow={setEditShow} />}
        </div>

        {!editShow && (
          <button
            className="mx-auto flex items-center gap-2 rounded-3xl bg-blue-500 px-5 py-[0.625rem] text-white hover:bg-blue-400 mb-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setEditShow(true);
            }}
          >
            <EditSvg />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const EditProfileForm = ({ setEditShow }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  );
  const [error, setError] = useState(null);

  const { sendRequest, loading } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("profilePic", image);
    formData.append("bio", bio);

    try {
      const response = await sendRequest(
        "/server/v1/api/user/update",
        "POST",
        formData
      );
      dispatch(setUser(response.user));
    } catch (error) {
      console.error("Error uploading the image", error.message);
      setError("Failed to update profile. Please try again.");
    }
    setEditShow(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex items-center justify-center gap-4">
        <div className="">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={
              image ||
              "https://lh3.googleusercontent.com/ogw/AF2bZygVqqURt7fSPlw7t2fWui2oEPyG3UdCxQWyygydjeri3j4=s32-c-mo"
            }
            alt="image"
          />
        </div>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className="p-2 px-5 rounded-full border text-xs sm:text-sm border-gray-600 bg-gray-800 text-gray-200 w-[70%]"
          accept="image/*"
        />
      </div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="p-2 rounded border border-gray-600 bg-gray-800 text-gray-200"
        placeholder="Bio"
        rows="4"
        maxLength={50} // Limit to 50 characters
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-400 flex gap-3 justify-center items-center"
      >
        {loading && (
          <div className="inset-0 flex items-center justify-center ml-2">
            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          </div>
        )}
        Save Changes
      </button>
    </form>
  );
};

export default Profile;
