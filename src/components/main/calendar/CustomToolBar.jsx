import { IconButton, Button } from '@material-tailwind/react';
import CalFilterDropBar from './CalFilterDropBar';
import testEvents from '../../../mocks/testEvents.json';

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

export default function CustomToolbar(props) {
  const { date, onView, view, events, setEvents, userClass, userStudy } = props;

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
    <div className="bg-primary m-0 p-[10px] pt-[10px] pb-[30px] flex justify-between">
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
      <CalFilterDropBar setEvents={setEvents} events={events} userClass={userClass} userStudy={userStudy}/>
    </div>
  );
}
