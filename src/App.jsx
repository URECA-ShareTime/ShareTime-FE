// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Enterpage from './pages/Enterpage'; // Enterpage 컴포넌트 임포트
import Loginpage from './pages/Loginpage'; // Loginpage 컴포넌트 임포트
import Signuppage from './pages/Signuppage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Enterpage />} /> {/* Enterpage로 경로 설정 */}
      <Route path="/login" element={<Loginpage />} />{' '}
      <Route path="/signup" element={<Signuppage />} />{' '}
    </Routes>
  );
}

export default App;
