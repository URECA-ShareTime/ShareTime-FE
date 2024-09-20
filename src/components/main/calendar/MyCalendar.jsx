import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const testEvents = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2024, 8, 29, 9, 0, 0), // 현재 날짜로 변경
    end: new Date(2024, 8, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2024, 8, 29, 14, 0, 0),
    end: new Date(2024, 8, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2024, 8, 29, 8, 30, 0),
    end: new Date(2024, 8, 29, 12, 30, 0),
    resourceId: [2, 3],
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2024, 8, 30, 7, 0, 0),
    end: new Date(2024, 8, 30, 10, 30, 0),
    resourceId: 4,
  },
];

function CustomToolbar() {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-toolbar-label">커스텀 툴바</span>
      <span className="rbc-btn-group">
        <button onClick={() => alert('Previous')}>Previous</button>
        <button onClick={() => alert('Today')}>Today</button>
      </span>
    </div>
  );
}

export default function MyCalendar() {
  //Calendar 와 이름이 충돌하므로 MyCalendar로 변경
  return (
    <div className="w-[800px] h-[420px] mt-[130px] mx-[20px]">
      <Calendar
        localizer={localizer}
        events={testEvents}
        startAccessor="start"
        endAccessor="end"
        onView="month"
        toolbar={false}
        components={{
          toolbar: CustomToolbar,
        }}
        className="bg-white"
      />
    </div>
  );
}
