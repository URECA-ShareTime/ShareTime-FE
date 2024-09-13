// src/pages/Enterpage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import GuestBackGround from '../components/GuestBackGround';
import enterletter from '../assets/enterletter.png';
import sittingman from '../assets/sittingman.png';

function EnterPage(props) {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  return (
    <>
      <GuestBackGround />
      <div className="absolute top-40 left-40 flex items-start">
        <img
          src={enterletter}
          alt="enterletter"
          className="w-[96px] h-[500px] mr-60"
        />
        <Welcome navigate={navigate} />{' '}
        {/* navigate 함수를 Welcome 컴포넌트로 전달 */}
      </div>
    </>
  );
}

function Welcome({ navigate }) {
  return (
    <div className="bg-white w-[500px] h-[500px] ml-20 flex flex-col items-center">
      <img
        src={sittingman}
        alt="sittingman"
        className="w-[130px] h-[150px] mt-3 mx-auto block"
      />
      <p className="text-center mt-4 text-2xl font-bold">
        Sharetime에 오신 것을 환영합니다!
      </p>
      <p className="text-center mt-4 text-base font-semibold mr-2 ml-2">
        이곳에서 유레카 반의 모든 일정을 한눈에 관리하고, 친구들과 함께 오늘 할
        일을 계획해보세요. 공유 캘린더로 반의 중요한 일정과 개인 일정을 한곳에서
        손쉽게 관리하고, 투두리스트로 나의 하루를 알차게 꾸밀 수 있어요.
        친구들과 함께 목표를 공유하고 서로의 일정을 응원하며 더 나은 하루를
        만들어보세요!
      </p>
      <button
        onClick={() => navigate('/user/signup')} // Sign up 버튼 클릭 시 이동
        className="text-center p-4 bg-primary-darkblue text-white rounded mt-8 w-[300px] h-[40px] flex items-center justify-center"
      >
        Sign up
      </button>
      <button
        onClick={() => navigate('/user/login')} // Sign in 버튼 클릭 시 로그인 페이지로 이동
        className="text-center p-4 bg-primary-white text-primary-darkblue mt-2 w-[300px] h-[40px] flex items-center justify-center"
      >
        Sign in
      </button>
    </div>
  );
}

export default EnterPage;
