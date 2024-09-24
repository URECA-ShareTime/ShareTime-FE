import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Button} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolBar';
import testEvents from '../../../mocks/testEvents.json';

export default function MyCalendar() {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState(testEvents);

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
          toolbar: (props) => <CustomToolbar {...props} setEvents={setEvents} />,
        }}
        className="bg-white text-gray-600"
      />
    </div>
  );
}
