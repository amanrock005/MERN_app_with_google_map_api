import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ManualAddress from "./pages/ManualAddress";
import { Toaster } from "react-hot-toast";

import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Man from "./pages/Man";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = userAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        {/* <Route path="/manual-address" element={<ManualAddress />} /> */}
        <Route path="/manual-address" element={<Man />} />
      </Routes>
      <Toaster />
    </div>
  );
}
