import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

  const navigate = useNavigate();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  //  REAL USER (FROM LOCAL STORAGE)
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const userImage = localStorage.getItem("userImage"); // 🔥 ADDED

  const user = {
    name: userName || "Guest",
    isLoggedIn: !!userId
  };

  //  LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage"); // 🔥 ADDED
    navigate("/login");
  };

  // LOGIN REDIRECT
  const handleLogin = () => {
    navigate("/login");
  };

  // MENU STATE
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full px-4 md:px-6 py-4">

      <div className="w-full">

        {/* Header */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 md:px-6 py-4 shadow-lg">

          {/* 🔹 Left Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-2xl font-semibold text-white truncate">
              👋 {getGreeting()}, {user.isLoggedIn ? user.name : "Guest"}
            </h1>

            <p className="text-xs md:text-sm text-white/70 mt-1 tracking-wide">
              Be efficient, be productive.
            </p>
          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-4">

            {/* Logout/Login */}
            <div className="hidden md:block">
              {user.isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:scale-105 transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:scale-105 transition"
                >
                  Login
                </button>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="group relative flex items-center justify-center w-11 h-11 rounded-xl 
              bg-white/10 backdrop-blur-xl border border-white/20 
              hover:bg-white/20 transition duration-300 shadow-lg"
            >

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-md transition"></div>

              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
              </svg>

            </button>

          </div>

        </div>

      </div>

      {/* 🔥 DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* 🔥 RIGHT DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full z-50 p-6 flex flex-col justify-between
              bg-white/10 backdrop-blur-2xl border-l border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
            >

              {/* TOP */}
              <div>

                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-white text-xl font-semibold">
                    Todo App
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-xl hover:rotate-90 transition"
                  >
                    ✖
                  </button>
                </div>

                {/* MENU ITEMS */}
                <div className="flex flex-col gap-6 text-white text-lg">

                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 hover:text-indigo-400 transition"
                  >
                    Tasks
                  </button>

                  <button
                    onClick={() => navigate("/addtask")}
                    className="flex items-center gap-3 hover:text-indigo-400 transition"
                  >
                    Add Task
                  </button>

                  <button
                    onClick={() => navigate("/addcategory")}
                    className="flex items-center gap-3 hover:text-indigo-400 transition"
                  >
                    Categories
                  </button>

                </div>

              </div>

              {/* BOTTOM */}
              <div className="space-y-4">

                {user.isLoggedIn && (
                  <div className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded-xl border border-white/20">
                    <img
                      src={userImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-white">{user.name}</span>
                  </div>
                )}

                {user.isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white"
                  >
                    Login
                  </button>
                )}

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Navbar;