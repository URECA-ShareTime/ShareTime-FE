import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Button, IconButton } from '@material-tailwind/react';

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

function MoveIcon({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`${
        direction === 'next' ? 'rotate-180' : ''
      } h-4 w-4 text-gray-600 font-light`}
    >
      <polyline points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
    </svg>
  );
}

function CustomToolbar(props) {
  const { date } = props; // date는 현재 보고 있는 달의 첫 날
  const { onView, view } = props; // view는 현재 보고 있는 화면

  const navigate = (action) => {
    // action은 'PREV', 'NEXT', 'TODAY'
    props.onNavigate(action);
  };

  const handleViewChange = () => {
    if (view === 'month') {
      onView('day');
    } else {
      onView('month');
    }
  };

  let nowdate = date.getFullYear() + ' ' + (date.getMonth() + 1) + '';

  return (
    <div className="bg-primary m-0 p-[10px]">
      <div className="bg-primary m-0 flex justify-start items-center">
        <IconButton
          variant="text"
          className="rounded-full w-6 h-6"
          onClick={navigate.bind(null, 'PREV')}
        >
          <MoveIcon direction="prev" />
        </IconButton>
        <span className="text-gray-600 font-light text-[25px] px-[10px] w-fit">
          {nowdate}
        </span>
        <IconButton
          variant="text"
          className="rounded-full w-6 h-6"
          onClick={navigate.bind(null, 'NEXT')}
        >
          <MoveIcon direction="next" />
        </IconButton>
        <Button
          onClick={handleViewChange}
          variant="outlined"
          className="border-primary-darkblue border-[1.5px] px-2 py-1 mx-4 text-primary-darkblue font-bold focus:ring-0"
        >
          {view === 'month' ? 'Day' : 'Month'}
        </Button>
      </div>
    </div>
  );
}

export default function MyCalendar() {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

  return (
    <div className="w-[700px] h-[540px] mx-[20px] my-[10px]">
      <Calendar
        localizer={localizer}
        events={testEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month" // 기본 화면은 월별
        views={['month', 'day']} // 월별, 일별로 변경 가능
        components={{
          toolbar: CustomToolbar,
        }}
        className="bg-white"
      />
    </div>
  );
}
