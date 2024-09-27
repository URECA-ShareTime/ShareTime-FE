import React from 'react';
import Header from '../components/common/header/Header';
import LeftBar from '../components/common/leftBar/LeftBar';

function MyPage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex">
        <LeftBar />
      </div>
    </div>
  );
}

export default MyPage;
