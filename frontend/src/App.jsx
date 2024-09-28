import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
