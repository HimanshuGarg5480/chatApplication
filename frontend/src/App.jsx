import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/Login_Signup/LoginSignupPage";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatPage from "./pages/Chat/ChatPage"
const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/login" element={<LoginSignupPage />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>

  //fields in profile components are hard coded, fix it
  );
};

export default App;
