import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import profileimage from '../../assets/profileimage.png';

function MyPageList() {
  const [classUsers, setClassUsers] = useState([]); // 클래스 사용자 리스트
  const [studyUsers, setStudyUsers] = useState([]); // 스터디 사용자 리스트
  const [studyList, setStudyList] = useState([]); // 사용자가 참여하는 스터디 리스트
  const [selectedTab, setSelectedTab] = useState('class'); // 선택된 탭 상태
  const [selectedStudyId, setSelectedStudyId] = useState(null); // 선택된 스터디의 ID
  const listRef = useRef(null); // 스크롤 제어를 위한 ref
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 확인
  const [startX, setStartX] = useState(0); // 드래그 시작 위치
  const [scrollLeft, setScrollLeft] = useState(0); // 드래그 시작 시 스크롤 위치

  // 사용자 정보에서 참여하는 스터디 목록 가져오기
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
      setStudyList(response.data || []); // 사용자가 참여하는 스터디 리스트 설정
      console.log('Study List:', response.data); // 디버깅을 위해 studyList 출력
    } catch (error) {
      console.error('Failed to fetch study list:', error);
      alert('스터디 목록을 불러오는 데 실패했습니다.');
    }
  };

  // 클래스 사용자 정보 가져오기 함수
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
      setClassUsers(response.data || []); // 클래스 사용자 데이터 설정
    } catch (error) {
      console.error('Failed to fetch class members:', error);
      alert(
        '클래스 사용자 리스트를 불러오는 데 실패했습니다. 다시 시도해주세요.'
      );
    }
  };

  // 선택된 스터디 사용자 정보 가져오기 함수
  const fetchStudyUsers = async (studyId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/study-members/${studyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setStudyUsers(response.data || []); // 선택된 스터디의 사용자 데이터 설정
      console.log('Study Users:', response.data); // 스터디 유저 디버깅 출력
    } catch (error) {
      console.error('Failed to fetch study members:', error);
      alert(
        '스터디 사용자 리스트를 불러오는 데 실패했습니다. 다시 시도해주세요.'
      );
    }
  };

  useEffect(() => {
    fetchStudyList(); // 페이지 로드시 사용자 참여 스터디 목록 불러오기
    fetchClassUsers(); // 클래스 멤버 리스트 불러오기
  }, []);

  useEffect(() => {
    if (selectedTab === 'class') {
      fetchClassUsers(); // 클래스 멤버 리스트 불러오기
    } else if (selectedTab === 'study' && selectedStudyId) {
      fetchStudyUsers(selectedStudyId); // 선택된 스터디 멤버 리스트 불러오기
    }
  }, [selectedTab, selectedStudyId]);

  // 마우스를 클릭하여 드래그 시작
  const handleMouseDown = (e) => {
    if (listRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - listRef.current.offsetLeft);
      setScrollLeft(listRef.current.scrollLeft);
    }
  };

  // 드래그 중 스크롤
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 드래그 시 이동할 거리
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 마우스가 리스트에서 벗어나면 드래그 종료
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-[1000px] mt-[60px] relative">
      {/* 탭 메뉴 */}
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="me-2">
          <button
            onClick={() => setSelectedTab('class')}
            className={`inline-block p-4 rounded-t-lg ${
              selectedTab === 'class'
                ? 'text-blue-600 bg-gray-100 active'
                : 'hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            Class
          </button>
        </li>

        {studyList.map((study) => (
          <li key={study.study_id} className="me-2">
            <button
              onClick={() => {
                setSelectedTab('study');
                setSelectedStudyId(study.study_id);
                console.log('Selected study:', study);
              }}
              className={`inline-block p-4 rounded-t-lg ${
                selectedTab === 'study' && selectedStudyId === study.study_id
                  ? 'text-blue-600 bg-gray-100 active'
                  : 'hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {study.study_name ? study.study_name : 'Unnamed Study'}
            </button>
          </li>
        ))}
      </ul>

      {/* 선택된 그룹의 사용자 리스트 */}
      <div
        className="overflow-x-auto p-4 bg-white rounded-lg shadow cursor-grab"
        ref={listRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // 드래그 시 커서 변경
      >
        <div className="flex space-x-6 w-max">
          {selectedTab === 'class' &&
            classUsers.map((user) => (
              <div
                key={user.id || `user-class-${user.email}`} // 고유한 key 보장
                className="min-w-[100px] flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <img
                  src={
                    user.profile_picture
                      ? `http://localhost:8080${user.profile_picture.replace('/Users/HYERYEONG/git/ShareTime-BE/ShareTime/uploads/', '/images/')}`
                      : profileimage // 프로필 이미지가 없을 경우 기본 이미지 사용
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full border object-cover"
                />
                <span className="mt-2 text-sm text-gray-700 text-center">
                  {user.name}
                </span>
              </div>
            ))}
          {selectedTab === 'study' &&
            studyUsers.map((user) => (
              <div
                key={user.id || `user-study-${user.email}-${Math.random()}`} // 고유한 key 보장
                className="min-w-[100px] flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <img
                  src={
                    user.profile_picture
                      ? `http://localhost:8080${user.profile_picture.replace('/Users/HYERYEONG/git/ShareTime-BE/ShareTime/uploads/', '/images/')}`
                      : profileimage // 프로필 이미지가 없을 경우 기본 이미지 사용
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full border object-cover"
                />
                <span className="mt-2 text-sm text-gray-700 text-center">
                  {user.name}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyPageList;
