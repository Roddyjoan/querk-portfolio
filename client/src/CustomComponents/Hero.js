import React from 'react';
import { Link } from 'react-router-dom';

function Hero({ title, subtitle, buttonOneText, buttonOneLink, buttonTwoText, buttonTwoLink, imageSrc }) {
  return (
    <div className="relative w-full h-96">
      <div className="absolute inset-0 z-10 bg-blue-500" style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)" }}>
        <div className="p-10">
          <h1 className="text-4xl text-white">{title}</h1>
          <p className="text-xl text-white">{subtitle}</p>
          <div className="mt-4 space-y-2">
            <Link to={buttonOneLink} className="hero-btn bg-white text-blue-500">{buttonOneText}</Link>
            <Link to={buttonTwoLink} className="hero-btn bg-white text-blue-500">{buttonTwoText}</Link>
          </div>
        </div>
      </div>
      <img className="absolute inset-0 z-0 h-full w-full object-cover" src={imageSrc} alt="" />
    </div>
  );
}

export default Hero;
