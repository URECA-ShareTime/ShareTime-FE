import { useState, useEffect } from 'react';
import { all } from 'axios';
import { getAllEvents } from '../../../api/event';

export default function CalFilterDropBar({ setEvents, events, userStudy, userClass }) {
  const [checkedClassList, setCheckedClassList] = useState([]); //체크된 리스트 관리
  const [checkedStudyList, setCheckedStudyList] = useState([]); //체크된 리스트 관리
  const [isChecked, setIsChecked] = useState(false); //체크박스 상태 관리
  const [isOpen, setIsOpen] = useState(false); //드롭다운 메뉴 상태 관리

  useEffect(() => {
    // 드롭다운이 열릴 때, 이전에 체크된 상태를 유지하기 위해서 상태를 초기화함
    if (isOpen) {
      setCheckedClassList([...checkedClassList]);
      setCheckedStudyList([...checkedStudyList]);
    }
  }, [isOpen]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClassItemChecked = (e) => {
    setIsChecked(!isChecked);
    checkedItemHandle(e, checkedClassList, setCheckedClassList);
  };

  const handleStudyItemChecked = (e) => {
    setIsChecked(!isChecked);
    checkedItemHandle(e, checkedStudyList, setCheckedStudyList);
  };

  const checkedItemHandle = (e, checkedList, setCheckedList) => {
    const { id, checked } = e.target;
    const parseId = id.split('-')[1];
    const prevList = checkedList;
    if (checked) {
      //체크된 리스트에 id 추가
      setCheckedList([...prevList, parseId]);
    } else {
      //체크된 리스트에 id 제거
      const updateList = prevList.filter((item) => item !== parseId);
      setCheckedList(updateList);
    }
  };

  const handleFilterChange = async () => {
    setEvents([]); // 기존 이벤트를 초기화
  
    const savedEvents = await getAllEvents();
  
    const filteredEvents = [
      ...checkedClassList.reduce((acc, item) => {
        const itemAsNumber = Number(item);
        return acc.concat(savedEvents.filter((event) => event.classId.includes(itemAsNumber)));
      }, []),
      ...checkedStudyList.reduce((acc, item) => {
        const itemAsNumber = Number(item);
        return acc.concat(savedEvents.filter((event) => event.studyId.includes(itemAsNumber)));
      }, []),
    ];
  
    // 중복 제거: 이벤트의 고유한 ID를 사용하여 중복된 이벤트를 제거
    const uniqueFilteredEvents = Array.from(new Map(filteredEvents.map(event => [event.id, event])).values());
  
    setEvents(uniqueFilteredEvents);

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
            {userClass.map((resource) => (
              <li className="p-0" key={`class-${resource.id}`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`class-${resource.id}`}
                    onChange={(e) => handleClassItemChecked(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500 accent-blue-gray-700"
                    checked={checkedClassList.includes(String(resource.id))}
                  />
                  <label
                    htmlFor={resource.name}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {resource.name}
                  </label>
                </div>
              </li>
            ))}
            {userStudy.map((resource) => (
              <li className="p-0" key={`study-${resource.id}`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`study-${resource.id}`}
                    onChange={(e) => handleStudyItemChecked(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500 accent-blue-gray-700"
                    checked={checkedStudyList.includes(String(resource.id))} 
                  />
                  <label
                    htmlFor={resource.name}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {resource.name}
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
