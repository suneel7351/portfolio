import React, { useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, loginUser } from "../apis/loginSlice";
import Nav from "./Nav";
function Login() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
      <Nav text="Login to continue" />
      <div className="login z-50 bg-[#011431] py-16 h-screen border-t border-dotted border-slate-700">
        <div className="login-card md:w-[30%] rounded-lg w-[90%] mx-auto px-6 md:px-8 bg-[#011431] py-8 shadow-2xl border border-slate-800">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-full md:w-[95%] mx-auto"
          >
            <h1 className="text-3xl text-slate-200 mb-4">Login to continue</h1>
            <div className="flex flex-col gap-4 items-center ">
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none  px-4 py-1 text-slate-200"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <input
                type="password"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none  px-4 py-1 text-slate-200"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn w-full md:w-24">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
