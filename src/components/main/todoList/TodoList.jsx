import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  createTodo,
  getTodosByDate,
  updateTodo,
  deleteTodo,
} from '../../../api/todo';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    date: selectedDate,
    isCompleted: false,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const allTodos = await getTodosByDate(selectedDate);
      const parsedAllTodos = parsedTodos(allTodos);
      setTodos(parsedAllTodos);
    };
    getTodos();
  }, [selectedDate]);

  const parsedTodos = (originTodos) => {
    return originTodos.map((todo) => ({
      ...todo,
      id: todo.todo_id,
      title: todo.title,
      date: moment(new Date(todo.created_at)).format('YYYY-MM-DD'),
      isCompleted: todo.is_completed,
    }));
  };

  const handleNewTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleAddTodo = async () => {
    if (isEditing) {
      // 수정 모드인 경우
      try {
        const updatedTodo = await updateTodo(newTodo);
        if (updatedTodo === null) {
          throw new Error('put failed');
        }
        const parsedUpdatedTodo = {
          ...updatedTodo,
          id: updatedTodo.todo_id,
          title: updatedTodo.title,
          date: moment(new Date(updatedTodo.created_at)).format('YYYY-MM-DD'),
          isCompleted: updatedTodo.is_completed,
        };

        setTodos((prevTodos) => 
          prevTodos.map((todo) => 
            todo.id == parsedUpdatedTodo.id ? parsedUpdatedTodo : todo
          )
        );
        window.location.reload();
      } catch (error) {
        alert('할 일 수정이 실패했습니다. 다시 작성해주세요.');
      }
    } else {
      // 새로운 할 일 추가
      const addNewTodo = await createTodo({...newTodo, date: selectedDate});
      const parsedNewTodo = {
        ...addNewTodo,
        id: addNewTodo.todo_id,
        title: addNewTodo.title,
        date: moment(new Date(addNewTodo.created_at)).format('YYYY-MM-DD'),
        isCompleted: addNewTodo.is_completed,
      };
      setTodos([...todos, parsedNewTodo]);
    }
    setNewTodo({ title: '', description: '', date: selectedDate, isCompleted: false });
    setShowForm(false);
  };

  const handleEditTodo = (id) => {
    const editingTodo = todos.find((todo) => todo.id === id);
    setNewTodo(editingTodo);
    setEditingId(id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      alert('할 일 삭제가 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleToggleComplete = (todoId) => {
    const checkedTodo = todos.find((todo) => todo.id === todoId);
    if (checkedTodo) {
      checkedTodo.isCompleted = !checkedTodo.isCompleted;
      updateTodo(checkedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? checkedTodo : todo))
      );
    } else {
      console.error('Todo not found!');
    }
  };

  const handleNewTodoClick = (e) => {
    if (isEditing) {
      alert('수정 중인 할 일을 먼저 완료해주세요!');
      return;
    }
    setShowForm(!showForm);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // 날짜를 변경할 때 상태 업데이트
    setNewTodo({ ...newTodo, date: e.target.value });
  };

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg my-[20px] mb-[30px] mr-[20px]">
      <div className="flex justify-between w-full max-w-md items-center">
      <div className="flex items-center">
      <label htmlFor="date" className="font-normal text-3xl mx-2 py-2 mb-4 text-primary-darkblue">Today is</label>
      <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-auto mb-4 px-4 py-2 text-xl font-normal text-primary-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
        <button
          onClick={handleNewTodoClick}
          className="mb-4 mx-2 w-auto px-3 py-1 font-bold text-2xl bg-primary-darkblue text-white rounded-md hover:bg-blue-gray-800 focus:outline-none focus:ring-2 flex items-center justify-center"
        >
          +
        </button>
      </div>
      {showForm && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleNewTodoChange}
            placeholder="제목"
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={newTodo.description}
            onChange={handleNewTodoChange}
            placeholder="세부정보"
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTodo}
            className="w-full px-4 py-2 bg-primary-darkblue text-white rounded-md hover:bg-blue-gray-800 focus:outline-none"
          >
            {isEditing ? '수정' : '추가'}
          </button>
        </div>
      )}

      <ul className="h-auto max-h-[700px] overflow-y-scroll px-2 py-2 space-y-2 no-scrollbar">
        {todos.map((todo) =>
          isEditing && todo.id === editingId ? null : (
            <li
              key={todo.id}
              className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm"
            >
              <div className='flex-col'>
                <div className="flex">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="mr-2"
                />
                <p className={`font-bold ${todo.isCompleted ? 'line-through' : ''}`}>{todo.title}</p>
                </div>
                <p className="text-sm text-gray-600">{todo.description}</p>
                <p className="text-xs text-gray-500">
                  {moment(todo.date).format('YYYY-MM-DD')}
                </p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEditTodo(todo.id)}>
                  <svg
                    className="w-7 h-7 p-1 stroke-1 text-primary-darkblue fill-primary-darkblue hover:fill-black hover:text-black cursor-pointer"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                      stroke="currentColor"
                    />
                  </svg>
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  <svg
                    className="w-7 h-7 p-1 stroke-1 text-primary-darkblue fill-primary-darkblue hover:fill-black hover:text-black cursor-pointer"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                      stroke="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
