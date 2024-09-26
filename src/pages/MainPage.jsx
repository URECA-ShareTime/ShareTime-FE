import Header from '../components/common/header/Header';
import LeftBar from '../components/common/leftbar/LeftBar';
import MyCalendar from '../components/main/calendar/MyCalendar';
import TodoList from '../components/main/todoList/TodoList';

export default function MainPage() {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex justify-between">
        <LeftBar />
        <MyCalendar />
        {/* <TodoList /> */}
      </div>
    </div>
  );
}
