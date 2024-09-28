// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EnterPage from './pages/EnterPage'; // Enterpage 컴포넌트 임포트
import LoginPage from './pages/LoginPage'; // Loginpage 컴포넌트 임포트
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import StudyCreatePage from './pages/StudyCreatePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnterPage />} /> {/* Enterpage로 경로 설정 */}
      <Route path="user/login" element={<LoginPage />} />
      <Route path="user/signup" element={<SignUpPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/studycreate" element={<StudyCreatePage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
