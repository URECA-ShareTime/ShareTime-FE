import { useState, useRef, useEffect } from 'react';
import myProfileImg from '../../../assets/profileimage.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HeaderProfile() {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성
  const [userProfileImg, setUserProfileImg] = useState(myProfileImg); // 기본 이미지를 초기 상태로 설정
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // 메뉴를 클릭하여 열고 닫는 함수
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 메뉴 바깥을 클릭하면 메뉴를 닫는 함수
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // 메뉴 바깥을 클릭했을 때 이벤트 리스너 추가 및 제거
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      // 프로필 이미지 URL을 설정. 없으면 기본 이미지 사용
      const profileImageUrl = response.data.profile_picture
        ? `http://localhost:8080${response.data.profile_picture}`
        : myProfileImg; // 없으면 기본 이미지 사용

      setUserProfileImg(profileImageUrl);
    } catch (error) {
      console.error('Failed to fetch user profile image:', error);
      setUserProfileImg(myProfileImg); // 오류 발생 시 기본 이미지 설정
    }
  };

  // 컴포넌트가 마운트될 때 사용자 정보를 불러옴
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="relative">
      <img
        src={userProfileImg || myProfileImg} // 프로필 이미지가 없으면 기본 이미지 사용
        alt="profileImg"
        className="w-[40px] h-[40px] cursor-pointer rounded-full" // 이미지 스타일
        onClick={toggleMenu}
        onError={() => setUserProfileImg(myProfileImg)} // 이미지 로드 실패 시 기본 이미지로 변경
      />
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="z-10 absolute right-0 mt-2 w-48 bg-white shadow-md rounded-xl p-4 border border-gray-200"
        >
          <button
            className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              navigate('/mypage'); // 마이페이지로 이동
            }}
          >
            마이페이지
          </button>
          <button
            className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              navigate('/studycreate'); // 스터디 추가 페이지로 이동
            }}
          >
            스터디 추가
          </button>
        </div>
      )}
    </div>
  );
}
