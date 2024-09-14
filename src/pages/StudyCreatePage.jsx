import React from 'react';
import Header from '../components/common/header/Header';

function StudyCreatePage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white w-[550px] h-[600px] flex flex-col items-center p-6">
          <p className="text-primary-gray text-center mt-[50px] text-5xl font-extrabold drop-shadow-md">
            JOIN OR
            <br />
            CREATE STUDY
          </p>
          <label
            htmlFor="studyname"
            className="block mt-6 mb-2 text-sm font-medium ml-[-330px]"
          >
            Study Name
          </label>
          <input
            type="text"
            id="studyname"
            className="bg-primary-inputgray w-[400px] px-4 py-3 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter study name"
          />
          <button className="bg-primary-buttonblue w-[200px] py-2 text-white rounded-md hover:bg-blue-700 mt-2">
            Check Existence
          </button>
          <label
            htmlFor="studykey"
            className="block mt-6 mb-2 text-sm font-medium ml-[-340px]"
          >
            Study Key
          </label>
          <input
            type="text"
            id="studykey"
            className="bg-primary-inputgray w-[400px] px-4 py-3 mb-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter study key"
          />
          <button className="bg-primary-buttonblue w-[200px] py-2 text-white rounded-md hover:bg-blue-700 mt-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
