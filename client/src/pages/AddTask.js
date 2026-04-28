import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // 🔥 Dynamic Categories
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    category: "",
    color: "violet"
  });

  // 🔹 FETCH categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/categories?userId=${userId}`
        );
        setCategories(res.data);
      } catch (err) {
        console.error("CATEGORY FETCH ERROR 👉", err);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 handle category select
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (value === "ADD_NEW") {
      navigate("/addCategory"); // 🔥 redirect
      return;
    }

    setForm({
      ...form,
      category: value
    });
  };

  useEffect(() => {
  if (!userId) {
    alert("Please login first ❌");
    navigate("/login");
  }
}, []);

  // 🔹 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      alert("Title required ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/todos", {
        userId,
        title: form.title,
        description: form.description,
        deadline: form.deadline,
        category: form.category,
        color: form.color
      });

      console.log("Saved:", res.data);

      alert("Task Created ✅");
      navigate("/dashboard");

    } catch (err) {
      console.error("ERROR 👉", err.response?.data);
      alert(err.response?.data || "Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#2d3561] text-white flex flex-col items-center p-6">

      {/* 🔙 Back */}
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="text-xl mb-4"
        >
          ←
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Add New Task</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-5"
      >

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Task Name *"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        />

        {/* 🔥 Dynamic Category Dropdown */}
        <select
          name="category"
          value={form.category}
          onChange={handleCategoryChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        >
          <option value="" className="text-black">
            Select Category
          </option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat.name} className="text-black">
              {cat.name}
            </option>
          ))}

          {/* 🔥 Add Category option */}
          <option value="ADD_NEW" className="text-black">
            Add Category
          </option>

        </select>

        {/* Color 
        <select
          name="color"
          value={form.color}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        >
          <option className="text-black">violet</option>
          <option className="text-black">blue</option>
          <option className="text-black">green</option>
          <option className="text-black">red</option>
        </select>  */}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:scale-105 transition"
        >
          Create Task
        </button>

      </form>
    </div>
  );
};

export default AddTask;