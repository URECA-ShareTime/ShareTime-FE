import Header from '../components/common/header/Header';
import LeftBar from '../components/common/leftbar/LeftBar';
import Calendar from '../components/main/calendar/Calendar';
import TodoList from '../components/main/todoList/TodoList';

export default function MainPage() {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <LeftBar />
        <Calendar />
        <TodoList />
      </div>
    </div>
  );
}
