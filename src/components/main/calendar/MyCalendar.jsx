import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolBar';
import TaskModal from './TaskModal';
import { getAllEvents } from '../../../api/event';
import { getClass, getStudy } from '../../../api/group';

export default function MyCalendar() {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [userStudy, setUserStudy] = useState([]);
  const [userClass, setUserClass] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const allEvents = await getAllEvents();
      console.log('Parsed Events:', allEvents);
      setEvents(allEvents);
      setSavedEvents(allEvents);
    };

    const getClasses = async () => {
      const savedClass = await getClass();
      setUserClass([savedClass]); // 배열로 저장
    };

    const getStudies = async () => {
      const allStudies = await getStudy();
      if (allStudies.length === 0) {
        setUserStudy([]);
        return;
      }
      const parsedStudies = allStudies.map((group) => ({
        id: group.study_id,
        name: group.study_name,
      }));
      setUserStudy(parsedStudies);
    };

    getEvents();
    getClasses();
    getStudies();
  }, []);



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
    creator: 1, //사용자의 아이디 들어가기
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
            <CustomToolbar {...props} events={events} setEvents={setEvents} userClass={userClass} userStudy={userStudy}/>
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
        userClass={userClass}
        userStudy={userStudy}
      />
    </div>
  );
}
