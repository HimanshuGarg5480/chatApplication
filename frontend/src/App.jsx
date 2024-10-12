import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/Login_Signup/LoginSignupPage";
import Profile from "./pages/Profile/Profile";
const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
