import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftBarAccordion from './LeftBarAccordion';
import profileimage from '../../../assets/profileimage.png';

export default function LeftBar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [allUsers, setAllUsers] = useState([]); // 전체 유저 리스트
  const [classUsers, setClassUsers] = useState([]); // 클래스별 유저 리스트
  const [studyUsers, setStudyUsers] = useState([]); // 스터디별 유저 리스트
  const [studyList, setStudyList] = useState([]); // 사용자가 참여하는 스터디 리스트
  const [className, setClassName] = useState(''); // 사용자의 클래스 정보 (Front-End, Back-End 등)

  // 클릭한 아이템의 인덱스를 activeIdx에 저장
  const handleActiveIdx = (idx) => setActiveIdx(activeIdx === idx ? 0 : idx);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/all', {
        // 경로 수정: /user/all
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('All Users Response:', response.data); // 응답 데이터 확인
      setAllUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch all users:', error);
    }
  };

  // 클래스별 유저 정보 가져오기
  const fetchClassUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/user/class-members',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setClassUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch class members:', error);
    }
  };

  // 스터디 리스트와 각 스터디별 유저 정보 가져오기
  const fetchStudyUsers = async () => {
    try {
      const studyListResponse = await axios.get(
        'http://localhost:8080/user/study-list',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setStudyList(studyListResponse.data);

      // 사용자 클래스 정보 설정
      const userInfoResponse = await axios.get(
        'http://localhost:8080/user/info',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      const userClassId = userInfoResponse.data.class_id;
      if (userClassId === 1) {
        setClassName('FrontEnd');
      } else if (userClassId === 2) {
        setClassName('BackEnd');
      } else {
        setClassName('Unknown');
      }

      // 각 스터디의 유저 정보 가져오기
      const studyUsersResponse = await Promise.all(
        studyListResponse.data.map((study) =>
          axios.get(
            `http://localhost:8080/user/study-members/${study.study_id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          )
        )
      );
      setStudyUsers(studyUsersResponse.map((res) => res.data));
    } catch (error) {
      console.error('Failed to fetch study members:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers(); // 전체 유저 불러오기
    fetchClassUsers(); // 클래스별 유저 불러오기
    fetchStudyUsers(); // 스터디별 유저 불러오기
  }, []);

  return (
    <div className="w-[300px] h-content overflow-y-scroll overflow-x-hidden px-4 py-4 bg-primary-darkblue">
      {/* All 섹션 */}
      <LeftBarAccordion
        title="All"
        activeIdx={activeIdx}
        id={1}
        handleActiveIdx={handleActiveIdx}
        userList={allUsers} // 전체 유저 전달
      />
      {/* 사용자 클래스 섹션 */}
      <LeftBarAccordion
        title={className} // 클래스 제목으로 표시
        activeIdx={activeIdx}
        id={2}
        handleActiveIdx={handleActiveIdx}
        userList={classUsers} // 클래스별 유저 전달
      />
      {/* 스터디 리스트 및 각 스터디에 참여한 유저들 */}
      {studyList.length > 0 ? (
        studyList.map((study, index) => (
          <LeftBarAccordion
            key={index}
            title={study.study_name || 'Unnamed Study'}
            activeIdx={activeIdx}
            id={index + 3}
            handleActiveIdx={handleActiveIdx}
            userList={studyUsers[index] || []} // 각 스터디의 유저 전달
          />
        ))
      ) : (
        <div className="text-white text-center"></div>
      )}
    </div>
  );
}
