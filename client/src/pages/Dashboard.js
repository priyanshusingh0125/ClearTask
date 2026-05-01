import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import NotesCards from "../components/NotesCard";
const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const userId = localStorage.getItem("userId");

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(
              `${API}/api/todos?userId=${userId}`
      );
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ➕ Add / Update Todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${API}/api/todos/${editId}`,
          { title }
        );
        setEditId(null);
      } else {
        await axios.post(`${API}/api/todos`, {
          userId,
          title
        });
      }

      setTitle("");
      fetchTodos();

    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/todos/${id}`);
    fetchTodos();
  };

  // Toggle
  const handleToggle = async (id) => {
    await axios.put(
      `${API}/api/todos/toggle/${id}`
    );
    fetchTodos();
  };

  //  Edit
  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] " >
      <Navbar />
      <DashboardCards />
      <NotesCards />
    </div>      
  );
};

export default Dashboard;