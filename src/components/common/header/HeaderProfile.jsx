import { useState, useRef, useEffect } from 'react';
import myProfileImg from '../../../assets/profileimage.png';
import { useNavigate } from 'react-router-dom';

export default function HeaderProfile() {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

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

  return (
    <div className="relative">
      <img
        src={myProfileImg}
        alt="profileImg"
        className="w-[40px] h-[40px] cursor-pointer"
        onClick={toggleMenu}
      />
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-xl p-4 border border-gray-200"
        >
          <button
            className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // 스터디 추가 페이지로 이동하는 로직을 추가
              navigate('/mypage');
            }}
          >
            마이페이지
          </button>
          <button
            className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // 스터디 추가 페이지로 이동하는 로직을 추가
              navigate('/studycreate');
            }}
          >
            스터디 추가
          </button>
        </div>
      )}
    </div>
  );
}
