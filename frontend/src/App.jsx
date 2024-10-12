import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/Login_Signup/LoginSignupPage";
const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
