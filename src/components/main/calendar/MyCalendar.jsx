import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolBar';
import TaskModal from './TaskModal';
import { getAllEvents } from '../../../api/event';

export default function MyCalendar() {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const allEvents = await getAllEvents();
      const parsedAllEvents = parsedEvents(allEvents);
      setEvents(parsedAllEvents);
    };
    getEvents();
  }, []);

  // JSON 데이터를 불러오고, 날짜를 Date 객체로 변환
  const parsedEvents = (originEvents) => {
    return originEvents.map((event) => ({
      ...event,
      id: event.event_id,
      classId: event.class_id ? [event.class_id] : [], // 값이 있을 때만 배열에 추가
    studyId: event.study_id ? [event.study_id] : [], // 값이 있을 때만 배열에 추가
    creator: event.creator_id, 
    groupType: event.group_type ? event.group_type.split(',') : [], // 중첩 배열 제거
      start: new Date(event.start_date), // 문자열을 Date 객체로 변환
      end: new Date(event.end_date), // 문자열을 Date 객체로 변환
    }));
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    id: events.length + 1,
    title: '',
    description: '',
    start: '',
    end: '',
    groupType: [],
    classId: [],
    studyId: [],
    creator: 1,
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      start: start,
      end: moment(start).add(1, 'hours').toDate(),
    }));
    setModalOpen(true);
    setIsEdit(false);
  };

  const handleSelectEvent = (event) => {
    setNewEvent(event);
    setModalOpen(true);
    setIsEdit(true);
  };

  return (
    <div className="w-full h-auto mx-[20px] my-[20px] mb-[30px] bg-primary">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month" // 기본 화면은 월별
        views={['month', 'day']} // 월별, 일별로 변경 가능
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} setEvents={setEvents} />
          ),
        }}
        className="bg-white text-gray-600"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable
      />
      <TaskModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        events={events}
        setEvents={setEvents}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}
