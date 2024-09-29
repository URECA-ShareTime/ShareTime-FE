import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/common/header/Header';
import LeftBar from '../components/common/leftBar/LeftBar';
import profileimage from '../assets/profileimage.png'; // 기본 이미지 경로

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImage: profileimage, // 초기 이미지를 기본 이미지로 설정
    className: '',
    password: '', // 사용자 비밀번호 추가
  });
  const [password, setPassword] = useState(''); // 비밀번호 초기화 상태
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로드 상태 관리
  const menuRef = useRef(null);

  // 사용자 정보 가져오기 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      console.log('User Info Response:', response.data); // 서버에서 받은 사용자 정보 출력

      if (response.data && response.data.name) {
        // 프로필 이미지 URL에 cacheBust 파라미터 추가
        const profileImageUrl = response.data.profile_picture
          ? `http://localhost:8080${response.data.profile_picture}?cacheBust=${new Date().getTime()}`
          : profileimage;

        console.log('Profile Image URL:', profileImageUrl); // 이미지 경로 출력

        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          profileImage: profileImageUrl,
          className:
            response.data.class_id === 1
              ? 'FrontEnd'
              : response.data.class_id === 2
                ? 'BackEnd'
                : 'Unknown',
          password: response.data.password, // 기존 비밀번호 설정
        });

        setPassword(response.data.password); // password 상태를 설정
        setImageLoaded(false); // 이미지 로드 상태 초기화
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 페이지 로드시 사용자 정보 불러오기

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        'http://localhost:8080/user/updatePassword',
        { password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUserInfo((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
      setShowMenu(false);
    }
  };

  const handleProfileImageUpload = async () => {
    // 프로필 이미지 변경이 발생한 경우에만 업로드 시도
    if (!newProfileImage) {
      return; // 프로필 이미지 변경이 없는 경우 처리하지 않음
    }

    const formData = new FormData();
    formData.append('profileImage', newProfileImage);

    console.log('Uploading Profile Image:', newProfileImage); // 업로드할 이미지 파일 정보 출력

    try {
      const response = await axios.put(
        'http://localhost:8080/user/updateProfileImage',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Profile Image Upload Response:', response.data); // 서버 응답 출력
      alert('프로필 이미지가 성공적으로 변경되었습니다.');

      // 이미지 업데이트 후 사용자 정보를 다시 가져옵니다.
      await fetchUserInfo();
    } catch (error) {
      console.error('Failed to update profile image:', error);
      alert('프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSaveChanges = async () => {
    // 비밀번호가 변경된 경우에만 handlePasswordChange 호출
    if (password !== userInfo.password) {
      await handlePasswordChange();
    }
    // 프로필 이미지를 변경하려는 경우에만 handleProfileImageUpload 호출
    if (newProfileImage || userInfo.profileImage === profileimage) {
      await handleProfileImageUpload();
    }
    await fetchUserInfo(); // 변경 사항 반영 후 사용자 정보를 다시 가져오기
  };

  const handleDefaultImage = () => {
    setUserInfo((prev) => ({ ...prev, profileImage: profileimage }));
    setNewProfileImage(profileimage); // 기본 이미지로 변경 시에도 newProfileImage에 기본 이미지 설정
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-between">
        <LeftBar />
        <div className="flex-1 flex flex-col items-center p-7 bg-[#E6F2FF]">
          <div className="flex justify-start mt-[40px]">
            <div className="flex flex-col items-center mr-[150px] ml-1">
              {/* 이미지가 로드될 때까지 기본 이미지를 숨기기 */}
              <img
                src={userInfo.profileImage}
                alt="Profile"
                className={`w-60 h-60 rounded-full border transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() =>
                  setUserInfo((prev) => ({
                    ...prev,
                    profileImage: profileimage,
                  }))
                }
              />
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="mt-4 text-sm text-blue-500 cursor-pointer"
              >
                프로필 사진 선택
              </button>
              {showMenu && (
                <div
                  ref={menuRef}
                  className="absolute bg-white border rounded-lg shadow-lg mt-[280px]"
                >
                  <button
                    onClick={handleDefaultImage}
                    className="block px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    기본 이미지로 변경
                  </button>
                  <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    새로운 이미지 선택
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-bold mb-10">{userInfo.name}</h2>
              <div className="mb-2">
                <span className="text-lg font-semibold">Email:</span>{' '}
                <span className="text-lg">{userInfo.email}</span>
              </div>
              <div className="mb-2">
                <span className="text-lg font-semibold">Password:</span>{' '}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호 입력"
                  className="border rounded p-1 w-60"
                />
              </div>
              <div className="mb-2">
                <span className="text-lg font-semibold">Class:</span>{' '}
                <span className="text-lg">{userInfo.className}</span>
              </div>
              <button
                className="bg-primary-darkblue text-white rounded mt-10 px-4 py-2 ml-[200px]"
                onClick={handleSaveChanges}
              >
                프로필 수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
