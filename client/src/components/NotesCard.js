import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import NoteDetailModal from "./NoteDetailModal";

const NotesCards = () => {

    const userId = localStorage.getItem("userId");

    const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [selectedTodo, setSelectedTodo] = useState(null);

    // FETCH TODOS
    const fetchTodos = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5001/api/todos?userId=${userId}`
            );
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // FETCH CATEGORIES
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

    const getCategoryColor = (categoryName) => {
        const found = categories.find((cat) => cat.name === categoryName);
        return found ? found.color : "#6b7280";
    };

    useEffect(() => {
        fetchTodos();
        fetchCategories();
    }, []);

    const handleToggle = async (id) => {
        try {
            await axios.put(
                `http://localhost:5001/api/todos/toggle/${id}`
            );
            fetchTodos();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTodos = todos.filter((todo) => {

        const matchesSearch =
            todo.title.toLowerCase().includes(search.toLowerCase()) ||
            (todo.description || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "" ||
            todo.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6">

            {/* SEARCH */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-5xl mx-auto">

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white"
                >
                    <option value="" className="text-black">
                        All Categories
                    </option>

                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.name} className="text-black">
                            {cat.name}
                        </option>
                    ))}
                </select>

            </div>

            {/* CARDS */}
            <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredTodos.length === 0 ? (
                    <p className="text-white text-center col-span-full text-lg">
                        No Tasks Found
                    </p>
                ) : (
                    filteredTodos.map((todo) => (

                        <motion.div
                            key={todo._id}
                            onClick={() => setSelectedTodo(todo)} // 🔥 open modal
                            whileHover={{ scale: 1.05 }}
                            className="overflow-auto cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-xl flex flex-col justify-between h-[240px]"
                        >

                            {/* CATEGORY */}
                            <span
                                className="text-xs px-3 py-1 rounded-full w-fit"
                                style={{ backgroundColor: getCategoryColor(todo.category) }}
                            >
                                {todo.category}
                            </span>

                            {/* CONTENT */}
                            <div>
                                <h3 className="mt-3 font-semibold truncate">
                                    {todo.title}
                                </h3>

                                <p className="text-sm mt-2 opacity-70 line-clamp-2">
                                    {todo.description}
                                </p>
                            </div>

                            {/* BUTTON */}
                            <div className="mt-4">

                                {todo.completed ? (
                                    <button
                                        onClick={(e) => e.stopPropagation()} // ❗ modal open na ho
                                        className="w-full py-2 rounded-xl bg-green-500 font-medium"
                                    >
                                        ✅ Completed
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // ❗ modal open na ho
                                            handleToggle(todo._id);
                                        }}
                                        className="w-full py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
                                    >
                                        Mark as Completed
                                    </button>
                                )}

                            </div>

                            {/* LEFT COLOR STRIP */}
                            <div
                                className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                                style={{
                                    backgroundColor: getCategoryColor(todo.category),
                                }}
                            />

                        </motion.div>
                    ))
                )}

            </motion.div>

            {/* MODAL */}
            <NoteDetailModal
                todo={selectedTodo}
                onClose={() => setSelectedTodo(null)}
                onToggle={handleToggle}
                getCategoryColor={getCategoryColor}
            />

        </div>
    );
};

export default NotesCards;