import { useState } from 'react';
import moment from 'moment';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleNewTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleAddTodo = () => {
    if (isEditing) {
      // 수정 모드인 경우
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setIsEditing(false);
    } else {
      // 새로운 할 일 추가
      setTodos([...todos, newTodo]);
    }
    setNewTodo({ title: '', description: '', date: '' });
    setShowForm(false);
  };

  const handleEditTodo = (index) => {
    setNewTodo(todos[index]);
    setEditingIndex(index);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleNewTodoClick = (e) => {
    if (isEditing) {
      alert('수정 중인 할 일을 먼저 완료해주세요!');
      return;
    }
    setShowForm(!showForm);
  };

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg my-[20px] mb-[30px] mr-[20px]">
      <div className='flex justify-between w-full max-w-md'>
      <input
            type="datetime-local"
            name="date"
            value={moment(newTodo.date).format('YYYY-MM-DD HH:mm')}
            onChange={handleNewTodoChange}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      <button
        onClick={handleNewTodoClick}
        className="mb-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        할 일 추가
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
          <input
            type="text"
            name="description"
            value={newTodo.description}
            onChange={handleNewTodoChange}
            placeholder="세부정보"
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            name="date"
            value={moment(newTodo.date).format('YYYY-MM-DD HH:mm')}
            onChange={handleNewTodoChange}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTodo}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {isEditing ? '수정' : '추가'}
          </button>
        </div>
      )}

      <ul className="h-64 overflow-y-auto px-2 py-2 space-y-2">
        {todos.map((todo, index) =>
          isEditing && index === editingIndex ? null : (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md shadow-sm"
            >
              <div>
                <p className="font-bold">{todo.title}</p>
                <p className="text-sm text-gray-600">{todo.description}</p>
                <p className="text-xs text-gray-500">{moment(todo.date).format('YYYY-MM-DD HH:mm')}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditTodo(index)}
                >
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
                <button
                  onClick={() => handleDeleteTodo(index)}
                >
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
