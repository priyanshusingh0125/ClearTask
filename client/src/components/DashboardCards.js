import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const API = process.env.REACT_APP_API_URL;


const DashboardCards = () => {

  const navigate = useNavigate();
 const userId = localStorage.getItem("userId");
 const userImage = localStorage.getItem("userImage");

  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const isCompleted = total > 0 && completed === total;

    // 🔥 GET USER FROM LOCAL STORAGE
  const userName = localStorage.getItem("userName");

  const user = {
  name: userName || "Guest",
  image: userImage
    ? `${API}/${userImage}`
    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
};

  // FETCH TODOS
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(
          `${API}/api/todos?userId=${userId}`
        );

        const todos = res.data;

        setTotal(todos.length);

        const completedCount = todos.filter(
          (todo) => todo.completed
        ).length;

        setCompleted(completedCount);

      } catch (err) {
        console.error("DASHBOARD ERROR 👉", err);
      }
    };

    fetchTodos();
  }, []);

  // CLOCK
  const hourRef = useRef();
  const minRef = useRef();
  const secRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hr = now.getHours();

      if (secRef.current && minRef.current && hourRef.current) {
        secRef.current.style.transform =
          `translate(-50%, -100%) rotate(${sec * 6}deg)`;

        minRef.current.style.transform =
          `translate(-50%, -100%) rotate(${min * 6}deg)`;

        hourRef.current.style.transform =
          `translate(-50%, -100%) rotate(${hr * 30 + min / 2}deg)`;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddTask = () => {
    navigate("/addTask");
  };

  return (
    <div className="p-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >

        {/* 1. PROGRESS */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white shadow-2xl overflow-hidden flex items-center justify-center min-h-[320px]"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

            <div className="relative w-32 h-32 mb-4">

              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="white"
                  strokeWidth="10"
                  fill="none"
                  opacity="0.1"
                />

                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#grad)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={351}
                  strokeDashoffset={351 - (351 * percent) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 351 }}
                  animate={{ strokeDashoffset: 351 - (351 * percent) / 100 }}
                  transition={{ duration: 1 }}
                />

                <defs>
                  <linearGradient id="grad">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {percent}%
              </div>

            </div>

            <p className="text-center text-sm">
              {completed} / {total} tasks completed
            </p>

            <p className="text-xs opacity-70 mt-2 text-center">
              {isCompleted
                ? " All tasks completed!"
                : "Keep pushing forward "}
            </p>

            <button
              onClick={handleAddTask}
              className="mt-4 px-5 py-2 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              + Add Task
            </button>

          </div>

        </motion.div>

{/* 2. CLOCK FIXED */}
<motion.div
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  whileHover={{ rotate: 2, scale: 1.05 }}
  className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white shadow-2xl flex items-center justify-center"
>

  <div className="relative aspect-square w-full max-w-[200px] flex items-center justify-center">

    {/* CLOCK CIRCLE */}
    <div className="absolute inset-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl" />

    {/* NUMBERS (FIXED INSIDE CIRCLE) */}
    {[...Array(12)].map((_, i) => {
      const angle = (i + 1) * 30;
      return (
        <div
          key={i}
          className="absolute text-sm font-semibold"
          style={{
            transform: `rotate(${angle}deg) translate(0, -85px) rotate(-${angle}deg)`
          }}
        >
          {i + 1}
        </div>
      );
    })}

    {/* HANDS */}
    <div
      ref={hourRef}
      className="absolute w-[4px] h-[30%] bg-white rounded-full top-1/2 left-1/2 origin-bottom"
      style={{ transform: "translate(-50%, -100%)" }}
    />

    <div
      ref={minRef}
      className="absolute w-[3px] h-[40%] bg-white rounded-full top-1/2 left-1/2 origin-bottom"
      style={{ transform: "translate(-50%, -100%)" }}
    />

    <div
      ref={secRef}
      className="absolute w-[2px] h-[45%] bg-pink-400 rounded-full top-1/2 left-1/2 origin-bottom"
      style={{ transform: "translate(-50%, -100%)" }}
    />

    {/* CENTER DOT */}
    <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />

  </div>

</motion.div>

        {/* 3. CALENDAR */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white shadow-2xl"
        >

          <h3 className="text-lg font-semibold mb-4">📅 Calendar</h3>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i) => (
              <div key={i} className="opacity-70">{d}</div>
            ))}

            {[...Array(30)].map((_, i) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                key={i}
                className={`p-2 rounded-lg cursor-pointer ${
                  i === new Date().getDate() - 1
                    ? "bg-white text-black font-bold"
                    : "bg-white/10"
                }`}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* 4. PROFILE */}
         <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-white shadow-2xl 
      flex flex-col items-center justify-center text-center min-h-[280px]"
    >

      {/* 🔥 PROFILE IMAGE */}
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={user.image}
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
        alt="profile"
      />

      {/* 🔥 USER NAME */}
      <h3 className="mt-4 text-lg font-semibold">
        {user.name}
      </h3>

      {/* 🔥 BUTTON */}
      <button className="mt-4 px-5 py-2 bg-white text-black rounded-xl hover:scale-105 transition">
        Edit Profile
      </button>

    </motion.div>

      </motion.div>

    </div>
  );
};

export default DashboardCards;