import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, logoutUser } from "../apis/loginSlice";
import { toast } from "react-toastify";

function Nav({ text }) {
  const dispatch = useDispatch();
  const { isAuthenticate, message, error } = useSelector(
    (state) => state.login
  );
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  const menu = useRef(null);
  const middle = useRef(null);
  const upper = useRef(null);
  const lower = useRef(null);
  const [width, setWidth] = useState(window.screen.width);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, message]);
  const handleMenubar = () => {
    menu.current.classList.toggle("open");
    if (!isActive) {
      upper.current.style.transform = "rotate(45deg)";
      middle.current.style.opacity = "0";
      lower.current.style.transform = "rotate(-45deg)";
      setIsActive(true);
    } else {
      upper.current.style.transform = "rotate(0deg)";
      middle.current.style.opacity = "1";
      lower.current.style.transform = "rotate(0deg)";
      setIsActive(false);
    }
  };
  const handleMenu = () => {
    if (width <= 700) {
      menu.current.classList.remove("open");
      upper.current.style.transform = "rotate(0deg)";
      middle.current.style.opacity = "1";
      lower.current.style.transform = "rotate(0deg)";
    }
  };

  return (
    <>
      {" "}
      <div className="bg-[#001634] h-[100px] py-4 mb-16">
        <div className="flex justify-between items-center py-2 w-[90%] mx-auto">
          <div
            className={
              width <= 700
                ? "flex items-center text-orange-500 brand"
                : "flex items-center text-orange-500"
            }
          >
            Portfolio
          </div>

          <div
            onClick={handleMenubar}
            className={
              width <= 700
                ? "homeburger flex flex-col px-4 py-0 cursor-pointer gap-2"
                : "hidden"
            }
          >
            <span className="homeburger-line " ref={upper}></span>
            <span className="homeburger-line " ref={middle}></span>
            <span className="homeburger-line " ref={lower}>
              {" "}
            </span>
          </div>
          <ul
            ref={menu}
            className={
              width <= 700
                ? `menu text-slate-200 flex flex-col items-center justify-center gap-4 nav-list`
                : `text-slate-200 flex items-center justify-center gap-4`
            }
          >
            <li>
              <Link
                onClick={handleMenu}
                className="hover:text-orange-500 duration-150 link"
                to="/"
              >
                Home
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={handleMenu}
                className="hover:text-orange-500 duration-150 link"
                to="/about"
              >
                About
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={handleMenu}
                className="hover:text-orange-500 duration-150 link"
                to="/contact"
              >
                Contact
              </Link>
            </li>{" "}
            <li>
              <Link
                onClick={handleMenu}
                className="hover:text-orange-500 duration-150 link"
                to="/project"
              >
                Projects
              </Link>
            </li>
            <li>
              {isAuthenticate === false ? (
                <Link
                  onClick={handleMenu}
                  className="hover:text-orange-500 duration-150"
                  to="/login"
                >
                  <FaUserAlt />
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hover:text-orange-500 duration-150 link"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="mx-auto w-[80%] mt-4">
          <h1 className="text-slate-200 text-5xl">{text}</h1>
        </div>
      </div>
    </>
  );
}

export default Nav;
