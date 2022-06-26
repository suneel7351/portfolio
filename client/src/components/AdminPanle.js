import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./App.css";
import { Link } from "react-router-dom";
import { MdOutlineTimeline } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearMessage, updateData } from "../apis/loginSlice";
function AdminPanle() {
  const { error, message } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState({});
  const [about, setAbout] = useState({});
  const hanldeSubmit = (e) => {
    e.preventDefault();
    dispatch(updateData(name, email, password, about, skills));
  };
  const handleAboutImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAbout(...about, { avatar: reader.result });
      }
    };
  };
  const handleSkillImage = (e, value) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (value === 1) {
          setSkills(...skills, { skill1: reader.result });
        }
        if (value === 2) {
          setSkills(...skills, { skill2: reader.result });
        }
        if (value === 3) {
          setSkills(...skills, { skill3: reader.result });
        }
        if (value === 4) {
          setSkills(...skills, { skill4: reader.result });
        }
        if (value === 5) {
          setSkills(...skills, { skill5: reader.result });
        }
        if (value === 6) {
          setSkills(...skills, { skill6: reader.result });
        }
      }
    };
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, []);
  return (
    <>
      <Nav text={"Admin Panel"} />
      <div className="admin-panel bg-[#011431] py-16">
        <div className="admin-panel-card md:w-[60%] rounded-lg w-[95%] mx-auto px-6 md:px-8 bg-[#011431] py-8 shadow-2xl border border-slate-800">
          <form
            onSubmit={hanldeSubmit}
            className="flex flex-col gap-8 w-full md:w-[80%] mx-auto"
          >
            <div className="name-email flex flex-col gap-6 border-slate-800 border p-4">
              <h1 className="text-3xl text-slate-200">Personal Info</h1>
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="skill-div flex flex-col gap-6 border-slate-800 border p-4">
              <h1 className="text-3xl text-slate-200">Skill</h1>
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 1)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 2)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 3)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 4)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 5)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 1)}
              />
              <input
                type="file"
                accept="images/*"
                name=""
                id=""
                className="skill-file bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={(e) => handleSkillImage(e, 6)}
              />
            </div>
            <div className="about-div flex flex-col gap-6 border-slate-800 border p-4">
              <h1 className="text-3xl text-slate-200">About</h1>
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Name"
              />
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Description"
              />
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Title"
              />
              <input
                type="file"
                accept="images/*"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                onChange={handleAboutImage}
              />
            </div>
            <div className="timeline-project flex flex-col gap-4 text-slate-200 text-2xl">
              <Link
                to="/admin/timeline"
                className="timeline-project-link flex bg-[#001634] border border-slate-800 py-4 px-4 w-[160px] shadow-md"
              >
                Timeline <MdOutlineTimeline className="ml-2" />
              </Link>
              <Link
                to="/admin/project"
                className="timeline-project-link flex bg-[#001634] border border-slate-800 py-4 px-4 w-[160px] shadow-md"
              >
                Projects <AiOutlineFundProjectionScreen className="ml-2" />
              </Link>
            </div>
            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminPanle;
