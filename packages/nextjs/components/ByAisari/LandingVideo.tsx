"use client";
import React from "react";
import mainImage from "./mainImage.jpg";

const LandingVideo = () => {
  return (
    <div 
      className="w-screen h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${mainImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="flex flex-col items-center space-y-4 relative z-10">
        <h1 className="text-white text-6xl font-bold text-center">
          Prove new heights
        </h1>
        <h2 className="text-white text-4xl font-light text-center tracking-wider">
          Easy. Fast. Reliable
        </h2>
      </div>
    </div>
  );
};

export default LandingVideo;
