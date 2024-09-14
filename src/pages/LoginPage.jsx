// src/pages/Loginpage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import GuestBackGround from '../components/GuestBackGround'; // GuestBackGround 컴포넌트 임포트
import loginimg from '../assets/loginimg.png';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 요청 핸들러
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        alert('로그인 성공!');
        
        navigate('/main'); // 로그인 성공 후 이동할 페이지로 이동

      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <div className="relative">
      <GuestBackGround />
      <div className="absolute top-20 left-0 w-full h-full flex flex-col items-left z-10">
        <p className="text-left ml-20 mt-4 text-3xl font-bold text-black">
          Login now
        </p>
        <p className="text-left ml-20 mt-2 text-sm font-normal text-black">
          Hi, Welcomeback :
        </p>
      </div>
      <div className="flex flex-row ml-20 absolute top-60">
        <div className="flex flex-col w-full h-full items-left z-10">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your Email
          </label>
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              name="email"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[540px] ps-10 p-2.5"
              placeholder="name@flowbite.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <div className="flex mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[500px] text-sm border-gray-300 p-2.5"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleLogin}
            className="mt-15 text-center p-4 bg-primary-darkblue text-white rounded mt-20 w-[540px] h-[40px] flex items-center justify-center"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <p className="mt-4 text-sm ml-40">
            Not registered yet?{' '}
            <a href="/user/signup" className="text-blue-500">
              Create an account
            </a>
          </p>
        </div>
        <img
          src={loginimg}
          alt="loginimg"
          className="w-[400px] h-[400px] ml-40 mt-[-50px]"
        />
      </div>
    </div>
  );
}

export default LoginPage;
