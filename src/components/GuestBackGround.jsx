// src/components/GuestBackGround.jsx
import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function GuestBackGround(props) {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate('/');
  }
  return (
    <div className="bg-primary min-h-screen h-screen w-full relative">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-5 left-5 w-[180px] h-[40px]"
        onClick={handleClickLogo}
      />
    </div>
  );
}

export default GuestBackGround;
