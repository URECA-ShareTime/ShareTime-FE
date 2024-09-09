// src/pages/Enterpage.jsx
import React from 'react';
import GuestBackGround from '../components/GuestBackGround';
import enterletter from '../assets/enterletter.png';
import sittingman from '../assets/sittingman.png';

function Enterpage(props) {
  return (
    <>
      <GuestBackGround />
      {/* 컨테이너를 위쪽으로 이동시키기 위해 absolute와 top 속성 추가 */}
      <div className="absolute top-40 left-40 flex items-start">
        <img
          src={enterletter}
          alt="enterletter"
          className="w-[96px] h-[500px] mr-60"
        />
        <Welcome />
      </div>
    </>
  );
}

function Welcome(props) {
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
        {' '}
        이곳에서 유레카 반의 모든 일정을 한눈에 관리하고, 친구들과 함께 오늘 할
        일을 계획해보세요. 공유 캘린더로 반의 중요한 일정과 개인 일정을 한곳에서
        손쉽게 관리하고, 투두리스트로 나의 하루를 알차게 꾸밀 수 있어요.
        친구들과 함께 목표를 공유하고 서로의 일정을 응원하며 더 나은 하루를
        만들어보세요!
      </p>
      <button className="text-center p-4 bg-primary-darkblue text-white rounded mt-8 w-[300px] h-[40px] flex items-center justify-center">
        Sign up
      </button>
      <button className="text-center p-4 bg-primary-white text-primary-darkblue mt-2 w-[300px] h-[40px] ">
        Sign in
      </button>
    </div>
  );
}
export default Enterpage;
