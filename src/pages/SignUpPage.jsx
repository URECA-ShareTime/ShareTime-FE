
// SignUpPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestBackGround from '../components/GuestBackGround';
import profileimage from '../assets/profileimage.png';
import axios from 'axios';

function SignUpPage() {
  const navigate = useNavigate();

  const [profile_picture, setProfile_picture] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    class_id: 1,

    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  // 이미지 파일 선택 핸들러

  // 이메일 형식 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name === 'class_id' ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };


  const handleSignup = async () => {
    // 이메일 형식 확인
    if (!validateEmail(formData.email)) {
      setError('이메일 형식이 맞지 않습니다.');
      return;
    }

    const data = new FormData();
    data.append('profileimg', profile_picture);
    data.append('name', formData.name);
    data.append('class_id', formData.class_id);
    data.append('email', formData.email);
    data.append('password', formData.password);


    try {
      const response = await axios.post(
        'http://localhost:8080/user/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',

          },
        }
      );

      if (response.status === 200) {
        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/user/login');
      }
    } catch (error) {

      if (error.response) {
        const message = error.response.data;

        // 서버 응답 메시지에 따라 에러 메시지를 설정
        if (message.includes('email')) {
          setError('이미 사용중인 메일입니다.');
        } else if (message.includes('이메일 형식이 맞지 않습니다')) {
          setError('이메일 형식이 맞지 않습니다.');
        } else if (error.response.status >= 500) {
          setError(
            '서버 측의 문제로 회원가입에 실패했습니다. 서버 관리자에게 문의하세요.'
          );
        } else {
          setError('이미 사용중인 메일입니다.');
        }
      } else if (error.request) {
        setError('서버와의 통신에 실패했습니다. 네트워크 상태를 확인하세요.');
      } else {

        setError(`회원가입에 실패했습니다. 사유: ${error.message}`);
      }
    }
  };

  const handleImageChange = (e) => { // 이미지 파일 선택 핸들러 일단 야매로 넣음
    const imageFile = e.target.files[0];
    setProfile_picture(imageFile);
  }

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
            src={
              profile_picture
                ? URL.createObjectURL(profile_picture)
                : profileimage
            }
            alt="profileimage"
            className="w-[225px] h-[225px] ml-40 mt-10 object-cover rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="ml-[190px] mt-5 text-sm font-normal text-blue-500 cursor-pointer"
            style={{ zIndex: 10 }}
          />
          <button
            onClick={handleSignup}

            className="ml-[150px] mt-12 text-center p-4 bg-primary-darkblue text-white rounded  w-[250px] h-[40px] flex items-center justify-center"

          >
            Create an account
          </button>
        </div>
        <div className="absolute flex flex-col">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium ml-[600px] mt-10"
          >
            Name
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <input
              type="text"
              id="name"
              name="name"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <label
            htmlFor="class"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Class
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <select
              id="class"
              name="class_id"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-none rounded-e-lg w-[300px] h-11 focus:ring-blue-500 focus:border-blue-500 block"
              value={formData.class_id}
              onChange={handleChange}
            >
              <option value={1}>FrontEnd</option>
              <option value={2}>BackEnd</option>
            </select>
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Email
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <input
              type="email"
              id="email"
              name="email"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium ml-[600px] mt-2"
          >
            Password
          </label>
          <div className="flex mb-6 ml-[600px] mt-2">
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-none rounded-e-lg bg-white border text-black focus:ring-blue-500 focus:border-blue-500 block w-[300px] text-sm border-gray-300 p-2.5"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 ml-[600px]">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
