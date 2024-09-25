import moment from "moment";
import testEvents from "../../../mocks/testEvents.json";
import { useState } from "react";

// {
//   "id": 0,
//   "title": "FrontEnd",
//   "start": "2024-09-26T09:00:00",
//   "end": "2024-09-29T13:00:00",
//   "resourceId": 1, --> group_id
//   "type": "FrontEnd",
//   "creator": 1
// },

export default function TaskModal({isModalOpen, setModalOpen, selectedDate, setSelectedDate, newEvent, setNewEvent}) {
  const [events, setEvents] = useState(testEvents);

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
  
  return (
    <>
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">StateAt</label>
            <input
              type="datetime-local"
              name="start"
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border-none"
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">EndAt</label>
            <input
              type="datetime-local"
              name="end"
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border-none"
              />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">GroupTag</label>
            {/* 그룹 Input 넣기 */}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-primary-darkblue hover:bg-blue-gray-700 text-primary-gray font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEvent}
            className="bg-primary-darkblue hover:bg-blue-gray-700 text-primary-gray font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}