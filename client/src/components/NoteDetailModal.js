import React from "react";
import { motion, AnimatePresence } from "framer-motion";


const NoteDetailModal = ({ todo, onClose, onToggle, getCategoryColor }) => {

  if (!todo) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 px-4"
      >

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl"
        >

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            ✖
          </button>

          {/* CATEGORY */}
          <span
            className="inline-block text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: getCategoryColor(todo.category) }}
          >
            {todo.category}
          </span>

          {/* TITLE */}
          <h2 className="text-2xl font-bold mt-4">
            {todo.title}
          </h2>

          {/* DESC */}
          <p className="mt-3 text-white/80">
            {todo.description || "No description"}
          </p>

          {/* STATUS */}
          <div className="mt-5">
            {todo.completed ? (
              <span className="px-3 py-1 bg-green-500 rounded-lg">
                Completed
              </span>
            ) : (
              <span className="px-3 py-1 bg-yellow-400 text-black rounded-lg">
                Pending
              </span>
            )}
          </div>

          {/* ACTION */}
          {!todo.completed && (
            <button
              onClick={() => onToggle(todo._id)}
              className="mt-6 w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Mark as Completed
            </button>
          )}

        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default NoteDetailModal;