// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EnterPage from './pages/EnterPage'; // Enterpage 컴포넌트 임포트
import LoginPage from './pages/LoginPage'; // Loginpage 컴포넌트 임포트
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnterPage />} /> {/* Enterpage로 경로 설정 */}
<<<<<<< HEAD
      <Route path="user/login" element={<LoginPage />} />
      <Route path="user/signup" element={<SignUpPage />} />
=======
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
>>>>>>> d2d7a22 (✨ Feat: LeftBarProfile 컴포넌트 구현 및 MainPage 스타일 수정)
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
