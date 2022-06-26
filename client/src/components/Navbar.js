import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, logoutUser } from "../apis/loginSlice";
import { toast } from "react-toastify";
function Navbar() {
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
      <div className="bg-[#001634] h-full md:h-screen  py-4 mb-16">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {},
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ["#ffffff", "#fd79a8", "#00cec9", "#00b894", "#d63031"],
              },
              links: {
                color: ["#ffffff", "#00b894", "#d63031"],
                distance: 150,
                enable: true,
                opacity: 0.7,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: ["circle", "triangle", "star"],
              },
              size: {
                value: { min: 5, max: 8 },
              },
            },
            detectRetina: true,
          }}
        />

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
        <div className="w-[80%] mx-auto ">
          <div className="flex flex-wrap items-center justify-between  text-slate-200 mt-16 md:mt-32 gap-16">
            <div className="flex flex-col flex-2 gap-2">
              <span className="relative text-xl">
                Hello! &nbsp;{" "}
                <span className=" absolute top-4 border-b px-24 border-slate-200"></span>{" "}
              </span>
              <h1 className="text-6xl">I'm Suneel Kumar</h1>
              <div className="text-2xl font-extrabold">
                <Typewriter
                  options={{ loop: true, autoStart: true }}
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(500)
                      .deleteAll()
                      .typeString("A Frontend Developer")
                      .pauseFor(500)
                      .deleteAll()
                      .typeString("React/React Native Developer")
                      .pauseFor(500)
                      .deleteAll()
                      .typeString("NodeJs Developer")
                      .pauseFor(500)
                      .deleteAll()
                      .typeString("Backend Developer")
                      .start();
                  }}
                />
              </div>
              <span className="text-slate-300 text-xl">
                Efficient Frontend and Backend Developer
              </span>
              <p>
                I Like to build efficient & logical backend using NodeJs.I also
                design & code attractive frontend using ReactJs.Technology i
                used are MongoDb as Database,NodeJs and Express as backend and
                ReactJs for Frontend.
              </p>
              <Link to="/contact" className="btn w-32 text-center">Hire me</Link>
            </div>
            <div className="flex flex-1 relative md:ml-0 ml-4 ">
              <div className="box-1">
                <img
                  alt="suneel"
                  className="h-[242px]  w-full object-cover mx-auto rounded-full profile"
                  src="/img/me(1).jpg"
                  // src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg"
                />
              </div>
              <div className="box-2 absolute left-0 top-0"></div>
              <div className="class"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
