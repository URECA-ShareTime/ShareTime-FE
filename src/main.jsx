import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter를 사용하여 전체 앱을 감싸기
import './index.css';
import Enterpage from './pages/Enterpage.jsx';
import App from './App'; // App 컴포넌트 임포트

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* App 컴포넌트를 BrowserRouter로 감싸서 렌더링 */}
    </BrowserRouter>
  </StrictMode>
);
