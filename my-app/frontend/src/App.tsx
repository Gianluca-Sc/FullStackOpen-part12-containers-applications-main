import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";

import Login from "./pages/Login.tsx";

import Home from "./pages/Home.tsx";
import SingleBlog from "./pages/SingleBlog.tsx";
import CreateBlog from "./pages/CreateBlog.tsx";
import Authors from "./pages/Authors.tsx";
import Signup from "./pages/Signup.tsx";
import SingleUser from "./pages/SingleUser.tsx";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/users/:id" element={<SingleUser />} />
      </Routes>
    </div>
  );
}

export default App;
