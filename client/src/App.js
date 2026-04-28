import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import AddCategory from "./pages/AddCategory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<Navbar />} />
      <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/addcategory" element={<AddCategory />} />

      </Routes>
    </BrowserRouter>
  );
} 

export default App;