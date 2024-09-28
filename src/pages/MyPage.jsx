import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/common/header/Header';
import LeftBar from '../components/common/leftBar/LeftBar'; // 올바른 경로
import profileimage from '../assets/profileimage.png'; // 기본 프로필 이미지 불러오기

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImage: profileimage, // 초기 기본 이미지 설정
    className: '',
  });
  const [password, setPassword] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.data && response.data.name) {
          setUserInfo({
            name: response.data.name,
            email: response.data.email,
            profileImage: response.data.profile_picture || profileimage, // 프로필 이미지가 null일 때 기본 이미지 사용
            className:
              response.data.class_id === 1
                ? 'FrontEnd'
                : response.data.class_id === 2
                  ? 'BackEnd'
                  : 'Unknown', // class_id에 따라 ClassName 설정
          });
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchUserInfo();
  }, []);

  // 비밀번호 수정 함수
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

  // 프로필 이미지 변경 옵션 함수
  const handleProfileImageOption = () => {
    const userChoice = window.confirm(
      '기본 이미지로 변경하시겠습니까? 취소를 누르면 새로운 이미지를 선택할 수 있습니다.'
    );

    if (userChoice) {
      // 기본 이미지로 변경
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        profileImage: profileimage,
      }));
      setNewProfileImage(null);
    } else {
      // 새로운 이미지 선택
      document.getElementById('profileImageInput').click();
    }
  };

  // 프로필 이미지 변경 함수
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  // 프로필 이미지 업로드 함수
  const handleProfileImageUpload = async () => {
    // 이미지가 선택되지 않았을 때 업로드 요청하지 않도록 함
    if (!newProfileImage) {
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', newProfileImage);

    try {
      await axios.put(
        'http://localhost:8080/user/updateProfileImage',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('프로필 이미지가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Failed to update profile image:', error);
      alert('프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 모든 변경 사항을 저장하는 함수
  const handleSaveChanges = () => {
    handlePasswordChange();
    handleProfileImageUpload();
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-between">
        <LeftBar />
        <div className="flex-1 flex flex-col items-center p-7 bg-[#E6F2FF]">
          <div className="flex justify-start">
            <div className="flex flex-col items-center mr-12 ml-1">
              <img
                src={userInfo.profileImage}
                alt="Profile"
                className="w-60 h-60 rounded-full border"
              />
              <button
                onClick={handleProfileImageOption}
                className="mt-4 text-sm text-blue-500 cursor-pointer"
              >
                프로필 사진 선택
              </button>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-bold mb-4">{userInfo.name}</h2>
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
                  placeholder="새 비밀번호 입력" // 비밀번호 입력창에 placeholder 추가
                  className="border rounded p-1 w-60"
                />
              </div>
              <div className="mb-2">
                <span className="text-lg font-semibold">Class:</span>{' '}
                <span className="text-lg">{userInfo.className}</span>
              </div>
              <button
                className="bg-blue-500 text-white rounded mt-4 px-4 py-2"
                onClick={handleSaveChanges}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
