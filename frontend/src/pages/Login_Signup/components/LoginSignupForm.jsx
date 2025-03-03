import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoading,
  setError as setUserError,
} from "../../../redux/features/user/userSlice.js"
import useApi from "../../../hooks/useApi";

const LoginSignupForm = ({ page }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { sendRequest, loading } = useApi();
  const dispatch = useDispatch();
  const {loading: reduxLoading} = useSelector(
    (state) => state.user
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (page === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await sendRequest(
        `/server/v1/api/user/${page}`,
        "POST",
        formData
      );

      if (response.error) throw new Error(response.error);

      dispatch(
       setUser(response)
      );
      navigate("/");
    } catch (err) {
      dispatch(
        setUserError(err.message)
      );
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0F172A] rounded-lg py-4 px-4 h-fit flex flex-col"
    >
      <div className="text-[1.4rem] font-bold leading-[2rem] tracking-[-2%] text-dark-100 dark:text-grey-50 lg:text-[2.25rem] lg:leading-[2rem]">
        <div>Hey! 👋</div>
        <div>
          Welcome to <span className="text-blue-500">Connectly</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 w-[90%] mx-auto">
        {page === "signup" && (
          <div className="w-full">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              className="rounded-md bg-[#1E293B] border border-[#334155] leading-10 pl-2 w-full"
              placeholder="Enter your email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
        <label htmlFor="username" className="block ">
          Username
        </label>
        <input
          id="username"
          className="rounded-md bg-[#1E293B] border border-[#334155] leading-10 pl-2 w-full"
          placeholder="Enter your username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
        </div>

        <div>
        <label htmlFor="password" className="block ">
          Password
        </label>
        <input
          id="password"
          className="rounded-md bg-[#1E293B] border border-[#334155] leading-10 pl-2 w-full"
          placeholder="Enter the password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>

        {page === "signup" && (
          <div>
            <label htmlFor="confirmPassword" className="block ">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="rounded-md bg-[#1E293B] border border-[#334155] leading-10 pl-2 w-full"
              placeholder="Re-enter the password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-md mt-2 flex justify-center gap-3"
          disabled={loading || reduxLoading}
        >
          {loading && (
            <div className="inset-0 flex items-center justify-center ml-2">
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            </div>
          )}
          {page === "login" ? "Login" : "Sign Up"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      <div className="text-center mt-1">
        {page == "login"
          ? "Do not have an Account ?"
          : "Already have an Account ?"}
        <Link to={`/${page == "login" ? "signup" : "login"}`}>
          <span className="text-blue-500">
            &nbsp;{page == "login" ? "signup" : "login"}
          </span>
        </Link>
      </div>
    </form>
  );
};

export default LoginSignupForm;
