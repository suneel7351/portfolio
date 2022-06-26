import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Skill from "./components/Skill";
import Project from "./components/Project";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./apis/user";
import { myProfile } from "./apis/loginSlice";
import AdminPanle from "./components/AdminPanle";
function App() {
  const { isAuthenticate } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(myProfile());
  }, [dispatch]);

  return (
    <div className="bg-[#001634]">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/project" element={<Project />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-panel"
            element={isAuthenticate ? <AdminPanle /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
