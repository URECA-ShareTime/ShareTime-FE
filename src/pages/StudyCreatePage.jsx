import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/common/header/Header';

function StudyCreatePage() {
  const [study_name, setStudy_name] = useState('');
  const [study_key, setStudy_key] = useState('');
  const [isStudyExisting, setIsStudyExisting] = useState(false);
  const [isKeyCheckEnabled, setIsKeyCheckEnabled] = useState(false);

  const handleCheckExistence = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/study/checkExistence`,
        { study_name }
      );

      // 서버 응답이 'exists'라는 키로 존재 여부를 나타낼 경우
      if (response.data.exists === 'true') {
        alert(
          '현재 존재하는 스터디입니다. 참여하려면 알맞은 스터디 키를 입력하세요.'
        );
        setIsStudyExisting(true);
        setIsKeyCheckEnabled(true);
      } else {
        alert(
          '현재 존재하지 않는 스터디입니다. 새로운 스터디를 생성하려면 스터디 키를 생성하세요.'
        );
        setIsStudyExisting(false);
        setIsKeyCheckEnabled(true);
      }
    } catch (error) {
      console.error('Error checking study existence:', error);
    }
  };

  const handleSubmit = async () => {
    if (!isKeyCheckEnabled) {
      alert('스터디 존재 여부를 먼저 확인하세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/study/joinOrCreate',
        {
          study_name,
          study_key,
        }
      );

      // 서버 응답 메시지에 따라 처리
      if (response.data.message === 'JOIN_SUCCESS') {
        alert('스터디에 참가하였습니다.');
      } else if (response.data.message === 'CREATED') {
        // 스터디 생성 여부 확인
        if (window.confirm('이 키로 스터디를 생성하겠습니까?')) {
          alert('스터디가 생성되었습니다.');
        } else {
          alert('생성이 취소되었습니다.');
        }
      } else if (response.data.message === 'INVALID_KEY') {
        alert('키가 틀렸습니다. 다시 입력해주세요.');
      } else {
        alert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      // 서버 응답이 없는 경우를 처리
      if (error.response && error.response.data.message === 'INVALID_KEY') {
        alert('키가 틀렸습니다. 다시 입력해주세요.');
      } else {
        console.error('Error joining or creating study:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white w-[550px] h-[600px] flex flex-col items-center p-6">
          <p className="text-primary-gray text-center mt-[50px] text-5xl font-extrabold drop-shadow-md">
            JOIN OR
            <br />
            CREATE STUDY
          </p>
          <label
            htmlFor="study_name"
            className="block mt-6 mb-2 text-sm font-medium ml-[-330px]"
          >
            Study Name
          </label>
          <input
            type="text"
            id="study_name"
            className="bg-primary-inputgray w-[400px] px-4 py-3 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter study name"
            value={study_name}
            onChange={(e) => setStudy_name(e.target.value)}
          />
          <button
            className="bg-primary-buttonblue w-[200px] py-2 text-white rounded-md hover:bg-blue-700 mt-2"
            onClick={handleCheckExistence}
          >
            Check Existence
          </button>
          <label
            htmlFor="study_key"
            className="block mt-6 mb-2 text-sm font-medium ml-[-340px]"
          >
            Study Key
          </label>
          <input
            type="text"
            id="study_key"
            className="bg-primary-inputgray w-[400px] px-4 py-3 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter study key"
            value={study_key}
            onChange={(e) => setStudy_key(e.target.value)}
            disabled={!isKeyCheckEnabled}
          />
          <button
            className="bg-primary-buttonblue w-[200px] py-2 text-white rounded-md hover:bg-blue-700 mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
