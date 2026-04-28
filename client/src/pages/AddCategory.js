import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const navigate = useNavigate();

 const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    name: "",
    color: "#8b5cf6"
  });

  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔹 LOAD FROM BACKEND
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/categories?userId=${userId}`
      );
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Login required ❌");
    navigate("/login");
  }
}, []);

  // 🔹 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 submit (ADD / EDIT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Category name required ❌");
      return;
    }

    try {
      if (editId) {
        // ✏️ UPDATE
        await axios.put(
          `http://localhost:5001/api/categories/${editId}`,
          form
        );
        setEditId(null);
      } else {
        // ➕ ADD
        await axios.post("http://localhost:5001/api/categories", {
          userId,
          name: form.name,
          color: form.color
        });
      }

      setForm({
        name: "",
        color: "#8b5cf6"
      });

      fetchCategories();
      alert("Saved ✅");

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  // 🔹 delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/categories/${id}`
      );
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 edit
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      color: cat.color
    });
    setEditId(cat._id);
  };

  return (
    <div className="min-h-screen bg-[#2d3561] text-white flex flex-col items-center p-6">

      {/* 🔙 Back */}
      <div className="w-full max-w-3xl">
        <button onClick={() => navigate(-1)} className="text-xl mb-4">
          ←
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Categories</h2>

      {/* 🔥 CATEGORY LIST */}
      <div className="w-full max-w-3xl space-y-4 mb-8">

        {categories.length === 0 && (
          <p className="text-white/60 text-center">
            No categories yet
          </p>
        )}

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex justify-between items-center p-4 rounded-2xl text-black font-semibold"
            style={{ backgroundColor: cat.color }}
          >

            {/* Left */}
            <div className="flex items-center gap-3">
              <span className="text-lg">{cat.name}</span>
            </div>

            {/* Right Actions */}
            <div className="flex gap-3">

              {/* Edit */}
              <button
                onClick={() => handleEdit(cat)}
                className="w-10 h-10 rounded-full bg-black/40 text-white"
              >
                ✏
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(cat._id)}
                className="w-10 h-10 rounded-full bg-black/40 text-red-400"
              >
                🗑
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Category name *"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
        />

        {/* Color Picker */}
        <div className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 space-y-4">

          <p className="text-sm text-white/70">Pick Category Color</p>

          <input
            type="color"
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value })
            }
            className="w-full h-16 rounded-xl cursor-pointer"
          />

          <input
            type="text"
            value={form.color}
            onChange={(e) =>
              setForm({ ...form, color: e.target.value })
            }
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 outline-none"
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-semibold hover:scale-105 transition"
        >
          {editId ? "Update Category" : "Create Category"}
        </button>

      </form>
    </div>
  );
};

export default AddCategory;