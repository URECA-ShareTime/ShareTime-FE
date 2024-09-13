import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestBackGround from '../components/GuestBackGround';
import profileimage from '../assets/profileimage.png';
import axios from 'axios';

function Signuppage() {
  const navigate = useNavigate();
  const [profile_picture, setProfile_picture] = useState(null); // 초기값을 null로 설정하여 기본 이미지 제거
  const [formData, setFormData] = useState({
    name: '',
    class_id: 1, // 초기값을 숫자로 설정
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile_picture(e.target.files[0]);
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    // class_id를 숫자 값으로 변환
    const updatedValue = name === 'class_id' ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  // 회원가입 요청 핸들러
  const handleSignup = async () => {
    const data = new FormData();

    data.append('profileimg', profile_picture); // 이미지 파일 추가
    data.append('name', formData.name);
    data.append('class_id', formData.class_id); // class_id는 숫자 값으로 전달
    data.append('email', formData.email);
    data.append('password', formData.password);

    // 요청 데이터 확인
    console.log('전송할 데이터:', {
      name: formData.name,
      class_id: formData.class_id,
      email: formData.email,
      password: formData.password,
      profileimg: profile_picture,
    });

    try {
      const response = await axios.post(
        'http://localhost:8080/user/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 설정
            'Access-Control-Allow-Origin': '*', // CORS 에러 해결을 위한 헤더 설정
          },
        }
      );

      if (response.status === 200) {
        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/user/login');
      }
    } catch (error) {
      // 에러 메시지 출력
      console.error('회원가입 오류:', error);

      if (error.response) {
        // 서버가 응답을 반환했지만 상태 코드가 2xx가 아닌 경우
        console.error('서버 응답 데이터:', error.response.data);
        console.error('서버 응답 상태:', error.response.status);
        console.error('서버 응답 헤더:', error.response.headers);

        if (error.response.status >= 500) {
          // 서버 오류인 경우
          setError(
            '서버 측의 문제로 회원가입에 실패했습니다. 서버 관리자에게 문의하세요.'
          );
        } else if (error.response.status >= 400) {
          // 클라이언트 오류인 경우
          setError('입력한 정보에 문제가 있습니다. 다시 확인해주세요.');
        } else {
          setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      } else if (error.request) {
        // 요청이 전송되었지만 응답이 수신되지 않은 경우
        console.error('요청 데이터:', error.request);
        setError('서버와의 통신에 실패했습니다. 네트워크 상태를 확인하세요.');
      } else {
        // 요청을 설정하는 중에 발생한 오류
        console.error('오류 메시지:', error.message);
        setError(`회원가입에 실패했습니다. 사유: ${error.message}`);
      }
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
            className="ml-[150px] mt-12 text-center p-4 bg-primary-darkblue text-white rounded mt-20 w-[250px] h-[40px] flex items-center justify-center"
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

export default Signuppage;
