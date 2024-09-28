import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolBar';
import testEvents from '../../../mocks/testEvents.json';
import TaskModal from './TaskModal';

export default function MyCalendar() {
  // JSON 데이터를 불러오고, 날짜를 Date 객체로 변환
  const parsedEvents = testEvents.map((event) => ({
    ...event,
    start: new Date(event.start), // 문자열을 Date 객체로 변환
    end: new Date(event.end), // 문자열을 Date 객체로 변환

  }));
  moment.locale('ko-KR');

  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState(parsedEvents);

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
