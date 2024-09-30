import moment from 'moment';
import testClass from '../../../mocks/testClass.json';
import testStudy from '../../../mocks/testStudy.json';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { createEvent, updateEvent, deleteEvent } from '../../../api/event';

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
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [selectedStudies, setSelectedStudies] = useState([]);

  useEffect(() => {
    if (isModalOpen && isEdit) {
      setSelectedClasses(
        testClass.filter((group) => newEvent.classId.includes(group.id))
          .map((group) => ({ value: group.id, label: group.name }))
      );
      setSelectedStudies(
        testStudy.filter((group) => newEvent.studyId.includes(group.id))
          .map((group) => ({ value: group.id, label: group.name }))
      );
    }
  }, [isModalOpen, isEdit, newEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleSaveEvent = async() => {
    try {
      const savedEvent = await createEvent(newEvent);
      if (savedEvent === null) { 
        throw new Error('post failed');
      }
      setEvents([...events, newEvent]);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert('이벤트 생성이 실패했습니다. 다시 작성해주세요.');
    }
  };

  const handleClassChange = (selected) => {
    setSelectedClasses(selected);
    setNewEvent({
      ...newEvent,
      groupType: Array.from(new Set([...newEvent.groupType, 'class'])),
      classId: selected ? [selected.value] : [],
    });
  };

  const handleStudyChange = (selected) => {
    setSelectedStudies(selected);
    setNewEvent({
      ...newEvent,
      groupType: Array.from(new Set([...newEvent.groupType, 'study'])),
      studyId: selected ? selected.map((item) => item.value) : [],
    });
  };

  //Task 수정 처리
  const handleUpdateEvent = async() => {
    try {
      const updatedDBEvent = await updateEvent(newEvent);
      if (updatedDBEvent === null) { 
        throw new Error('put failed');
      }
      setIsEdit(false);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert('이벤트 수정이 실패했습니다. 다시 작성해주세요.');
    } 
  };

  const handleDeleteEvent = async() => {
    try {
      const deletedEvent = await deleteEvent(newEvent.id);
      if (deletedEvent === null) { 
        throw new Error('delete failed');
      }
      setEvents(events.filter((event) => event.id !== newEvent.id));
      setIsEdit(false);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert('이벤트 삭제가 실패했습니다. 다시 작성해주세요.');
    }
  }

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
                  //isMulti
                  options={testClass.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                  className="basic-multi-select focus:outline-none text-sm w-fit"
                  classNamePrefix="select"
                  onChange={handleClassChange}
                  value={selectedClasses}
                  placeholder="select class"
                  isClearable={true}
                />
                <Select
                  isMulti
                  options={testStudy.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                  className="basic-multi-select focus:outline-none text-sm max-w-50"
                  classNamePrefix="select"
                  onChange={handleStudyChange}
                  value={selectedStudies}
                  placeholder="select study"
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
              <button
                onClick={handleDeleteEvent}
                className="bg-primary-gray hover:bg-gray-800 text-primary-white font-normal py-1 px-3 rounded-md mr-2 text-sm"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
