// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EnterPage from './pages/EnterPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnterPage />} /> {/* Enterpage로 경로 설정 */}
      <Route path="user/login" element={<LoginPage />} />
      <Route path="user/signup" element={<SignUpPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
