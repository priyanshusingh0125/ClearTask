import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  // 🔥 NEW STATES (ADDED ONLY)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("https://cdn-icons-png.flaticon.com/512/847/847969.png");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // IMAGE HANDLER (ADDED)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields required ❌");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      setUploading(true); // 🔥 START ANIMATION

      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password
        }
      );

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);

      setUploading(false); // 🔥 STOP ANIMATION

      alert("Register Successful ✅");
      navigate("/");

    } catch (err) {
      setUploading(false);
      alert(err.response?.data || "Error ❌");
    }
  };

  const particles = Array.from({ length: 12 });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] px-4">

      {/* 🔥 Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 120, -120, 0], y: [0, -120, 120, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] top-[-100px] left-[-100px]"
      />

      <motion.div
        animate={{ x: [0, -120, 120, 0], y: [0, 120, -120, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px]"
      />

      {/* 🔥 Floating Dots */}
      <div className="absolute inset-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* 🔥 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl p-6 md:p-8 w-full max-w-md text-white"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 
        </h2>

        {/* 🔥 PROFILE IMAGE SECTION (ADDED ONLY) */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />

            {uploading && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <label className="mt-3 text-sm cursor-pointer text-indigo-400 hover:underline">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

  <div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter password"
    value={form.password}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  {/* 👁 Toggle Button */}
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-white/70 hover:text-white"
  >
    {showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeWidth="2" d="M3 3l18 18" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )}
  </button>

</div>

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold shadow-lg"
          >
            Register
          </motion.button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </motion.div>

    </div>
  );
};

export default Register;