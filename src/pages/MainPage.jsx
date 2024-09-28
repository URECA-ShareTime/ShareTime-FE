import Header from '../components/common/header/Header';

import LeftBar from '../components/common/leftBar/LeftBar'; // 올바른 경로
import Calendar from '../components/main/calendar/Calendar';

import TodoList from '../components/main/todoList/TodoList';

export default function MainPage() {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex justify-between">
        <LeftBar />
        <MyCalendar />
        <TodoList />
      </div>
    </div>
  );
}
