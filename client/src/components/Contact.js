import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearMessage, contact } from "../apis/loginSlice";
import Nav from "./Nav";

function Contact() {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      return toast.info("Name and Email are mandatory.");
    }
    await dispatch(contact({ name, email, msg }));
    setName(name);
    setEmail(email);
    setMessage("");
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, []);
  return (
    <>
      <Nav text="Contact me" />
      <div className="contact z-50 bg-[#011431] py-16 h-screen border-t border-dotted border-slate-700">
        <div className="md:w-[60%] rounded-lg w-[95%] mx-auto px-6 md:px-8 bg-[#011431] py-8 shadow-2xl border border-slate-800 contact-card">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full md:w-[80%] mx-auto"
          >
            <h1 className="text-3xl text-slate-200 mb-4">Get in Touch</h1>
            <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
              <input
                type="text"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none px-4 py-1 text-slate-200"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="email"
                className="bg-[#001634] w-full flex-1 border border-slate-800 rounded-lg outline:ring-0 outline-none  px-4 py-1 text-slate-200"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <textarea
              className="bg-[#001634] outline:ring-0 outline-none border border-slate-800 rounded-lg shadow-xl py-2 px-4 text-slate-200"
              placeholder="Message"
              rows={5}
              value={msg}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="btn w-full md:w-48" type="submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
