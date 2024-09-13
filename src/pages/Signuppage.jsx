// src/pages/Signuppage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import GuestBackGround from '../components/GuestBackGround';
import profileimage from '../assets/profileimage.png';

function SignUpPage(props) {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
  const [selectedImage, setSelectedImage] = useState(profileimage); // 초기 프로필 이미지를 기본 이미지로 설정

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(imageUrl); // 선택된 이미지를 state에 저장
    }
  };

  return (
    <>
      <GuestBackGround />
      <div className="flex flex-row ml-40 absolute top-[120px] bg-white w-[1100px] h-[600px]">
        <div className="absolute flex flex-col">
          <p className="ml-20 mt-8 text-3xl font-bold">Sign up</p>
          <p className="ml-20 mt-5 text-sm font-normal text-black">
            Hi, Welcome!
          </p>
          <img
            src={selectedImage}
            alt="profileimage"
            className="w-[225px] h-[225px] ml-40 mt-10 object-cover rounded-full"
          />
          {/* 파일 선택 인풋 */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-[190px] mt-5 text-sm font-normal text-blue-500 cursor-pointer"
            style={{ zIndex: 10 }} // Input 요소가 잘 보이도록 z-index 추가
          />
          <button className="ml-[150px] mt-12 text-center p-4 bg-primary-darkblue text-white rounded mt-20 w-[250px] h-[40px] flex items-center justify-center">
            Create an account
          </button>
        </div>
        <div className="absolute flex flex-col">
          {/* name */}
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium ml-[600px] mt-10"
          >
            Name
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          {/* class */}
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Class
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M8 1V0v1Zm4 0V0v1Zm2 4v1h1V5h-1ZM6 5H5v1h1V5Zm2-3h4V0H8v2Zm4 0a1 1 0 0 1 .707.293L14.121.879A3 3 0 0 0 12 0v2Zm.707.293A1 1 0 0 1 13 3h2a3 3 0 0 0-.879-2.121l-1.414 1.414ZM13 3v2h2V3h-2Zm1 1H6v2h8V4ZM7 5V3H5v2h2Zm0-2a1 1 0 0 1 .293-.707L5.879.879A3 3 0 0 0 5 3h2Zm.293-.707A1 1 0 0 1 8 2V0a3 3 0 0 0-2.121.879l1.414 1.414ZM2 6h16V4H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v12h2V6h-2Zm0 12v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V6H0v12h2ZM2 6V4a2 2 0 0 0-2 2h2Zm16.293 3.293C16.557 11.029 13.366 12 10 12c-3.366 0-6.557-.97-8.293-2.707L.293 10.707C2.557 12.971 6.366 14 10 14c3.634 0 7.444-1.03 9.707-3.293l-1.414-1.414ZM10 9v2a2 2 0 0 0 2-2h-2Zm0 0H8a2 2 0 0 0 2 2V9Zm0 0V7a2 2 0 0 0-2 2h2Zm0 0h2a2 2 0 0 0-2-2v2Z"
                />
              </svg>
            </span>
            <select
              id="countries"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-none rounded-e-lg w-[300px] h-11 focus:ring-blue-500 focus:border-blue-500 block dark:bg-white dark:border-gray-300 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected value="FrontEnd">
                FrontEnd
              </option>
              <option value="BackEnd">BackEnd</option>
            </select>
          </div>
          {/* email */}
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Email
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* password */}
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Password
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex mb-6 ml-[600px] mt-1">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
