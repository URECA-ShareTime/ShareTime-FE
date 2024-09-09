// src/components/GuestBackGround.jsx
import React from 'react';
import logo from '../assets/logo.png';

function GuestBackGround(props) {
  return (
    <div className="bg-primary min-h-screen h-screen w-full relative">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-5 left-5 w-[180px] h-[40px]"
      />
    </div>
  );
}

export default GuestBackGround;
