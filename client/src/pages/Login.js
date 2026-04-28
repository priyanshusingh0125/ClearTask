import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/login',
        {
          email: form.email,
          password: form.password
        }
      );

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);

      alert('Login Successful');
      navigate('/');

    } catch (err) {
      alert(err.response?.data || 'Error ❌');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">

      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* 🔥 Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* 🔥 LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl p-8 w-full max-w-md text-white"
      >

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/70 mb-6 text-sm">
          Login to continue your productivity journey 
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
  <label className="block mb-1 text-sm">Password</label>

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter password"
    value={form.password}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
  />

{/* 👁 Toggle Button */}
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-[38px] text-white/70 hover:text-white"
>
  {showPassword ? (
    // 👁‍🗨 Eye OFF (hide password)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3l18 18M10.584 10.587a2 2 0 002.829 2.828M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 4 9 7 0 1.3-.8 2.8-2.1 4.1M6.1 6.1C4.8 7.4 4 8.9 4 10c0 3 4 7 8 7 1.1 0 2.2-.2 3.2-.6"
      />
    </svg>
  ) : (
    // Eye ON (show password)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  )}
</button>

</div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold shadow-lg hover:opacity-90 transition"
          >
            Login
          </motion.button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-white/20" />
          <span className="text-xs text-white/50">OR</span>
          <div className="flex-1 h-[1px] bg-white/20" />
        </div>

        {/* Register */}
        <p className="text-center text-sm">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="ml-1 text-indigo-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>

      </motion.div>

    </div>
  );
};

export default Login;