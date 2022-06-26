import React, { useRef, useEffect } from "react";
import "./App.css";
import {
  SiReact,
  SiJava,
  SiJavascript,
  SiCss3,
  SiExpress,
  SiHtml5,
  SiTailwindcss,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";

function Skill() {
  const skillBox = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        skillBox.current.style.animationName = "skillAnimationOn";
      } else {
        skillBox.current.style.animationName = "skillAnimationOff";
      }
    });
  }, []);

  return (
    <>
      <div className="skill bg-[#001634]">
        <h1 className="text-slate-100 text-7xl top-0 mb-32">My Skills</h1>
        <div className="skillContainer">
          <div className="skillFaces skillFaces-1">
            <img src="/img/node1.jpg" alt="suneel" />
          </div>{" "}
          <div className="skillFaces skillFaces-2">
            <img src="/img/react.png" alt="suneel" />
          </div>{" "}
          <div className="skillFaces skillFaces-3">
            <img src="/img/mern1.jpg" alt="suneel" />
          </div>{" "}
          <div className="skillFaces skillFaces-4">
            <img src="/img/npm.jpg" alt="suneel" />
          </div>{" "}
          <div className="skillFaces skillFaces-5">
            <img src="/img/1555172.jpg" alt="suneel" />
          </div>
          <div className="skillFaces skillFaces-6">
            <img src="/img/mern3.jpg" alt="suneel" />
          </div>
        </div>
        <div className="cubeShadow bg-slate-800 "></div>
        <div
          className="skillsIcons flex flex-col items-center bg-slate-700 py-4 px-4 shadow-lg border border-slate-600"
          ref={skillBox}
        >
          <SiHtml5 />
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiCss3 />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiJavascript />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiTailwindcss />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiReact />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <FaNodeJs />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiJava />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
          <SiExpress />{" "}
          <div className="percentage">
            <div className="innerProgress"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skill;
