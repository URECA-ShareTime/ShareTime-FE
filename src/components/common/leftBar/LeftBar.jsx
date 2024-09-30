import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBarAccordion from './LeftBarAccordion';

export default function LeftBar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [studyList, setStudyList] = useState([]); // 사용자가 참여하는 스터디 리스트
  const [className, setClassName] = useState(''); // 사용자의 클래스 정보 (Front-End, Back-End 등)

  // 클릭한 아이템의 인덱스를 activeIdx에 저장
  const handleActiveIdx = (idx) => setActiveIdx(activeIdx === idx ? 0 : idx);

  // 사용자 정보에서 클래스 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      console.log('User Info Response:', response.data); // 사용자 정보 응답 확인

      // 사용자 클래스 정보 설정
      if (response.data.class_id === 1) {
        setClassName('FrontEnd');
      } else if (response.data.class_id === 2) {
        setClassName('BackEnd');
      } else {
        setClassName('Unknown');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  // 스터디 리스트를 가져오는 함수
  const fetchStudyList = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/user/study-list',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      console.log('Study List Response:', response.data); // 스터디 리스트 응답 확인

      // API에서 반환된 스터디 리스트를 상태에 저장
      setStudyList(response.data);
    } catch (error) {
      console.error('Failed to fetch study list:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 사용자 정보(클래스 정보) 불러오기
    fetchStudyList(); // 스터디 리스트 불러오기
  }, []);

  return (
    <div className="w-[250px] h-content overflow-y-scroll overflow-x-hidden px-4 py-4 bg-primary-darkblue">
      {/* All 섹션 */}
      <LeftBarAccordion
        title="All"
        activeIdx={activeIdx}
        id={1}
        handleActiveIdx={handleActiveIdx}
      />
      {/* 사용자 클래스 섹션 */}
      <LeftBarAccordion
        title={className} // class 제목으로 표시됨
        activeIdx={activeIdx}
        id={2}
        handleActiveIdx={handleActiveIdx}
      />
      {/* 스터디 리스트를 map으로 생성 */}
      {studyList.length > 0 ? (
        studyList.map((study, index) => (
          <LeftBarAccordion
            key={index}
            title={study.study_name || 'Unnamed Study'} // 스터디 이름이 없을 경우 기본 값 제공
            activeIdx={activeIdx}
            id={index + 3} // 고유한 id 부여
            handleActiveIdx={handleActiveIdx}
          />
        ))
      ) : (
        <div className="text-white text-center"></div>
      )}
    </div>
  );
}
