import moment from 'moment';
import testGroups from '../../../mocks/testGroup.json';
import { useEffect, useState } from 'react';
import Select from 'react-select';

// { --> testEvents.json
//   "id": 0,
//   "title": "FrontEnd",
//   "start": "2024-09-26T09:00:00",
//   "end": "2024-09-29T13:00:00",
//   "resourceId": 1, --> group_id
//   "type": "FrontEnd",
//   "creator": 1
// "description": "FrontEnd",
// },

// { --> testGroups.json
//   "id": 1,
//   "groupId": 1,
//   "value": "FrontEnd",
//   "label": "FrontEnd"
// },

export default function TaskModal({
  isModalOpen,
  setModalOpen,
  newEvent,
  setNewEvent,
  events,
  setEvents,
  isEdit,
  setIsEdit,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    testGroups.filter((group) =>
      Array.isArray(newEvent.resourceId) && newEvent.resourceId.includes(group.id)
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleSaveEvent = () => {
    setEvents([...events, newEvent]);
    setModalOpen(false);
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    setNewEvent({
      ...newEvent,
      resourceId: selected.map((item) => item.id),
      type: selected.map((item) => item.value),
    });
  };

  //Task 수정 처리
  const handleUpdateEvent = () => {
    console.log('handleUpdateEvent');
    //수정할 이벤트를 id로 찾아서 newEvent 값으로 수정한 배열 리턴
    const updatedEvents = events.map((event) =>
      event.id === newEvent.id ? newEvent : event
    );
    setEvents(updatedEvents);
    setIsEdit(false);
    setModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-10 rounded-lg shadow-lg w-2/5">
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="w-full mt-1 p-1 border-none rounded-md font-bold text-2xl"
                placeholder="Title"
              />
            </div>
            <div className="mb-4 flex-col justify-start">
              <div className="mb-2">
                <div className="mb-2 flex align-middle gap-2 pl-1">
                  <label className="block text-sm font-medium text-gray-700 text-center">
                    StateAt
                  </label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                    onChange={handleInputChange}
                    className="w-auto border-none text-sm"
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="mb-2 flex align-middle gap-2 pl-1">
                  <label className="block text-sm font-medium text-gray-700 text-center">
                    EndAt
                  </label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                    onChange={handleInputChange}
                    className="w-auto border-none text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-2 flex align-middle gap-2 pl-1 justify-start items-center">
                <label className="block text-sm font-medium text-gray-700 text-center h-fit">
                  GroupTag
                </label>
                <Select
                  defaultValue={testGroups.find(
                    (group) => group.id === newEvent.resourceId
                  )}
                  isMulti
                  options={testGroups}
                  className="basic-multi-select focus:outline-none text-sm"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  value={selectedOptions}
                  placeholder="select a group option"
                />
              </div>
            </div>
            <hr className="mb-4" />
            <div className="mb-4">
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="w-full h-[200px] mt-1 p-2 border-none rounded-md"
                placeholder="Description"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-primary-gray hover:bg-gray-800 text-primary-white font-normal py-1 px-3 rounded-md mr-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={isEdit ? handleUpdateEvent : handleSaveEvent}
                className="bg-primary-gray hover:bg-gray-800 text-primary-white font-normal py-1 px-3 rounded-md mr-2 text-sm"
              >
                {isEdit ? 'Edit' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
