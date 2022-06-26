import React from "react";
import Nav from "./Nav";

function About() {
  return (
    <>
      <Nav text="About me" />
      <div className="about border-t border-dotted border-slate-700 bg-[#011431] text-slate-200 py-16 border-slate-800 border-b shadow-lg">
        <div className="about-card bg-[#001634] w-[95%] md:w-[70%] shadow-lg border border-slate-800 py-8 md:px-8 px-4 flex flex-col md:flex-row justify-center gap-8">
          <div className="about-img flex-1 flex flex-col gap-4 items-center">
            <img
              // src="https://cdn.pixabay.com/photo/2020/03/11/13/50/indian-4922226__340.jpg"
              src="/img/me.jpg"
              alt="suneel-kumar"
            />
          </div>
          <div className="about-details flex-[2_2_0] flex flex-col gap-2 mt-8">
            <span className="font-extrabold text-3xl">Suneel Kumar</span>
            <span>A Full Stack Dev</span>
            <h1 className="font-bold text-slate-300 text-xl">Education - </h1>
            <h2 className="text-xl">
              Pursuing B.TECH in Information Technology
            </h2>
            <h2 className="text-xl">
              <span className="text-slate-300 font-bold">Institute - </span>
              Chatrapati Shahuji Maharaj Kanpur University - Kanpur, Uttar
              Pradesh
            </h2>
            <small>August 2020 to May 2024</small>
            <p className="">
              I Like to build efficient & logical backend using NodeJs.I also
              design & code attractive frontend using ReactJs.Technology i used
              are MongoDb as Database,NodeJs and Express as backend and ReactJs
              for Frontend.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
