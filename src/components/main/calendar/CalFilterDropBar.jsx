import { useState } from 'react';
//UserStudy테이블의 study_id, User의 class_id 불러오기
import testGroup from '../../../mocks/testGroup.json';

export default function CalFilterDropBar({ setEvents, allEvents }) {
  const [checkedList, setCheckedList] = useState([]); //체크된 리스트 관리
  const [isChecked, setIsChecked] = useState(false); //체크박스 상태 관리
  const [isOpen, setIsOpen] = useState(false); //드롭다운 메뉴 상태 관리

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleItemChecked = (e) => {
    setIsChecked(!isChecked);
    checkedItemHandle(e);
  };

  const checkedItemHandle = (e) => {
    const { id, checked } = e.target;
    const prevList = checkedList;
    if (checked) {
      //체크된 리스트에 id 추가
      setCheckedList([...prevList, id]);
    } else {
      //체크된 리스트에 id 제거
      const updateList = prevList.filter((item) => item !== id);
      setCheckedList(updateList);
    }
  };

  const handleFilterChange = () => {
    let filteredEvents = [];
    checkedList.forEach((item) => {
      filteredEvents = [
        ...filteredEvents,
        ...allEvents.filter((event) => event.type === item),
      ];
    });
    setEvents(filteredEvents);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="text-black bg-white hover:bg-gray-100 focus:outline-none font-normal rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        datadropdowntoggle="dropdownBgHover"
        id="dropdownBgHoverButton"
        onClick={handleIsOpen}
      >
        Choose Filter
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdownBgHover"
          className="z-10 absolute mt-2 w-[130px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="flex flex-col justify-center p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
            arialabelledby="dropdownBgHoverButton"
          >
            {testGroup.map((resource) => (
              <li className="p-0" key={resource.id}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={resource.groupId}
                    onChange={(e) => handleItemChecked(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500 accent-blue-gray-700"
                  />
                  <label
                    htmlFor={resource.type}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {resource.type}
                  </label>
                </div>
              </li>
            ))}
            <button
              className="bg-primary-gray text-white font-light px-2 py-1 rounded-lg text-[10px]"
              onClick={handleFilterChange}
            >
              Submit
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}
